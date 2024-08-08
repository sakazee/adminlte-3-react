import { useState, useEffect, useCallback, useRef } from 'react';
import { toggleSidebarMenu } from '@app/store/reducers/ui';
import {
  addWindowClass,
  removeWindowClass,
  scrollbarVisible,
} from '@app/utils/helpers';
import ControlSidebar from '@app/modules/main/control-sidebar/ControlSidebar';
import { useAppDispatch, useAppSelector } from '@app/store/store';
import MenuSidebar from './menu-sidebar/MenuSidebar';
import { styled } from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Loading } from '@app/components/Loading';
import { Layout } from '@profabric/react-components';
import { AppHeader } from './header/Header';
import { AppFooter } from './footer/Footer';

const MENU_WIDTH = 250;

export const Container = styled.div<{ $isScrollbarVisible: boolean }>`
  min-height: 100%;
  ${(props) =>
    `width: calc(100% - ${props.$isScrollbarVisible ? '16px' : '0px'});`};
`;

const Main = () => {
  const dispatch = useAppDispatch();
  const menuSidebarCollapsed = useAppSelector(
    (state) => state.ui.menuSidebarCollapsed
  );
  const controlSidebarCollapsed = useAppSelector(
    (state) => state.ui.controlSidebarCollapsed
  );
  const layoutBoxed = useAppSelector((state) => state.ui.layoutBoxed);
  const topNavigation = useAppSelector((state) => state.ui.topNavigation);

  const screenSize = useAppSelector((state) => state.ui.screenSize);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
  const mainRef = useRef<HTMLDivElement | undefined>();

  const handleToggleMenuSidebar = () => {
    dispatch(toggleSidebarMenu());
  };

  useEffect(() => {
    setIsAppLoaded(Boolean(currentUser));
  }, [currentUser]);

  // useEffect(() => {
  //   removeWindowClass('register-page');
  //   removeWindowClass('login-page');
  //   removeWindowClass('hold-transition');

  //   addWindowClass('sidebar-mini');

  //   // fetchProfile();
  //   return () => {
  //     removeWindowClass('sidebar-mini');
  //   };
  // }, []);

  // useEffect(() => {
  //   removeWindowClass('sidebar-closed');
  //   removeWindowClass('sidebar-collapse');
  //   removeWindowClass('sidebar-open');
  //   if (menuSidebarCollapsed && screenSize === 'lg') {
  //     addWindowClass('sidebar-collapse');
  //   } else if (menuSidebarCollapsed && screenSize === 'xs') {
  //     addWindowClass('sidebar-open');
  //   } else if (!menuSidebarCollapsed && screenSize !== 'lg') {
  //     addWindowClass('sidebar-closed');
  //     addWindowClass('sidebar-collapse');
  //   }
  // }, [screenSize, menuSidebarCollapsed]);

  // useEffect(() => {
  //   if (controlSidebarCollapsed) {
  //     removeWindowClass('control-sidebar-slide-open');
  //   } else {
  //     addWindowClass('control-sidebar-slide-open');
  //   }
  // }, [screenSize, controlSidebarCollapsed]);

  const handleUIChanges = () => {
    setIsScrollbarVisible(scrollbarVisible(window.document.body));
  };

  useEffect(() => {
    window.document.addEventListener('scroll', handleUIChanges);
    window.document.addEventListener('resize', handleUIChanges);

    return () => {
      window.document.removeEventListener('scroll', handleUIChanges);
      window.document.removeEventListener('resize', handleUIChanges);
    };
  }, []);

  useEffect(() => {
    handleUIChanges();
  }, [mainRef.current]);

  const getAppTemplate = useCallback(() => {
    if (!isAppLoaded) {
      return <Loading />;
    }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {!topNavigation && <MenuSidebar />}
        <Layout>
          <AppHeader containered={layoutBoxed} />

          <Layout ref={mainRef as any}>
            <section>
              <div>
                <Outlet />
              </div>
            </section>
          </Layout>

          {/* <Content  containered={layoutBoxed} /> */}
          <AppFooter />
          {/* <ControlSidebar /> */}
          {/* <div
            id="sidebar-overlay"
            role="presentation"
            onClick={handleToggleMenuSidebar}
            onKeyDown={() => {}}
            style={{
              display:
                screenSize === 'sm' && menuSidebarCollapsed
                  ? 'block'
                  : undefined,
            }}
          /> */}
        </Layout>
      </Layout>
    );
  }, [
    isAppLoaded,
    menuSidebarCollapsed,
    screenSize,
    layoutBoxed,
    topNavigation,
  ]);

  return (
    <Container $isScrollbarVisible={isScrollbarVisible} className="wrapper">
      {getAppTemplate()}
    </Container>
  );
};

export default Main;
