'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Reminder, ReminderFormData } from '@/types/reminder';
import { useReminderStore } from '@/lib/store';
import { format } from 'date-fns';
import { useEffect } from 'react';

const formSchema = z.object({
  pet: z.string().min(1, 'Pet name is required'),
  category: z.enum(['General', 'Lifestyle', 'Health']),
  title: z.string().min(1, 'Title is required'),
  notes: z.string().optional(),
  startDateTime: z.string().min(1, 'Date and time are required'),
  frequency: z.enum(['Daily', 'Weekly']),
});

interface ReminderFormProps {
  isOpen: boolean;
  onClose: () => void;
  reminder?: Reminder;
}

export function ReminderForm({ isOpen, onClose, reminder }: ReminderFormProps) {
  const { addReminder, updateReminder } = useReminderStore();
  const isEditing = !!reminder;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pet: '',
      category: 'General',
      title: '',
      notes: '',
      startDateTime: '',
      frequency: 'Daily',
    },
  });

  // Reset form when reminder changes
  useEffect(() => {
    if (reminder) {
      form.reset({
        pet: reminder.pet,
        category: reminder.category,
        title: reminder.title,
        notes: reminder.notes || '',
        startDateTime: format(reminder.startDateTime, "yyyy-MM-dd'T'HH:mm"),
        frequency: reminder.frequency,
      });
    } else {
      form.reset({
        pet: '',
        category: 'General',
        title: '',
        notes: '',
        startDateTime: '',
        frequency: 'Daily',
      });
    }
  }, [reminder, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData: ReminderFormData = {
      ...values,
      startDateTime: new Date(values.startDateTime),
    };

    if (isEditing && reminder) {
      updateReminder(reminder.id, formData);
    } else {
      addReminder(formData);
    }

    form.reset();
    onClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-full sm:max-w-lg md:max-w-2xl px-2 sm:px-4 md:px-6 py-4 rounded-none sm:rounded-lg border-gray-200 shadow-xl box-border overflow-y-auto max-h-[100dvh]">
        <DialogHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-200">
          <Button type="button" variant="ghost" onClick={handleClose} className="p-0 text-lg">←</Button>
          <DialogTitle className="text-base font-semibold text-gray-900 flex-1 text-center">Add Reminder</DialogTitle>
          <Button type="submit" form="reminder-form" className="p-0 text-teal-600 bg-transparent shadow-none hover:bg-transparent hover:underline">Save</Button>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" id="reminder-form">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-2 mt-4 mb-2 w-full">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="pet"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10 rounded-lg border-gray-200 w-full" >
                            <SelectValue placeholder="Select Pet" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Browny">Browny</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10 rounded-lg border-gray-200 w-full">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="General">General</SelectItem>
                          <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                          <SelectItem value="Health">Health</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="bg-gray-100 rounded-none sm:rounded-lg mb-4 w-full">
              <div className="bg-black text-white rounded-t-none sm:rounded-t-lg px-4 py-2 text-sm font-semibold">Reminder Info</div>
              <div className="p-4 space-y-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Set a reminder for...</FormLabel>
                      <FormControl>
                        <Input placeholder="Type here..." maxLength={100} {...field} className="h-10 rounded-lg border-gray-200 w-full" />
                      </FormControl>
                      <div className="text-xs text-gray-400 text-right">{field.value?.length || 0}/100</div>
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-2 sm:flex-row items-stretch">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-sm font-medium text-gray-700">Add Notes (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Add notes..." {...field} className="h-10 rounded-lg border-gray-200 w-full" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-none">
                    <Button type="button" variant="outline" className="h-10 w-full sm:w-auto">Add</Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-none sm:rounded-lg mb-4 w-full">
              <div className="bg-black text-white rounded-t-none sm:rounded-t-lg px-4 py-2 text-sm font-semibold flex items-center justify-between">
                <span>Reminder Settings</span>
                <span className="text-white">⌄</span>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row w-full">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="startDateTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Start Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} className="h-10 rounded-lg border-gray-200 w-full" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-none flex items-end">
                    <Button type="button" variant="ghost" className="p-0 text-teal-600 whitespace-nowrap">+ Add End Date</Button>
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row w-full">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="startDateTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Reminder Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} className="h-10 rounded-lg border-gray-200 w-full" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="frequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Reminder Frequency</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="h-10 rounded-lg border-gray-200 w-full">
                                <SelectValue placeholder="Everyday" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Daily">Everyday</SelectItem>
                                <SelectItem value="Weekly">Weekly</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose} 
                className="w-full sm:w-auto h-10 rounded-lg border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="w-full sm:w-auto h-10 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors"
              >
                {isEditing ? 'Update' : 'Create'} Reminder
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}