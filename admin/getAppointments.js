const express = require('express');
const BookingNotification = require('../models/BookingNotification');
const User = require('../models/User')
const router = express.Router();

router.get('/appointments',(req,res)=>{
	BookingNotification.find({}).then((items)=>{
		getCustomerDetails(items).then((data)=>{
			res.json(data);
		})
	})
})



async function getCustomerDetails(items) {
	return new Promise(async (resolve1,reject)=>{
		let returnItems = [];
		for(let i=0;i<items.length;i++){
			let item = items[i];
			let getData = new Promise((resolve,reject)=>{
				User.findOne({phoneNo:item.customer_phoneNo}).then((user)=>{
					let dateString = item.createdAt.toString().split("G")[0];
					let newItems = {
						amount:item.amount,
						fcmId:item.fcmId,
						orderId:item.orderId,
						orderItems:item.orderItems,
						customer_phoneNo:item.customer_phoneNo,
						arrivedAt:dateString,
						bookingTime:item.bookingTime,
						bookingDate:item.bookingDate
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