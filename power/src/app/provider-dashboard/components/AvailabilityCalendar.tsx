'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isAvailable: boolean;
  hasBooking: boolean;
  bookingInfo?: {
    time: string;
    customer: string;
    service: string;
  };
}

interface AvailabilityCalendarProps {
  className?: string;
}

const AvailabilityCalendar = ({ className = '' }: AvailabilityCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 8)); // November 2024
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date(2024, 10, 8); // Current date: Nov 8, 2024
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days: CalendarDay[] = [];
    const currentDateIterator = new Date(startDate);
    
    // Mock booking data
    const bookings = {
      10: { time: "10:00 AM", customer: "Sarah J.", service: "Plumbing" },
      15: { time: "2:00 PM", customer: "Mike C.", service: "Electrical" },
      22: { time: "9:00 AM", customer: "Emily R.", service: "HVAC" }
    };
    
    for (let i = 0; i < 42; i++) {
      const date = currentDateIterator.getDate();
      const isCurrentMonth = currentDateIterator.getMonth() === month;
      const isToday = currentDateIterator.toDateString() === today.toDateString();
      const hasBooking = isCurrentMonth && bookings[date as keyof typeof bookings];
      
      days.push({
        date,
        isCurrentMonth,
        isToday,
        isAvailable: isCurrentMonth && date > today.getDate(),
        hasBooking: !!hasBooking,
        bookingInfo: hasBooking ? bookings[date as keyof typeof bookings] : undefined
      });
      
      currentDateIterator.setDate(currentDateIterator.getDate() + 1);
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
    setSelectedDate(null);
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className={`card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Availability Calendar</h3>
          <p className="text-sm text-text-secondary">Manage your schedule and bookings</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-md">
            Available
          </button>
          <button className="px-3 py-1 text-sm font-medium text-text-secondary hover:bg-muted rounded-md transition-colors duration-200">
            Busy
          </button>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-muted rounded-md transition-colors duration-200"
        >
          <Icon name="ChevronLeftIcon" size={20} className="text-text-secondary" />
        </button>
        
        <h4 className="text-lg font-semibold text-foreground">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h4>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-muted rounded-md transition-colors duration-200"
        >
          <Icon name="ChevronRightIcon" size={20} className="text-text-secondary" />
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-text-secondary">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <button
            key={index}
            onClick={() => day.isCurrentMonth && setSelectedDate(day.date)}
            className={`
              relative p-2 h-12 text-sm font-medium rounded-md transition-all duration-200
              ${!day.isCurrentMonth ? 'text-text-secondary/50 cursor-not-allowed' : ''}
              ${day.isToday ? 'bg-primary text-white' : ''}
              ${day.hasBooking && !day.isToday ? 'bg-warning/20 text-warning border border-warning/30' : ''}
              ${day.isAvailable && !day.hasBooking && !day.isToday ? 'hover:bg-muted text-foreground' : ''}
              ${selectedDate === day.date ? 'ring-2 ring-primary ring-offset-2' : ''}
              ${!day.isCurrentMonth || (!day.isAvailable && !day.hasBooking) ? 'text-text-secondary/50' : ''}
            `}
            disabled={!day.isCurrentMonth}
          >
            {day.date}
            {day.hasBooking && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-warning rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* Selected Date Info */}
      {selectedDate && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h5 className="font-semibold text-foreground mb-2">
            {monthNames[currentDate.getMonth()]} {selectedDate}, {currentDate.getFullYear()}
          </h5>
          {calendarDays.find(day => day.date === selectedDate)?.hasBooking ? (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="ClockIcon" size={16} className="text-text-secondary" />
                <span className="text-foreground">
                  {calendarDays.find(day => day.date === selectedDate)?.bookingInfo?.time}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="UserIcon" size={16} className="text-text-secondary" />
                <span className="text-foreground">
                  {calendarDays.find(day => day.date === selectedDate)?.bookingInfo?.customer}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="WrenchScrewdriverIcon" size={16} className="text-text-secondary" />
                <span className="text-foreground">
                  {calendarDays.find(day => day.date === selectedDate)?.bookingInfo?.service}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-text-secondary">No bookings scheduled for this day</p>
              <button className="w-full btn-primary px-4 py-2 rounded-md text-sm font-medium">
                Set Availability
              </button>
            </div>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 flex space-x-3">
        <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-border rounded-md text-sm font-medium text-text-secondary hover:bg-muted transition-colors duration-200">
          <Icon name="CalendarDaysIcon" size={16} />
          <span>Block Time</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-border rounded-md text-sm font-medium text-text-secondary hover:bg-muted transition-colors duration-200">
          <Icon name="ClockIcon" size={16} />
          <span>Set Hours</span>
        </button>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;