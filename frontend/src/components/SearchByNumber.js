import React, { useState } from 'react';
import {
    Paper,
    Typography,
    TextField,
    Button,
    Alert
    // Removed Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchByNumber = () => {
    const [searchNumber, setSearchNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!searchNumber.trim()) {
            setError('Please enter a registration number');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`/refugees?search=${searchNumber}`);
            if (response.data.refugees.length > 0) {
                navigate(`/refugees/${response.data.refugees[0]._id}`);
            } else {
                setError('No refugee found with this registration number');
            }
        } catch (error) {
            setError('Search failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Search by Registration Number
            </Typography>
            
            <TextField
                fullWidth
                label="Registration Number"
                value={searchNumber}
                onChange={(e) => setSearchNumber(e.target.value)}
                placeholder="Enter registration number (e.g., REF-2024-000001)"
                sx={{ mb: 2 }}
            />
            
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
            
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                Tip: Use the format REF-YYYY-XXXXXX where YYYY is the year and XXXXXX is the sequence number.
            </Typography>
        </Paper>
    );
};

export default SearchByNumber;