import React, { useCallback, useEffect, useState } from 'react';
import { projectService } from '../../../services/projectService';
import ProjectCard from '../../../components/project/ProjectCard';
import { Button, DatePicker, message, Select, TimePicker } from 'antd';
import { debounce } from 'lodash';
import { mentorService } from '../../../services/mentorService';
import { MentorType } from '../../../types/user.types';
import MentorCard from '../../../components/mentor/MentorCard';
import { bookingService } from '../../../services/bookingService';
import { useAuth } from '../../../auth/AuthContext';
import dayjs, { Dayjs } from 'dayjs';
import { ProjectType } from '../../../types/project.type';


import utc from "dayjs/plugin/utc";
// import utc from 'dayjs/plugin/utc' // ES 2015

import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
// import timezone from 'dayjs/plugin/timezone' // ES 2015
dayjs.extend(utc);
dayjs.extend(timezone);


const busyTimes = [
    { start: "10:00", end: "11:00" },
    { start: "13:00", end: "14:00" }
];

export const BookingPage = () => {
    const { userInfo } = useAuth();
    const [project, setProject] = useState<ProjectType>();
    const [selectedMentor, setSelectedMentor] = useState<string>('');
    const [mentorList, setMentorList] = useState<MentorType[]>([]);
    const [date, setDate] = useState<Dayjs>();
    const [start, setStart] = useState<Dayjs>()
    const [end, setEnd] = useState<Dayjs>()
    const [booking, setBooking] = useState({
        title: '',
        mentorId: '',
        start: '',
        end: '',
        projectId: '',
        createrId: ''
    });

    useEffect(() => {
        handleGetProject();
    }, []);

    dayjs.extend(utc)
    dayjs.extend(timezone)
    const handleGetProject = async () => {
        try {
            const res = await projectService.getProjectById('D1F47F88-C7E2-41CB-BB8D-E1ACB1E342AF');
            setProject(res.responseRequestModel.project);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = useCallback(
        debounce((value: string) => {
            if (value) {
                searchMentor(value);
            } else {
                setMentorList([]);
            }
        }, 500),
        []
    );

    const searchMentor = async (value: string) => {
        try {
            const response = await mentorService.searchMentor(value);
            setMentorList(response);
        } catch (err) {
            console.log(err);
        }
    };

    const isTimeConflict = (start: Dayjs, end: Dayjs) => {
        if (!date) {
            return
        }
        return busyTimes.some(busy => {
            const busyStart = dayjs(`${date.format('YYYY-MM-DD')} ` + busy.start, 'YYYY-MM-DD HH:mm');
            const busyEnd = dayjs(`${date.format('YYYY-MM-DD')} ` + busy.end, 'YYYY-MM-DD HH:mm');
            console.log(busyStart, busyEnd)
            return start.isBefore(busyEnd) && end.isAfter(busyStart);
        });
    };

    const handleCheck = () => {
        if (!date || !start || !end) {
            message.warning('Please choose date and time');
            return;
        }

        const startDateTime = dayjs(`${date.format('YYYY-MM-DD')} ${start.format('HH:mm')}`, 'YYYY-MM-DD HH:mm');
        const endDateTime = dayjs(`${date.format('YYYY-MM-DD')} ${end.format('HH:mm')}`, 'YYYY-MM-DD HH:mm');
        console.log(startDateTime, endDateTime)
        if (isTimeConflict(startDateTime, endDateTime)) {
            message.error('Time conflict');
        } else {
            message.success('Success');
        }
    };

    const handleBooking = async () => {
        handleCheck()
        const request = {
            ...booking,
            createrId: userInfo?.nameidentifier,
            start: dayjs(`${date?.format('YYYY-MM-DD')} ${start?.format('HH:mm')}`, 'YYYY-MM-DD HH:mm').tz('Asia/Bangkok').format(),
            end: dayjs(`${date?.format('YYYY-MM-DD')} ${end?.format('HH:mm')}`, 'YYYY-MM-DD HH:mm').tz('Asia/Bangkok').format(),
            projectId: project?.id || '',
            mentorId: selectedMentor,
        };
        try {
            const response = await bookingService.sendRequest(request);
            if (response.isSuccess) {
                message.success('Booking successful');
            } else {
                message.error(response.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg transition-all duration-300">
            <ProjectCard project={project} />

            <div className="w-full flex justify-center mt-8">
                <div className="w-full md:w-1/2 space-y-4">
                    <p className="text-xl font-semibold text-gray-700">Request a Meeting</p>

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                        <input
                            type="text"
                            id="title"
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 transition"
                            onChange={(e) => setBooking({ ...booking, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mentor:</label>
                        <Select
                            showSearch
                            placeholder="Search for a mentor"
                            value={selectedMentor}
                            onSearch={handleSearch}
                            onChange={value => setSelectedMentor(value)}
                            style={{ width: '100%' }}
                            filterOption={false}
                            className="w-full"
                        >
                            {mentorList.map((mentor) => (
                                <Select.Option key={mentor.mentorId} value={mentor.mentorId}>
                                    {`${mentor.fullName} (${mentor.email})`}
                                </Select.Option>
                            ))}
                        </Select>

                        <div className={`transition-all duration-300 ${selectedMentor ? 'opacity-100' : 'opacity-0 h-0'}`}>
                            {selectedMentor && <MentorCard mentorId={selectedMentor} />}
                        </div>
                    </div>

                    <div className={`transition-all duration-300 ${selectedMentor ? 'opacity-100' : 'opacity-0 h-0'}`}>
                        <label className="block text-sm font-medium text-gray-700">Date:</label>
                        <DatePicker
                            format="YYYY-MM-DD"
                            placeholder='Choose Date'
                            onChange={(date) => setDate(date)}
                            className="w-full"
                            minDate={dayjs()}
                        />
                    </div>
                    <div className={`transition-all duration-300 ${date ? 'opacity-100' : 'opacity-0 h-0'}`}>
                        <TimePicker
                            format="HH:mm"
                            minuteStep={30}
                            placeholder="Start time"
                            onChange={(time) => setStart(time)}
                            disabled={!date}
                        />
                        <TimePicker
                            format="HH:mm"
                            minuteStep={30}
                            placeholder="End time"
                            minDate={start}
                            onChange={(time) => setEnd(time)}
                            disabled={!start}
                        />
                    </div>
                    <Button
                        className="btn-primary w-full"
                        onClick={handleBooking}
                        disabled={!end || !date || !selectedMentor}
                    >
                        Book
                    </Button>

                </div>
            </div>
        </div>
    );
};
