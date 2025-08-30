import React from 'react';
import { Link } from '@tanstack/react-router';
import { Button, Flex, Image, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import HomeIcon from '../../../assets/icons/HomeIcon';
import ProjectsIcon from '../../../assets/icons/ProjectsIcon';
import SettingsIcon from '../../../assets/icons/SettingsIcon';

interface AppSidebarProps {
  children?: React.ReactNode;
  onNavigate?: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ children, onNavigate }) => {
  const bg = useColorModeValue('gray.100', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

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
      <Flex align="center" mb={8}>
        <Image src="/logo.svg" alt="Framing Assistant Logo" h="40px" mr={2} />
        <Text fontSize="xl" fontWeight="bold" color="teal.500">
          Framing Assistant
        </Text>
      </Flex>
      <VStack as="nav" align="stretch" spacing={2} flex="1">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          children={({ isActive }) => (
            <Button
              variant={isActive ? 'solid' : 'ghost'}
              colorScheme="gray"
              size="lg"
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
              size="lg"
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
              size="lg"
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
