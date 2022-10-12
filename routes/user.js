import express from "express";
import userController from "../controllers/user.js";
import authenticate from "../middileware/authenticate.js";
import upload from "../middileware/upload.js";



const router = express.Router();


router.use( '/addVerificationDetails',upload.fields([{name:'gst',maxcount:1},{name:'pan',maxcount:1}
,{name:'cin',maxcount:1},{name:"udyan",maxCount:1},{name:"fssai",maxcount:1},{name:"license",maxcount:1}

]));

//post request
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/Postjob', authenticate, userController.Postjob);
router.post('/addFirstDetails', authenticate, userController.addFirstDetails);
// router.post('/login', UserController.userLogin)
router.post('/verify', userController.verifyOTP)
//patch
router.patch('/editjobbyid', userController.editjobbyid);
router.patch('/EditfirstfrombyId', authenticate, userController.EditfirstfrombyId);


router.patch('/editProfile', authenticate, userController.editProfile);
router.post('/changeUserPassword', authenticate, userController.changeUserPassword);
router.post('/addVerificationDetails', authenticate, userController.addVerificationDetails);




//get request
router.get('/test', userController.test);
router.get('/getpostjobs', authenticate, userController.getpostjobs);
router.get('/about', authenticate, userController.about);
router.get('/getapplicationById/:_id', authenticate, userController.getapplicationById);


//delete
router.delete('/deletejobbyid/:_id', userController.deletejobbyid);

export default router