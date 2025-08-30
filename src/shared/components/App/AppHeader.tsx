import React from 'react';
import { Flex, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

interface AppHeaderProps {
  onOpenSidebar?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onOpenSidebar }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue('gray.100', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Flex
      as="header"
      justify="space-between"
      align="center"
      px={4}
      py={2}
      bg={bg}
      borderBottom="1px solid"
      borderColor={borderColor}
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="docked"
    >
      <IconButton
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        variant="ghost"
        display={{ base: 'inline-flex', md: 'none' }}
        onClick={onOpenSidebar}
      />
      <Flex align="center" gap={2}>
        <IconButton
          onClick={toggleColorMode}
          variant="ghost"
          size="sm"
          aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        />
      </Flex>
    </Flex>
  );
};

export default AppHeader;
