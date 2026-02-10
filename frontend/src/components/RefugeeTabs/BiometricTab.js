import React from 'react';
import {
    Grid,
    TextField,
    Typography,
    Box,
    Paper
} from '@mui/material';

const BiometricTab = ({ refugee, isEditMode }) => {
    const biometrics = refugee.biometrics || {};
    
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Fingerprint Data
                </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Left Hand
                    </Typography>
                    {[0, 1, 2, 3, 4].map((index) => (
                        <TextField
                            key={`left-${index}`}
                            fullWidth
                            margin="normal"
                            label={`Finger ${index + 1}`}
                            value={biometrics.fingerprintData?.leftHand?.[index] || ''}
                            InputProps={{ readOnly: !isEditMode }}
                            multiline
                            rows={1}
                        />
                    ))}
                </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Right Hand
                    </Typography>
                    {[0, 1, 2, 3, 4].map((index) => (
                        <TextField
                            key={`right-${index}`}
                            fullWidth
                            margin="normal"
                            label={`Finger ${index + 1}`}
                            value={biometrics.fingerprintData?.rightHand?.[index] || ''}
                            InputProps={{ readOnly: !isEditMode }}
                            multiline
                            rows={1}
                        />
                    ))}
                </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                    Iris Data
                </Typography>
                <TextField
                    fullWidth
                    label="Left Eye"
                    value={biometrics.irisData?.leftEye || ''}
                    InputProps={{ readOnly: !isEditMode }}
                    multiline
                    rows={3}
                />
            </Grid>
            
            <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                    &nbsp;
                </Typography>
                <TextField
                    fullWidth
                    label="Right Eye"
                    value={biometrics.irisData?.rightEye || ''}
                    InputProps={{ readOnly: !isEditMode }}
                    multiline
                    rows={3}
                />
            </Grid>
            
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Facial Photo
                </Typography>
                <TextField
                    fullWidth
                    value={biometrics.facialPhoto ? 'Facial photo data available' : 'No facial photo data'}
                    InputProps={{ readOnly: true }}
                />
                {biometrics.facialPhoto && (
                    <Box sx={{ mt: 2 }}>
                        <img 
                            src={biometrics.facialPhoto} 
                            alt="Facial" 
                            style={{ maxWidth: '200px', maxHeight: '200px' }}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </Box>
                )}
            </Grid>
        </Grid>
    );
};

export default BiometricTab;