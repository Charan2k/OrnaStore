import React, { useState, useCallback } from "react";
import { Box, TextField, Button, MenuItem, Typography, Card, CardMedia } from "@mui/material";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../utils/cropImage.js";
import { addOrnament } from "../../../api/adminApi.js";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const CROP_WIDTH = 300;
const CROP_HEIGHT = 300;

const AddOrnament = () => {
    const [formData, setFormData] = useState({
        ornamentName: "",
        category: "",
        type: "",
        metalType: "",
        description: "",
        image: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [imageSrc, setImageSrc] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [cropping, setCropping] = useState(false);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => setImageSrc(reader.result);
            setCropping(true);
        } else {
            setError("File must be less than 5MB.");
        }
    };

    const handleCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCropImage = async () => {
        try {
            const croppedImgUrl = await getCroppedImg(imageSrc, croppedAreaPixels, CROP_WIDTH, CROP_HEIGHT);
    
            const response = await fetch(croppedImgUrl);
            const blob = await response.blob();
            const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });
    
            setCroppedImage(URL.createObjectURL(blob)); 
            setFormData((prev) => ({ ...prev, image: file })); 
            setCropping(false);
        } catch (error) {
            setError("Failed to crop image. Try again.");
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
    
        const token = localStorage.getItem("adminToken");
        if (!token) {
            setError("Unauthorized: Please log in again.");
            setLoading(false);
            return;
        }
    
        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) {
                formDataObj.append(key, value);
            }
        });
    
        try {
            const response = await addOrnament(formDataObj, token);
            if (response.status === 201 || response.status === 200) {
                alert("Ornament added successfully!");
                setFormData({
                    ornamentName: "",
                    category: "",
                    type: "",
                    metalType: "",
                    description: "",
                    image: null,
                });
                setCroppedImage(null);
            } else {
                setError("Unexpected response from the server. Please try again.");
            }
        } catch (err) {
            setError("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Box
            sx={{
                maxWidth: { xs: "90%", sm: 500 },
                mx: "auto",
                mt: 5,
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                background: "#fff",
            }}
        >
            <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
                Add New Ornament
            </Typography>
            {error && <Typography color="error">{error}</Typography>}

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Ornament Name"
                    name="ornamentName"
                    value={formData.ornamentName}
                    onChange={handleChange}
                    required
                    margin="normal"
                />
                <TextField
                    select
                    fullWidth
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    margin="normal"
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                </TextField>
                <TextField
                    select
                    fullWidth
                    label="Metal Type"
                    name="metalType"
                    value={formData.metalType}
                    onChange={handleChange}
                    required
                    margin="normal"
                >
                    <MenuItem value="gold">gold</MenuItem>
                    <MenuItem value="silver">silver</MenuItem>
                </TextField>

                <TextField
                    select
                    fullWidth
                    label="OrnamentType"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    margin="normal"
                >
                    <MenuItem value="chain">Chain</MenuItem>
                    <MenuItem value="bracelet">Bracelet</MenuItem>
                    <MenuItem value="ring">Ring</MenuItem>
                </TextField>
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    multiline
                    rows={3}
                    margin="normal"
                />

                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} fullWidth sx={{ mt: 2 }}>
                    Upload Image
                    <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                </Button>

                {imageSrc && cropping && (
                    <Box sx={{ position: "relative", width: "100%", height: 300, mt: 2 }}>
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={handleCropComplete}
                        />
                        <Button onClick={handleCropImage} variant="contained" sx={{ mt: 2 }}>
                            Crop Image
                        </Button>
                    </Box>
                )}

                {croppedImage && (
                    <Card sx={{ mt: 2, borderRadius: 2, overflow: "hidden" }}>
                        <CardMedia component="img" height="200" image={croppedImage} alt="Cropped Preview" />
                    </Card>
                )}

                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
                    {loading ? "Uploading..." : "Add Ornament"}
                </Button>
            </form>
        </Box>
    );
};

export default AddOrnament;
