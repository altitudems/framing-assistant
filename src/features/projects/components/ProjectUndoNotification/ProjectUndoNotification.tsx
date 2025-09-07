import { VStack, HStack, Text, Button, Box, IconButton, Progress } from '@chakra-ui/react';
import { X, Undo2, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProjectUndoNotificationProps {
  projectName: string;
  onUndo: () => void;
  onDismiss: () => void;
  autoHideDelay?: number; // in milliseconds
}

export function ProjectUndoNotification({
  projectName,
  onUndo,
  onDismiss,
  autoHideDelay = 5000,
}: ProjectUndoNotificationProps) {
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - 100 / (autoHideDelay / 100);
        if (newProgress <= 0) {
          setIsVisible(false);
          onDismiss();
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [autoHideDelay, onDismiss]);

  if (!isVisible) return null;

  return (
    <Box
      position="fixed"
      bottom="6"
      left="50%"
      transform="translateX(-50%)"
      zIndex="toast"
      w="full"
      maxW="md"
      mx="4"
    >
      <Box
        bg="bg.panel"
        border="1px solid"
        borderColor="border.muted"
        rounded="lg"
        shadow="lg"
        p="4"
        backdropFilter="blur(8px)"
        transition="all 0.2s ease"
        _hover={{ shadow: 'xl' }}
      >
        <VStack gap={3} align="stretch">
          {/* Content */}
          <HStack gap={3} align="start">
            <Box p="2" rounded="md" bg="red.500/10" color="red.500" flexShrink={0}>
              <Trash2 size={20} />
            </Box>

            <VStack align="start" gap={1} flex={1}>
              <Text fontSize="sm" fontWeight="semibold" color="fg">
                Project deleted
              </Text>
              <Text fontSize="sm" color="fg.muted" lineClamp={2}>
                "{projectName}" has been deleted. You can undo this action.
              </Text>
            </VStack>

            <IconButton
              variant="ghost"
              size="sm"
              aria-label="Dismiss notification"
              onClick={() => {
                setIsVisible(false);
                onDismiss();
              }}
            >
              <X size={16} />
            </IconButton>
          </HStack>

          {/* Progress Bar */}
          <Box>
            <Progress.Root size="xs" value={progress}>
              <Progress.Track>
                <Progress.Range bg="red.500" />
              </Progress.Track>
            </Progress.Root>
          </Box>

          {/* Actions */}
          <HStack gap={2} justify="flex-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsVisible(false);
                onDismiss();
              }}
            >
              Dismiss
            </Button>
            <Button
              colorPalette="blue"
              size="sm"
              onClick={() => {
                setIsVisible(false);
                onUndo();
              }}
            >
              <Undo2 size={14} />
              Undo
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
