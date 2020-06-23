const express = require('express');
const router = express.Router();

let isAvailable = true;

router.get('/',(req,res)=>{
	res.json({isAvailable:isAvailable})
})


module.exports = router;