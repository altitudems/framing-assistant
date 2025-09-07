import { EmptyState, VStack, Button, HStack, Text } from '@chakra-ui/react';
import { FolderOpen, Plus, Sparkles } from 'lucide-react';

interface ProjectEmptyStateProps {
  onCreateClick: () => void;
  hasSearchQuery?: boolean;
  searchQuery?: string;
}

export function ProjectEmptyState({
  onCreateClick,
  hasSearchQuery = false,
  searchQuery = '',
}: ProjectEmptyStateProps) {
  if (hasSearchQuery) {
    return (
      <EmptyState.Root size="lg">
        <EmptyState.Content>
          <EmptyState.Indicator>
            <FolderOpen size={48} />
          </EmptyState.Indicator>
          <VStack textAlign="center" gap={2}>
            <EmptyState.Title>No projects found</EmptyState.Title>
            <EmptyState.Description>
              No projects match "{searchQuery}". Try adjusting your search or create a new project.
            </EmptyState.Description>
          </VStack>
          <Button colorPalette="blue" onClick={onCreateClick}>
            <Plus size={16} />
            Create your first project
          </Button>
        </EmptyState.Content>
      </EmptyState.Root>
    );
  }

  return (
    <EmptyState.Root size="lg">
      <EmptyState.Content>
        <EmptyState.Indicator>
          <Sparkles size={48} />
        </EmptyState.Indicator>
        <VStack textAlign="center" gap={3}>
          <EmptyState.Title>Welcome to Framing Assistant!</EmptyState.Title>
          <EmptyState.Description maxW="md">
            Start your first framing project to organize walls, calculate materials, and streamline
            your construction workflow.
          </EmptyState.Description>
        </VStack>
        <VStack gap={4} w="full" maxW="sm">
          <Button colorPalette="blue" size="lg" w="full" onClick={onCreateClick}>
            <Plus size={20} />
            Create your first project
          </Button>
          <HStack gap={2} color="fg.muted" fontSize="sm">
            <Text>Need help getting started?</Text>
            <Button variant="ghost" size="sm" colorPalette="blue">
              View documentation
            </Button>
          </HStack>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
