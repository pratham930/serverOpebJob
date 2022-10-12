// import UserSingup from "../Schema/Registration.js";
import UserSingup from "../Schema/custumer.js/singup.js";
import initMB from 'messagebird';
const messagebird = initMB('ZUcVDMrE8WjDTdP0h22BQfXdV');
// process.env.SECRET_KEY
import bcrypt from "bcryptjs";
import Postjob from "../Schema/postjob.js";
import Apllyjob from "../Schema/custumer.js/aplly.js";
// import authenticate from "../middleware/authenticate.js";
import jwt from 'jsonwebtoken';
// import  twilio from 'twilio';
// const client = new twilio(process.env.accountSid, process.env.authToken);


class customerController {

  static register = async (req, res) => {

    try {
      const { phonenumber, fullname, email, password } = req.body;


      const userLogin = await UserSingup.findOne({ phonenumber: phonenumber });
      console.log(userLogin)
      if (userLogin) {
        if (userLogin.phonenumber == phonenumber) {
          console.log(userLogin)
          res.status(201).send({ message: "number already register", "status": "failed", })
        }
        if (userLogin) {
          if (userLogin.email == email) {
            console.log(userLogin)
            res.status(201).send({ message: "email already register", "status": "failed", })
          }
      }}
      else {
        const lol = { phonenumber, fullname, email, password }
        const register = new UserSingup(lol)
        await register.save()
        res.status(201).send({ message: "succesfull", "status": "success" })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data","status":"success" })
    }
  }


  static getActivejobs = async (req, res) => {

    const userLogin = await Postjob.find({ JobActivation: "Active" })
    if (userLogin) {

      res.send(userLogin)
      console.log(userLogin)
    }
  }


  // static Postjob = async (req, res) => {

  //   try {
  //     //   const {name,email,password,cpassword,work,mobile,role} = req.body;
  //     let lol = { ...req.body, createdBy: req.user._id }
  //     console.log(lol)
  //     const register = new Postjob(lol)
  //     await register.save()

  //     res.status(201).send({ message: " job  post succesfull", })
  //   }
  //   catch (error) {
  //     console.log(error)
  //     return res.status(422).json({ error: "not found data" })
  //   }
  // }




  static about = async (req, res) => {
    console.log(`hello about page`);
    // console.log(req.user.role,"529")
    res.send({ "user": req.user })
  }


  // static getActivejobs = async (req, res) => {

  //   const userLogin = await Postjob.find({ JobActivation: "Active" })
  //   if (userLogin) {

  //     res.send(userLogin)
  //     console.log(userLogin)
  //   }
  // }




  static getjobs = async (req, res) => {

    const userLogin = await Postjob.find()
    if (userLogin) {

      res.send(userLogin)
      console.log(userLogin)
    }

  }

  static getuserAppliedjobs = async (req, res) => {
console.log(req.user._id)

// const Id =  req.user._id.toString()
// console.log(Id)
// const id = "633875f72e28a098d916600d"
    const userLogin = await Apllyjob.find({appliedBy:req.user._id})
    if (userLogin) {

      res.send(userLogin)
      console.log(userLogin)
    }

  }


  

  static getActivepaginatedjobs = async (req, res) => {

    const Page_Size = 4;
    console.log(req.query.page)
    const page = parseInt(req.query.page || "0")
    const userLogin = await Postjob.find({ JobActivation: "Active" }).limit(Page_Size).skip(Page_Size * page)
    if (userLogin) {

      res.send(userLogin)
      console.log(userLogin.length)
    }

  }

  static getpaginatedjobs = async (req, res) => {

    const Page_Size = 5;
    const page = parseInt(req.query.page || "0")
    const userLogin = await Postjob.find().limit(Page_Size).skip(Page_Size * page)
    if (userLogin) {

      res.send(userLogin)
      console.log(userLogin.length)
    }

  }



  static getjobsbyId = async (req, res) => {

    const { _id } = req.params
    const userLogin = await Postjob.findOne({ _id })
    if (userLogin) {

      res.send(userLogin)
      console.log(userLogin)
    }

  }


  static ApllyJob = async (req, res) => {

    try {
      //   const {name,email,password,cpassword,work,mobile,role} = req.body;
      // console(req.body)
      // console(req.files['resume'][0].filename)
      const resume = req.files['resume'][0].filename

      let lol = { ...req.body, appliedBy: req.user._id, resume }

      console.log(lol, "lol");
      const apllyjob = new Apllyjob(lol)
      await apllyjob.save()

      res.status(201).send({ message: " job apllied succesfull", "status": "succesfull", })
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data", "status": "failed" })
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
    const userLogin = await UserSingup.findOne({ phonenumber: phonenumber })
    if (userLogin) {
      console.log(userLogin)
    }

  }


  static changeUserPassword = async (req, res) => {

    try {
      const { password, password_confirmation, Oldpassword } = req.body

      if (password && password_confirmation) {
        if (password !== password_confirmation) {
          res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
        }
        const userLogin = await UserSingup.findOne({ _id: req.user._id })
        console.log(userLogin)
        if (userLogin) {
          //  console.log(userLogin._id)
          // console.log(req.user._id)

          const isMatch = await bcrypt.compare(Oldpassword, userLogin.password)
          if (isMatch) {
            const salt = await bcrypt.genSalt(10)
            const newHashPassword = await bcrypt.hash(password, salt)
            await UserSingup.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
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


  // console.log(req.user.role,"529")
  //   res.send({"user":req.user}) 


  // $api_url = "http://websms.textidea.com/app/smsapi/index.php?key=4630DB5DA691BB&campaign=8351&routeid=18&type=text&contacts=9302009469,&senderid=TEXTIT&msg=Hello+People%2C+have+a+great+day";

  static addFirstDetails = async (req, res) => {

    try {
      //  const {  name,landmark,adress,pincode,locality,mobile,st,pjl} = req.body;

      // if (!name || !locality || !adress ) {
      //   res.send({ "status": "failed", "message": "All Fields are Required" })

      // }
      const userLogin = await UserSingup.findOne({ _id: req.user._id })
      if (userLogin) {
        //  console.log(userLogin._id)
        //  console.log(req.user._id)
        //  var objectAdress = { name,landmark,adress,pincode,locality,mobile,st,pjl}       
        await UserSingup.findByIdAndUpdate(req.user._id, { $push: { firstfrom: req.body } })

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

      if (!phonenumber || !password) {
        return res.status(400).json({ error: "pls filled data" })
      }

      const userLogin = await UserSingup.findOne({ phonenumber: phonenumber });
      if (userLogin) {

        const isMatch = await bcrypt.compare(password, userLogin.password)

        // const token = await userLogin.generateAuthToken();
        const token = jwt.sign({ userID: userLogin._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
        // console.log(token); 
        // res.cookie("jwtoken", token,{
        //     expires:new Date(Date.now() + 2589000000),
        //    httpOnly:true});

        !isMatch ? res.status(400).send({ message: "error" }) : res.send({ "status": "success", "message": "Login Success", "token": token })

      }
      else { res.status(400).send({ message: "filled invalid data" }) }

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


  // static about = async (req, res) => {
  //   console.log(`hello about page`);
  //   // console.log(req.user.role,"529")
  //   res.send({ "user": req.user })
  // }

  static verifyOTP = async (req, res) => {

    const { id, otpcode, phonenumber } = req.body
    messagebird.verify.verify(id, otpcode,
      async (err, response) => {
        if (err) {
          // Incorrect OTP
          console.log("OTP Verification Error:", err)
          res.status(200).send({ "status": "failed", "message": "Invalid OTP" })
        } else {
          // Login Success
          console.log("OTP Verification Response:", response)


          const userLogin = await UserSingup.findOne({ phonenumber: phonenumber });
          if (userLogin) {

            console.log(userLogin)
            const token = jwt.sign({ userID: userLogin._id }, process.env.SECRET_KEY, { expiresIn: '1d' })

            //   res.send({ "status": "success", "message": "Login Success", "token": token })



            res.status(200).send({ "status": "success", "message": "Login Success", "token": token })

          }
        }
      });
  }


}

export default customerController;