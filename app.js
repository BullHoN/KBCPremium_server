const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


mongoose.connect('mongodb+srv://admin:DLI9RTUpCfzwEq4V@kbcpremium-ojipm.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology: true})
.then(()=>console.log('conncted to mongodb'))
.catch((err)=>console.log(err));


// firebase intilaization
var admin = require("firebase-admin");
var serviceAccount = require("./keys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kbcpremium-64888.firebaseio.com"
});


	// const message = {
	// 	data:{
	// 		title:"New Order arrived",
	// 		body:"Hurry up new order from up63cafe"			
	// 	},
	// 	token:"dZBAUHsdnXA:APA91bFnLz1RX4m0prEGBL_GZRQZdOnm03qo1fH1nfFHyx1_4qyJpqD7qK19KO3YN95soDG8Frcwj51_Hz1IUIQHOCX-CXjpnj0DIL25rtmXqraWD6rhlngb1uEa29otACPQdrR0E1bq"
	// }

	// admin.messaging().send(message)
	//   .then((response) => {
	//     console.log('Successfully sent message to ' + "user", response);
	//   })
	//   .catch((error) => {
	//     console.log('Error sending message to' + "user", error);
	//   });	

// const fs = require('fs');
// const ProductItem = require('./models/ProductItem');
// ProductItem.find({}).then((products)=>{
// 	products.forEach((product)=>{
// 		product.imageUrl =  product.imageUrl.replace("192.168.225.20","18.188.149.40");
// 		product.save();
// 	})
// })

// fs.readFile('imp.txt','utf8',(err,file)=>{
// 	products = file.split(',');
// 	for(let i=55;i<61;i++){
// 		let product = products[i].split('=');
// 		let name = product[0].split('\n')[1];
// 		let price = product[1];
// 		let name2 = name.replace('&','and')
// 		let imageUrl = `http://192.168.225.20:5000/images/Skeyndor/${name2}.png`;

// 		let productItem = new ProductItem({
// 			name:name,
// 			imageUrl:imageUrl,
// 			price:price
// 		}).save().then((pd)=>{
// 			console.log(pd._id);
// 		})
// 	}
// })


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

// routes
app.use('/images',express.static('images'));
app.use('/brandProducts',require('./brandRoutes/brandRoutes'));
app.use('/user',require('./authRoutes/signUpRoutes'));
app.use('/user',require('./authRoutes/signInRoutes'));
app.use('/availability/orderAvailability',require('./availability/orderAvailability'));
app.use('/payment',require('./checkout/makeOrder'))
app.use('/admin',require('./admin/getOrders'))
app.use('/bookingItem',require('./bookingsRoutes/getBookingItem'))
app.use('/bookseat',require('./bookingsRoutes/bookSeat'))
app.use('/admin',require('./admin/getAppointments'))


app.listen(5000,()=>{
	console.log('Server Started At Port 5000....')
})

