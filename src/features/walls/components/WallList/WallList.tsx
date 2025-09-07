import { Stack, VStack } from '@chakra-ui/react';
import type { Wall } from '../../../../shared/api';
import WallItem from '../WallItem/WallItem';
import WallFilters from './WallFilters';
import { useMemo, useState } from 'react';

interface WallListProps {
  walls: Wall[];
  onRemove?: (id: string) => void;
  onEdit?: (wall: Wall) => void;
  onDuplicate?: (wall: Wall) => void;
}

function WallList({ walls, onRemove, onEdit, onDuplicate }: WallListProps) {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'length' | 'height'>('name');
  const [filter, setFilter] = useState<'all' | 'load' | 'non'>('all');

  const filtered = useMemo(() => {
    let result = walls;
    const q = query.trim().toLowerCase();
    if (q) result = result.filter((w) => w.name.toLowerCase().includes(q));
    if (filter !== 'all') {
      result = result.filter((w) => (filter === 'load' ? !!w.loadBearing : !w.loadBearing));
    }
    result = [...result].sort((a, b) => {
      if (sortKey === 'name') return a.name.localeCompare(b.name);
      if (sortKey === 'length') return Number(a.length) - Number(b.length);
      return Number(a.height) - Number(b.height);
    });
    return result;
  }, [walls, query, filter, sortKey]);

  if (walls.length === 0) return null;

  return (
    <VStack align="stretch" gap={4}>
      <WallFilters
        query={query}
        sortKey={sortKey}
        filter={filter}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
        onFilterChange={setFilter}
      />
      <Stack gap={3}>
        {filtered.map((wall) => (
          <WallItem
            key={wall.id}
            wall={wall}
            onRemove={onRemove}
            onEdit={onEdit}
            onDuplicate={onDuplicate}
          />
        ))}
      </Stack>
    </VStack>
  );
}

export default WallList;
