const mongoose = require('mongoose');


const productItemSchema = mongoose.Schema({
	name:String,
	discount:{
		type:Number,
		default:0
	},
	imageUrl:String,
	price:Number,
	isAvailable:{
		type:Boolean,
		default:true
	}
});

const ProductItem = mongoose.model('ProductItem',productItemSchema);

module.exports = ProductItem;