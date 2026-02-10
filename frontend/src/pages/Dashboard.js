import React from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Card,
    CardContent,
    CardActions,
    Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PeopleIcon from '@mui/icons-material/People';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const quickActions = [
        {
            title: 'Register New Refugee',
            icon: <PersonAddIcon fontSize="large" />,
            description: 'Add new refugee with biometric data',
            path: '/register-refugee',
            color: '#1976d2'
        },
        {
            title: 'Search Refugees',
            icon: <SearchIcon fontSize="large" />,
            description: 'Search by biometric or registration number',
            path: '/search',
            color: '#2e7d32'
        },
        {
            title: 'View All Refugees',
            icon: <PeopleIcon fontSize="large" />,
            description: 'Browse and manage refugee records',
            path: '/refugees',
            color: '#ed6c02'
        },
        {
            title: 'Biometric Search',
            icon: <FingerprintIcon fontSize="large" />,
            description: 'Search using fingerprint or iris data',
            path: '/search',
            color: '#9c27b0'
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Welcome, {user?.username}!
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Refugee Biometric Registration System Dashboard
            </Typography>

            <Grid container spacing={3} sx={{ mt: 2 }}>
                {quickActions.map((action, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card 
                            sx={{ 
                                height: '100%', 
                                display: 'flex', 
                                flexDirection: 'column',
                                cursor: 'pointer',
                                '&:hover': {
                                    boxShadow: 6,
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.3s ease'
                                }
                            }}
                            onClick={() => navigate(action.path)}
                        >
                            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                                <Box sx={{ color: action.color, mb: 2 }}>
                                    {action.icon}
                                </Box>
                                <Typography gutterBottom variant="h6" component="h2">
                                    {action.title}
                                </Typography>
                                <Typography color="textSecondary">
                                    {action.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Go
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3} sx={{ mt: 3 }}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            System Statistics
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="textSecondary">
                                Total Registered Refugees: <strong>0</strong>
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Active Cases: <strong>0</strong>
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Today's Registrations: <strong>0</strong>
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Quick Guide
                        </Typography>
                        <Typography variant="body2" paragraph>
                            1. Register new refugees with complete biometric data
                        </Typography>
                        <Typography variant="body2" paragraph>
                            2. Use biometric search for identity verification
                        </Typography>
                        <Typography variant="body2" paragraph>
                            3. Update records as needed
                        </Typography>
                        <Typography variant="body2">
                            4. Generate reports from the system
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;