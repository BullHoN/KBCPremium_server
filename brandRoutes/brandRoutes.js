const express = require('express');
const ProdcutItem = require('../models/ProductItem');
const lotusItems = require('./LotusProfessional');
const skeyndorItems = require('./Skeyndor');
const lorelItems = require('./LorelProfessional');

const router = express.Router();

// /brandProducts/:id
router.get('/:id',(req,res)=>{
	// console.log(req.params,req.query)
	let id = req.params.id;
	let offset = parseInt(req.query.offset);
	let start = parseInt(req.query.start);
	if(id == 'Skeyndor'){
		getSubCategories(start,offset,skeyndorItems).then((items)=>{
			res.json(items);
		})
	}else if(id == 'Lotus Professional'){
		getAllItems(start,offset,lotusItems).then((items)=>{
			res.json(items);
		})
	}else {
		getAllItems(start,offset,lorelItems).then((items)=>{
			res.json(items);
		})
	}
})

async function getSubCategories(start,offset,mainBrandItems) {
	return new Promise(async (resolve,reject)=>{
		let items = [];
		for(let i=start;i<start+offset && i < mainBrandItems.length;i++){
			let item = {
				subCategory:mainBrandItems[i].brandName,
				items:[]
			}
			for(let j=0;j<mainBrandItems[i].items.length;j++){
				let curr = mainBrandItems[i].items[j];
				let subItem = await ProdcutItem.findOne({_id:curr});
				item.items.push(subItem);
			}
			items.push(item);	
		}
		resolve(items);
	})
}

async function getAllItems(start,offset,mainBrandItems) {
	return new Promise(async (resolve,reject)=>{
		let items = [];
		for(let i=start;i<start+offset && i < mainBrandItems.length;i++){
			let item = await ProdcutItem.findOne({_id:mainBrandItems[i]});
			items.push(item);
		}
		 resolve(items);
	})
}


module.exports = router;