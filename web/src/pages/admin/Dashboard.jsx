import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Topbar from "../../components/Topbar/Topbar.jsx";
import ManageAdmins from "./ManageAdmins/ManageAdmins.jsx";
import ManageOrnaments from "./ManageOrnaments/ManageOrnaments.jsx";
import adminLogout from "../../utils/adminLogout.js";
import { fetchAdmins } from "../../api/adminApi.js";
import { useDispatch } from "react-redux";
import getAdminToken from "../../utils/getAdminToken.js";
import SpinnerComp from "../../components/SpinnerComp/SpinnerComp.jsx";
import AddOrnament from "./AddOrnament/AddOrnament.jsx";

const menuItems = [
    { label: "Manage Admins", key: "manage-admins" },
    { label: "Add Ornaments", key: "add-ornaments" },
    { label: "Manage Ornaments", key: "manage-ornaments" },
];

const Dashboard = () => {
    const [activePage, setActivePage] = useState("manage-admins");
    const dispatch = useDispatch();

    React.useEffect(() => {
        const preLoadAdminsAndCurrentAdminRole = async () => {
            try {
                dispatch({ type: "SET_SPINNER", payload: true });
                const token = getAdminToken();
                const response = await fetchAdmins(token);
                dispatch({ type: "SET_ADMINS", payload: response.data.admins });
                dispatch({ type: "SET_CURRENT_ADMIN_ROLE", payload: response.data.role });
                dispatch({ type: "SET_CURRENT_ADMIN_ID", payload: response.data.adminId });
            } catch (err) {
                adminLogout(err);
            }
            finally {
                dispatch({ type: "SET_SPINNER", payload: false });
            }
        };
        preLoadAdminsAndCurrentAdminRole();
    }, [dispatch]);

    return (
        <>
            <SpinnerComp />
            <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f4f4" }}>
                <CssBaseline />
                <Topbar title="Admin Dashboard" onLogout={()=>{
                    adminLogout({
                        response: {
                            data: {
                                loginFailed: true
                            }
                        }
                    });
                }}/>
                <Sidebar menuItems={menuItems} setActivePage={setActivePage} activePage={activePage} />
                <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                    {activePage === "manage-admins" && <ManageAdmins />}
                    {activePage === "manage-ornaments" && <ManageOrnaments setActivePage={setActivePage}/>}
                    {activePage === "add-ornaments" && <AddOrnament />}
                </Box>
            </Box>
        </>
    );
};

export default Dashboard;
