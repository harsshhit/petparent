'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Target, Flame } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useReminderStore } from '@/lib/store';

export function StatsCard() {
  const { getTodayCompletedCount, getTodayTotalCount, reminders } = useReminderStore();
  
  const completedToday = getTodayCompletedCount();
  const totalToday = getTodayTotalCount();
  const completionRate = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;
  
  // Calculate highest streak
  const highestStreak = reminders.reduce((max, reminder) => 
    Math.max(max, reminder.streak), 0
  );

  const stats = [
    {
      label: 'Completed Today',
      value: `${completedToday}/${totalToday}`,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Best Streak',
      value: highestStreak.toString(),
      icon: Flame,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border-0 shadow-sm">
            <CardContent className="p-2 sm:p-3 text-center">
              <div className={`inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full ${stat.bgColor} mb-1 sm:mb-2`}>
                <stat.icon className={`h-3 w-3 sm:h-4 sm:w-4 ${stat.color}`} />
              </div>
              <p className="text-base sm:text-lg font-semibold text-gray-900">{stat.value}</p>
              <p className="text-[10px] sm:text-xs text-gray-600 leading-tight">{stat.label}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}