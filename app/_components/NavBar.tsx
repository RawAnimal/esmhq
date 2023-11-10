'use client';
import { useState, MouseEvent } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  MenuItem,
} from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';
import IconESMSheild from '@/app/icons/IconESMSheild';
import Link from 'next/link';
import { signOut, useSession, signIn } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const pages = [
  { title: 'Dash', href: '/' },
  { title: 'Sites', href: '/sites' },
];

function NavBar() {
  const pathname = usePathname();
  const { status, data: session } = useSession();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getActiveClass = (url: string) => {
    if (pathname === url) return 'activeLink';
    return '';
  };

  const getMobileActiveClass = (url: string) => {
    if (pathname === url) return 'activeMobileLink';
    return 'mobileLink';
  };

  return (
    <Box display={session?.user ? 'block' : 'none'}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, mt: 1 }}>
              <Link href={'/'}>
                <IconESMSheild
                  fSize="large"
                  //shieldFill="#db792d"
                  //crossFill="#646569"
                  shieldFill="#FFFFFF"
                  crossFill="#FFFFFF"
                  strokeColor="#FFFFFF"
                  strokeOpacity="0.0"
                />
              </Link>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {/* mobile menu */}
                {pages.map((page) => (
                  <MenuItem
                    key={page.title}
                    onClick={handleCloseNavMenu}
                    className={getMobileActiveClass(page.href)}
                    sx={{ minWidth: 150 }}
                  >
                    <Link className="mobileLinkFont" href={page.href}>
                      {page.title}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                mr: 1,
                mt: 1,
                flexGrow: 1,
              }}
            >
              <Link href={'/'}>
                <IconESMSheild
                  fSize="large"
                  //shieldFill="#db792d"
                  //crossFill="#646569"
                  shieldFill="#FFFFFF"
                  crossFill="#FFFFFF"
                  strokeColor="#FFFFFF"
                  strokeOpacity="0.0"
                />
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                // standard menu
                <Button
                  key={page.title}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  className={getActiveClass(page.href)}
                >
                  <Link href={page.href}>{page.title}</Link>
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {status === 'authenticated' && (
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    sx={{ fontWeight: 800, minWidth: 150 }}
                  >
                    {session.user.firstName} {session.user.lastName}
                  </MenuItem>
                )}

                {status === 'authenticated' && (
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    className={getMobileActiveClass('/users/profile')}
                  >
                    <Link href="/users/profile">
                      <Typography
                        color="black"
                        fontWeight={700}
                        textAlign="center"
                      >
                        Profile
                      </Typography>
                    </Link>
                  </MenuItem>
                )}
                <MenuItem
                  onClick={handleCloseUserMenu}
                  sx={{
                    display: { xs: 'flex', md: 'none' },
                    justifyContent: 'center',
                  }}
                >
                  <ThemeToggle />
                </MenuItem>
                {status === 'authenticated' && (
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    className="mobileLink"
                  >
                    <Link
                      href="#"
                      onClick={() => {
                        signOut();
                      }}
                    >
                      <Typography
                        color="black"
                        fontWeight={700}
                        textAlign="center"
                      >
                        Sign Out
                      </Typography>
                    </Link>
                  </MenuItem>
                )}
                {status === 'unauthenticated' && (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link
                      href="#"
                      onClick={() => {
                        signIn();
                      }}
                    >
                      <Typography textAlign="center">Sign In</Typography>
                    </Link>
                  </MenuItem>
                )}
              </Menu>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <ThemeToggle />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
export default NavBar;
