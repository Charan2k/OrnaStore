import React, { useState } from "react";
import {
    Box,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Typography,
    MenuItem,
    Snackbar,
    Alert,
} from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { deleteAdmin, registerOrUpdateAdmin } from "../../../api/adminApi.js";
import getAdminToken from "../../../utils/getAdminToken.js";
import adminLogout from "../../../utils/adminLogout.js";

const roles = ["owner", "manager", "contributor"];

const ManageAdmins = () => {
    const dispatch = useDispatch();
    const admins = useSelector((state) => state.Admins);
    const role = useSelector((state) => state.CURRENT_ADMIN_ROLE);
    const [open, setOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState(null);
    const [error, setError] = useState(null);

    const handleOpen = (admin = null) => {
        setSelectedAdmin(admin || { id: "", email: "", role: "", password: "" });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedAdmin(null);
    };

    const handleDelete = (id) => {
        setAdminToDelete(id);
        setConfirmDelete(true);
    };

    const confirmDeleteAdmin = async () => {
        try {
            dispatch({ type: "SET_SPINNER", payload: true });
            const token = getAdminToken();
            await deleteAdmin(token, adminToDelete);
            dispatch({ type: "SET_ADMINS", payload: admins.filter((admin) => admin.id !== adminToDelete) });
            alert("Admin deleted successfully!");
        } catch (err) {
            adminLogout(err);
            setError("Failed to delete admin!");
        } finally {
            dispatch({ type: "SET_SPINNER", payload: false });
            setConfirmDelete(false);
            setAdminToDelete(null);
        }
    };

    const handleSave = async () => {
        const trimmedEmail = selectedAdmin.email?.trim();
        const trimmedRole = selectedAdmin.role?.trim();
        const trimmedPassword = selectedAdmin.password?.trim();

        const isExisting = admins.some((admin) => admin.email === trimmedEmail && admin.id !== selectedAdmin.id);

        if (isExisting && !selectedAdmin.id) {
            setError("An admin with this email already exists! Use a different email.");
            return;
        }

        try {
            dispatch({ type: "SET_SPINNER", payload: true });
            const token = getAdminToken();
            const response = await registerOrUpdateAdmin(token, {
                ...selectedAdmin,
                email: trimmedEmail,
                role: trimmedRole,
                password: trimmedPassword,
            });

            if (selectedAdmin.id) {
                dispatch({
                    type: "SET_ADMINS",
                    payload: admins.map((admin) =>
                        admin.id === selectedAdmin.id
                            ? {
                                  id: selectedAdmin.id,
                                  email: trimmedEmail,
                                  role: trimmedRole,
                              }
                            : admin
                    ),
                });
            } else {
                dispatch({
                    type: "SET_ADMINS",
                    payload: [
                        ...admins,
                        {
                            id: response.data.adminId,
                            email: trimmedEmail,
                            role: trimmedRole,
                        },
                    ],
                });
            }

            alert("changes saved successfully!");
        } catch (err) {
            adminLogout(err);
            setError("Error saving admin!");
        } finally {
            dispatch({ type: "SET_SPINNER", payload: false });
            handleClose();
        }
    };

    const filteredAdmins = admins.filter((admin) => admin.email.toLowerCase().includes(search.trim().toLowerCase()));

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <TextField
                    label="Search Admins"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setSearch(e.target.value)}
                />
                {role === "owner" && (
                    <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
                        Add Admin
                    </Button>
                )}
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAdmins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((admin) => (
                            <TableRow key={admin.id}>
                                <TableCell>{admin.id}</TableCell>
                                <TableCell>{admin.email}</TableCell>
                                <TableCell>{admin.role}</TableCell>
                                <TableCell align="right">
                                    {role === "owner" && (
                                        <>
                                            <IconButton onClick={() => handleOpen(admin)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(admin.id)}>
                                                <Delete />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredAdmins.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
                />
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{selectedAdmin?.id ? "Edit Admin" : "Add Admin"}</DialogTitle>
                <DialogContent>
                    <TextField label="ID" fullWidth sx={{ mb: 2 }} value={selectedAdmin?.id} disabled />
                    <TextField
                        label="Email"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={selectedAdmin?.email}
                        onChange={(e) => setSelectedAdmin({ ...selectedAdmin, email: e.target.value })}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        hidden="true"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={selectedAdmin?.password}
                        onChange={(e) => setSelectedAdmin({ ...selectedAdmin, password: e.target.value })}
                    />
                    <TextField
                        label="Role"
                        fullWidth
                        select
                        sx={{ mb: 2 }}
                        value={selectedAdmin?.role || ""}
                        onChange={(e) => setSelectedAdmin({ ...selectedAdmin, role: e.target.value })}
                    >
                        {roles.map((roleOption) => (
                            <MenuItem key={roleOption} value={roleOption}>
                                {roleOption}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>
                        {selectedAdmin?.id ? "Save Changes" : "Add Admin"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this admin?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
                    <Button variant="contained" color="error" onClick={confirmDeleteAdmin}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError(null)}>
                <Alert severity="error">{error}</Alert>
            </Snackbar>
        </Box>
    );
};

export default ManageAdmins;
