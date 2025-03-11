import { Package } from "../models/package.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// In your backend controller
export const addPackage = async (req, res) => {
    try {
        const { packageName, price, duration, state, theme, schedule, bonusActivities } = req.body;

        // Handle image uploads
        const uploadedImages = req.files
            ? await Promise.all(req.files.map(async (file) => {
                const result = await uploadOnCloudinary(file.path);
                return result.secure_url;
            }))
            : [];

        // Combine existing and new images
        const allImages = [...uploadedImages];

        const newPackage = await Package.create({
            packageName,
            price: Number(price),
            duration,
            state,
            theme,
            schedule: JSON.parse(schedule),
            bonusActivities: JSON.parse(bonusActivities),
            images: allImages,
        });

        res.status(201).json({ message: "Package created successfully", package: newPackage });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

export const updatePackage = async (req, res) => {
    try {
        const { _id, existingImages = [], ...updateData } = req.body;

        let existingImages2 = JSON.parse(existingImages) 

        const uploadedImages = req.files
            ? await Promise.all(req.files.map(async (file) => {
                const result = await uploadOnCloudinary(file.path);
                return result.secure_url;
            }))
            : [];

        // Combine existing and new images
        const allImages = [...existingImages2, ...uploadedImages];

        const updatedPackage = await Package.findByIdAndUpdate(
            _id,
            {
                ...updateData,
                price: Number(updateData.price),
                schedule: JSON.parse(updateData.schedule),
                bonusActivities: JSON.parse(updateData.bonusActivities),
                images: allImages,
            },
            { new: true }
        );

        res.status(200).json({ message: "Package updated successfully", package: updatedPackage });
    } catch (error) {
        res.status(500).json({ error: "Failed to update package", details: error.message });
    }
};

export const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find();
        return res.status(200).json({ packages });
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch packages" });
    }
};

export const getPackageById = async (req, res) => {
    try {
        const { id } = req.params;
        const packageData = await Package.findById(id);

        if (!packageData) {
            return res.status(404).json({ error: "Package not found" });
        }

        return res.status(200).json({ package: packageData });
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch package" });
    }
};


export const deletePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const packageToDelete = await Package.findById(id);

        if (!packageToDelete) {
            return res.status(404).json({ error: "Package not found" });
        }

        await Package.findByIdAndDelete(id);
        return res.status(200).json({ message: "Package deleted successfully" });

    } catch (error) {
        return res.status(500).json({ error: "Failed to delete package" });
    }
};