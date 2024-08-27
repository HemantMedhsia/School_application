import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const studentSchema = new mongoose.Schema({
    admissionNo: {
        type: String,
        required: true,
    },
    rollNumber: {
        type: String,
        unique: true,
    },
    studentLoginPassword: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
    },
    religion: {
        type: String,
    },
    caste: {
        type: String,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    admissionDate: {
        type: Date,
    },
    studentPhoto: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
    },
    house: {
        type: String,
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    measurementDate: {
        type: Date,
    },
    medicalHistory: {
        type: String,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parent",
        required: true,
    },
    StudentAttendance: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "StudentAttendance",
        },
    ],
    complaints: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Complaint",
        },
    ],
    refreshToken: {
        type: String,
    },
    role: {
        type: String,
        default: "Student",
    },
});

studentSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

studentSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

studentSchema.pre("save", async function (next) {
    try {
        // Hash the password only if it has been modified or is new
        if (!this.isModified("studentLoginPassword")) return next();

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        this.studentLoginPassword = await bcrypt.hash(
            this.studentLoginPassword,
            salt
        );
        next();
    } catch (error) {
        next(error);
    }
});

// Method to validate the password
studentSchema.methods.isValidPassword = async function (studentLoginPassword) {
    try {
        return await bcrypt.compare(
            studentLoginPassword,
            this.studentLoginPassword
        );
    } catch (error) {
        throw new Error(error);
    }
};

export const Student = mongoose.model("Student", studentSchema);
