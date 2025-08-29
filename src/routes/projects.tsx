import { createFileRoute } from '@tanstack/react-router';
import Section from '../shared/components/Layout/Section';
import Card from '../shared/components/Layout/Card';

export const Route = createFileRoute('/projects')({
  // For this specific route, bundle the component together.
  codeSplitGroupings: [['component']],
  component: () => (
    <Section title="Projects">
      <Card>
        <h2>Manage Your Projects</h2>
        <p>Here you can create new projects or select existing ones.</p>
      </Card>
    </Section>
  ),
});
