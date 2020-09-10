const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const specials = require('./specials.js')


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

// testing
// const ProductItem = require('./models/ProductItem')
// const skendorItems = require('./brandRoutes/Skeyndor')
// skendorItems.forEach((skyItem,index)=>{
// 	skyItem['items'].forEach((someItems)=>{
// 		ProductItem.findOne({_id:someItems}).then((item)=>{
// 			item.discount = 5;
// 			item.save().then(()=>{
// 				console.log('saved',index);
// 			})
// 		})
// 	})
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
app.use('/updateBooking',require('./bookingsRoutes/updateBookingItem'))
app.use('/updateOrder',require('./checkout/updateOrder'))
app.use('/admin',require('./admin/getAppointments'))
app.use('/otp',require('./authRoutes/optverification'))



app.get('/specials',(req,res)=>{
	res.json(specials)
})


app.listen(5000,()=>{
	console.log('Server Started At Port 5000....')
})

