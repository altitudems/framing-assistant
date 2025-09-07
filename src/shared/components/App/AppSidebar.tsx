import React from 'react';
import { Link } from '@tanstack/react-router';
import { Button, Flex, Text, VStack } from '@chakra-ui/react';
import HomeIcon from '../../../assets/icons/HomeIcon';
import ProjectsIcon from '../../../assets/icons/ProjectsIcon';
import SettingsIcon from '../../../assets/icons/SettingsIcon';
import AppLogo from './AppLogo';

interface AppSidebarProps {
  children?: React.ReactNode;
  onNavigate?: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ children, onNavigate }) => {
  return (
    <Flex
      as="aside"
      direction="column"
      w={{ base: 'full', md: '250px' }}
      p={4}
      bg={{ base: 'gray.50', _dark: 'gray.900' }}
      borderRight="1px solid"
      borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
      boxShadow="sm"
      h="100%"
    >
      <Link to="/" onClick={onNavigate} style={{ textDecoration: 'none' }}>
        <Flex
          align="center"
          gap={2}
          mb={3}
          color={{ base: 'teal.600', _dark: 'teal.400' }}
          w="100%"
        >
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
      <VStack as="nav" align="stretch" gap={2} flex="1">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          children={({ isActive }) => (
            <Button
              variant={isActive ? 'solid' : 'ghost'}
              colorPalette="gray"
              size="sm"
              justifyContent="flex-start"
              w="100%"
              onClick={onNavigate}
            >
              <HomeIcon />
              Home
            </Button>
          )}
        />
        <Link
          to="/projects"
          search={{ q: '', sort: 'updated', filter: 'all' }}
          children={({ isActive }) => (
            <Button
              variant={isActive ? 'solid' : 'ghost'}
              colorPalette="gray"
              size="sm"
              justifyContent="flex-start"
              w="100%"
              onClick={onNavigate}
            >
              <ProjectsIcon />
              Projects
            </Button>
          )}
        />
        <Link
          to="/settings"
          children={({ isActive }) => (
            <Button
              variant={isActive ? 'solid' : 'ghost'}
              colorPalette="gray"
              size="sm"
              justifyContent="flex-start"
              w="100%"
              onClick={onNavigate}
            >
              <SettingsIcon />
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
