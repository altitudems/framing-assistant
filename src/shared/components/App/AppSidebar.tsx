import React from 'react';
import { Link } from '@tanstack/react-router';
import { Button, Flex, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import HomeIcon from '../../../assets/icons/HomeIcon';
import ProjectsIcon from '../../../assets/icons/ProjectsIcon';
import SettingsIcon from '../../../assets/icons/SettingsIcon';
import AppLogo from './AppLogo';

interface AppSidebarProps {
  children?: React.ReactNode;
  onNavigate?: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ children, onNavigate }) => {
  const bg = useColorModeValue('gray.100', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const brandColor = useColorModeValue('teal.600', 'teal.300');

  return (
    <Flex
      as="aside"
      direction="column"
      w={{ base: 'full', md: '250px' }}
      p={4}
      bg={bg}
      borderRight="1px solid"
      borderColor={borderColor}
      boxShadow="sm"
      h="100%"
    >
      <Link to="/" onClick={onNavigate} style={{ textDecoration: 'none' }}>
        <Flex align="center" gap={2} mb={3} color={brandColor} w="100%">
          <AppLogo size={24} aria-label="Framing Assistant Logo" />
          <Text
            as="span"
            fontSize="sm"
            fontWeight="semibold"
            whiteSpace="nowrap"
            lineHeight="1"
            m={0}
          >
            Framing Assistant
          </Text>
        </Flex>
      </Link>
      <VStack as="nav" align="stretch" spacing={2} flex="1">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          children={({ isActive }) => (
            <Button
              variant={isActive ? 'solid' : 'ghost'}
              colorScheme="gray"
              size="sm"
              justifyContent="flex-start"
              leftIcon={<HomeIcon />}
              w="100%"
              onClick={onNavigate}
            >
              Home
            </Button>
          )}
        />
        <Link
          to="/projects"
          children={({ isActive }) => (
            <Button
              variant={isActive ? 'solid' : 'ghost'}
              colorScheme="gray"
              size="sm"
              justifyContent="flex-start"
              leftIcon={<ProjectsIcon />}
              w="100%"
              onClick={onNavigate}
            >
              Projects
            </Button>
          )}
        />
        <Link
          to="/settings"
          children={({ isActive }) => (
            <Button
              variant={isActive ? 'solid' : 'ghost'}
              colorScheme="gray"
              size="sm"
              justifyContent="flex-start"
              leftIcon={<SettingsIcon />}
              w="100%"
              onClick={onNavigate}
            >
              Settings
            </Button>
          )}
        />
      </VStack>
      {children}
    </Flex>
  );
};

export default AppSidebar;
