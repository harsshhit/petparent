'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useReminderStore } from '@/lib/store';
import { format, addDays, subDays, isToday, isSameDay } from 'date-fns';
import { useMediaQuery } from '../hooks/use-media-query';

export function CalendarStrip() {
  const { selectedDate, setSelectedDate } = useReminderStore();
  const isMobile = useMediaQuery('(max-width: 640px)');

  const generateDates = () => {
    const dates = [];
    const range = isMobile ? 2 : 3; // Show 5 dates on mobile (2 before, selected, 2 after), 7 on desktop
    for (let i = -range; i <= range; i++) {
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
      <div className="flex items-center justify-between px-2 sm:px-6 py-2 sm:py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevious}
          className="h-7 sm:h-9 w-7 sm:w-9 p-0 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-gray-600" />
        </Button>

        <div className="flex-1 px-2 sm:px-6">
          <div className="flex justify-center space-x-1 sm:space-x-3">
            {dates.map((date, index) => {
              const isSelected = isSameDay(date, selectedDate);
              const isTodayDate = isToday(date);

              return (
                <motion.button
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center justify-center w-12 sm:w-14 h-16 sm:h-20 rounded-lg sm:rounded-xl transition-all duration-200 ${
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
                  <span className="text-[10px] sm:text-sm font-medium mb-0.5 sm:mb-1">
                    {format(date, 'EEE')}
                  </span>
                  <span className="text-base sm:text-xl font-bold">
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
          className="h-7 sm:h-9 w-7 sm:w-9 p-0 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-gray-600" />
        </Button>
      </div>

      <div className="px-2 sm:px-6 pb-2 sm:pb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-xl font-bold text-gray-900">
            {format(selectedDate, 'EEEE, MMMM d')}
          </h2>
          {isToday(selectedDate) && (
            <span className="text-[10px] sm:text-sm text-teal-600 font-semibold bg-teal-50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
              Today
            </span>
          )}
        </div>
      </div>
    </div>
  );
}