import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    packageName: {
        type: String,
    },
    price: {
        type: Number,
    },
    duration: {
        type: String,
    },
    state: {
        type: String,
    },
    theme: {
        type: String,
    },
    schedule: [
        {
            day: {
                type: String,
            },
            activities: [
                {
                    time: {
                        type: String,
                    },
                    title: {
                        type: String,
                    },
                    details: {
                        type: String,
                    }
                }
            ]
        }
    ],
    bonusActivities: {
        type: [String],
    },
    images: {
        type: [String], // Array to store multiple image URLs
        required: true,
    }
}, {
    timestamps: true
});

export const Package = mongoose.model("Package", packageSchema);
