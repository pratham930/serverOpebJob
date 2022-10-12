import express from "express";
import customerController from "../controllers/customer.js";
import authenticate from "../middileware/userAuthenticate.js";
import upload from "../middileware/upload.js";


const router = express.Router();

router.use('/user/ApllyJob', upload.fields([{ name: 'resume', maxcount: 1 }]));


//patch
router.post('/user/changeUserPassword', authenticate, customerController.changeUserPassword);
router.post('/user/editProfile', authenticate, customerController.editProfile);

//post
router.post('/user/register', customerController.register);
router.post('/user/login', customerController.login);
router.post('/user/ApllyJob', authenticate, customerController.ApllyJob);

//get request

router.get('/getjobsbyId/:_id', customerController.getjobsbyId);
router.get('/user/about', authenticate, customerController.about);
router.get('/user/getActivejobs', customerController.getActivejobs);
router.get('/getjobs', customerController.getjobs);
router.get('/getActivepaginatedjobs', customerController.getActivepaginatedjobs);
router.get('/getpaginatedjobs', customerController.getpaginatedjobs);
router.get('/getuserAppliedjobs',authenticate, customerController.getuserAppliedjobs);


//delete


export default router;