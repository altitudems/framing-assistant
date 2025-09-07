import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  Breadcrumb,
  Button,
  ButtonGroup,
  Container,
  Dialog,
  Heading,
  HStack,
  IconButton,
  Kbd,
  Menu,
  Spinner,
  Tabs,
  Tag,
  Text,
  VStack,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useProject } from '../features/projects/hooks/useProjects';
import { useProjectManager } from '../features/projects/hooks/useProjectManager';
import { useWallManager } from '../features/walls/hooks/useWallManager';
import WallList from '../features/walls/components/WallList/WallList';
import { ProjectUndoNotification } from '../features/projects/components/ProjectUndoNotification/ProjectUndoNotification';
import WallDialog from '../features/walls/components/WallDialog/WallDialog';
import ProjectSummary from '../features/projects/components/ProjectSummary/ProjectSummary';
import type { Wall, CreateWallRequest } from '../shared/api';

export const Route = createFileRoute('/projects_/$projectId')({
  codeSplitGroupings: [['component']],
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { projectId } = Route.useParams();
  const navigate = useNavigate();
  const { data: project, isLoading: projectLoading } = useProject(projectId);
  const { updateProject, deleteProject, duplicateProject } = useProjectManager();
  const { addWall, updateWall, removeWall } = useWallManager(projectId);

  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState('');
  const renameDialog = useDisclosure();
  const deleteDialog = useDisclosure();
  const wallDialog = useDisclosure();
  const [editingWall, setEditingWall] = useState<Wall | null>(null);
  const [isWallSaving, setIsWallSaving] = useState(false);
  const [undo, setUndo] = useState<{ wall: Wall } | null>(null);
  const [showUndo, setShowUndo] = useState(false);

  // Render loading state
  if (projectLoading) {
    return (
      <Container maxW="7xl" py={10}>
        <HStack>
          <Spinner />
          <Text>Loading project…</Text>
        </HStack>
      </Container>
    );
  }

  // Render not found state
  if (!project) {
    return (
      <Container maxW="7xl" py={12}>
        <VStack gap={6} align="start">
          <Breadcrumb.Root color="fg.muted">
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link asChild>
                  <button
                    onClick={() =>
                      navigate({
                        to: '/projects',
                        search: { q: '', sort: 'updated', filter: 'all' },
                      })
                    }
                  >
                    Projects
                  </button>
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.CurrentLink>Not found</Breadcrumb.CurrentLink>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
          <VStack align="start" gap={2}>
            <Heading size="lg">Project not found</Heading>
            <Text color="fg.muted">ID: {projectId}</Text>
          </VStack>
          <Button
            onClick={() =>
              navigate({ to: '/projects', search: { q: '', sort: 'updated', filter: 'all' } })
            }
          >
            Back to Projects
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack align="stretch" gap={8}>
        {/* Breadcrumb */}
        <Breadcrumb.Root color="fg.muted">
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link asChild>
                <button
                  onClick={() =>
                    navigate({ to: '/projects', search: { q: '', sort: 'updated', filter: 'all' } })
                  }
                >
                  Projects
                </button>
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.CurrentLink>{project.name}</Breadcrumb.CurrentLink>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>

        {/* Header */}
        <HStack justify="space-between" align="start">
          <VStack align="start" gap={1}>
            <HStack>
              <Heading size="xl" lineClamp={2}>
                {project.name}
              </Heading>
              {project.archived ? (
                <Tag.Root colorPalette="gray" variant="surface">
                  <Tag.Label>Archived</Tag.Label>
                </Tag.Root>
              ) : null}
            </HStack>
            <Text color="fg.muted" fontSize="sm">
              {project.updatedAt
                ? `Updated ${new Date(project.updatedAt).toLocaleString()}`
                : `Created ${new Date(project.createdAt).toLocaleString()}`}
            </Text>
          </VStack>
          <ButtonGroup size="sm">
            <Button
              variant="outline"
              onClick={() => {
                setRenameValue(project.name);
                renameDialog.onOpen();
              }}
            >
              Rename
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                if (project.archived) {
                  await updateProject(project.id, { archived: false });
                } else {
                  await updateProject(project.id, { archived: true });
                }
              }}
            >
              {project.archived ? 'Unarchive' : 'Archive'}
            </Button>
            <Menu.Root>
              <Menu.Trigger asChild>
                <IconButton aria-label="More actions" variant="subtle">
                  ⋯
                </IconButton>
              </Menu.Trigger>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    value="duplicate"
                    onClick={async () => {
                      const dup = await duplicateProject(project.id);
                      if (dup) {
                        navigate({ to: '/projects/$projectId', params: { projectId: dup.id } });
                      }
                    }}
                  >
                    Duplicate
                  </Menu.Item>
                  <Menu.Item value="delete" color="fg.error" onClick={() => deleteDialog.onOpen()}>
                    Delete…
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Menu.Root>
            <Button
              colorPalette="blue"
              onClick={() => {
                setEditingWall(null);
                wallDialog.onOpen();
              }}
            >
              Add Wall
            </Button>
          </ButtonGroup>
        </HStack>

        {/* Project Summary */}
        <ProjectSummary walls={project.walls} />

        {/* Content Tabs */}
        <Tabs.Root defaultValue="walls">
          <Tabs.List>
            <Tabs.Trigger value="walls">
              Walls
              <Tag.Root ms="2" variant="surface" size="sm">
                <Tag.Label>{project.walls.length}</Tag.Label>
              </Tag.Root>
            </Tabs.Trigger>
            <Tabs.Trigger value="takeoff">Takeoff</Tabs.Trigger>
            <Tabs.Trigger value="visualization">Visualization</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="walls">
            {project.walls.length === 0 ? (
              <Box borderWidth="1px" borderRadius="md" p={8} textAlign="center">
                <VStack gap={3}>
                  <Heading size="md">No walls yet</Heading>
                  <Text color="fg.muted">Add your first wall to get started.</Text>
                  <Button
                    colorPalette="blue"
                    onClick={() => {
                      setEditingWall(null);
                      wallDialog.onOpen();
                    }}
                  >
                    New Wall
                  </Button>
                </VStack>
              </Box>
            ) : (
              <WallList
                walls={project.walls}
                onEdit={(wall) => {
                  setEditingWall(wall);
                  wallDialog.onOpen();
                }}
                onDuplicate={async (wall) => {
                  const { id: _ignored, projectId: _ignored2, ...clone } = wall;
                  void _ignored;
                  void _ignored2;
                  await addWall({ ...clone, name: `${clone.name} (Copy)` });
                }}
                onRemove={async (id) => {
                  const w = project.walls.find((x) => x.id === id);
                  if (!w) return;
                  setUndo({ wall: w });
                  setShowUndo(true);
                  await removeWall(id);
                }}
              />
            )}
          </Tabs.Content>
          <Tabs.Content value="takeoff">
            <Text color="fg.muted">Takeoff coming soon.</Text>
          </Tabs.Content>
          <Tabs.Content value="visualization">
            <Text color="fg.muted">Visualization coming soon.</Text>
          </Tabs.Content>
        </Tabs.Root>

        {showUndo && undo && (
          <ProjectUndoNotification
            projectName={undo.wall.name}
            onUndo={async () => {
              await addWall({
                name: undo.wall.name,
                length: undo.wall.length,
                height: undo.wall.height,
                studSpacing: undo.wall.studSpacing,
                topPlate: undo.wall.topPlate,
                bottomPlate: undo.wall.bottomPlate,
                floorGap: undo.wall.floorGap,
                loadBearing: undo.wall.loadBearing,
                bottomPlateTreatment: undo.wall.bottomPlateTreatment,
                leftCorner: undo.wall.leftCorner,
                rightCorner: undo.wall.rightCorner,
              });
              setUndo(null);
              setShowUndo(false);
            }}
            onDismiss={() => {
              setShowUndo(false);
              setUndo(null);
            }}
            autoHideDelay={5000}
          />
        )}

        {/* Rename Dialog */}
        <Dialog.Root
          open={renameDialog.open}
          onOpenChange={(e: { open: boolean }) => {
            if (!e.open) renameDialog.onClose();
          }}
          size={{ base: 'sm', md: 'md' }}
        >
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Rename Project</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <VStack align="stretch" gap={3}>
                  <Text fontSize="sm" color="fg.muted">
                    Enter a new name for this project.
                  </Text>
                  <input
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    placeholder="Project name"
                    aria-label="Project name"
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--chakra-colors-border-muted, #E2E8F0)',
                    }}
                  />
                </VStack>
              </Dialog.Body>
              <Dialog.Footer>
                <ButtonGroup>
                  <Button variant="outline" onClick={renameDialog.onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorPalette="blue"
                    loading={renaming}
                    onClick={async () => {
                      try {
                        setRenaming(true);
                        await updateProject(project.id, {
                          name: renameValue.trim() || project.name,
                        });
                        renameDialog.onClose();
                      } finally {
                        setRenaming(false);
                      }
                    }}
                  >
                    Save
                  </Button>
                </ButtonGroup>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>

        {/* Delete Dialog */}
        <Dialog.Root
          open={deleteDialog.open}
          onOpenChange={(e: { open: boolean }) => {
            if (!e.open) deleteDialog.onClose();
          }}
          size={{ base: 'sm', md: 'md' }}
        >
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Delete Project</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <VStack align="stretch" gap={2}>
                  <Text>This action cannot be undone.</Text>
                  <Text color="fg.muted">
                    Press <Kbd>Enter</Kbd> to confirm.
                  </Text>
                </VStack>
              </Dialog.Body>
              <Dialog.Footer>
                <ButtonGroup>
                  <Button variant="outline" onClick={deleteDialog.onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorPalette="red"
                    onClick={async () => {
                      await deleteProject(project.id);
                      deleteDialog.onClose();
                      navigate({
                        to: '/projects',
                        search: { q: '', sort: 'updated', filter: 'all' },
                      });
                    }}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>

        {/* Wall Dialog for Add/Edit */}
        <WallDialog
          title={editingWall ? 'Edit Wall' : 'Add Wall'}
          open={wallDialog.open}
          onClose={wallDialog.onClose}
          initialValues={
            editingWall
              ? {
                  name: editingWall.name,
                  length: editingWall.length,
                  height: editingWall.height,
                  studSpacing: editingWall.studSpacing,
                  topPlate: editingWall.topPlate,
                  bottomPlate: editingWall.bottomPlate,
                  floorGap: editingWall.floorGap,
                  loadBearing: editingWall.loadBearing,
                  bottomPlateTreatment: editingWall.bottomPlateTreatment,
                  leftCorner: editingWall.leftCorner,
                  rightCorner: editingWall.rightCorner,
                }
              : undefined
          }
          onSubmit={async (values) => {
            try {
              setIsWallSaving(true);
              if (editingWall) {
                await updateWall(editingWall.id, values as CreateWallRequest);
                // TODO: Add success notification
              } else {
                await addWall(values as CreateWallRequest);
                // TODO: Add success notification
              }
              wallDialog.onClose();
              setEditingWall(null);
            } catch (error) {
              // TODO: Add error notification
              console.error('Failed to save wall:', error);
            } finally {
              setIsWallSaving(false);
            }
          }}
          isSaving={isWallSaving}
        />
      </VStack>
    </Container>
  );
}
