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
    <div className="bg-white border-b border-gray-100 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div className="flex gap-3 mt-3">
        <Select value={selectedPet || 'all'} onValueChange={handlePetChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All pets" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All pets</SelectItem>
            {uniquePets.map(pet => (
              <SelectItem key={pet} value={pet}>
                {pet}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCategory || 'all'} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === 'General' && '🐾 '}
                {category === 'Lifestyle' && '🎾 '}
                {category === 'Health' && '💊 '}
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <div className="flex gap-2 mt-3">
          {selectedPet && (
            <Badge variant="secondary" className="text-xs">
              Pet: {selectedPet}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => setSelectedPet(null)}
              />
            </Badge>
          )}
          {selectedCategory && (
            <Badge variant="secondary" className="text-xs">
              Category: {selectedCategory}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}