import { Card, VStack, HStack, Skeleton } from '@chakra-ui/react';

interface ProjectCardSkeletonProps {
  count?: number;
}

export function ProjectCardSkeleton({ count = 1 }: ProjectCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <Card.Root key={i} variant="elevated" size="sm">
          <Card.Body gap={4}>
            <VStack align="stretch" gap={3}>
              {/* Header */}
              <HStack justify="space-between" align="start">
                <VStack align="start" gap={1} flex={1}>
                  <Skeleton height="6" width="3/4" />
                  <Skeleton height="4" width="1/2" />
                </VStack>
                <Skeleton height="8" width="8" rounded="md" />
              </HStack>

              {/* Stats */}
              <VStack gap={3} align="stretch">
                {Array.from({ length: 3 }, (_, statIndex) => (
                  <VStack key={statIndex} align="stretch" gap={1}>
                    <HStack gap={1}>
                      <Skeleton height="4" width="4" />
                      <Skeleton height="4" width="16" />
                    </HStack>
                    <Skeleton height="6" width="12" />
                    {statIndex === 2 && <Skeleton height="3" width="20" />}
                  </VStack>
                ))}
              </VStack>
            </VStack>
          </Card.Body>
        </Card.Root>
      ))}
    </>
  );
}

export function ProjectGridSkeleton() {
  return <ProjectCardSkeleton count={6} />;
}
