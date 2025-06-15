'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useReminderStore } from '@/lib/store';
import { format, addDays, subDays, isToday, isSameDay } from 'date-fns';

export function CalendarStrip() {
  const { selectedDate, setSelectedDate } = useReminderStore();

  const generateDates = () => {
    const dates = [];
    for (let i = -3; i <= 3; i++) {
      dates.push(addDays(selectedDate, i));
    }
    return dates;
  };

  const dates = generateDates();

  const handlePrevious = () => {
    setSelectedDate(subDays(selectedDate, 1));
  };

  const handleNext = () => {
    setSelectedDate(addDays(selectedDate, 1));
  };

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-4 py-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevious}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex-1 px-4">
          <div className="flex justify-center space-x-2">
            {dates.map((date, index) => {
              const isSelected = isSameDay(date, selectedDate);
              const isTodayDate = isToday(date);

              return (
                <motion.button
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center justify-center w-12 h-16 rounded-lg transition-colors ${
                    isSelected
                      ? 'bg-teal-500 text-white shadow-md'
                      : isTodayDate
                      ? 'bg-teal-50 text-teal-600 border border-teal-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="text-xs font-medium">
                    {format(date, 'EEE')}
                  </span>
                  <span className="text-lg font-semibold">
                    {format(date, 'd')}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleNext}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="px-4 pb-3">
        <h2 className="text-lg font-semibold text-gray-900">
          {format(selectedDate, 'EEEE, MMMM d')}
        </h2>
        {isToday(selectedDate) && (
          <span className="text-sm text-teal-600 font-medium">Today</span>
        )}
      </div>
    </div>
  );
}