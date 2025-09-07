import React from 'react';
import {
  DrawerRoot,
  DrawerBackdrop,
  DrawerContent,
  DrawerPositioner,
  Grid,
  GridItem,
  useDisclosure,
} from '@chakra-ui/react';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Grid
        templateAreas={{ base: '"header" "content"', md: '"sidebar header" "sidebar content"' }}
        gridTemplateColumns={{ base: '1fr', md: '250px 1fr' }}
        gridTemplateRows="auto 1fr"
        h="100vh"
        bg={{ base: 'gray.50', _dark: 'gray.900' }}
        overflow="hidden"
      >
        <GridItem area="sidebar" display={{ base: 'none', md: 'block' }}>
          <AppSidebar />
        </GridItem>
        <GridItem area="header" zIndex="docked">
          <AppHeader onOpenSidebar={onOpen} />
        </GridItem>
        <GridItem
          area="content"
          as="main"
          overflowY="auto"
          p={4}
          bg={{ base: 'white', _dark: 'gray.900' }}
        >
          {children}
        </GridItem>
      </Grid>
      <DrawerRoot
        placement="start"
        onOpenChange={(e) => {
          if (!e.open) onClose();
        }}
        open={open}
        size="xs"
      >
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent maxW="250px">
            <AppSidebar onNavigate={onClose} />
          </DrawerContent>
        </DrawerPositioner>
      </DrawerRoot>
    </>
  );
};

export default AppLayout;
