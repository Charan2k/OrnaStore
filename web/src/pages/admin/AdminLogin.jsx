import React, { useState } from "react";
import adminLogin from "../../utils/adminLogin.js";
import { TextField, Button, Box, Typography, CircularProgress, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { adminLoginApi } from "../../api/adminApi.js";

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await adminLoginApi(formData.email.trim(), formData.password.trim());
            adminLogin(response);
        } catch (err) {
            setError(err.response?.data?.error || "Invalid login credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 10, p: 3, border: "1px solid #ddd", borderRadius: 2 }}>
            <Typography variant="h5" mb={2} textAlign="center">
                Admin Login
            </Typography>
            {error && <Typography color="error">{error}</Typography>}

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    size="small"
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    color="warning"
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Password"
                    size="small"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    color="warning"
                    required
                    margin="normal"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Button type="submit" variant="contained" color="warning" fullWidth sx={{ mt: 2 }} disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : "Login"}
                </Button>
            </form>
        </Box>
    );
};

export default AdminLogin;
