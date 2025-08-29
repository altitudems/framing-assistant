import React from "react";
import { Link } from "@tanstack/react-router";
import HomeIcon from "../../../assets/icons/HomeIcon";
import ProjectsIcon from "../../../assets/icons/ProjectsIcon";
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import Button from "../Base/Button"; // Import Button

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
            <Button colorVariant="neutral" styleType="ghost" size="large" active={isActive}>
              <HomeIcon />
              <span>Home</span>
            </Button>
          )}
        />
        <Link
          to="/projects"
          children={({ isActive }) => (
            <Button colorVariant="neutral" styleType="ghost" size="large" active={isActive}>
              <ProjectsIcon />
              <span>Projects</span>
            </Button>
          )}
        />
        <Link
          to="/settings"
          children={({ isActive }) => (
            <Button colorVariant="neutral" styleType="ghost" size="large" active={isActive}>
              <SettingsIcon />
              <span>Settings</span>
            </Button>
          )}
        />
      </nav>
      {children}
    </aside>
  );
};

export default AppSidebar;
