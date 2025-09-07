import { Dialog, IconButton, HStack, Button } from '@chakra-ui/react';
import type { WallFormValues } from '../../types/WallForm.types';
import WallForm from '../WallForm/WallForm';

interface WallDialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  initialValues?: WallFormValues;
  onSubmit: (values: WallFormValues) => Promise<void> | void;
  isSaving?: boolean;
}

function WallDialog({ title, open, onClose, initialValues, onSubmit, isSaving }: WallDialogProps) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e: { open: boolean }) => {
        if (!e.open) onClose();
      }}
      size={{ base: 'lg', md: 'xl', lg: 'xl' }}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content maxH="85vh">
          <Dialog.Header>
            <HStack justify="space-between">
              <Dialog.Title>{title}</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <IconButton aria-label="Close" variant="ghost">
                  ✕
                </IconButton>
              </Dialog.CloseTrigger>
            </HStack>
          </Dialog.Header>
          <Dialog.Body overflow="auto">
            <WallForm initialValues={initialValues} onSubmit={onSubmit} isSaving={isSaving} />
          </Dialog.Body>
          <Dialog.Footer>
            <HStack justify="flex-end" gap={3} w="full">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button form="wall-form" type="submit" loading={isSaving}>
                Save
              </Button>
            </HStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}

export default WallDialog;
