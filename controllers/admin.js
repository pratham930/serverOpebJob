
// import AdminSingup from "../Schema/AdminSingup.js";


import AdminSingup from "../Schema/admin/singup.js";
import initMB from 'messagebird';
const messagebird = initMB('ZUcVDMrE8WjDTdP0h22BQfXdV');
// process.env.SECRET_KEY
import bcrypt from "bcryptjs";
import Apllyjob from "../Schema/custumer.js/aplly.js";

import Postjob from "../Schema/postjob.js";
// import authenticate from "../middleware/authenticate.js";
import jwt from 'jsonwebtoken';
import { Country, State, City } from 'country-state-city';
// import  twilio from 'twilio';
// const client = new twilio(process.env.accountSid, process.env.authToken);


class adminController {



  static register = async (req, res) => {

    try {
      const { phonenumber, fullname, email, password } = req.body;

      console.log(req.body);
      const userLogin = await AdminSingup.findOne({ phonenumber: phonenumber });
      console.log(userLogin)
      if (userLogin) {
        if (userLogin.phonenumber == phonenumber) {
          console.log(userLogin)
          res.status(201).send({ message: "number already register", status: "failed" })
        }

        if (userLogin.email == email) {
          console.log(userLogin)
          res.status(201).send({ message: "number email register", status: "failed" })
        }
      }
      else {
        const lol = { phonenumber, fullname, email, password }
        const register = new AdminSingup(lol)
        await register.save()
        res.status(201).send({ message: "succesfull", status: "succesfull" })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data" })
    }
  }

  // static register = async (req, res) => {

  //   const { phonenumber, fullname, email, password } = req.body;
  //   console.log(req.body)
  //   try {

  //     const userLogin = await AdminSingup.findOne({ phonenumber: phonenumber });
  //     console.log(userLogin)
  //     if (userLogin) {
  //       if (userLogin.phonenumber == phonenumber) {
  //         console.log(userLogin)
  //         res.status(201).send({ message: "number already register", "status": "success", })
  //       }
  //     }
  //     else {
  //       const lol = { phonenumber, fullname, email, password }
  //       const register = new AdminSingup(lol)
  //       await register.save()
  //       res.status(201).send({ message: "succesfull", })
  //     }
  //   }
  //   catch (error) {
  //     console.log(error)
  //     return res.status(422).json({ error: "not found data" })
  //   };
  // }




  static Activatejob = async (req, res) => {

    try {
      const { _id } = req.params

      console.log(_id)
      const userLogin = await Postjob.findOne({ _id })
      // console.log(userLogin)

      if (userLogin) {
        await Postjob.findByIdAndUpdate(_id, { $set: { JobActivation: 'Active', } })
        res.send({ "status": "success", "message": "JobActivation succesfully" })
      }
      else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data" })
    }
  }


  static addtoExpired = async (req, res) => {

    try {
      const { _id } = req.params

      console.log(_id)
      const userLogin = await Postjob.findOne({ _id })
      // console.log(userLogin)

      if (userLogin) {
        await Postjob.findByIdAndUpdate(_id, { $set: { JobActivation: 'Expired', } })
        res.send({ "status": "success", "message": "Expired succesfully" })
      }
      else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data" })
    }
  }



  static AutomaticAddtoExpired = async (req, res) => {

    try {
      
      const userLogin = await Postjob.find({ "updatedAt": { $lt: new Date(new Date().getTime() - (15 * 24 * 60 * 60 * 1000)) } })
      


      if (userLogin) {


        console.log(userLogin)
        for (let index = 0; index < userLogin.length; index++) {
          const JobActivation = userLogin[index].JobActivation;
         
          const userNewProduct = await Product.findOneAndUpdate({JobActivation},{ $set: {JobActivation:'Expired'}})
          console.log(userNewProduct, "85")

        }

        // await Postjob.findByIdAndUpdate(_id, { $set: { JobActivation: 'Expired', } })
        res.send({ "status": "success", "message": "Expired succesfully" })
      }
      else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data" })
    }
  }




  static addtoUnderReview = async (req, res) => {

    try {
      const { _id } = req.params

      console.log(_id)
      const userLogin = await Postjob.findOne({ _id })
      // console.log(userLogin)

      if (userLogin) {
        await Postjob.findByIdAndUpdate(_id, { $set: { JobActivation: "under review", } })
        res.send({ "status": "success", "message": "Expired succesfully" })
      }
      else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data" })
    }
  }




  static addtoTerminate = async (req, res) => {

    try {
      const { _id } = req.params

      console.log(_id)
      const userLogin = await Postjob.findOne({ _id })
      // console.log(userLogin)

      if (userLogin) {
        await Postjob.findByIdAndUpdate(_id, { $set: { JobActivation: "Terminated", } })
        res.send({ "status": "success", "message": "Expired succesfully" })
      }
      else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data" })
    }
  }






  static about = async (req, res) => {
    console.log(`hello about page`);
    // console.log(req.user.role,"529")
    res.send({ "user": req.user })
  }


  static citylist = async (req, res) => {
    console.log(`hello about page`);
    // console.log(req.user.role,"529")
    res.send(City.getCitiesOfCountry("IN"))
  }


  static statelist = async (req, res) => {
    console.log(`hello about page`);
    // console.log(req.user.role,"529")
    res.send(State.getStatesOfCountry("IN"))
  }

  static getjobs = async (req, res) => {

    const userLogin = await Postjob.find()
    if (userLogin) {

      res.send(userLogin)
      console.log(userLogin)
    }

  }


  static getAllApplication = async (req, res) => {
    
    
    // const Id =  req.user._id.toString()
    // console.log(Id)
    // const id = "633875f72e28a098d916600d"
        const userLogin = await Apllyjob.find()
        if (userLogin) {
    
          res.send(userLogin)
          console.log(userLogin)
        }
    
      }

  static editProfile = async (req, res) => {

    try {
      const { fullname, phonenumber, email } = req.body

      // if (password && password_confirmation) {
      //   if (password !== password_confirmation) {
      //     res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
      //   }
      const userLogin = await Singup.findOne({ _id: req.user._id })
      // console.log(userLogin)

      if (userLogin) {
        await Singup.findByIdAndUpdate(req.user._id, { $set: { fullname: fullname, phonenumber: phonenumber, email: email } })
        res.send({ "status": "success", "message": "Profile changed succesfully" })
      }
      else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data" })
    }
  }




  static changeUserPassword = async (req, res) => {

    try {
      const { password, password_confirmation, Oldpassword } = req.body

      if (password && password_confirmation) {
        if (password !== password_confirmation) {
          res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
        }
        const userLogin = await AdminSingup.findOne({ _id: req.user._id })
        console.log(userLogin)
        if (userLogin) {
          //  console.log(userLogin._id)
          // console.log(req.user._id)

          const isMatch = await bcrypt.compare(Oldpassword, userLogin.password)
          if (isMatch) {
            const salt = await bcrypt.genSalt(10)
            const newHashPassword = await bcrypt.hash(password, salt)
            await AdminSingup.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
            res.send({ "status": "success", "message": "Password changed succesfully" })
          }
        }

        else {
          res.send({ "status": "failed", "message": "All Fields are Required" })
        }
      }
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data" })
    }
  }





  static getUnderReviewjobs = async (req, res) => {

    const userLogin = await Postjob.find({ JobActivation: "under review" })
    if (userLogin) {

      res.send(userLogin)
      console.log(userLogin)
    }
  }

  static getActivejobs = async (req, res) => {

    const userLogin = await Postjob.find({ JobActivation: "Active" })
    if (userLogin) {

      res.send(userLogin)
      console.log(userLogin)
    }
  }
  static getExpiredjobs = async (req, res) => {

    const userLogin = await Postjob.find({ JobActivation: "Expired" })
    if (userLogin) {

      res.send(userLogin)
      console.log(userLogin)
    }
  }



  static searchjobs = async (req, res) => {

    const { typeOfJob, jobcity } = req.body

    const userLogin = await Postjob.find()
    if (userLogin) {

      res.send(userLogin)
      console.log(userLogin)
    }

  }


  static test = async (req, res) => {
    const { phonenumber } = req.body
    console.log(`hello about page`);
    const userLogin = await AdminSingup.findOne({ phonenumber: phonenumber })
    if (userLogin) {
      console.log(userLogin)
    }

  }

  // console.log(req.user.role,"529")
  //   res.send({"user":req.user}) 


  // $api_url = "http://websms.textidea.com/app/smsapi/index.php?key=4630DB5DA691BB&campaign=8351&routeid=18&type=text&contacts=9302009469,&senderid=TEXTIT&msg=Hello+People%2C+have+a+great+day";

  static addFirstDetails = async (req, res) => {

    try {
      //  const {  name,landmark,adress,pincode,locality,mobile,st,pjl} = req.body;

      // if (!name || !locality || !adress ) {
      //   res.send({ "status": "failed", "message": "All Fields are Required" })

      // }
      const userLogin = await AdminSingup.findOne({ _id: req.user._id })
      if (userLogin) {
        //  console.log(userLogin._id)
        //  console.log(req.user._id)
        //  var objectAdress = { name,landmark,adress,pincode,locality,mobile,st,pjl}       
        await AdminSingup.findByIdAndUpdate(req.user._id, { $push: { firstfrom: req.body } })

        res.send({ "status": "success", "message": "addFirstDetails saved" })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data" })
    }
  }




  static login = async (req, res) => {

    try {
      const { phonenumber, password } = req.body
      console.log(req.body)
      if (!phonenumber || !password) {
        return res.status(400).json({ message: "pls filled data" })
      }

      const userLogin = await AdminSingup.findOne({ phonenumber: phonenumber });
      if (userLogin) {

        const isMatch = await bcrypt.compare(password, userLogin.password)

        // const token = await userLogin.generateAuthToken();
        const token = jwt.sign({ userID: userLogin._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
        // console.log(token); 
        // res.cookie("jwtoken", token,{
        //     expires:new Date(Date.now() + 2589000000),
        //    httpOnly:true});

        !isMatch ? res.status(400).send({ "status":"failed", message: "number or password wrong" }) : res.send({ "status": "success", "message": "Login Success", "token": token })

      }
      else { res.status(400).send({ message: "filled invalid data"  }) }

    } catch (error) {
      console.log(error);
    }
  };



  // static login = async (req, res) => {
  //   const { phonenumber } = req.body
  //   const newPhoneNumber = "+91" + phonenumber
  //   var params = {
  //     template: 'Your Login OTP is %token',
  //     timeout: 3000
  //   };

  //   messagebird.verify.create(newPhoneNumber, params,
  //     (err, response) => {
  //       if (err) {
  //         // Could not send OTP e.g. Phone number Invalid
  //         console.log("OTP Send Error:", err);
  //         res.status(200).send({ "status": "failed", "message": "Unable to Send OTP" })
  //       } else {
  //         // OTP Send Success
  //         console.log("OTP Send Response:", response);

  //         res.status(200).send({ "status": "success", "message": "OTP Send Successfully", "id": response.id })
  //       }
  //     });
  // }

  // static verifyOTP = async (req, res) => {

  //   const { id, otpcode, phonenumber } = req.body
  //   messagebird.verify.verify(id, otpcode,
  //     async (err, response) => {
  //       if (err) {
  //         // Incorrect OTP
  //         console.log("OTP Verification Error:", err)
  //         res.status(200).send({ "status": "failed", "message": "Invalid OTP" })
  //       } else {
  //         // Login Success
  //         console.log("OTP Verification Response:", response)


  //         const userLogin = await AdminSingup.findOne({ phonenumber: phonenumber });
  //         if (userLogin) {

  //           console.log(userLogin)
  //           const token = jwt.sign({ userID: userLogin._id }, process.env.SECRET_KEY, { expiresIn: '1d' })

  //           //   res.send({ "status": "success", "message": "Login Success", "token": token })



  //           res.status(200).send({ "status": "success", "message": "Login Success", "token": token })

  //         }
  //       }
  //     });
  // }


}

export default adminController;