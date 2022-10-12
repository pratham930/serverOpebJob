import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerSchema = new mongoose.Schema({

    phonenumber: {
        type: Number,
        required: true,
        unique: true
    },

    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },


verificationForm: [{
    gst: { type: String },
    pan: { type: String },
    cin: { type: String },
    udyan: { type: String },
    fssai: { type: String },
    license: { type: String }
}],


CompanyStates: {
    type: String,
    enum: ["verified", "Unverified","Terminated"],
    default:"unverfied"
},

    firstfrom: [
        {
            hiringFor: {
                type: String,

                required: true
            },
            hiringoption: {
                type: String,
                enum: ["My own company", "My clients"],
                required: true
            },
            companyName: {
                type: String,

                required: true

            },
            companyWeb: {
                type: String,

            },
            employeesNumber: {
                type: String,

            },

        }]
    ,


   

})

registerSchema.pre('save', async function (next) {
    console.log("hii pre");
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.confrimPassword = await bcrypt.hash(this.password, 12)
    }
    next();
})




const Singup = mongoose.model('Singup', registerSchema)


export default Singup;