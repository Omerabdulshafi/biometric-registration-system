import React from 'react';
import {
    Container,
    Grid,
    Typography
} from '@mui/material';
import BiometricSearch from '../components/BiometricSearch';
import SearchByNumber from '../components/SearchByNumber';

const RefugeeSearch = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Search Refugees
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Search using biometric data or registration number
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <BiometricSearch />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SearchByNumber />
                </Grid>
            </Grid>
        </Container>
    );
};

export default RefugeeSearch;