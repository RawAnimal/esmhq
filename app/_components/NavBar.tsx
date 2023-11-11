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
  Divider,
  Link as MuiLink,
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

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

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
                    <Link href={page.href} passHref>
                      <MuiLink
                        sx={{ fontWeight: 600, textDecoration: 'none' }}
                        underline="none"
                        component="button"
                      >
                        {page.title}
                      </MuiLink>
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
                  className={getActiveClass(page.href)}
                >
                  <Link href={page.href}>{page.title}</Link>
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  //variant="rounded"
                  {...stringAvatar(
                    session?.user.firstName + ' ' + session?.user.lastName
                  )}
                />
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
                    //sx={{ minWidth: 150 }}
                    sx={[
                      {
                        '&:hover': { backgroundColor: 'transparent' },
                        minWidth: 150,
                      },
                    ]}
                  >
                    <Typography color="primary" fontWeight={600}>
                      {session.user.firstName} {session.user.lastName}
                    </Typography>
                  </MenuItem>
                )}
                <Divider />

                {status === 'authenticated' && (
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    className={getMobileActiveClass('/users/profile')}
                  >
                    <Link href="/users/profile" passHref>
                      <MuiLink
                        sx={{ fontWeight: 600, textDecoration: 'none' }}
                        underline="none"
                        component="button"
                      >
                        Profile
                      </MuiLink>
                    </Link>
                  </MenuItem>
                )}
                <MenuItem
                  onClick={handleCloseUserMenu}
                  sx={{
                    display: { xs: 'flex', md: 'none' },
                    //justifyContent: 'center',
                    pl: 0,
                  }}
                >
                  <ThemeToggle />
                </MenuItem>
                {status === 'authenticated' && (
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    className="mobileLink"
                  >
                    <Link href="#" passHref>
                      <MuiLink
                        sx={{ fontWeight: 600, textDecoration: 'none' }}
                        underline="none"
                        component="button"
                        onClick={() => {
                          signOut();
                        }}
                      >
                        Sign Out
                      </MuiLink>
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
