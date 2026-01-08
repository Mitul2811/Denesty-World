import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  IconButton,
  Badge,
  useTheme,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  AccountCircle,
  ExitToApp,
  Settings,
  Security,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    enqueueSnackbar('You have been logged out successfully', { variant: 'success' });
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <Box
              component="span"
              sx={{
                display: 'flex',
                alignItems: 'center',
                mr: 3,
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
              onClick={() => navigate('/dashboard')}
            >
              <DashboardIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
              <Typography variant="h6" component="div" color="primary" fontWeight={600}>
                SecureAuth
              </Typography>
            </Box>
          </Box>

          <Box>
            <IconButton
              size="large"
              aria-label="show new notifications"
              color="inherit"
              onClick={handleNotificationsOpen}
              sx={{ mr: 1 }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
            <Button
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
              startIcon={
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32,
                    bgcolor: theme.palette.primary.main,
                    fontSize: '0.875rem',
                  }}
                >
                  U
                </Avatar>
              }
              sx={{ textTransform: 'none' }}
            >
              <Box textAlign="left" sx={{ display: { xs: 'none', md: 'block' } }}>
                <Typography variant="subtitle2" lineHeight={1} color="text.primary">
                  John Doe
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Admin
                </Typography>
              </Box>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: theme.palette.background.default }}>
        <Container maxWidth="xl">
          <Box mb={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome back, John!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Here's what's happening with your security dashboard today.
            </Typography>
          </Box>

          {/* Stats Cards */}
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={3} mb={4}>
            {[
              { title: 'Active Sessions', value: '3', change: '+1', trend: 'up' },
              { title: 'Security Score', value: '92%', change: '+2%', trend: 'up' },
              { title: 'Alerts', value: '2', change: '-3', trend: 'down' },
              { title: 'Devices', value: '4', change: '0', trend: 'neutral' },
            ].map((stat, index) => (
              <Paper 
                key={index} 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    boxShadow: theme.shadows[2],
                  },
                }}
              >
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {stat.title}
                </Typography>
                <Box display="flex" alignItems="flex-end">
                  <Typography variant="h4" component="div" sx={{ fontWeight: 600, mr: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color={stat.trend === 'up' ? 'success.main' : stat.trend === 'down' ? 'error.main' : 'text.secondary'}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      mb: 0.5,
                    }}
                  >
                    {stat.change}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>

          {/* Main Content Area */}
          <Box display="grid" gridTemplateColumns={{ md: '2fr 1fr' }} gap={3}>
            {/* Recent Activity */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" component="h2">
                  Recent Activity
                </Typography>
                <Button size="small" color="primary">
                  View All
                </Button>
              </Box>
              
              {[
                { 
                  id: 1, 
                  title: 'New login from Chrome on Windows', 
                  time: '2 minutes ago',
                  icon: <AccountCircle color="primary" />,
                },
                { 
                  id: 2, 
                  title: 'Password updated', 
                  time: '1 hour ago',
                  icon: <Security color="secondary" />,
                },
                { 
                  id: 3, 
                  title: 'New device registered', 
                  time: '3 days ago',
                  icon: <Settings color="action" />,
                },
              ].map((activity) => (
                <Box key={activity.id} display="flex" alignItems="flex-start" mb={2}>
                  <Box mr={2} mt={0.5}>
                    {activity.icon}
                  </Box>
                  <Box flexGrow={1}>
                    <Typography variant="subtitle2">{activity.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Paper>

            {/* Quick Actions */}
            <Box>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  mb: 3,
                }}
              >
                <Typography variant="h6" component="h2" gutterBottom>
                  Quick Actions
                </Typography>
                <Box display="grid" gap={2}>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<Security />}
                    onClick={() => navigate('/dashboard/security')}
                  >
                    Security Settings
                  </Button>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<Settings />}
                    onClick={() => navigate('/dashboard/settings')}
                  >
                    Account Settings
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    fullWidth 
                    startIcon={<ExitToApp />}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Box>
              </Paper>

              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="h6" component="h2" gutterBottom>
                  Security Status
                </Typography>
                
                {[
                  { id: 1, label: 'Two-factor authentication', status: 'enabled' },
                  { id: 2, label: 'Backup codes', status: 'enabled' },
                  { id: 3, label: 'Suspicious login alerts', status: 'enabled' },
                  { id: 4, label: 'Password last changed', status: '2 days ago' },
                ].map((item) => (
                  <Box key={item.id} display="flex" justifyContent="space-between" alignItems="center" py={1.5}>
                    <Typography variant="body2">{item.label}</Typography>
                    <Typography 
                      variant="caption" 
                      color={item.status === 'enabled' ? 'success.main' : 'text.secondary'}
                      sx={{ 
                        fontWeight: 500,
                        display: 'inline-flex',
                        alignItems: 'center',
                      }}
                    >
                      {item.status === 'enabled' ? (
                        <>
                          <Box 
                            component="span" 
                            sx={{ 
                              width: 8, 
                              height: 8, 
                              borderRadius: '50%',
                              bgcolor: 'success.main',
                              display: 'inline-block',
                              mr: 0.75,
                            }} 
                          />
                          Enabled
                        </>
                      ) : (
                        item.status
                      )}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* User Menu */}
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1.5,
            minWidth: 220,
            borderRadius: 2,
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.08)',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
      >
        <Box px={2} py={1.5}>
          <Typography variant="subtitle2" fontWeight={600}>John Doe</Typography>
          <Typography variant="caption" color="text.secondary">john.doe@example.com</Typography>
        </Box>
        <Divider />
        <MenuItem onClick={() => { handleMenuClose(); navigate('/dashboard/profile'); }}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); navigate('/dashboard/settings'); }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationsAnchorEl}
        open={Boolean(notificationsAnchorEl)}
        onClose={handleNotificationsClose}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1.5,
            width: 360,
            maxWidth: '100%',
            borderRadius: 2,
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.08)',
            overflow: 'hidden',
          },
        }}
      >
        <Box px={2} py={1.5} borderBottom={1} borderColor="divider">
          <Typography variant="subtitle1" fontWeight={600}>Notifications</Typography>
        </Box>
        <Box maxHeight={300} overflow="auto">
          {[
            { id: 1, title: 'New login from Chrome on Windows', time: '2 minutes ago', read: false },
            { id: 2, title: 'Security alert: Unusual sign-in attempt', time: '1 hour ago', read: false },
            { id: 3, title: 'Your password was changed', time: '2 days ago', read: true },
          ].map((notification) => (
            <MenuItem 
              key={notification.id} 
              dense
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                bgcolor: notification.read ? 'transparent' : 'action.hover',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <Box>
                <Typography variant="body2">{notification.title}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {notification.time}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Box>
        <Box textAlign="center" p={1} borderTop={1} borderColor="divider">
          <Button size="small" color="primary">View All Notifications</Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Dashboard;
