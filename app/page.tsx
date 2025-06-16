'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Bell, Heart, Home, Settings, PawPrint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CalendarStrip } from '@/components/calendar-strip';
import { ReminderForm } from '@/components/reminder-form';
import { DeleteConfirmation } from '@/components/delete-confirmation';
import { useReminderStore } from '@/lib/store';
import { Reminder } from '@/types/reminder';
import { toast } from 'sonner';
import { ReminderCard } from '@/components/reminder-card';

export default function HomePage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);
  const [reminderToDelete, setReminderToDelete] = useState<{ id: string; title: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  const { reminders, deleteReminder } = useReminderStore();

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <span className="text-lg font-semibold text-gray-900">daily reminders</span>
        <a href="#" className="text-teal-500 text-sm font-medium">view all</a>
      </header>

      {/* Calendar Strip */}
      <div className="px-2 pt-3 pb-1 bg-gray-50 sticky top-[56px] z-10">
        <CalendarStrip />
      </div>

      {/* Reminders List */}
      <main className="flex-1 overflow-y-auto px-2 pb-28 pt-2">
        <div className="space-y-3">
          {reminders.length === 0 ? (
            <div className="text-center text-gray-400 py-12">No reminders yet</div>
          ) : (
            reminders.map(reminder => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onEdit={handleEditReminder}
                onDelete={(id) => handleDeleteReminder(id, reminder.title)}
              />
            ))
          )}
        </div>
      </main>

      {/* Floating Add Button */}
      <Button
        onClick={handleAddReminder}
        className="fixed bottom-20 right-4 z-30 bg-teal-500 hover:bg-teal-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
        style={{ boxShadow: '0 4px 16px rgba(20,184,166,0.25)' }}
      >
        <Plus className="h-8 w-8" />
      </Button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 flex items-center justify-around z-20">
        <button className="flex flex-col items-center text-gray-400 focus:outline-none">
          <Home className="h-5 w-5 sm:h-6 sm:w-6 mb-0.5 sm:mb-1" />
          <span className="text-[10px] sm:text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-400 focus:outline-none">
          <PawPrint className="h-5 w-5 sm:h-6 sm:w-6 mb-0.5 sm:mb-1" />
          <span className="text-[10px] sm:text-xs">Pets</span>
        </button>
        <button className="flex flex-col items-center text-black font-semibold focus:outline-none">
          <div className="bg-black rounded-full px-2.5 sm:px-3 py-1 flex flex-col items-center">
            <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            <span className="text-[10px] sm:text-xs text-white mt-0.5">reminders</span>
          </div>
        </button>
        <button className="flex flex-col items-center text-gray-400 focus:outline-none">
          <Settings className="h-5 w-5 sm:h-6 sm:w-6 mb-0.5 sm:mb-1" />
          <span className="text-[10px] sm:text-xs">Settings</span>
        </button>
      </nav>

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