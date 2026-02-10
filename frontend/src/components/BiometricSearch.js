import React, { useState } from 'react';
import {
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
    Tab,
    Tabs
} from '@mui/material'; // Removed Grid
import axios from 'axios';

const BiometricSearch = () => {
    const [tabValue, setTabValue] = useState(0);
    const [searchData, setSearchData] = useState({
        fingerprint: '',
        iris: '',
        registrationNumber: ''
    });
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        setResults(null);
        setError('');
    };

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        
        try {
            let response;
            
            if (tabValue === 0 && searchData.fingerprint) {
                response = await axios.post('/refugees/search/fingerprint', {
                    fingerprintData: searchData.fingerprint
                });
            } else if (tabValue === 1 && searchData.iris) {
                response = await axios.post('/refugees/search/iris', {
                    irisData: searchData.iris
                });
            } else if (tabValue === 2 && searchData.registrationNumber) {
                response = await axios.get(`/refugees?search=${searchData.registrationNumber}`);
            }
            
            setResults(response.data);
        } catch (error) {
            setError(error.response?.data?.error || 'Search failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Biometric Search
            </Typography>
            
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
                <Tab label="Fingerprint" />
                <Tab label="Iris" />
                <Tab label="Registration Number" />
            </Tabs>
            
            <Box sx={{ mb: 3 }}>
                {tabValue === 0 && (
                    <TextField
                        fullWidth
                        label="Fingerprint Data"
                        value={searchData.fingerprint}
                        onChange={(e) => setSearchData({...searchData, fingerprint: e.target.value})}
                        placeholder="Enter fingerprint template data"
                        multiline
                        rows={4}
                    />
                )}
                
                {tabValue === 1 && (
                    <TextField
                        fullWidth
                        label="Iris Data"
                        value={searchData.iris}
                        onChange={(e) => setSearchData({...searchData, iris: e.target.value})}
                        placeholder="Enter iris template data"
                        multiline
                        rows={4}
                    />
                )}
                
                {tabValue === 2 && (
                    <TextField
                        fullWidth
                        label="Registration Number"
                        value={searchData.registrationNumber}
                        onChange={(e) => setSearchData({...searchData, registrationNumber: e.target.value})}
                        placeholder="Enter registration number (e.g., REF-2024-000001)"
                    />
                )}
            </Box>
            
            <Button
                variant="contained"
                onClick={handleSearch}
                disabled={loading}
                fullWidth
            >
                {loading ? 'Searching...' : 'Search'}
            </Button>
            
            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
            
            {results && (
                <Box sx={{ mt: 3 }}>
                    {results.found || results.refugees?.length > 0 ? (
                        <Alert severity="success">
                            Match found!
                        </Alert>
                    ) : (
                        <Alert severity="info">
                            No matches found
                        </Alert>
                    )}
                    
                    {/* Display search results */}
                    {results.refugee && (
                        <Paper sx={{ p: 2, mt: 2 }}>
                            <Typography variant="h6">
                                {results.refugee.fullName.firstName} {results.refugee.fullName.lastName}
                            </Typography>
                            <Typography>
                                Registration: {results.refugee.registrationNumber}
                            </Typography>
                            <Typography>
                                Nationality: {results.refugee.nationality}
                            </Typography>
                        </Paper>
                    )}
                </Box>
            )}
        </Paper>
    );
};

export default BiometricSearch;