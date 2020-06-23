const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
	amount:Number,
	fcmId:String,
	orderId:String,
	orderItems:[{
		type:String
	}],
	outForDelivery:{
		type:Boolean,
		default:false
	},
	itemDelivered:{
		type:Boolean,
		default:false
	},
	customer_phoneNe:String,
	deliveryBoyName:{
		type:String,
		default:''
	},
	deliveryCharge:{
		type:Number,
		default:-1
	},
	isPaid:{
		type:Boolean,
		default:false
	}
},{ timestamps: true });

const Notification = mongoose.model('Notification',notificationSchema);

module.exports = Notification;