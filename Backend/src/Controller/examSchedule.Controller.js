import wrapAsync from "../Utils/wrapAsync.js";
import { ApiResponse } from "../Utils/responseHandler.js";
import { ApiError } from "../Utils/errorHandler.js";
import { ExamSchedule } from "../Models/examSchedule.model.js";
import mongoose from "mongoose";
import { examScheduleValidation } from "../Validation/examSchedule.Validation.js";

export const createExamSchedule = wrapAsync(async (req, res) => {
    // const { error } = examScheduleValidation.validate(req.body);
    // if (error) {
    //     return res.status(400).json({ message: error.details[0].message });
    // }

    const { term, classId, examType, subjectGroup, examDetails } = req.body;

    const newExamSchedule = new ExamSchedule({
        term: new mongoose.Types.ObjectId(term),
        class: new mongoose.Types.ObjectId(classId),
        examType: new mongoose.Types.ObjectId(examType),
        subjectGroup: new mongoose.Types.ObjectId(subjectGroup),
        examDetails: examDetails.map((details) => ({
            subject: new mongoose.Types.ObjectId(details.subject),
            examDate: new Date(details.examDate),
            startTime: new Date(details.startTime),
            endTime: new Date(details.endTime),
        })),
    });

    await newExamSchedule.save();
    res.status(201).json(
        new ApiResponse(
            201,
            newExamSchedule,
            "Exam Schedule Created Successfully"
        )
    );
});

export const getExamSchedules = wrapAsync(async (req, res) => {
    const examSchedules = await ExamSchedule.find()
        .populate("term")
        .populate("class")
        .populate("examType")
        .populate("subjectGroup")
        .populate("examDetails.subject");
    res.status(200).json(
        new ApiResponse(
            200,
            examSchedules,
            "Exam Schedules Fetched Successfully"
        )
    );
});

export const getExamScheduleById = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const examSchedule = await ExamSchedule.findById(id)
        .populate("term")
        .populate("class")
        .populate("examType")
        .populate("subjectGroup")
        .populate("examDetails.subject");
    if (!examSchedule) {
        throw new ApiError(404, "Exam Schedule not found");
    }
    res.status(200).json(
        new ApiResponse(200, examSchedule, "Exam Schedule Fetched Successfully")
    );
});

export const updateExamSchedule = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { term, classId, examType, subjectGroup, examDetails } = req.body;

    const updatedExamSchedule = await ExamSchedule.findByIdAndUpdate(
        id,
        {
            term: new mongoose.Types.ObjectId(term),
            class: new mongoose.Types.ObjectId(classId),
            examType: new mongoose.Types.ObjectId(examType),
            subjectGroup: new mongoose.Types.ObjectId(subjectGroup),
            examDetails: examDetails.map((details) => ({
                subject: new mongoose.Types.ObjectId(details.subject),
                examDate: new Date(details.examDate),
                startTime: new Date(details.startTime),
                endTime: new Date(details.endTime),
            })),
        },
        { new: true }
    );

    if (!updatedExamSchedule) {
        throw new ApiError(404, "Exam Schedule not found");
    }
    res.status(200).json(
        new ApiResponse(
            200,
            updatedExamSchedule,
            "Exam Schedule Updated Successfully"
        )
    );
});

export const deleteExamSchedule = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const examSchedule = await ExamSchedule.findByIdAndDelete(id);
    if (!examSchedule) {
        throw new ApiError(404, "Exam Schedule not found");
    }
    res.status(200).json(
        new ApiResponse(200, null, "Exam Schedule Deleted Successfully")
    );
});


export const getExamSchedulesByClass = wrapAsync(async (req, res) => {
    const { classId } = req.params;
    const examSchedules = await ExamSchedule.find({ class: classId })
        .populate("term")
        .populate("class")
        .populate("examType")
        .populate("subjectGroup")
        .populate("examDetails.subject");
    if (!examSchedules || examSchedules.length === 0) {
        throw new ApiError(404, "Exam Schedules not found");
    }
    res.status(200).json(
        new ApiResponse(
            200,
            examSchedules,
            "Exam Schedules fetched successfully"
        )
    );
});


export const getExamSchedulesByTerm = wrapAsync(async (req, res) => {
    const { termId } = req.params;
    const examSchedules = await ExamSchedule
        .find({ term: termId })
        .populate("term")
        .populate("class")
        .populate("examType")
        .populate("subjectGroup")
        .populate("examDetails.subject");
    if (!examSchedules || examSchedules.length === 0) {
        throw new ApiError(404, "Exam Schedules not found");
    }
    res.status(200).json(
        new ApiResponse(
            200,
            examSchedules,
            "Exam Schedules fetched successfully"
        )
    );

});


export const getExamSchedulesBySubjectGroup = wrapAsync(async (req, res) => {
    const { subjectGroupId } = req.params;
    const examSchedules = await ExamSchedule
        .find({ subjectGroup: subjectGroupId })
        .populate("term")
        .populate("class")
        .populate("examType")
        .populate("subjectGroup")
        .populate("examDetails.subject");
    if (!examSchedules || examSchedules.length === 0) {
        throw new ApiError(404, "Exam Schedules not found");
    }
    res.status(200).json(
        new ApiResponse(
            200,
            examSchedules,
            "Exam Schedules fetched successfully"
        )
    );
}
);


