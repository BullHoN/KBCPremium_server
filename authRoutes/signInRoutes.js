const express = require('express');
const User = require('../models/User');
const router = express.Router();
const sendOtp = require('./sendOtp')


router.post('/signIn',(req,res)=>{
	let responseData = {
		accountExists:false,
		accountData:null,
		otp:null
	}

	let phoneNo = req.body.phoneNo;
	let otp = generateOtp()
	responseData.otp = otp;
	// console.log(otp)
	sendOtp(phoneNo,otp)

	User.findOne({phoneNo:phoneNo}).then((user)=>{
		if(user){
			responseData.accountExists = true;
			responseData.accountData = user;
			res.json(responseData);
		}else {
			res.json(responseData);
		}
	})

})


function generateOtp() {
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 	
}

module.exports = router;
