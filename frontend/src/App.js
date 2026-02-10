import React from 'react'; // Removed useState and useEffect
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Removed Navigate
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RefugeeRegistration from './pages/RefugeeRegistration';
import RefugeeSearch from './pages/RefugeeSearch';
import RefugeeList from './pages/RefugeeList';
import RefugeeDetail from './pages/RefugeeDetail';

// Components
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

// Axios defaults
axios.defaults.baseURL = 'http://localhost:5000/api';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <Router>
                    <div className="App">
                        <Navbar />
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/" element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            } />
                            <Route path="/register-refugee" element={
                                <PrivateRoute>
                                    <RefugeeRegistration />
                                </PrivateRoute>
                            } />
                            <Route path="/search" element={
                                <PrivateRoute>
                                    <RefugeeSearch />
                                </PrivateRoute>
                            } />
                            <Route path="/refugees" element={
                                <PrivateRoute>
                                    <RefugeeList />
                                </PrivateRoute>
                            } />
                            <Route path="/refugees/:id" element={
                                <PrivateRoute>
                                    <RefugeeDetail />
                                </PrivateRoute>
                            } />
                        </Routes>
                    </div>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;