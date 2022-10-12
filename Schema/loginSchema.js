import mongoose from 'mongoose'

const loginSchema = new mongoose.Schema({

    phonenumber:{
        type: Number,
        required:true
    },

    fullname:{
        type: String,
        required:true
    },
    hiringFor:{
        type: String,
        required:true
    },
    companyName:{
        type: String,
        required:true
        
    },
    companyWeb:{
        type: String,
       
    },
    employeesNumber:{
        type: Number,
        required:true
    },
})

const Login = mongoose.model('Login', loginSchema)


export default Registration;