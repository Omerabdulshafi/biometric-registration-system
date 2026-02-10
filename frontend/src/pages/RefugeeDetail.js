import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import {
    Container,
    Paper,
    Typography,
    Button,
    Box,
    Alert,
    CircularProgress,
    Tabs,
    Tab
} from '@mui/material'; // Removed Grid
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import PersonalInfoTab from '../components/RefugeeTabs/PersonalInfoTab';
import BiometricTab from '../components/RefugeeTabs/BiometricTab';
import MedicalTab from '../components/RefugeeTabs/MedicalTab';
import FamilyTab from '../components/RefugeeTabs/FamilyTab';

const RefugeeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [refugee, setRefugee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [tabValue, setTabValue] = useState(0);
    const [isEditMode, setIsEditMode] = useState(false);

    // Wrap fetchRefugee in useCallback to avoid dependency issues
    const fetchRefugee = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/refugees/${id}`);
            setRefugee(response.data);
        } catch (error) {
            setError('Failed to load refugee details');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (location.search.includes('edit=true')) {
            setIsEditMode(true);
        }
        fetchRefugee();
    }, [id, location, fetchRefugee]); // Added fetchRefugee to dependencies

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
                <Button sx={{ mt: 2 }} onClick={() => navigate('/refugees')}>
                    Back to List
                </Button>
            </Container>
        );
    }

    if (!refugee) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="warning">Refugee not found</Alert>
                <Button sx={{ mt: 2 }} onClick={() => navigate('/refugees')}>
                    Back to List
                </Button>
            </Container>
        );
    }

    const getFullName = () => {
        const { firstName, middleName, lastName } = refugee.fullName || {};
        return [firstName, middleName, lastName].filter(Boolean).join(' ');
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box>
                        <Typography variant="h4">
                            {getFullName()}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Registration Number: {refugee.registrationNumber}
                        </Typography>
                    </Box>
                    <Box>
                        {isEditMode ? (
                            <>
                                <Button variant="contained" sx={{ mr: 1 }}>
                                    Save Changes
                                </Button>
                                <Button onClick={() => setIsEditMode(false)}>
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button 
                                    variant="contained" 
                                    sx={{ mr: 1 }}
                                    onClick={() => setIsEditMode(true)}
                                >
                                    Edit
                                </Button>
                                <Button onClick={() => navigate('/refugees')}>
                                    Back to List
                                </Button>
                            </>
                        )}
                    </Box>
                </Box>

                <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
                    <Tab label="Personal Information" />
                    <Tab label="Biometric Data" />
                    <Tab label="Medical Information" />
                    <Tab label="Family Members" />
                </Tabs>

                {tabValue === 0 && (
                    <PersonalInfoTab refugee={refugee} isEditMode={isEditMode} />
                )}

                {tabValue === 1 && (
                    <BiometricTab refugee={refugee} isEditMode={isEditMode} />
                )}

                {tabValue === 2 && (
                    <MedicalTab refugee={refugee} isEditMode={isEditMode} />
                )}

                {tabValue === 3 && (
                    <FamilyTab refugee={refugee} isEditMode={isEditMode} />
                )}
            </Paper>
        </Container>
    );
};

export default RefugeeDetail;