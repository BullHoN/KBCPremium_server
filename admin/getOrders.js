const express = require('express');
const OrderNotification = require('../models/OrderNotification');
const User = require('../models/User')
const router = express.Router();


router.get('/getOrders',(req,res)=>{
	if(req.query.outForDelivery == 'false'){
		OrderNotification.find({outForDelivery:false}).sort({createdAt:'descending'}).then((items)=>{
			getCustomerDetails(items).then((data)=>{
				res.json(data);
			})
		})
	}else if(req.query.outForDelivery == 'true'){
		OrderNotification.find({outForDelivery:true}).sort({createdAt:'descending'}).then((items)=>{
			getCustomerDetails(items).then((data)=>{
				res.json(data);
			})
		})		
	}else if(req.query.itemDelivered == 'true'){
		OrderNotification.find({itemDelivered:true}).sort({createdAt:'descending'}).then((items)=>{
			getCustomerDetails(items).then((data)=>{
				res.json(data);
			})
		})		
	}
})


async function getCustomerDetails(items) {
	return new Promise(async (resolve1,reject)=>{
		let returnItems = [];
		for(let i=0;i<items.length;i++){
			let item = items[i];
			let getData = new Promise((resolve,reject)=>{
				User.findOne({phoneNo:item.customer_phoneNe}).then((user)=>{
					let dateString = item.createdAt.toString().split("G")[0];
					let newItems = {
						amount:item.amount,
						fcmId:item.fcmId,
						orderId:item.orderId,
						orderItems:item.orderItems,
						outForDelivery:item.outForDelivery,
						itemDelivered:item.itemDelivered,
						customer_phoneNe:item.customer_phoneNe,
						arrivedAt:dateString,
						isPaid:item.isPaid,
						deliveryCharge:item.deliveryCharge
					}

					newItems.name = user.name;
					newItems.address = user.address;
					newItems.nearByAddress = user.nearByAddress;
					newItems.phoneNo = user.phoneNo;

					resolve(newItems);					

				})
			})
			let result = await getData; 
			returnItems.push(result);			
		}
		resolve1(returnItems);
	})
}

module.exports = router;