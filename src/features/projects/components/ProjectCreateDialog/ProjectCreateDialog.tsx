import { Dialog, Field, Input, VStack, HStack, Button, Text } from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import { FileText, Building2 } from 'lucide-react';

interface ProjectCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string) => void;
  isLoading?: boolean;
}

export function ProjectCreateDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: ProjectCreateDialogProps) {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<{ name?: string }>({});

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      // Reset form when dialog opens
      setName('');
      setErrors({});

      // Focus the name input
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const validateForm = () => {
    const newErrors: { name?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Project name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Project name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(name.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(details) => onOpenChange(details.open)} size="md">
      <Dialog.Backdrop />
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>
            <HStack gap={2}>
              <Building2 size={20} />
              <Text>Create New Project</Text>
            </HStack>
          </Dialog.Title>
          <Dialog.Description>
            Start a new framing project to organize your walls and materials.
          </Dialog.Description>
        </Dialog.Header>

        <form onSubmit={handleSubmit}>
          <Dialog.Body>
            <VStack gap={4} align="stretch">
              <Field.Root invalid={!!errors.name}>
                <Field.Label>
                  Project Name <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  ref={nameInputRef}
                  placeholder="e.g., Main House Framing"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                />
                <Field.ErrorText>{errors.name}</Field.ErrorText>
                <Field.HelperText>Choose a descriptive name for your project</Field.HelperText>
              </Field.Root>

              {/* Description removed until persistence is supported */}
            </VStack>
          </Dialog.Body>

          <Dialog.Footer>
            <HStack gap={3} justify="flex-end">
              <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button
                colorPalette="blue"
                type="submit"
                loading={isLoading}
                disabled={!name.trim() || isLoading}
              >
                <FileText size={16} />
                Create Project
              </Button>
            </HStack>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
