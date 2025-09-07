import {
  Card,
  Heading,
  HStack,
  IconButton,
  Text,
  Badge,
  Portal,
  Menu,
  VStack,
  Stat,
  Box,
  For,
} from '@chakra-ui/react';
import {
  BrickWall,
  RulerDimensionLine,
  CircleDollarSign,
  Clock,
  MoreHorizontal,
  Archive,
  ArchiveRestore,
  Copy,
  Edit,
  Trash2,
} from 'lucide-react';
// import { useRouter } from '@tanstack/react-router';
import type { Project } from '../../../../shared/api';
import { useNavigate } from '@tanstack/react-router';

interface ProjectCardProps {
  project: Project;
  onSelect?: (project: Project) => void;
  onDelete?: (id: string) => void;
  onRename?: (id: string, name: string) => void;
  onDuplicate?: (id: string) => void;
  onArchive?: (id: string) => void;
}

function ProjectCard({
  project,
  onSelect,
  onDelete,
  onRename,
  onDuplicate,
  onArchive,
}: ProjectCardProps) {
  const wallCount = project.walls.length;
  const totalLength = project.walls.reduce((sum, w) => sum + w.length, 0);
  const estimatedCost = totalLength * 5;
  const navigate = useNavigate();

  const stats = [
    {
      label: 'Walls',
      value: wallCount,
      icon: BrickWall,
      color: wallCount > 0 ? 'blue' : 'gray',
    },
    {
      label: 'Linear Ft',
      value: totalLength.toFixed(1),
      icon: RulerDimensionLine,
      color: totalLength > 0 ? 'green' : 'gray',
    },
    {
      label: 'Est. Cost',
      value: `$${estimatedCost.toFixed(0)}`,
      icon: CircleDollarSign,
      color: estimatedCost > 0 ? 'purple' : 'gray',
      subtitle: 'at $5/ft',
    },
  ];

  const handleCardClick = () => {
    onSelect?.(project);
    navigate({ to: '/projects/$projectId', params: { projectId: project.id } });
  };

  const handleActionClick = (action: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    action();
  };

  return (
    <Card.Root
      variant="elevated"
      size="sm"
      cursor="pointer"
      transition="all 0.2s ease"
      _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
      _focusVisible={{ outline: '2px solid', outlineColor: 'blue.500' }}
      opacity={project.archived ? 0.7 : 1}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      onMouseEnter={() => {
        // Preloading disabled due to router type constraints
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open project ${project.name}`}
    >
      <Card.Body gap={4}>
        {/* Header */}
        <VStack align="stretch" gap={3}>
          <HStack justify="space-between" align="start">
            <VStack align="start" gap={1} flex={1}>
              <HStack gap={2}>
                <Heading size="md" lineClamp={1}>
                  {project.name}
                </Heading>
                {project.archived && (
                  <Badge variant="surface" colorPalette="gray" size="sm">
                    <Archive size={12} />
                    Archived
                  </Badge>
                )}
              </HStack>
              <HStack gap={1} color="fg.muted" fontSize="sm">
                <Clock size={12} />
                <Text
                  title={
                    project.updatedAt
                      ? new Date(project.updatedAt).toLocaleString()
                      : new Date(project.createdAt).toLocaleString()
                  }
                >
                  {project.updatedAt
                    ? formatRelativeTime(project.updatedAt, 'Updated')
                    : formatRelativeTime(project.createdAt, 'Created')}
                </Text>
              </HStack>
            </VStack>

            {/* Actions Menu */}
            <Menu.Root>
              <Menu.Trigger asChild>
                <IconButton
                  variant="ghost"
                  size="sm"
                  aria-label="Project actions"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                  }}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <MoreHorizontal size={16} />
                </IconButton>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item
                      value="rename"
                      onClick={handleActionClick(() => onRename?.(project.id, project.name))}
                    >
                      <Edit size={16} />
                      Rename
                    </Menu.Item>
                    <Menu.Item
                      value="duplicate"
                      onClick={handleActionClick(() => onDuplicate?.(project.id))}
                    >
                      <Copy size={16} />
                      Duplicate
                    </Menu.Item>
                    <Menu.Item
                      value="archive"
                      onClick={handleActionClick(() => onArchive?.(project.id))}
                    >
                      {project.archived ? <ArchiveRestore size={16} /> : <Archive size={16} />}
                      {project.archived ? 'Unarchive' : 'Archive'}
                    </Menu.Item>
                    {onDelete && <Menu.Separator />}
                    {onDelete && (
                      <Menu.Item
                        value="delete"
                        color="fg.error"
                        _hover={{ bg: 'bg.error', color: 'fg.error' }}
                        onClick={handleActionClick(() => onDelete(project.id))}
                      >
                        <Trash2 size={16} />
                        Delete
                      </Menu.Item>
                    )}
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          </HStack>

          {/* Stats Grid */}
          <Box>
            <For each={stats}>
              {(stat) => (
                <Stat.Root key={stat.label} size="sm">
                  <Stat.Label>
                    <HStack gap={1}>
                      <stat.icon size={14} />
                      <Text>{stat.label}</Text>
                    </HStack>
                  </Stat.Label>
                  <Stat.ValueText color={`${stat.color}.500`} fontSize="lg">
                    {stat.value}
                  </Stat.ValueText>
                  {stat.subtitle && (
                    <Stat.HelpText color="fg.muted" fontSize="xs">
                      {stat.subtitle}
                    </Stat.HelpText>
                  )}
                </Stat.Root>
              )}
            </For>
          </Box>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}

function formatRelativeTime(iso: string, prefix: 'Updated' | 'Created') {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  if (sec < 60) return `${prefix} just now`;
  if (min < 60) return `${prefix} ${min}m ago`;
  if (hr < 24) return `${prefix} ${hr}h ago`;
  if (day < 7) return `${prefix} ${day}d ago`;
  return `${prefix} ${d.toLocaleDateString()}`;
}

export default ProjectCard;
