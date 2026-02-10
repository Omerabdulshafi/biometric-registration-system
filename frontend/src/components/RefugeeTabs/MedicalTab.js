import React from 'react';
import {
    Grid,
    TextField
    // Removed Typography
} from '@mui/material';

const MedicalTab = ({ refugee, isEditMode }) => {
    const medicalInfo = refugee.medicalInfo || {};
    
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Blood Type"
                    value={medicalInfo.bloodType || ''}
                    InputProps={{ readOnly: !isEditMode }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Disabilities"
                    value={Array.isArray(medicalInfo.disabilities) ? medicalInfo.disabilities.join(', ') : ''}
                    InputProps={{ readOnly: !isEditMode }}
                    multiline
                    rows={2}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Chronic Conditions"
                    value={Array.isArray(medicalInfo.chronicConditions) ? medicalInfo.chronicConditions.join(', ') : ''}
                    InputProps={{ readOnly: !isEditMode }}
                    multiline
                    rows={2}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Allergies"
                    value={Array.isArray(medicalInfo.allergies) ? medicalInfo.allergies.join(', ') : ''}
                    InputProps={{ readOnly: !isEditMode }}
                    multiline
                    rows={2}
                />
            </Grid>
        </Grid>
    );
};

export default MedicalTab;