const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
	amount:Number,
	fcmId:String,
	orderId:String,
	orderItems:[{
		name:String,
		option:String,
		price:String
	}],
	bookingTime:String,
	bookingDate:String,
	completed:{
		type:Boolean,
		default:false
	},
	customer_phoneNo:String,
},{ timestamps: true });

const Notification = mongoose.model('BookingNotification',notificationSchema);

module.exports = Notification;