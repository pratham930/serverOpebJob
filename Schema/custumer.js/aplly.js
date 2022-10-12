import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ApllyjobSchema = new mongoose.Schema({


    fullName: {
        type: String,
    },
    Email: {
        type: String,
    },

    // typeOfJob: {
    //     type: String,
    //     // required:true,
    //     enum: ["Full time", "Part time"],
    //     default: "Full time"
    // },

    number: {
        type: String,
        // required:true
    },



    Jobtitle: {
        type: String,
    },
    relocate: {
        type: String,
        enum: ["Yes, I can commute", "Yes, I am planning to relocate", "No",
            "Yes, but I need relocation assistance",
        ]
    },


    City: {
        type: String,

    },

    resume: {
        type: String,

    },


    Company: {
        type: String,

    },
    experience: {
        type: String,

    },
    appliedBy: {
        type: String,

    },


    interviewDate: {
        type: String,

    },
    appliedTo: {
        type: String,

    },
    ApplicationStatus: {
        type: String,
        enum: ["Review Pending", "Reviewed", "Not Relevant"],
defualt :"Review Pending"
    },

},
    { timestamps: true }

)


const Apllyjob = mongoose.model('Apllyjob', ApllyjobSchema)


export default Apllyjob;