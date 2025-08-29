import { createFileRoute } from '@tanstack/react-router';
import Section from '../shared/components/Layout/Section';
import Card from '../shared/components/Layout/Card';

export const Route = createFileRoute('/')({
  component: () => (
    <Section title="Home">
      <Card>
        <h2>Welcome Home!</h2>
        <p>This is the home page content.</p>
      </Card>
    </Section>
  ),
});
