import React from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '@chakra-ui/react';
import HomeIcon from '../../../assets/icons/HomeIcon';
import ProjectsIcon from '../../../assets/icons/ProjectsIcon';
import SettingsIcon from '../../../assets/icons/SettingsIcon';

interface AppSidebarProps {
  children?: React.ReactNode;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ children }) => {
  return (
    <aside>
      <div>
        <img src="/logo.svg" alt="Framing Assistant Logo" />
        <h1>Framing Assistant</h1>
      </div>
      <nav>
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
            >
              Settings
            </Button>
          )}
        />
      </nav>
      {children}
    </aside>
  );
};

export default AppSidebar;
