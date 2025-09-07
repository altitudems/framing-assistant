import { Card, Stat, Text } from '@chakra-ui/react';

interface ProjectSummaryItemProps {
  label: string;
  value: string;
  sub?: string;
}

export default function ProjectSummaryItem({ label, value, sub }: ProjectSummaryItemProps) {
  return (
    <Card.Root>
      <Card.Body>
        <Stat.Root>
          <Stat.Label>{label}</Stat.Label>
          <Stat.ValueText>{value}</Stat.ValueText>
          {sub ? (
            <Text color="fg.muted" fontSize="sm">
              {sub}
            </Text>
          ) : null}
        </Stat.Root>
      </Card.Body>
    </Card.Root>
  );
}
