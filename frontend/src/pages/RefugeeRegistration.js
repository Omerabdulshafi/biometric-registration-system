import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Stepper,
    Step,
    StepLabel,
    Box,
    MenuItem,
    Alert
} from '@mui/material';
import axios from 'axios';

const steps = ['Personal Information', 'Contact Details', 'Biometric Data', 'Medical Information'];

const RefugeeRegistration = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        // Personal Information
        fullName: {
            firstName: '',
            middleName: '',
            lastName: ''
        },
        dateOfBirth: '',
        gender: '',
        nationality: '',
        nationalID: '',
        passportNumber: '',
        
        // Contact Information
        contact: {
            phone: '',
            email: '',
            address: {
                country: '',
                city: '',
                street: '',
                camp: ''
            }
        },
        
        // Family Information
        familyMembers: [],
        
        // Biometric Data
        biometrics: {
            fingerprintData: {
                leftHand: ['', '', '', '', ''],
                rightHand: ['', '', '', '', '']
            },
            irisData: {
                leftEye: '',
                rightEye: ''
            },
            facialPhoto: ''
        },
        
        // Medical Information
        medicalInfo: {
            bloodType: '',
            disabilities: [],
            chronicConditions: [],
            allergies: []
        },
        
        notes: ''
    });
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async () => {
        try {
            await axios.post('/refugees', formData);
            setSuccess('Refugee registered successfully!');
            // Reset form
            setFormData({
                fullName: { firstName: '', middleName: '', lastName: '' },
                dateOfBirth: '',
                gender: '',
                nationality: '',
                nationalID: '',
                passportNumber: '',
                contact: { phone: '', email: '', address: { country: '', city: '', street: '', camp: '' } },
                familyMembers: [],
                biometrics: {
                    fingerprintData: { leftHand: ['', '', '', '', ''], rightHand: ['', '', '', '', ''] },
                    irisData: { leftEye: '', rightEye: '' },
                    facialPhoto: ''
                },
                medicalInfo: { bloodType: '', disabilities: [], chronicConditions: [], allergies: [] },
                notes: ''
            });
            setActiveStep(0);
        } catch (error) {
            setError(error.response?.data?.error || 'Registration failed');
        }
    };

    const handleInputChange = (path, value) => {
        const keys = path.split('.');
        setFormData(prev => {
            const newData = { ...prev };
            let current = newData;
            
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            
            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="First Name"
                                value={formData.fullName.firstName}
                                onChange={(e) => handleInputChange('fullName.firstName', e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Middle Name"
                                value={formData.fullName.middleName}
                                onChange={(e) => handleInputChange('fullName.middleName', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                value={formData.fullName.lastName}
                                onChange={(e) => handleInputChange('fullName.lastName', e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Date of Birth"
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                select
                                label="Gender"
                                value={formData.gender}
                                onChange={(e) => handleInputChange('gender', e.target.value)}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Nationality"
                                value={formData.nationality}
                                onChange={(e) => handleInputChange('nationality', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="National ID"
                                value={formData.nationalID}
                                onChange={(e) => handleInputChange('nationalID', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                );
                
            case 1:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                value={formData.contact.phone}
                                onChange={(e) => handleInputChange('contact.phone', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={formData.contact.email}
                                onChange={(e) => handleInputChange('contact.email', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Country"
                                value={formData.contact.address.country}
                                onChange={(e) => handleInputChange('contact.address.country', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="City"
                                value={formData.contact.address.city}
                                onChange={(e) => handleInputChange('contact.address.city', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Street Address"
                                value={formData.contact.address.street}
                                onChange={(e) => handleInputChange('contact.address.street', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Camp/Refugee Center"
                                value={formData.contact.address.camp}
                                onChange={(e) => handleInputChange('contact.address.camp', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                );
                
            case 2:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Fingerprint Data
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Note: In a real implementation, this would connect to a fingerprint scanner
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1">Left Hand</Typography>
                            {[0, 1, 2, 3, 4].map((index) => (
                                <TextField
                                    key={`left-${index}`}
                                    fullWidth
                                    margin="normal"
                                    label={`Finger ${index + 1}`}
                                    value={formData.biometrics.fingerprintData.leftHand[index]}
                                    onChange={(e) => {
                                        const newLeftHand = [...formData.biometrics.fingerprintData.leftHand];
                                        newLeftHand[index] = e.target.value;
                                        handleInputChange('biometrics.fingerprintData.leftHand', newLeftHand);
                                    }}
                                    placeholder="Fingerprint template data"
                                />
                            ))}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1">Right Hand</Typography>
                            {[0, 1, 2, 3, 4].map((index) => (
                                <TextField
                                    key={`right-${index}`}
                                    fullWidth
                                    margin="normal"
                                    label={`Finger ${index + 1}`}
                                    value={formData.biometrics.fingerprintData.rightHand[index]}
                                    onChange={(e) => {
                                        const newRightHand = [...formData.biometrics.fingerprintData.rightHand];
                                        newRightHand[index] = e.target.value;
                                        handleInputChange('biometrics.fingerprintData.rightHand', newRightHand);
                                    }}
                                    placeholder="Fingerprint template data"
                                />
                            ))}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Left Iris Data"
                                value={formData.biometrics.irisData.leftEye}
                                onChange={(e) => handleInputChange('biometrics.irisData.leftEye', e.target.value)}
                                placeholder="Iris template data"
                                multiline
                                rows={3}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Right Iris Data"
                                value={formData.biometrics.irisData.rightEye}
                                onChange={(e) => handleInputChange('biometrics.irisData.rightEye', e.target.value)}
                                placeholder="Iris template data"
                                multiline
                                rows={3}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Facial Photo (Base64)"
                                value={formData.biometrics.facialPhoto}
                                onChange={(e) => handleInputChange('biometrics.facialPhoto', e.target.value)}
                                placeholder="Base64 encoded image"
                                multiline
                                rows={4}
                            />
                        </Grid>
                    </Grid>
                );
                
            case 3:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                select
                                label="Blood Type"
                                value={formData.medicalInfo.bloodType}
                                onChange={(e) => handleInputChange('medicalInfo.bloodType', e.target.value)}
                            >
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="A+">A+</MenuItem>
                                <MenuItem value="A-">A-</MenuItem>
                                <MenuItem value="B+">B+</MenuItem>
                                <MenuItem value="B-">B-</MenuItem>
                                <MenuItem value="AB+">AB+</MenuItem>
                                <MenuItem value="AB-">AB-</MenuItem>
                                <MenuItem value="O+">O+</MenuItem>
                                <MenuItem value="O-">O-</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Disabilities"
                                value={formData.medicalInfo.disabilities.join(', ')}
                                onChange={(e) => handleInputChange('medicalInfo.disabilities', e.target.value.split(', '))}
                                placeholder="Comma separated list"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Chronic Conditions"
                                value={formData.medicalInfo.chronicConditions.join(', ')}
                                onChange={(e) => handleInputChange('medicalInfo.chronicConditions', e.target.value.split(', '))}
                                placeholder="Comma separated list"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Allergies"
                                value={formData.medicalInfo.allergies.join(', ')}
                                onChange={(e) => handleInputChange('medicalInfo.allergies', e.target.value.split(', '))}
                                placeholder="Comma separated list"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Additional Notes"
                                value={formData.notes}
                                onChange={(e) => handleInputChange('notes', e.target.value)}
                                multiline
                                rows={4}
                            />
                        </Grid>
                    </Grid>
                );
                
            default:
                return null;
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Refugee Registration
                </Typography>
                
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                
                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                
                <Box sx={{ mb: 3 }}>
                    {renderStepContent(activeStep)}
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    
                    {activeStep === steps.length - 1 ? (
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Submit Registration
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={handleNext}
                        >
                            Next
                        </Button>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default RefugeeRegistration;