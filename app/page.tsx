'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CalendarStrip } from '@/components/calendar-strip';
import { FilterBar } from '@/components/filter-bar';
import { TimeSection } from '@/components/time-section';
import { ReminderForm } from '@/components/reminder-form';
import { DeleteConfirmation } from '@/components/delete-confirmation';
import { StatsCard } from '@/components/stats-card';
import { useReminderStore } from '@/lib/store';
import { Reminder } from '@/types/reminder';
import { toast } from 'sonner';

export default function HomePage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);
  const [reminderToDelete, setReminderToDelete] = useState<{ id: string; title: string } | null>(null);

  const { getGroupedReminders, deleteReminder } = useReminderStore();
  const groupedReminders = getGroupedReminders();

  const handleAddReminder = () => {
    setSelectedReminder(null);
    setIsAddModalOpen(true);
  };

  const handleEditReminder = (reminder: Reminder) => {
    setSelectedReminder(reminder);
    setIsEditModalOpen(true);
  };

  const handleDeleteReminder = (id: string, title: string) => {
    setReminderToDelete({ id, title });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (reminderToDelete) {
      deleteReminder(reminderToDelete.id);
      toast.success('Reminder deleted successfully');
      setIsDeleteModalOpen(false);
      setReminderToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ZOOCO</h1>
                <p className="text-sm text-gray-600">Daily Reminders</p>
              </div>
            </div>

            <Button
              onClick={handleAddReminder}
              className="bg-teal-500 hover:bg-teal-600 text-white shadow-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Reminder
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        {/* Stats */}
        <StatsCard />

        {/* Calendar Strip */}
        <CalendarStrip />

        {/* Filter Bar */}
        <FilterBar />

        {/* Content */}
        <main className="p-4 space-y-6">
          {['Morning', 'Afternoon', 'Evening'].map((timeSlot) => (
            <TimeSection
              key={timeSlot}
              title={timeSlot as 'Morning' | 'Afternoon' | 'Evening'}
              reminders={groupedReminders[timeSlot as keyof typeof groupedReminders]}
              onAddReminder={handleAddReminder}
              onEditReminder={handleEditReminder}
              onDeleteReminder={(id) => {
                const reminder = groupedReminders[timeSlot as keyof typeof groupedReminders]
                  .find(r => r.id === id);
                if (reminder) {
                  handleDeleteReminder(id, reminder.title);
                }
              }}
            />
          ))}
        </main>

        {/* Footer */}
        <footer className="p-4 text-center text-sm text-gray-500">
          Made with ❤️ for pet parents
        </footer>
      </div>

      {/* Modals */}
      <ReminderForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <ReminderForm
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        reminder={selectedReminder || undefined}
      />

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={reminderToDelete?.title || ''}
      />
    </div>
  );
}