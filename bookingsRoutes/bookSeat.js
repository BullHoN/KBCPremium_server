const express = require('express');
const router = express.Router();
var admin = require("firebase-admin");
const User = require('../models/User');
const BookingNotification = require('../models/BookingNotification');
let seats = require('./seats.json')
let marrige = require('./marrige.json')

// {
// 	"21 July 2020":{
// 		"Hair Care":{
// 			"5:00":1
// 		}
// 	}
// }

// {
// 	"21 July 2020":{
// 		"5:00":1
// 	}
// }

// {
// 	"15 July 2020":2
// }

let bookingOpen = true;

router.get('/status/:id',(req,res)=>{
	if(req.params.id == 'true'){
		bookingOpen = !bookingOpen;
	}
	res.json({isOpen:bookingOpen})
})
 
router.get('/:date',(req,res)=>{
	if(marrige[req.params.date]){
		res.json({seats:marrige[req.params.date]})
	}else {
		res.json({seats:0})
	}
})

router.post('/',(req,res)=>{

	if(!bookingOpen){
		res.json({status:false,reason:"Sorry, we are not taking any booking right now"});
		return;
	}


	if(req.body.bookingCat == "Make-Up\n(Bridal,Party)"){
		if(marrige[req.body.selectedDate]){
			if(marrige[req.body.selectedDate] == 15){
				res.json({status:false,reason:"Time Not Available"});
			}else{
				marrige[req.body.selectedDate]++;
				saveUserDetails(req.body);
				saveNotification(req.body);				
				res.json({status:true,reason:"Time is Available"});
			}
		}else {
			marrige[req.body.selectedDate] = 1;
			saveUserDetails(req.body);
			saveNotification(req.body);				
			res.json({status:true,reason:"Time is Available"});
		}
		return;
	}

	if(seats[req.body.selectedDate]){ 
			if(seats[req.body.selectedDate][req.body.selectedTime]){
				if(seats[req.body.selectedDate][req.body.selectedTime] == 5){
					res.json({status:false,reason:"Time Not Available"});
				}else {
					seats[req.body.selectedDate][req.body.selectedTime]++;
					saveUserDetails(req.body);
					saveNotification(req.body);
					res.json({status:true,reason:"Time is Available"});
				}
			}else {
				seats[req.body.selectedDate][req.body.selectedTime] = 1;
				saveUserDetails(req.body);
				saveNotification(req.body);			
				res.json({status:true,reason:"Time is Available"});	
			}
	}else {
		seats[req.body.selectedDate] = {};
		seats[req.body.selectedDate][req.body.selectedTime] = 1;

		saveUserDetails(req.body);
		saveNotification(req.body);			
		res.json({status:true,reason:"Time is Available"});
	}
});

function saveUserDetails(data) {
	User.findOne({phoneNo:data.phNumber}).then((user)=>{
		user.address = data.address;
		user.nearByAddress = data.nearBy;
		user.save();
	})
}


function saveNotification(data) {
	// console.log(data);
	const notification = new BookingNotification({
		amount:data.total,
		fcmId:data.fcm_id,
		orderId:data.orderId,
		orderItems:data.orderItems,
		bookingTime:data.selectedTime,
		bookingDate:data.selectedDate,
		customer_phoneNo:data.phNumber
	}).save().then(()=>{
		console.log('new booking')
		sendNotificationToAdmin()
	})
}

// sendNotificationToAdmin()

function sendNotificationToAdmin() {
	const message = {
		data:{
			title:"New Booking",
			body:"Hurry up look at new Booking Has been Made"			
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