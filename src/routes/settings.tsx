import { createFileRoute } from '@tanstack/react-router';
import Section from '../shared/components/Layout/Section';
import Card from '../shared/components/Layout/Card';

export const Route = createFileRoute('/settings')({
  component: () => (
    <Section title="Settings">
      <Card>
        <h2>Application Settings</h2>
        <p>Configure your application preferences here.</p>
      </Card>
    </Section>
  ),
});
