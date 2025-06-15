'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { ReminderCard } from './reminder-card';
import { Button } from '@/components/ui/button';
import { Reminder, TimeSlot } from '@/types/reminder';

interface TimeSectionProps {
  title: TimeSlot;
  reminders: Reminder[];
  onAddReminder: () => void;
  onEditReminder: (reminder: Reminder) => void;
  onDeleteReminder: (id: string) => void;
}

const timeSlotEmojis = {
  Morning: '🌅',
  Afternoon: '☀️',
  Evening: '🌙',
};

const timeSlotColors = {
  Morning: 'border-l-yellow-400 bg-yellow-50/30',
  Afternoon: 'border-l-orange-400 bg-orange-50/30',
  Evening: 'border-l-purple-400 bg-purple-50/30',
};

export function TimeSection({
  title,
  reminders,
  onAddReminder,
  onEditReminder,
  onDeleteReminder,
}: TimeSectionProps) {
  const completedCount = reminders.filter(r => r.isCompleted).length;
  const totalCount = reminders.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border-l-4 pl-4 py-4 ${timeSlotColors[title]}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{timeSlotEmojis[title]}</span>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-600">
              {completedCount} of {totalCount} completed
            </p>
          </div>
        </div>

        <Button
          onClick={onAddReminder}
          size="sm"
          className="bg-teal-500 hover:bg-teal-600 text-white"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {reminders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-gray-500"
            >
              <div className="text-4xl mb-2">🐾</div>
              <p>No reminders for this time</p>
              <p className="text-sm">Add one to get started!</p>
            </motion.div>
          ) : (
            reminders.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onEdit={onEditReminder}
                onDelete={onDeleteReminder}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}