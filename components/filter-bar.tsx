'use client';

import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useReminderStore } from '@/lib/store';
import { motion } from 'framer-motion';

export function FilterBar() {
  const {
    selectedPet,
    selectedCategory,
    setSelectedPet,
    setSelectedCategory,
    reminders,
  } = useReminderStore();

  // Get unique pets and categories from reminders
  const uniquePets = Array.from(new Set(reminders.map(r => r.pet)));
  const categories = ['General', 'Lifestyle', 'Health'];

  const clearFilters = () => {
    setSelectedPet(null);
    setSelectedCategory(null);
  };

  const hasActiveFilters = selectedPet || selectedCategory;

  const handlePetChange = (value: string) => {
    if (value === 'all') {
      setSelectedPet(null);
    } else {
      setSelectedPet(value);
    }
  };

  const handleCategoryChange = (value: string) => {
    if (value === 'all') {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(value);
    }
  };

  return (
    <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm sm:text-base font-medium text-gray-700">Filters</span>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full px-3 py-1.5 transition-colors"
          >
            <X className="h-3.5 w-3.5 mr-1.5" />
            Clear all
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3 sm:mt-4">
        <Select value={selectedPet || 'all'} onValueChange={handlePetChange}>
          <SelectTrigger className="w-full sm:w-[160px] h-10 rounded-lg border-gray-200 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all">
            <SelectValue placeholder="All pets" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-gray-200 shadow-lg">
            <SelectItem value="all" className="text-gray-700">All pets</SelectItem>
            {uniquePets.map(pet => (
              <SelectItem key={pet} value={pet} className="text-gray-700">
                {pet}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCategory || 'all'} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full sm:w-[180px] h-10 rounded-lg border-gray-200 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-gray-200 shadow-lg">
            <SelectItem value="all" className="text-gray-700">All categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category} className="text-gray-700">
                <span className="flex items-center gap-2">
                  {category === 'General' && '🐾'}
                  {category === 'Lifestyle' && '🎾'}
                  {category === 'Health' && '💊'}
                  {category}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="flex flex-wrap gap-2 mt-3 sm:mt-4"
        >
          {selectedPet && (
            <Badge 
              variant="secondary" 
              className="text-xs font-medium px-3 py-1.5 bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 transition-colors"
            >
              Pet: {selectedPet}
              <X
                className="h-3.5 w-3.5 ml-1.5 cursor-pointer hover:text-gray-900 transition-colors"
                onClick={() => setSelectedPet(null)}
              />
            </Badge>
          )}
          {selectedCategory && (
            <Badge 
              variant="secondary" 
              className="text-xs font-medium px-3 py-1.5 bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 transition-colors"
            >
              Category: {selectedCategory}
              <X
                className="h-3.5 w-3.5 ml-1.5 cursor-pointer hover:text-gray-900 transition-colors"
                onClick={() => setSelectedCategory(null)}
              />
            </Badge>
          )}
        </motion.div>
      )}
    </div>
  );
}