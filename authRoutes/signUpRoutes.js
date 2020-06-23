const express = require('express');
const User = require('../models/User');
const router = express.Router();


router.post('/signUp',(req,res)=>{
	let user = new User({
		name:req.body.name,
		phoneNo:req.body.phoneNo,
		address:req.body.address,
		nearByAddress:req.body.nearByAddress
	}).save().then(()=>{
		console.log('new user saved');
		res.json({status:true});
	})
})


module.exports = router;
