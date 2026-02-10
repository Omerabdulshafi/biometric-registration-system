import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import {
    Container,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TextField,
    Button,
    Box,
    IconButton,
    InputAdornment
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const RefugeeList = () => {
    const [refugees, setRefugees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    // Wrap fetchRefugees in useCallback
    const fetchRefugees = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/refugees?page=${page + 1}&limit=${rowsPerPage}&search=${search}`);
            setRefugees(response.data.refugees);
            setTotal(response.data.total);
        } catch (error) {
            console.error('Error fetching refugees:', error);
        } finally {
            setLoading(false);
        }
    }, [page, rowsPerPage, search]); // Add dependencies

    useEffect(() => {
        fetchRefugees();
    }, [fetchRefugees]); // Now fetchRefugees is stable

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(0);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString();
    };

    const getFullName = (refugee) => {
        const { firstName, middleName, lastName } = refugee.fullName || {};
        return [firstName, middleName, lastName].filter(Boolean).join(' ');
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4">
                        Refugee Records
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/register-refugee')}
                    >
                        Add New Refugee
                    </Button>
                </Box>

                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by name, registration number, or ID..."
                    value={search}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 3 }}
                />

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Registration Number</TableCell>
                                <TableCell>Full Name</TableCell>
                                <TableCell>Date of Birth</TableCell>
                                <TableCell>Nationality</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Registration Date</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : refugees.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        No refugees found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                refugees.map((refugee) => (
                                    <TableRow key={refugee._id} hover>
                                        <TableCell>{refugee.registrationNumber}</TableCell>
                                        <TableCell>{getFullName(refugee)}</TableCell>
                                        <TableCell>{formatDate(refugee.dateOfBirth)}</TableCell>
                                        <TableCell>{refugee.nationality}</TableCell>
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    display: 'inline-block',
                                                    px: 1,
                                                    py: 0.5,
                                                    borderRadius: 1,
                                                    backgroundColor: 
                                                        refugee.status === 'active' ? '#e8f5e9' :
                                                        refugee.status === 'resettled' ? '#e3f2fd' :
                                                        refugee.status === 'returned' ? '#fff3e0' : '#f5f5f5',
                                                    color: 'text.primary',
                                                    fontSize: '0.75rem'
                                                }}
                                            >
                                                {refugee.status?.toUpperCase() || 'ACTIVE'}
                                            </Box>
                                        </TableCell>
                                        <TableCell>{formatDate(refugee.registrationDate)}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                size="small"
                                                onClick={() => navigate(`/refugees/${refugee._id}`)}
                                            >
                                                <VisibilityIcon />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => navigate(`/refugees/${refugee._id}?edit=true`)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    );
};

export default RefugeeList;