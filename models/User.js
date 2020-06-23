const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	address:{
		type:String,
		default:"no address added"
	},
	nearByAddress:{
		type:String,
		default:"no nearby address"
	},
	pincode:{
		type:String,
	},
	phoneNo:{
		type:String,
		required:true
	},
	blocked:{
		type:Boolean,
		default:false
	}
})

const User = mongoose.model('User',userSchema);

module.exports = User;