const express = require('express');
const User = require('../models/User');
const router = express.Router();


router.post('/signIn',(req,res)=>{
	let responseData = {
		accountExists:false,
		accountData:null
	}

	let phoneNo = req.body.phoneNo;
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


module.exports = router;
