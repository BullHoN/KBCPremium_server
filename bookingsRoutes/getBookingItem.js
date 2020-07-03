const express = require('express');
const router = express.Router();
const testCat = require('./test');

// let hairCare = [
// 	{
// 		name:"Loreal Profesional Keratin Treatment",
// 		prices:["4000","5000","7000"]
// 	},
// 	{
// 		name:"Dandruff Treatment",
// 		prices:["1500","1700","2000"]
// 	},
// 	{
// 		name:"HairFall Treatment",
// 		prices:["2000","2500","3000"]
// 	},
// 	{
// 		name:"Smothing Treatment",
// 		prices:["2500","3000","4000"]
// 	}			
// ]

router.get('/:id',(req,res)=>{
	// console.log(req.params);
	// res.json({
	// 	items:hairCare,
	// 	options:["Short","Mid","Long"]
	// })
	res.json({
		items:testCat.items,
		options:testCat.options
	})	
})

module.exports = router;