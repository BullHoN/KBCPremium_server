const express = require('express');
const admin = require("firebase-admin");
const BookingNotification = require('../models/BookingNotification');

const router = express.Router();

router.post('/',(req,res)=>{
	sendNotificationToUser(req.body.fcmId,req.body.orderId);
	BookingNotification.findOneAndDelete({orderId:req.body.orderId}).then(()=>{
		res.json({status:true});
	})
})

function sendNotificationToUser(fcmId,orderId) {
	const message = {
		data:{
			title:"Booking Completed",
			body:"Thanks For Chosing Us we hope that you had a wonderfull experience",
			orderId:orderId			
		},
		token:fcmId
	}

	admin.messaging().send(message)
	  .then((response) => {
	    console.log('Successfully sent message to ' + "user", response);
	  })
	  .catch((error) => {
	    console.log('Error sending message to' + "user", error);
	  });	

}

module.exports = router;