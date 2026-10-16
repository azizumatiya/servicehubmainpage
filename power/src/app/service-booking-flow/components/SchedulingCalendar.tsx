'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface TimeSlot {
  time: string;
  available: boolean;
  price?: number;
}

interface SchedulingCalendarProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const SchedulingCalendar = ({ onNext, onBack }: SchedulingCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [estimatedDuration, setEstimatedDuration] = useState<string>('2');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Generate next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        date: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        monthName: date.toLocaleDateString('en-US', { month: 'short' }),
        isToday: i === 0,
        isWeekend: date.getDay() === 0 || date.getDay() === 6
      });
    }
    return dates;
  };

  const dates = generateDates();

  const timeSlots: TimeSlot[] = [
    { time: '8:00 AM', available: true },
    { time: '9:00 AM', available: true, price: 10 },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '1:00 PM', available: true },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: true, price: 15 },
    { time: '4:00 PM', available: true, price: 15 },
    { time: '5:00 PM', available: false },
    { time: '6:00 PM', available: true, price: 25 },
    { time: '7:00 PM', available: true, price: 25 }
  ];

  const durationOptions = [
    { value: '1', label: '1 hour', description: 'Quick fixes, consultations' },
    { value: '2', label: '2 hours', description: 'Standard repairs, installations' },
    { value: '3', label: '3 hours', description: 'Complex repairs, multiple tasks' },
    { value: '4', label: '4+ hours', description: 'Major installations, renovations' }
  ];

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onNext({
        date: selectedDate,
        time: selectedTime,
        duration: estimatedDuration,
        specialInstructions
      });
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Schedule Your Service</h2>
        <p className="text-text-secondary">Choose your preferred date and time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Date Selection */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Select Date</h3>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dates.map((date) => (
              <button
                key={date.date}
                onClick={() => setSelectedDate(date.date)}
                disabled={date.isToday}
                className={`p-3 rounded-lg text-center transition-all duration-200 ${
                  selectedDate === date.date
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : date.isToday
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : date.isWeekend
                    ? 'bg-warning/10 text-warning hover:bg-warning/20' :'bg-background border border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <div className="text-xs font-medium">{date.dayName}</div>
                <div className="text-sm font-bold">{date.dayNumber}</div>
                <div className="text-xs">{date.monthName}</div>
              </button>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">
            <Icon name="InformationCircleIcon" size={14} className="inline mr-1" />
            Weekend appointments may have additional fees
          </div>
        </div>

        {/* Time Selection */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Select Time</h3>
          <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.available && setSelectedTime(slot.time)}
                disabled={!slot.available}
                className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedTime === slot.time
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : !slot.available
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-background border border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <div>{slot.time}</div>
                {slot.price && (
                  <div className="text-xs text-accent">+${slot.price}</div>
                )}
                {!slot.available && (
                  <div className="text-xs">Unavailable</div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Duration Estimate */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Estimated Duration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {durationOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors duration-200"
            >
              <input
                type="radio"
                name="duration"
                value={option.value}
                checked={estimatedDuration === option.value}
                onChange={(e) => setEstimatedDuration(e.target.value)}
                className="w-4 h-4 text-primary border-border focus:ring-primary"
              />
              <div className="ml-3">
                <div className="font-medium text-foreground">{option.label}</div>
                <div className="text-sm text-muted-foreground">{option.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Special Instructions */}
      <div className="mt-6">
        <label htmlFor="instructions" className="block text-lg font-semibold text-foreground mb-2">
          Special Instructions (Optional)
        </label>
        <textarea
          id="instructions"
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          placeholder="Any specific requirements, access instructions, or preferences..."
          className="input min-h-[100px] resize-none"
        />
      </div>

      {/* Booking Summary */}
      {selectedDate && selectedTime && (
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold text-foreground mb-2">Booking Summary</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="text-foreground">
                {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span className="text-foreground">{selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration:</span>
              <span className="text-foreground">
                {durationOptions.find(opt => opt.value === estimatedDuration)?.label}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between mt-6 space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Icon name="ArrowLeftIcon" size={20} />
          <span>Back to Providers</span>
        </button>
        <button
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
          className="btn-primary px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <span>Continue to Payment</span>
          <Icon name="ArrowRightIcon" size={20} />
        </button>
      </div>
    </div>
  );
};

export default SchedulingCalendar;