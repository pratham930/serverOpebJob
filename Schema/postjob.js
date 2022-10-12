import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const PostjobSchema = new mongoose.Schema({


    componayName: {
        type: String,
    },
    jobRole: {
        type: String,
    },

    typeOfJob: {
        type: String,
        // required:true,
        enum: ["Full time", "Part time"],
        default: "Full time"
    },

    vacncy: {
        type: String,
        // required:true
    },



    nightshift:{
        type:String
    },

    WorkLocationType: {
        type: String,
        enum: ["Work from office", "Work from home", "Field jobs"]
    },

    JobActivation: {
        type: String,
        enum: ["under review", "Active", "Expired", "Terminated"],
        default: "under review"
    },
    applicationFrom: {
        type: String,
        enum: ["Within 10KM", "Within 25km", "Entire City", "All India"]
    },
    ReceiveAnyWhre: {
        type: String,
        enum: ["Yes", "No"]
    },

    jobLocation: {
        type: String,

    },

    jobcity: {
        type: String,

    },
    paytype: {
        type: String,
        enum: ["Fixed only", "Fixed + incentive", "Incentive only"],

    },

    Minimum: {
        type: String,

    },
    Maximum: {
        type: String,

    },
    Average: {
        type: String,

    },

    amount: {
        type: String,

    },

    // additionPerks: [],
    Scity: { type: String },
    SelectedCity: { type: String },
    completeAdress: {
        type: String,
    },

    
    joiningfee: {
        type: String,
        enum: ["Yes", "No"],
    },
    Fee: {
        type: String,


    },
    feeFor: {
        type: String,


    },

    perks: {
        type: String,


    },
    reason: {
        type: String,


    },
    paid: {
        type: String,
        enum: ["Before the interview", "after job confirmation", "deduct from salary"],

    },


    miniumEducation: { type: String },
    specificQualification: { type: String },

    Gender: {
        type: String,
        enum: ["Male", "Female", "Both"]
    },
    experience: {
        type: String,
        enum: ["Any", "Fresher only", "Experienced only"]
    },
    experienceYear: {
        type: String,
        enum: ["Min 1 year", "Min 3 year", "Min 5 year", "Min 10 year"]
    },
    EnglishLevel: {
        type: String,
        enum: ["No eglish", "Thoda enlish", "Good english", "Fluent english"]
    },

    skills: [
        // skill1: { type: String },
        // skill2: { type: String },
        // skill3: { type: String },
        // skill4: { type: String },
        // skill5: { type: String }

    ],

    
    additionPerks: [
        // Weekly Payout: { type: String },
        // Laptop: { type: String },
        // others: { type: String },
        // skill4: { type: String },
        // skill5: { type: String }

    ],

    // skills: { type: String },
    document: { type: String },
    description: { type: String },
    completeAdress: { type: String },



    Interviewer: {
        type: String,
        enum: ["Myself", "Other Recruiter"]
    },

    RecruiterName: { type: String },
    HRWhatsapp: { type: String },
    Email: { type: String },
    typeOfInterview: {
        type: String,
        enum: ["In-person interview", "Telephonic/online interview"]
    },
    InterviewCity: { type: String },
    Area: { type: String },
    interviewsamecity:{type:String},

    managecandidates: {
        type: String,
        enum: ["Call + whatsapp", "whatsapp", "whatsapp + website"]
    },

  
    createdBy: { type: String },



 


},
    { timestamps: true }

)





const Postjob = mongoose.model('Postjob', PostjobSchema)


export default Postjob;