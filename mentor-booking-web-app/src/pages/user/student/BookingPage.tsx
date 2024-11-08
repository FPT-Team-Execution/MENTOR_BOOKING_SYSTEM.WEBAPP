import React, { useCallback, useEffect, useState } from 'react';
import { Button, DatePicker, message, Select, TimePicker, Card, List } from 'antd';
import { debounce } from 'lodash';
import { mentorService } from '../../../services/mentorService';
import { MentorType } from '../../../types/user.types';
import MentorCard from '../../../components/mentor/MentorCard';
import { bookingService } from '../../../services/bookingService';
import { useAuth } from '../../../auth/AuthContext';
import dayjs, { Dayjs } from 'dayjs';
import { ProjectType } from '../../../types/project.type';
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { BusyTimeData } from '../../../types/common.types';

dayjs.extend(utc);
dayjs.extend(timezone);

export const BookingPage: React.FC<{ project?: ProjectType }> = ({ project }) => {
    const { userInfo } = useAuth();
    const [selectedMentor, setSelectedMentor] = useState<string>('');
    const [mentorList, setMentorList] = useState<MentorType[]>([]);
    const [date, setDate] = useState<Dayjs>();
    const [start, setStart] = useState<Dayjs>();
    const [end, setEnd] = useState<Dayjs>();
    const [busyTimes, setBusyTimes] = useState<BusyTimeData[]>([]);
    const [booking, setBooking] = useState({
        title: '',
        mentorId: '',
        start: '',
        end: '',
        projectId: '',
        createrId: ''
    });
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (selectedMentor && date) {
            handleGetBusyTimes();
        }
    }, [selectedMentor, date]);

    const handleGetBusyTimes = async () => {
        try {
            if (date) {
                const res = await mentorService.getBusyTimes(selectedMentor, date?.format('YYYY-MM-DD'));
                setBusyTimes(res.responseModel.events || []);
            }
        } catch (err) {
            console.log(err);
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

        const fullStart = dayjs(`${date?.format('YYYY-MM-DD')} ${start.format('HH:mm')}`, 'YYYY-MM-DD HH:mm');
        const fullEnd = dayjs(`${date?.format('YYYY-MM-DD')} ${end.format('HH:mm')}`, 'YYYY-MM-DD HH:mm');
        return busyTimes.some(busy => {
            const busyStart = dayjs(busy.start, 'YYYY-MM-DD HH:mm');
            const busyEnd = dayjs(busy.end, 'YYYY-MM-DD HH:mm');
            return fullStart.isBefore(busyEnd) && fullEnd.isAfter(busyStart);
        });
    };

    const handleBooking = async () => {
        console.log(start, end)
        if (!date || !start || !end || isTimeConflict(start, end)) {
            message.error('Time conflict or missing fields');
            return;
        }
        
        const request = {
            ...booking,
            createrId: userInfo?.nameidentifier,
            start: dayjs(`${date.format('YYYY-MM-DD')} ${start.format('HH:mm')}`, 'YYYY-MM-DD HH:mm').tz('Asia/Bangkok').format(),
            end: dayjs(`${date.format('YYYY-MM-DD')} ${end.format('HH:mm')}`, 'YYYY-MM-DD HH:mm').tz('Asia/Bangkok').format(),
            projectId: project?.id || '',
            mentorId: selectedMentor,
        };
        
        try {
            const response = await bookingService.sendRequest(request);
            if (response.isSuccess) {
                message.success('Booking successful');
                setIsSuccess(true);
            } else {
                message.error(response.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex justify-center w-full mt-8 shadow-lg rounded-lg py-5">
            {!isSuccess ? (
                <div className="w-full p-4 space-y-2">
                    <p className="text-xl font-semibold text-gray-700">Request a Meeting</p>
                    
                    {/* Title Input */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title:
                            <input
                                type="text"
                                id="title"
                                className="px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 transition w-full mt-1"
                                onChange={(e) => setBooking({ ...booking, title: e.target.value })}
                            />
                        </label>
                    </div>

                    {/* Mentor Selection */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Mentor:</label>
                        <Select
                            showSearch
                            placeholder="Search for a mentor"
                            value={selectedMentor}
                            onSearch={handleSearch}
                            onChange={value => setSelectedMentor(value)}
                            className="w-full"
                            filterOption={false}
                        >
                            {mentorList.map((mentor) => (
                                <Select.Option key={mentor.mentorId} value={mentor.mentorId}>
                                    {`${mentor.fullName} (${mentor.email})`}
                                </Select.Option>
                            ))}
                        </Select>
                        {selectedMentor && <MentorCard mentorId={selectedMentor} />}
                    </div>

                    {/* Date Picker */}
                    {selectedMentor && (
                        <div className="transition-all duration-300">
                            <label className="block text-sm font-medium text-gray-700">Date:</label>
                            <DatePicker
                                format="YYYY-MM-DD"
                                placeholder="Choose Date"
                                onChange={(selectedDate) => setDate(selectedDate)}
                                className="w-full mt-1"
                                disabledDate={(current) => current && current < dayjs().endOf('day')}
                            />
                        </div>
                    )}

                    {/* Busy Times List */}
                    {busyTimes.length > 0 && (
                        <div className="mt-4">
                            <p className="text-gray-700 font-medium">Mentor's Busy Times:</p>
                            <List
                                dataSource={busyTimes}
                                renderItem={(busy) => (
                                    <List.Item>
                                        <div className="text-center border-2 p-1 rounded-xl  bg-gray-50">
                                            {`${dayjs(busy.start, 'YYYY-MM-DD HH:mm').format('HH:mm')} - ${dayjs(busy.end, 'YYYY-MM-DD HH:mm').format('HH:mm')}`}
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </div>
                    )}

                    {/* Time Pickers */}
                    {date && (
                        <div className="flex space-x-4 mt-2">
                            <TimePicker
                                format="HH:mm"
                                minuteStep={30}
                                placeholder="Start time"
                                onChange={(time) => setStart(time)}
                                disabled={!date}
                                className="w-1/2"
                            />
                            <TimePicker
                                format="HH:mm"
                                minuteStep={30}
                                placeholder="End time"
                                onChange={(time) => setEnd(time)}
                                disabled={!start}
                                className="w-1/2"
                            />
                        </div>
                    )}

                    {/* Book Button */}
                    <Button
                        type="primary"
                        onClick={handleBooking}
                        disabled={!end || !date || !selectedMentor}
                        className="w-full mt-4"
                    >
                        Book
                    </Button>
                </div>
            ) : (
                <div className="text-center text-green-600 font-medium text-lg">
                    Booking successful
                </div>
            )}
        </div>
    );
};
