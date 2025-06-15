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
    <div className="bg-white border-b border-gray-100 sticky top-0 z-10 backdrop-blur-sm bg-white/80">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevious}
          className="h-8 sm:h-9 w-8 sm:w-9 p-0 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
        </Button>

        <div className="flex-1 px-3 sm:px-6">
          <div className="flex justify-center space-x-2 sm:space-x-3">
            {dates.map((date, index) => {
              const isSelected = isSameDay(date, selectedDate);
              const isTodayDate = isToday(date);

              return (
                <motion.button
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center justify-center w-12 sm:w-14 h-16 sm:h-20 rounded-xl transition-all duration-200 ${
                    isSelected
                      ? 'bg-teal-500 text-white shadow-lg shadow-teal-100'
                      : isTodayDate
                      ? 'bg-teal-50 text-teal-600 border-2 border-teal-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:border-gray-200 border-2 border-transparent'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                >
                  <span className="text-xs sm:text-sm font-medium mb-1">
                    {format(date, 'EEE')}
                  </span>
                  <span className="text-lg sm:text-xl font-bold">
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
          className="h-8 sm:h-9 w-8 sm:w-9 p-0 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
        </Button>
      </div>

      <div className="px-4 sm:px-6 pb-3 sm:pb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            {format(selectedDate, 'EEEE, MMMM d')}
          </h2>
          {isToday(selectedDate) && (
            <span className="text-xs sm:text-sm text-teal-600 font-semibold bg-teal-50 px-2.5 py-1 rounded-full">
              Today
            </span>
          )}
        </div>
      </div>
    </div>
  );
}