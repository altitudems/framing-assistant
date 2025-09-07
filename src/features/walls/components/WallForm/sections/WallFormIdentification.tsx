import { Heading, Field, Input } from '@chakra-ui/react';

interface WallFormIdentificationProps {
  nameValue: string;
  nameError: string | null;
  onNameChange: (value: string) => void;
}

export function WallFormIdentification({
  nameValue,
  nameError,
  onNameChange,
}: WallFormIdentificationProps) {
  return (
    <>
      <Heading as="h3" size="sm">
        Identification
      </Heading>
      <Field.Root required invalid={!!nameError}>
        <Field.Label>Name</Field.Label>
        <Input
          id="name"
          name="name"
          aria-label="Name"
          value={nameValue}
          onChange={(e) => onNameChange(e.target.value)}
        />
        <Field.HelperText>Example: "Wall A" or "North Exterior"</Field.HelperText>
        {nameError && <Field.ErrorText>{nameError}</Field.ErrorText>}
      </Field.Root>
    </>
  );
}
