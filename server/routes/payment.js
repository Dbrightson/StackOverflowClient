import express from 'express'
import Stripe from 'stripe'
import { addPlan } from '../utilities/addPlan'

const router = express.Router()

const storeItems = {
	'Silver': 100,
	'Gold': 1000
}

router.post("/purchasePlan", async (req, res) => {
	try {4242424242
		const stripe = new Stripe(process.env.STRIPE_PVT_KEY)
		const plan = req.body.plan
		const id = req.body.id
		let flag = 0
		if (plan === 'Silver') {
			flag = 1
		} else if(plan === 'Gold') {
			flag = 2
		}
		const amount = storeItems[plan]
		const paymentIntent = await stripe.paymentIntents.create({
			amount: (amount+ 0.0365*amount)*100,
			currency: "inr",
			automatic_payment_methods: {
			  enabled: true,
			},
		});
		
		res.send({
			clientSecret: paymentIntent.client_secret,
		});
		return addPlan(id,plan)
		// return res.status(200).json({ id: session.id, plan:req.body.plan })
	} catch (e) {
		console.log('serv routes payment purchase plan',e.message);
		return res.status(500).json({ error: e.message })
	}
})

export default router



// const router = require("express").Router();
// const Razorpay = require("razorpay");
// const crypto = require("crypto");

// router.post("/orders", async (req, res) => {
// 	try {
// 		const instance = new Razorpay({
// 			key_id: process.env.KEY_ID,
// 			key_secret: process.env.KEY_SECRET,
// 		});

// 		const options = {
// 			amount: req.body.amount,
// 			currency: "INR",
// 			receipt: crypto.randomBytes(10).toString("hex"),
// 		};

// 		instance.orders.create(options, (error, order) => {
// 			if (error) {
// 				console.log(error);
// 				return res.status(500).json({ message: "Something Went Wrong!" });
// 			}
// 			res.status(200).json({ data: order });
// 		});
// 	} catch (error) {
// 		res.status(500).json({ message: "Internal Server Error!" });
// 		console.log(error);
// 	}
// });

// router.post("/verify", async (req, res) => {
// 	try {
// 		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
// 			req.body;
// 		const sign = razorpay_order_id + "|" + razorpay_payment_id;
// 		const expectedSign = crypto
// 			.createHmac("sha256", process.env.KEY_SECRET)
// 			.update(sign.toString())
// 			.digest("hex");

// 		if (razorpay_signature === expectedSign) {
// 			return res.status(200).json({ message: "Payment verified successfully" });
// 		} else {
// 			return res.status(400).json({ message: "Invalid signature sent!" });
// 		}
// 	} catch (error) {
// 		res.status(500).json({ message: "Internal Server Error!" });
// 		console.log(error);
// 	}
// });

// module.exports = router;
