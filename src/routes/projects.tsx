import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Box, Container, VStack, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useProjectManager } from '../features/projects/hooks/useProjectManager';
import { ProjectFilters } from '../features/projects/components/ProjectFilters/ProjectFilters';
import ProjectCard from '../features/projects/components/ProjectCard/ProjectCard';
import { ProjectEmptyState } from '../features/projects/components/ProjectEmptyState/ProjectEmptyState';
import { ProjectCreateDialog } from '../features/projects/components/ProjectCreateDialog/ProjectCreateDialog';
import { ProjectCardSkeleton } from '../features/projects/components/ProjectCardSkeleton/ProjectCardSkeleton';
import { ProjectUndoNotification } from '../features/projects/components/ProjectUndoNotification/ProjectUndoNotification';

export const Route = createFileRoute('/projects')({
  // For this specific route, bundle the component together.
  validateSearch: (search) => {
    const s = search as Record<string, unknown>;
    const q = typeof s.q === 'string' ? s.q : '';
    const allowedSort = ['updated', 'newest', 'name'] as const;
    const sort = allowedSort.includes(s.sort as 'updated' | 'newest' | 'name')
      ? (s.sort as 'updated' | 'newest' | 'name')
      : 'updated';
    const allowedFilter = ['all', 'active', 'archived'] as const;
    const filter = allowedFilter.includes(s.filter as 'all' | 'active' | 'archived')
      ? (s.filter as 'all' | 'active' | 'archived')
      : 'all';
    return { q, sort, filter };
  },
  codeSplitGroupings: [['component']],
  component: ProjectsPage,
});

function ProjectsPage() {
  const {
    projects,
    isLoading,
    createProject,
    deleteProject,
    duplicateProject,
    archiveProject,
    unarchiveProject,
  } = useProjectManager();
  const navigate = useNavigate();
  const search = Route.useSearch();

  // State management
  const [query, setQuery] = useState(search.q ?? '');
  const [sortKey, setSortKey] = useState<'newest' | 'name' | 'updated'>(search.sort ?? 'updated');
  const [filter, setFilter] = useState<'all' | 'active' | 'archived'>(search.filter ?? 'all');
  const [deletedProject, setDeletedProject] = useState<{ id: string; name: string } | null>(null);

  // Dialog states
  const {
    open: createDialogOpen,
    onOpen: onCreateDialogOpen,
    onClose: onCreateDialogClose,
  } = useDisclosure();
  const [creating, setCreating] = useState(false);

  // Projects are now loaded via TanStack Query in the hook

  // Keep local state in sync if URL search changes (e.g., back/forward)
  useEffect(() => {
    // TanStack Router infers search schema from validateSearch, so cast safely
    const s = search as {
      q?: string;
      sort?: 'updated' | 'newest' | 'name';
      filter?: 'all' | 'active' | 'archived';
    };
    if (s.q !== query) setQuery(s.q ?? '');
    if (s.sort !== sortKey) setSortKey(s.sort ?? 'updated');
    if (s.filter !== filter) setFilter(s.filter ?? 'all');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Push local state to URL search (replace to avoid history spam)
  useEffect(() => {
    navigate({
      to: '/projects',
      replace: true,
      search: (prev: {
        q?: string;
        sort?: 'updated' | 'newest' | 'name';
        filter?: 'all' | 'active' | 'archived';
      }) => ({
        ...prev,
        q: query ?? '',
        sort: sortKey,
        filter,
      }),
    });
  }, [query, sortKey, filter, navigate]);

  // Filter and sort projects
  const allProjects = projects;
  const counts = {
    all: allProjects.length,
    active: allProjects.filter((p) => !p.archived).length,
    archived: allProjects.filter((p) => !!p.archived).length,
  };

  const filteredProjects = allProjects
    .filter((project) => {
      const matchesQuery = project.name.toLowerCase().includes(query.trim().toLowerCase());
      const matchesFilter =
        filter === 'all' ? true : filter === 'archived' ? !!project.archived : !project.archived;
      return matchesQuery && matchesFilter;
    })
    .sort((a, b) => {
      if (sortKey === 'name') return a.name.localeCompare(b.name);
      if (sortKey === 'updated')
        return (b.updatedAt ?? b.createdAt).localeCompare(a.updatedAt ?? a.createdAt);
      return b.createdAt.localeCompare(a.createdAt);
    });

  // Event handlers
  const handleCreateProject = async (name: string) => {
    try {
      setCreating(true);
      const project = await createProject({ name });
      onCreateDialogClose();
      navigate({ to: '/projects/$projectId', params: { projectId: project.id } });
    } catch (error) {
      console.error('Failed to create project:', error);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    const existing = projects.find((p) => p.id === id);
    if (!existing) return;
    // Minimal: keep native confirm for now; next task will replace with Chakra Dialog
    if (!confirm(`Delete "${existing.name}"? This action cannot be undone.`)) return;
    setDeletedProject({ id: existing.id, name: existing.name });
    await deleteProject(id);
  };

  const handleUndoDelete = () => {
    if (deletedProject) {
      // Note: This would need to be implemented in the store
      // For now, we'll just clear the notification
      setDeletedProject(null);
    }
  };

  const handleProjectSelect = (project: { id: string }) => {
    navigate({ to: '/projects/$projectId', params: { projectId: project.id } });
  };

  const handleRenameProject = (id: string, name: string) => {
    // This would be implemented in the store
    console.log('Rename project:', id, name);
  };

  const handleDuplicateProject = async (id: string) => {
    try {
      await duplicateProject(id);
    } catch (error) {
      console.error('Failed to duplicate project:', error);
    }
  };

  const handleArchiveProject = async (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return;
    try {
      if (project.archived) {
        await unarchiveProject(id);
      } else {
        await archiveProject(id);
      }
    } catch (error) {
      console.error('Failed to archive/unarchive project:', error);
    }
  };

  return (
    <Container maxW="7xl" py={8}>
      <VStack gap={8} align="stretch">
        {/* Header and Filters */}
        <VStack gap={6} align="stretch">
          <Box
            position="sticky"
            top="0"
            zIndex={10}
            bg="bg.canvas"
            pt={2}
            pb={3}
            borderBottom="1px solid"
            borderColor="border.muted"
          >
            <ProjectFilters
              query={query}
              sortKey={sortKey}
              filter={filter}
              onQueryChange={setQuery}
              onSortChange={setSortKey}
              onFilterChange={setFilter}
              onCreateClick={onCreateDialogOpen}
              counts={counts}
            />
          </Box>
        </VStack>

        {/* Project Grid */}
        {isLoading ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            <ProjectCardSkeleton count={6} />
          </SimpleGrid>
        ) : filteredProjects.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={handleProjectSelect}
                onDelete={handleDeleteProject}
                onRename={handleRenameProject}
                onDuplicate={handleDuplicateProject}
                onArchive={handleArchiveProject}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Box py={12}>
            <ProjectEmptyState
              onCreateClick={onCreateDialogOpen}
              hasSearchQuery={query.trim().length > 0}
              searchQuery={query}
            />
          </Box>
        )}

        {/* Create Project Dialog */}
        <ProjectCreateDialog
          open={createDialogOpen}
          onOpenChange={(open) => (open ? onCreateDialogOpen() : onCreateDialogClose())}
          onSubmit={handleCreateProject}
          isLoading={creating}
        />

        {/* Undo Notification */}
        {deletedProject && (
          <ProjectUndoNotification
            projectName={deletedProject.name}
            onUndo={handleUndoDelete}
            onDismiss={() => setDeletedProject(null)}
          />
        )}
      </VStack>
    </Container>
  );
}
