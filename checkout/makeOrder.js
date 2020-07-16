const express = require('express');
const OrderNotification = require('../models/OrderNotification');
var admin = require("firebase-admin");
const User = require('../models/User');
const router = express.Router();



router.post('/checkout',(req,res)=>{
	// console.log(req.body)
	User.findOne({phoneNo:req.body.phNumber}).then((user)=>{
		if(user){
			user.address = req.body.address;
			user.nearByAddress = req.body.nearBy;

			user.orderItems = [...user.orderItems,{
				status:0,
				total:req.body.total,
				items:req.body.orderItems,
				orderId:req.body.orderId
			}]

			user.save().then(()=>{
				res.json({status:true});
				saveNotification(req.body);
			})
		}else {
			res.json({status:false});
		}
	})
})


function saveNotification(data) {
	const orderNotification = new OrderNotification({
		amount: data.total,
		fcmId: data.fcm_id,
		orderId: data.orderId,
		orderItems: data.orderItems,
		customer_phoneNe: data.phNumber,
		deliveryCharge: data.deliveryCharge,
		isPaid: data.isPaid
	}).save().then(()=>{
		console.log('new order saved');
		sendNotificationToAdmin();
	})
}

// sendNotificationToAdmin();

function sendNotificationToAdmin() {
	const message = {
		data:{
			title:"New Order arrived",
			body:"Hurry up look at new order"			
		},
		topic:"admin"
	}

	admin.messaging().send(message)
	  .then((response) => {
	    console.log('Successfully sent message to ' + "admin", response);
	  })
	  .catch((error) => {
	    console.log('Error sending message to' + "admin", error);
	  });	

}

module.exports = router;