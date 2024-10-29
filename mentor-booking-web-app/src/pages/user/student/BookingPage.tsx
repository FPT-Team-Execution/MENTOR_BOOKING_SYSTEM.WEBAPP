import React, { useCallback, useEffect, useState } from 'react';
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
import { BusyTimeData } from '../../../types/common.types';
// import timezone from 'dayjs/plugin/timezone' // ES 2015
dayjs.extend(utc);
dayjs.extend(timezone);


export const BookingPage: React.FC<{ project?: ProjectType }> = ({ project }) =>{
    const { userInfo } = useAuth();
    const [selectedMentor, setSelectedMentor] = useState<string>('');
    const [mentorList, setMentorList] = useState<MentorType[]>([]);
    const [date, setDate] = useState<Dayjs>();
    const [start, setStart] = useState<Dayjs>()
    const [end, setEnd] = useState<Dayjs>()
    const [busyTimes, setBusyTimes] = useState<BusyTimeData[]>([])
    const [booking, setBooking] = useState({
        title: '',
        mentorId: '',
        start: '',
        end: '',
        projectId: '',
        createrId: ''
    });
    const [isSuccess,setIsSuccess] = useState(false)

    useEffect(() => {
        handleGetBusyTimes()
    }, [date])

    dayjs.extend(utc)
    dayjs.extend(timezone)

    const handleGetBusyTimes = async () => {
        try {
            if (!date) {
                return
            }
            const res = await mentorService.getBusyTimes(selectedMentor, date.format('YYYY-MM-DD'))
            setBusyTimes(res.responseModel.events)
        } catch (err) {
            console.log(err)
        }
    }

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
        return !isTimeConflict(startDateTime, endDateTime)
    };

    const handleBooking = async () => {
        if (!handleCheck()) {
            message.error('Time conflict')
            return
        } 
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
                setIsSuccess(true)
            } else {
                message.error(response.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
            <div className="flex justify-center w-full mt-8 shadow-lg rounded-lg py-10">
                {!isSuccess ? (<div className="w-full md:w-1/2 space-y-4">
                    <p className="text-xl font-semibold text-gray-700">Request a Meeting</p>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title: <input
                            type="text"
                            id="title"
                            className="px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 transition"
                            onChange={(e) => setBooking({ ...booking, title: e.target.value })}
                        /></label>

                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Mentor: </label>
                        <Select
                            showSearch
                            placeholder="Search for a mentor"
                            value={selectedMentor}
                            onSearch={handleSearch}
                            onChange={value => setSelectedMentor(value)}
                            className='w-3/4'
                            filterOption={false}
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
                        className="btn-primary"
                        onClick={handleBooking}
                        disabled={!end || !date || !selectedMentor}
                    >
                        Book
                    </Button>
                </div>) : (<>Booking successful</>) }
                
            </div>
    );
};
