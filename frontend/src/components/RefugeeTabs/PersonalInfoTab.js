import React from 'react';
import {
    Grid,
    TextField,
    Typography,
    Box
} from '@mui/material';

const PersonalInfoTab = ({ refugee, isEditMode }) => {
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return dateString.split('T')[0];
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="First Name"
                    value={refugee.fullName?.firstName || ''}
                    InputProps={{ readOnly: !isEditMode }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Middle Name"
                    value={refugee.fullName?.middleName || ''}
                    InputProps={{ readOnly: !isEditMode }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Last Name"
                    value={refugee.fullName?.lastName || ''}
                    InputProps={{ readOnly: !isEditMode }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    value={formatDate(refugee.dateOfBirth)}
                    InputProps={{ readOnly: !isEditMode }}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Gender"
                    value={refugee.gender || ''}
                    InputProps={{ readOnly: !isEditMode }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Nationality"
                    value={refugee.nationality || ''}
                    InputProps={{ readOnly: !isEditMode }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="National ID"
                    value={refugee.nationalID || ''}
                    InputProps={{ readOnly: !isEditMode }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Passport Number"
                    value={refugee.passportNumber || ''}
                    InputProps={{ readOnly: !isEditMode }}
                />
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="textSecondary">
                        Registration Information
                    </Typography>
                    <Typography>
                        Registration Number: {refugee.registrationNumber}
                    </Typography>
                    <Typography>
                        Status: {refugee.status?.toUpperCase() || 'ACTIVE'}
                    </Typography>
                    <Typography>
                        Registered on: {new Date(refugee.registrationDate).toLocaleDateString()}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default PersonalInfoTab;