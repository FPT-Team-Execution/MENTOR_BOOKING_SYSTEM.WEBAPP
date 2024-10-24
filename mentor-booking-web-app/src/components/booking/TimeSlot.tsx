import { Button } from 'antd';
import React from 'react';

interface BookingSlotProps {
  setSlot: (slot: string) => void;
  disabledSlots?: string[]; 
}

const slots = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

const TimeSlot: React.FC<BookingSlotProps> = ({ setSlot, disabledSlots = [] }) => {
  const [selectedSlot, setSelectedSlotState] = React.useState<string | null>(null);

  const handleSelectSlot = (slot: string) => {
    if (!disabledSlots.includes(slot)) {
      setSelectedSlotState(slot);
      setSlot(slot);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-center">Select a Time Slot</h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {slots.map((slot) => (
          <Button
            key={slot}
            type={selectedSlot === slot ? 'primary' : 'default'}
            onClick={() => handleSelectSlot(slot)}
            className={`w-full p-2 ${selectedSlot === slot ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            disabled={disabledSlots.includes(slot)}
          >
            {slot}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlot;
