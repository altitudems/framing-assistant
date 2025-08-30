import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Grid,
  GridItem,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const layoutBg = useColorModeValue('gray.50', 'gray.900');
  const contentBg = useColorModeValue('white', 'gray.800');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Grid
        templateAreas={{ base: '"header" "content"', md: '"sidebar header" "sidebar content"' }}
        gridTemplateColumns={{ base: '1fr', md: '250px 1fr' }}
        gridTemplateRows="auto 1fr"
        minH="100vh"
        bg={layoutBg}
      >
        <GridItem area="sidebar" display={{ base: 'none', md: 'block' }}>
          <AppSidebar />
        </GridItem>
        <GridItem area="header" zIndex="docked">
          <AppHeader onOpenSidebar={onOpen} />
        </GridItem>
        <GridItem area="content" as="main" overflowY="auto" p={4} bg={contentBg}>
          {children}
        </GridItem>
      </Grid>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent maxW="250px">
          <AppSidebar onNavigate={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AppLayout;
