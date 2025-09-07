import React from 'react';
import { Flex, IconButton } from '@chakra-ui/react';
import { Menu } from 'lucide-react';
import { ColorModeButton } from '../ui/color-mode';

interface AppHeaderProps {
  onOpenSidebar?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onOpenSidebar }) => {
  return (
    <Flex
      as="header"
      justify="space-between"
      align="center"
      px={4}
      py={2}
      bg={{ base: 'white', _dark: 'gray.900' }}
      borderBottom="1px solid"
      borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="docked"
    >
      <IconButton
        aria-label="Open menu"
        variant="ghost"
        display={{ base: 'inline-flex', md: 'none' }}
        onClick={onOpenSidebar}
      >
        <Menu size={20} />
      </IconButton>
      <Flex align="center" gap={2}>
        <ColorModeButton />
      </Flex>
    </Flex>
  );
};

export default AppHeader;
