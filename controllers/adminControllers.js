import { Admin } from "../models/admin.model.js";
import jwt from 'jsonwebtoken'
import { packageBoughtByUser } from "./emailService.js";

//this logic is to add admin credentials to backend
export const addAdmin = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" })
    }

    const admin = await Admin.create({
        email,
        password
    })

    if (!admin) {
        return res.status(500).json({ error: "Failed to add admin" })
    }

    return res.status(200).json({ message: "Admin added successfully" })

}

// this logic is to login admin
export const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" })
    }

    const user = await Admin.findOne({ email })

    if (!user) {
        return res.status(404).json({ error: "Admin does not Found" })
    }

    const isPasswordCorrect = await user.isPasswordValid(password)

    if (!isPasswordCorrect) {
        return res.status(401).json({ error: "Invalid Password" })
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: "admin" }, process.env.JWT_SECRET);

    return res
        .status(200)
        .json({ message: "Authentication Complete", token, id: user._id });
}


export const contactAdminForPackage = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            packageName,
            message,
            iAmA,
            instituteName,
            totalPassengers,
            destination,
            programDuration,
            cityDeparture,
            minBudget,
            maxBudget,
            travelDate,
            departureDate,
            contactPreference,
            callTime,
            specificCallTime, // New field
        } = req.body;

        // Validate required fields
        if (
            !name ||
            !email ||
            !phone ||
            !iAmA ||
            !totalPassengers ||
            !destination ||
            !programDuration ||
            !cityDeparture ||
            !minBudget ||
            !maxBudget ||
            !travelDate ||
            !departureDate ||
            !contactPreference ||
            !callTime
        ) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Construct the email message
        const emailMessage = `
        📌 New Package Inquiry
  
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Package: ${packageName}
  
        I am a: ${iAmA}
        Institute Name: ${instituteName || "Not provided"}
        Total Passengers: ${totalPassengers}
        Destination: ${destination}
        Program Duration: ${programDuration}
        City of Departure: ${cityDeparture}
        Budget Range: ₹${minBudget} - ₹${maxBudget}
        Travel Date: ${travelDate}
        Departure Date: ${departureDate}
        Contact Preference: ${contactPreference}
        Call Time: ${callTime === "Specific Time" ? specificCallTime : callTime}
  
        Message: ${message || "No message provided."}
      `;

        const subject = `New Package Inquiry from ${name}`;

        // Send email
        await packageBoughtByUser(email, emailMessage, subject);

        res.status(200).json({ success: true, message: "Your inquiry has been sent successfully." });
    } catch (error) {
        console.error("Error handling package inquiry:", error);
        res.status(500).json({ error: "Internal Server Error. Please try again later." });
    }
};