const express = require('express');
const router = express.Router();

let isAvailable = true;
let deliveryPrice = 22;


router.get('/',(req,res)=>{
	res.json({
		deliveryPrice:deliveryPrice
	})
})

router.post('/',(req,res)=>{
	deliveryPrice =  req.body.deliveryPrice;
	res.json({status:false})
})

module.exports = router;