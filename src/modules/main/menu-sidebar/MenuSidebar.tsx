import { Link } from 'react-router-dom';
import { MenuItem } from '@components';
import { Image } from '@profabric/react-components';
import styled from 'styled-components';
import { SidebarSearch } from '@app/components/sidebar-search/SidebarSearch';
import i18n from '@app/utils/i18n';
import { useAppSelector } from '@app/store/store';

import { Sidebar as RawSidebar } from '@profabric/react-components';
import { useState } from 'react';

const Sidebar = styled(RawSidebar)`
  --pf-width: 250px;
  --pf-background-color: #343a40;
  --pf-color: #c2c7d0;
`;

const StyledBrandImage = styled(Image)`
  line-height: 0.8;
  opacity: 0.8;
  --pf-display: block;
  --pf-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23) !important;
`;

const StyledUserImage = styled(Image)`
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
`;

export const BrandLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  line-height: 1.5;
  padding: 11px 22px;
  transition: width 0.3s ease-in-out;
  white-space: nowrap;
`;

export interface IMenuItem {
  name: string;
  icon?: string;
  path?: string;
  children?: Array<IMenuItem>;
}

export const MENU: IMenuItem[] = [
  {
    name: i18n.t('menusidebar.label.dashboard'),
    icon: 'fas fa-tachometer-alt nav-icon',
    path: '/',
  },
  {
    name: i18n.t('menusidebar.label.blank'),
    icon: 'fas fa-wrench nav-icon',
    path: '/blank',
  },
  {
    name: i18n.t('menusidebar.label.mainMenu'),
    icon: 'far fa-caret-square-down nav-icon',
    children: [
      {
        name: i18n.t('menusidebar.label.subMenu'),
        icon: 'fas fa-hammer nav-icon',
        path: '/sub-menu-1',
      },

      {
        name: i18n.t('menusidebar.label.blank'),
        icon: 'fas fa-cogs nav-icon',
        path: '/sub-menu-2',
      },
    ],
  },
];

const MenuSidebar = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const sidebarSkin = useAppSelector((state) => state.ui.sidebarSkin);
  const menuItemFlat = useAppSelector((state) => state.ui.menuItemFlat);
  const menuChildIndent = useAppSelector((state) => state.ui.menuChildIndent);
  const menuSidebarCollapsed = useAppSelector(
    (state) => state.ui.menuSidebarCollapsed
  );
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sidebar
      collapsed={menuSidebarCollapsed}
      collapsedWidth={74}
      position="left"
      expandOnHover
      onCollapse={({ detail }) => setCollapsed(detail.collapsed)}
    >
      <BrandLink to="/" style={{ borderBottom: '1px solid #4b545c' }}>
        <StyledBrandImage
          src="img/logo.png"
          alt="AdminLTE Logo"
          width={33}
          height={33}
          rounded
        />
        {!collapsed && (
          <span
            style={{
              color: 'rgba(255,255,255,.8)',
              fontWeight: '300',
              marginLeft: '0.5rem',
            }}
          >
            AdminLTE 3
          </span>
        )}
      </BrandLink>
      <div style={{ padding: '0 0.5rem' }}>
        <div
          style={{
            borderBottom: '1px solid #4b545c',
            display: 'flex',
            alignItems: 'center',
            paddingBottom: '1rem',
            margin: '1rem 0',
            paddingLeft: '0.8rem',
          }}
        >
          <StyledUserImage
            src={currentUser?.photoURL}
            fallbackSrc="/img/default-profile.png"
            alt="User"
            width={34}
            height={34}
            rounded
          />
          {!collapsed && (
            <Link
              to={'/profile'}
              style={{ color: '#c2c7d0', padding: '5px 5px 5px 10px' }}
            >
              {currentUser?.email}
            </Link>
          )}
        </div>

        {!collapsed && <SidebarSearch />}

        <nav style={{ overflowY: 'hidden', marginTop: '1rem' }}>
          <ul
            className={`nav nav-pills nav-sidebar flex-column${
              menuItemFlat ? ' nav-flat' : ''
            }${menuChildIndent ? ' nav-child-indent' : ''}`}
            role="menu"
          >
            {MENU.map((menuItem: IMenuItem) => (
              <MenuItem
                key={menuItem.name + menuItem.path}
                menuItem={menuItem}
              />
            ))}
          </ul>
        </nav>
      </div>
    </Sidebar>
  );
};

export default MenuSidebar;
