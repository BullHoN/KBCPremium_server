const express = require('express');
const router = express.Router();
const testCat = require('./test');

router.get('/:id',(req,res)=>{
	let response = {
		items:testCat.items,
		options:testCat.options
	}

	let id = req.params.id;
	if(id == 'Bleach'){
		let temp = require('./items/BleachCleanUp1');
		response.items = temp.items
		response.options = temp.options
	}else if(id == 'CleanUp'){
		let temp = require('./items/BleachCleanUp2');
		response.items = temp.items
		response.options = temp.options		
	}else if(id == 'Color'){
		let temp = require('./items/ColourHighlighting1');
		response.items = temp.items
		response.options = temp.options			
	}else if(id == 'Highlighting'){
		let temp = require('./items/ColourHighlighting2');
		response.items = temp.items
		response.options = temp.options			
	}else if(id == 'Hair Rebounding'){
		let temp = require('./items/HairRebondingStyling1');
		response.items = temp.items
		response.options = temp.options			
	}else if(id == 'Styling'){
		let temp = require('./items/HairRebondingStyling2');
		response.items = temp.items
		response.options = temp.options			
	}else if(id == 'Hair Treatment'){
		let temp = require('./items/HairTreatmentSpa1');
		response.items = temp.items
		response.options = temp.options				
	}else if(id == 'Spa'){
		let temp = require('./items/HairTreatmentSpa2');
		response.items = temp.items
		response.options = temp.options			
	}else if(id == 'KBC Special'){
		let temp = require('./items/KBC Special');
		response.items = temp.items
		response.options = temp.options			
	}else if(id == 'MakeUp'){
		let temp = require('./items/MakeUpBridalParty');
		response.items = temp.items
		response.options = temp.options			
	}else if(id == 'Mehandi'){
		let temp = require('./items/MehandiTouchUps');
		response.items = temp.items
		response.options = temp.options			
	}else if(id == 'Skin'){
		let temp = require('./items/SkinNailCare');
		response.items = temp.items
		response.options = temp.options			
	}else if(id == 'Threading'){
		let temp = require('./items/ThreadingWaxing1');
		response.items = temp.items
		response.options = temp.options			
	}else if(id == 'Waxing'){
		let temp = require('./items/ThreadingWaxing2');
		response.items = temp.items
		response.options = temp.options			
	}

	res.json(response)	
})

module.exports = router;