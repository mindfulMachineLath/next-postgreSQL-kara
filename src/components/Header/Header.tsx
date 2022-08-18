import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { CSSTransition } from 'react-transition-group';
import { IconType } from 'react-icons';
import { FiUser, FiHeart, FiShoppingBag, FiChevronDown } from 'react-icons/fi';
import { Search } from './Search';
import { TopBar } from './TopBar';
import { MegaMenu } from './MegaMenu';

export const Header = () => {
  const [currentMenuItem, setCurrentMenuItem] = useState('');

  const { t } = useTranslation('header');

  const menuItems = [
    { label: t('men'), href: '/men', hasSubMenu: true },
    { label: t('women'), href: '/women', hasSubMenu: true },
    { label: t('kids'), href: '/kids', hasSubMenu: true },
    { label: t('sale'), href: '/sale' },
    { label: t('blog'), href: '/blog' },
    { label: t('contacts'), href: '/contacts' },
  ];

  const handleShowMenu = (value: string) => setCurrentMenuItem(value);
  const handleCloseMenu = () => setCurrentMenuItem('');

  return (
    <header>
      <TopBar />
      <NavBar>
        <Container>
          <Link href="/" passHref>
            <Logo>
              <Image
                priority
                src="/logo.png"
                alt="logo"
                width={100}
                height={35}
                layout="fixed"
              />
            </Logo>
          </Link>
          <MainMenu>
            {menuItems.map(({ label, href, hasSubMenu }, index) => (
              <MenuItem
                key={index}
                active={currentMenuItem === label}
                onMouseEnter={() => hasSubMenu && handleShowMenu(label)}
                onMouseLeave={handleCloseMenu}
              >
                <Link href={href}>
                  <a>
                    {label}
                    {hasSubMenu && <FiChevronDown className="chevron-down" />}
                  </a>
                </Link>
              </MenuItem>
            ))}
          </MainMenu>
          <SideMenu>
            <Search onSearch={value => console.log(value)} />
            <SideMenuItem href="/account/wishlist" Icon={FiHeart} />
            <SideMenuItem href="/account/cart" Icon={FiShoppingBag} />
            <SideMenuItem href="/account/login" Icon={FiUser} />
          </SideMenu>
        </Container>
        <CSSTransition timeout={0} in={Boolean(currentMenuItem)} unmountOnExit>
          <MegaMenu
            menuItem={currentMenuItem}
            onShowMenu={() => handleShowMenu(currentMenuItem)}
            onCloseMenu={handleCloseMenu}
          ></MegaMenu>
        </CSSTransition>
      </NavBar>
    </header>
  );
};

const NavBar = styled.div`
  background: #fff;
  height: 60px;
  box-shadow: rgb(0 0 0 / 10%) 0px 15px 20px -20px;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.containerWidth};
  margin: 0 auto;
  padding: 0 1rem;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  margin-right: 2rem;
`;

const MainMenu = styled.ul`
  display: flex;
  margin-left: auto;
  height: 100%;

  @media (max-width: 900px) {
    display: none;
  }
`;

interface MenuItemProps {
  active: boolean;
}

const MenuItem = styled.li<MenuItemProps>`
  font-weight: 500;
  color: ${({ theme, active }) =>
    active ? theme.colors.primary100 : theme.colors.neutral80};
  transition: all 0.2s;
  position: relative;

  a {
    height: 100%;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
  }

  .chevron-down {
    margin-left: 0.5rem;
    margin-top: 0.25rem;
    color: ${({ theme }) => theme.colors.neutral50};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary100};
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ active }) => (active ? '100%' : 0)};
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary100};
  }

  &:is(:hover)::before {
    width: 100%;
  }
`;

const SideMenu = styled.ul`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

interface IconButtonProps {
  href: string;
  className?: string;
  Icon: IconType;
}

const IconButton = ({ href, className, Icon }: IconButtonProps) => (
  <Link href={href}>
    <a className={className}>
      <Icon size="2rem" className="icon" />
    </a>
  </Link>
);

const SideMenuItem = styled(IconButton)`
  margin-left: 2rem;
  margin-top: 0.5rem;

  &:first-of-type {
    margin-left: 3rem;
  }

  .icon {
    color: ${({ theme }) => theme.colors.neutral80};
    transition: all 0.2s;
  }

  &:hover .icon {
    color: ${({ theme }) => theme.colors.primary100};
  }

  @media (max-width: 900px) {
    display: none;
  }
`;
