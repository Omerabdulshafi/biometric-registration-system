import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Menu,
    MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        handleClose();
    };

    const menuItems = [
        { label: 'Dashboard', path: '/' },
        { label: 'Register Refugee', path: '/register-refugee' },
        { label: 'Search', path: '/search' },
        { label: 'All Refugees', path: '/refugees' },
    ];

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Refugee Biometric System
                </Typography>
                
                {user && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {menuItems.map((item) => (
                            <Button
                                key={item.label}
                                color="inherit"
                                onClick={() => navigate(item.path)}
                                sx={{ mr: 1 }}
                            >
                                {item.label}
                            </Button>
                        ))}
                        
                        <IconButton
                            size="large"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                            <Typography variant="body2" sx={{ ml: 1 }}>
                                {user?.username}
                            </Typography>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;