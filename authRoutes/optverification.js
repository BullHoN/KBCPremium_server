const express = require('express')
const router = express.Router()
const sendOtp = require('./sendOtp')



router.post('/verifyOtp',(req,res)=>{
	// sendOtp("7983704976","12345")
})

module.exports = router