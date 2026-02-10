import React from 'react';
import {
    Grid,
    Typography,
    Paper
    // Removed Box
} from '@mui/material';

const FamilyTab = ({ refugee, isEditMode }) => {
    const familyMembers = refugee.familyMembers || [];
    
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {familyMembers.length === 0 ? (
                    <Typography color="textSecondary">
                        No family members registered
                    </Typography>
                ) : (
                    familyMembers.map((member, index) => (
                        <Paper key={index} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="subtitle1">
                                {member.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Relationship: {member.relationship}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Date of Birth: {member.dateOfBirth ? new Date(member.dateOfBirth).toLocaleDateString() : 'Not specified'}
                            </Typography>
                            {member.registrationNumber && (
                                <Typography variant="body2" color="textSecondary">
                                    Registration: {member.registrationNumber}
                                </Typography>
                            )}
                        </Paper>
                    ))
                )}
            </Grid>
        </Grid>
    );
};

export default FamilyTab;