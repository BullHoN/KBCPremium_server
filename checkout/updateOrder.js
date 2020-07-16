const express = require('express');
const admin = require("firebase-admin");
const OrderNotification = require('../models/OrderNotification')
const User = require('../models/User')

const router = express.Router();

router.post('/:id',(req,res)=>{
	changeOrderStatusInUser(req.params.id,req.body.status,req.body.orderId)
	if(req.body.status == -1){
		sendNotificationToUser(req.body.fcmId,req.body.orderId,req.body.status);
		OrderNotification.findOneAndDelete({orderId:req.body.orderId}).then(()=>{
			res.json({status:true});
		})
	}else {
		sendDeliveredNotificationToUser(req.body.fcmId,req.body.orderId,req.body.status)
		OrderNotification.findOne({orderId:req.body.orderId}).then((order)=>{
			order.itemDelivered = true;
			order.outForDelivery = true;
			order.save().then(()=>{
				res.json({status:true});
			})
		})		
	}
})

function changeOrderStatusInUser(phoneNo,status,orderId) {
	User.findOne({phoneNo:phoneNo}).then((user)=>{
		if(user){
			let orderItems = user.orderItems;
			for(let i=0;i<orderItems.length;i++){
				if(orderItems[i].orderId == orderId){
					orderItems[i].status = status;
				}
			}

			user.orderItems = orderItems;
			user.save()
		}
	})
}

function sendDeliveredNotificationToUser(fcmId,orderId,status) {
	const message = {
		data:{
			title:"Order Delivered",
			body:"Your Order has been deliverd thanks for chosing us",
			orderId:orderId,
			status:status+""			
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

function sendNotificationToUser(fcmId,orderId,status) {
	const message = {
		data:{
			title:"Order Canceled",
			body:"Sorry To Inform You That Your Order has been Cancled",
			orderId:orderId,
			status:status+""			
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