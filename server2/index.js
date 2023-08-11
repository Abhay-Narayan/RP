const express=require('express')
const app = express();
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const cors=require("cors")
const bodyParser=require("body-parser")

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

app.use(cors())

app.post("/payment", cors(),async(req, res)=>{
    try {
        let {amount,paymentMethod,email}=req.body;
        const customer = await stripe.customers.create({
            email,
            payment_method:paymentMethod,
            invoice_settings:{default_payment_method:paymentMethod},
        })
        let productname="";
        let rec="";
        if(amount==20000){
            productname+="Monthly Subscription";
            rec+="month";
        }
        else if(amount==70000){
            productname+="Half-yearly Subscription";
            rec+="year";
        }
        else {productname+="Yearly Subscription";
            rec+="year"
        }

        const product=await stripe.products.create({
            name:productname,
        })

        const subsciption=await stripe.subscriptions.create({
            customer:customer.id,
            items:[
                {
                    price_data:{
                        currency:'INR',
                        product:product.id,
                        unit_amount: amount,
                    },
                    recurring:{
                        interval:rec
                    }
                }
            ],
            payment_settings:{
                payment_method_types:['card'],
                save_default_payment_method:'on_subscription',
            },
            expand:['latest_invoice.payment_intent']
        });
        res.json({
            messaage:'Subscription Successful',
            clientSecret:subsciption.latest_invoice.payment_intent.client_secret,
            subsciptionId:subsciption.id,
        })
    } catch (error) {
        console.log("Error",error)
        res.json({
            messaage:"payment failed",
            success:false
        })
    }
})

app.listen(process.env.PORT || 4000,()=>{console.log("App running")});