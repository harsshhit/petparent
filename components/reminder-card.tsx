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

interface ReminderCardProps {
  reminder: Reminder;
  onEdit: (reminder: Reminder) => void;
  onDelete: (id: string) => void;
}

const categoryColors = {
  General: 'bg-blue-100 text-blue-800 border-blue-200',
  Lifestyle: 'bg-green-100 text-green-800 border-green-200',
  Health: 'bg-red-100 text-red-800 border-red-200',
};

const categoryIcons = {
  General: '🐾',
  Lifestyle: '🎾',
  Health: '💊',
};

export function ReminderCard({ reminder, onEdit, onDelete }: ReminderCardProps) {
  const { toggleReminderComplete } = useReminderStore();

  const handleToggleComplete = () => {
    toggleReminderComplete(reminder.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-xl border-2 p-4 shadow-sm transition-all duration-200 ${
        reminder.isCompleted
          ? 'border-green-200 bg-green-50/50'
          : 'border-gray-100 hover:border-teal-200 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{categoryIcons[reminder.category]}</span>
            <Badge
              variant="outline"
              className={`text-xs ${categoryColors[reminder.category]}`}
            >
              {reminder.category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {reminder.pet}
            </Badge>
          </div>

          <h3 className={`font-semibold text-gray-900 mb-1 ${
            reminder.isCompleted ? 'line-through text-gray-500' : ''
          }`}>
            {reminder.title}
          </h3>

          {reminder.notes && (
            <p className="text-sm text-gray-600 mb-2">{reminder.notes}</p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{format(reminder.startDateTime, 'h:mm a')}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {reminder.frequency}
              </span>
            </div>
            {reminder.streak > 0 && (
              <div className="flex items-center gap-1">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="font-medium text-orange-600">
                  {reminder.streak}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleComplete}
            className={`h-8 w-8 p-0 ${
              reminder.isCompleted
                ? 'text-green-600 hover:text-green-700'
                : 'text-gray-400 hover:text-teal-600'
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
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(reminder)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(reminder.id)}
                className="text-red-600"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
}