import {
  HStack,
  Input,
  Button,
  VStack,
  NativeSelect,
  IconButton,
  ButtonGroup,
  Box,
} from '@chakra-ui/react';
import { Search, X, Plus } from 'lucide-react';
import { useRef } from 'react';

interface ProjectFiltersProps {
  query: string;
  sortKey: 'newest' | 'name' | 'updated';
  filter: 'all' | 'active' | 'archived';
  onQueryChange: (query: string) => void;
  onSortChange: (sortKey: 'newest' | 'name' | 'updated') => void;
  onFilterChange: (filter: 'all' | 'active' | 'archived') => void;
  onCreateClick: () => void;
  counts?: { all: number; active: number; archived: number };
}

export function ProjectFilters({
  query,
  sortKey,
  filter,
  onQueryChange,
  onSortChange,
  onFilterChange,
  onCreateClick,
  counts,
}: ProjectFiltersProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleClearSearch = () => {
    onQueryChange('');
    searchInputRef.current?.focus();
  };

  return (
    <VStack gap={4} w="full">
      {/* Search and Sort Controls */}
      <HStack gap={3} w="full" flexWrap="wrap">
        {/* Search Input with adornments */}
        <Box position="relative" w="full" maxW="md">
          <Box
            position="absolute"
            insetStart="2"
            top="50%"
            transform="translateY(-50%)"
            pointerEvents="none"
          >
            <Search size={16} />
          </Box>
          <Input
            ref={searchInputRef}
            placeholder="Search projects..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            ps="8"
            pe={query ? '8' : undefined}
          />
          {query && (
            <Box position="absolute" insetEnd="2" top="50%" transform="translateY(-50%)">
              <IconButton
                variant="ghost"
                size="xs"
                aria-label="Clear search"
                onClick={handleClearSearch}
              >
                <X size={14} />
              </IconButton>
            </Box>
          )}
        </Box>

        {/* Sort Dropdown */}
        <NativeSelect.Root size="sm" maxW="40">
          <NativeSelect.Field
            value={sortKey}
            onChange={(e) => onSortChange(e.target.value as 'newest' | 'name' | 'updated')}
          >
            <option value="updated">Last Updated</option>
            <option value="newest">Newest</option>
            <option value="name">A-Z</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </HStack>

      {/* Filter Tabs and Create Button */}
      <HStack justify="space-between" w="full" flexWrap="wrap">
        {/* Filter Segmented Control */}
        <ButtonGroup size="sm" variant="subtle" attached>
          {[
            { value: 'all' as const, label: 'All' },
            { value: 'active' as const, label: 'Active' },
            { value: 'archived' as const, label: 'Archived' },
          ].map(({ value, label }) => (
            <Button
              key={value}
              variant={filter === value ? 'solid' : 'ghost'}
              onClick={() => onFilterChange(value)}
              colorPalette={filter === value ? 'blue' : undefined}
            >
              {label}
              {counts && (
                <Box as="span" ms="2" color={filter === value ? 'inherit' : 'fg.muted'}>
                  ({counts[value]})
                </Box>
              )}
            </Button>
          ))}
        </ButtonGroup>

        {/* Create Project Button */}
        <Button colorPalette="blue" size="sm" onClick={onCreateClick}>
          <Plus size={16} />
          New Project
        </Button>
      </HStack>
    </VStack>
  );
}
