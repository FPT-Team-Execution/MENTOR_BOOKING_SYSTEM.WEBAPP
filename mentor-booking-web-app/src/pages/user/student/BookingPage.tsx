import React, { useCallback, useEffect, useState } from 'react';
import { projectService } from '../../../services/projectService';
import ProjectCard from '../../../components/project/ProjectCard';
import { Button, DatePicker, message, Select } from 'antd';
import { debounce } from 'lodash';
import { mentorService } from '../../../services/mentorService';
import { MentorType } from '../../../types/user.types';
import MentorCard from '../../../components/mentor/MentorCard';
import TimeSlot from '../../../components/booking/TimeSlot';
import { bookingService } from '../../../services/bookingService';
import { useAuth } from '../../../auth/AuthContext';
import { Dayjs } from 'dayjs';
import { ProjectType } from '../../../types/project.type';

const disabledSlots = ['10:00', '15:00', '16:00'];

export const BookingPage = () => {
    const { userInfo } = useAuth();
    const [project, setProject] = useState<ProjectType>();
    const [selectedMentor, setSelectedMentor] = useState<string>('');
    const [mentorList, setMentorList] = useState<MentorType[]>([]);
    const [date, setDate] = useState<Dayjs>();
    const [slot, setSlot] = useState<string>();
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

    const handleBooking = async () => {
        const startHour = slot?.split(':')[0];
        const request = {
            ...booking,
            createrId: userInfo?.nameidentifier,
            start: date?.set('hour', parseInt(startHour || '10'))
                .set('minute', 0)
                .set('second', 0)
                .set('millisecond', 0),
            end: date?.set('hour', parseInt(startHour || '10') + 1)
                .set('minute', 0)
                .set('second', 0)
                .set('millisecond', 0),
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
                            onChange={(date) => setDate(date)}
                            className="w-full"
                        />
                    </div>

                    <div className={`transition-all duration-300 ${date ? 'opacity-100' : 'opacity-0 h-0'}`}>
                        <label className="block text-sm font-medium text-gray-700">Time:</label>
                        <TimeSlot
                            setSlot={setSlot}
                            disabledSlots={disabledSlots}
                        />
                    </div>

                    <div>
                        <Button
                            className="btn-primary w-full"
                            onClick={handleBooking}
                            disabled={!slot || !date || !selectedMentor}
                        >
                            Book
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
