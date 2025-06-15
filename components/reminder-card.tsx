'use client';

import { motion } from 'framer-motion';
import { Clock, MoreVertical, Flame, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Reminder } from '@/types/reminder';
import { useReminderStore } from '@/lib/store';
import { format } from 'date-fns';
import { forwardRef } from 'react';

interface ReminderCardProps {
  reminder: Reminder;
  onEdit: (reminder: Reminder) => void;
  onDelete: (id: string) => void;
}

const categoryColors = {
  General: 'bg-blue-50 text-blue-700 border-blue-100',
  Lifestyle: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Health: 'bg-rose-50 text-rose-700 border-rose-100',
};

const categoryIcons = {
  General: '🐾',
  Lifestyle: '🎾',
  Health: '💊',
};

export const ReminderCard = forwardRef<HTMLDivElement, ReminderCardProps>(
  ({ reminder, onEdit, onDelete }, ref) => {
    const { toggleReminderComplete } = useReminderStore();

    const handleToggleComplete = () => {
      toggleReminderComplete(reminder.id);
    };

    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -100 }}
        whileHover={{ scale: 1.01, y: -2 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
        className={`relative overflow-hidden rounded-xl border-2 p-4 sm:p-5 shadow-sm transition-all duration-300 ${
          reminder.isCompleted
            ? 'border-emerald-200 bg-emerald-50/30'
            : 'border-gray-100 hover:border-teal-200 hover:shadow-md'
        }`}
      >
        <motion.div
          initial={false}
          animate={{
            scale: reminder.isCompleted ? [1, 1.02, 1] : 1,
            backgroundColor: reminder.isCompleted ? 'rgba(34, 197, 94, 0.08)' : 'white',
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut"
          }}
          className="flex flex-col sm:flex-row sm:items-start justify-between gap-4"
        >
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xl transform hover:scale-110 transition-transform">{categoryIcons[reminder.category]}</span>
              <Badge
                variant="outline"
                className={`text-xs font-medium px-2.5 py-0.5 ${categoryColors[reminder.category]}`}
              >
                {reminder.category}
              </Badge>
              <Badge variant="outline" className="text-xs font-medium px-2.5 py-0.5 bg-gray-50 text-gray-700 border-gray-200">
                {reminder.pet}
              </Badge>
            </div>

            <h3 className={`font-semibold text-gray-900 mb-2 truncate text-base sm:text-lg ${
              reminder.isCompleted ? 'line-through text-gray-500' : ''
            }`}>
              {reminder.title}
            </h3>

            {reminder.notes && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2 sm:line-clamp-none">{reminder.notes}</p>
            )}

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="font-medium">{format(reminder.startDateTime, 'h:mm a')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full font-medium">
                  {reminder.frequency}
                </span>
              </div>
              {reminder.streak > 0 && (
                <div className="flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="font-medium text-orange-600">
                    {reminder.streak}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleComplete}
              className={`h-9 w-9 p-0 rounded-full transition-colors ${
                reminder.isCompleted
                  ? 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50'
                  : 'text-gray-400 hover:text-teal-600 hover:bg-teal-50'
              }`}
            >
              {reminder.isCompleted ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-9 w-9 p-0 rounded-full hover:bg-gray-100"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem 
                  onClick={() => onEdit(reminder)}
                  className="cursor-pointer focus:bg-gray-50"
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(reminder.id)}
                  className="text-red-600 cursor-pointer focus:bg-red-50"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>
      </motion.div>
    );
  }
);