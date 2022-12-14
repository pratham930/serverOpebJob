
import Singup from "../Schema/Singup.js";
import Apllyjob from "../Schema/custumer.js/aplly.js";
import initMB from 'messagebird';
const messagebird = initMB('ZUcVDMrE8WjDTdP0h22BQfXdV');
// process.env.SECRET_KEY
import bcrypt from "bcryptjs";
import Postjob from "../Schema/postjob.js";
// import authenticate from "../middleware/authenticate.js";
import jwt from 'jsonwebtoken';



class userController {



  static register = async (req, res) => {

    try {
      const { phonenumber, fullname, email, password } = req.body;

      console.log(req.body,"24")
      const userLogin = await Singup.findOne({ phonenumber: phonenumber });
      console.log(userLogin)
      if (userLogin) {
        if (userLogin.email == email) {
          console.log(userLogin)
          res.status(201).send({ message: "email already register", "status": "failed", })
        }
        if (userLogin.phonenumber == phonenumber) {
          console.log(userLogin)
          res.status(201).send({ message: "number already register", "status": "failed", })
        }
      }
      else {
        const lol = { phonenumber, fullname, email, password }
        const register = new Singup(lol)
        await register.save()
        res.status(201).send({ message: "succesfull","status":"success" })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ message: "not found data" ,"status":"failed" })
    }
  }



  static Postjob = async (req, res) => {

    try {
      //   const {name,email,password,cpassword,work,mobile,role} = req.body;
      let lol = { ...req.body, createdBy: req.user._id }

      console.log(lol)
      const register = new Postjob(lol)
      await register.save()

      res.status(201).send({ message: " job  post succesfull", })
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


  static test = async (req, res) => {
    const { phonenumber } = req.body
    console.log(`hello about page`);
    const userLogin = await Singup.findOne({ phonenumber: phonenumber })
    if (userLogin) {
      console.log(userLogin)
    }

  }

 
  static addFirstDetails = async (req, res) => {

    try {
      
      const userLogin = await Singup.findOne({ _id: req.user._id })
      if (userLogin) {
         
        await Singup.findByIdAndUpdate(req.user._id, { $push: { firstfrom: req.body } })

        res.send({ "status": "success", "message": "addFirstDetails saved" })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data" })
    }
  }

  static addVerificationDetails = async (req, res) => {

    try {
     
      const userLogin = await Singup.findOne({ _id: req.user._id })
      if (userLogin) {
        

        const gst = req.files['gst'][0].filename;
        const cin = req.files['cin'][0].filename
        const pan = req.files['pan'][0].filename
        const udyan = req.files['udyan'][0].filename
        const fssai = req.files['fssai'][0].filename
        const license = req.files['license'][0].filename

        
const  body = {gst,cin,pan,udyan,pan,fssai,license} 
        
        
        //  console.log(req.user._id)
        //  var objectAdress = { name,landmark,adress,pincode,locality,mobile,st,pjl}       
        await Singup.findByIdAndUpdate(req.user._id, { $push: { verificationForm: body } })

        res.send({ "status": "success", "message": "VerificationDetails saved" })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data","message":"not saved" })
    }
  }


  static EmployeeActivatejob = async (req, res) => {

    try {
      const { _id } = req.params

      console.log(_id)
      const userLogin = await Postjob.findOne({ _id })
      // console.log(userLogin)

      if (userLogin.JobActivation = "Expired") {
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




  static login = async (req, res) => {

    try {
      const { phonenumber, password } = req.body
      console.log(req.body)
      if (!phonenumber || !password) {
        return res.status(400).json({ error: "pls filled data" })
      }

      const userLogin = await Singup.findOne({ phonenumber: phonenumber });
      if (userLogin) {

        const isMatch = await bcrypt.compare(password, userLogin.password)

        
        const token = jwt.sign({ userID: userLogin._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
        
        !isMatch ? res.status(400).send({ message: "error" }) : res.send({ "status": "success", "message": "Login Success", "token": token })

      }
      else { res.status(400).send({ message: "filled invalid data" }) }

    } catch (error) {
      console.log(error);
    }
  };






  
  static getpostjobs = async (req, res) => {

    const { _id } = req.user
    const userLogin = await Postjob.find({ createdBy: _id })
    if (userLogin) {

      res.send(userLogin)
      console.log(userLogin)
    }
}



static getjobsbyName = async (req, res) => {
  const {name} = req.params
  console.log(name)
  const { _id } = req.user
  console.log(_id)
  const userLogin = await Postjob.find({JobActivation:name})

  if (name == "All") {
    const userLogin = await Postjob.find({createdBy:_id})
    res.send(userLogin)
  }

  if (userLogin && name !== "All" ) {
    // console.log(userLogin)


   const job = userLogin.filter((e)=>{
      return(e.createdBy == _id)
    })

    if (job){
      console.log(job)
      res.send(job)}
    
  }
}


// JobActivation

  static getapplicationById = async (req, res) => {
    //console.log(req.user._id)
    // const Id =  req.user._id.toString()
    // console.log(Id)
    // const id = "633875f72e28a098d916600d"
   const {_id}= req.params
    const userLogin = await Apllyjob.find({appliedTo:_id})
        if (userLogin) {
    
          res.send(userLogin)
          console.log(userLogin)
        }
    
      }

 



  static deletejobbyid = async (req, res) => {

    const { _id } = req.params
    const userLogin = await Postjob.findByIdAndDelete({ _id })
    if (userLogin) {

      // res.send(userLogin)
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


  static EditfirstfrombyId = async (req, res) => {

    try {

      const { companyName, companyWeb, employeesNumber } = req.body;
      const { _id } = req.params;
      console.log("rid", _id);


      const userLogin = await Singup.findOne({ _id: req.user._id })
      if (userLogin) {


        const ram = await Singup.findOneAndUpdate(
          { "firstfrom": { "$elemMatch": { _id: _id } } },
          {
            $set: {
              "adress.$.companyName": companyName,
              "adress.$.companyWeb": companyWeb,
              "adress.$.employeesNumber": employeesNumber,
              // "adress.$.pincode": pincode,
              // "adress.$.locality": locality,
              // "adress.$.mobile": mobile,

            }
          },
        )
        res.send({ "status": "success", "message": "adress saved", 'adress': userLogin.adress })


      }
    } catch (error) {

      console.log("error" + error.message);
    }
  }


  static changeUserPassword = async (req, res) => {

    try {
      const { password, password_confirmation, Oldpassword } = req.body

      if (password && password_confirmation) {
        if (password !== password_confirmation) {
          res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
        }
        const userLogin = await Singup.findOne({ _id: req.user._id })
        console.log(userLogin)
        if (userLogin) {
          //  console.log(userLogin._id)
          // console.log(req.user._id)

          const isMatch = await bcrypt.compare(Oldpassword, userLogin.password)
          if (isMatch) {
            const salt = await bcrypt.genSalt(10)
            const newHashPassword = await bcrypt.hash(password, salt)
            await Singup.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
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



  static editjobbyid = function (req, res) {

    console.log(req.body);
    const { _id } = req.body

    Postjob.findByIdAndUpdate(_id, { $set: req.body }, { new: true }, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log("RESULT: " + result);
      res.send('Done')
    });
  };


  static editjobbyid = async (req, res) => {

    const { _id } = req.params
    const userLogin = await Postjob.findByIdAndUpadet({ _id })
    if (userLogin) {

      // res.send(userLogin)
      console.log(userLogin)
    }

  }




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


          const userLogin = await Singup.findOne({ phonenumber: phonenumber });
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

export default userController;