const express = require('express');
const router = express.Router();

let isAvailable = true;
let deliveryPrice = 22;

let upiId = "7081256474@ybl"
let upiName = "Prakhar Bhatt"

router.get('/',(req,res)=>{
	res.json({
		deliveryPrice:deliveryPrice,
		upiId:upiId,
		upiName:upiName
	})
})

router.post('/',(req,res)=>{
	deliveryPrice =  req.body.deliveryPrice;
	res.json({status:false})
})

module.exports = router;