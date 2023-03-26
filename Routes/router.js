const express = require("express");
const router = new express.Router();
const siduser = require("../models/usersSchema");
const nodemailer = require("nodemailer");

// email config
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});



// register user details
router.post("/register", async (req, res) => {
    const { fname, lname, email, mobile, message } = req.body;

    if (!fname || !lname || !email || !mobile) {
        res.status.json({ status: 401, error: "this field is required !" })
    }

    // console.log(req.body)

    try {
        const preuser = await siduser.findOne({ email: email });

        console.log(preuser)

        if(preuser){
            const userMessage = preuser.Messagesave(message);

            console.log(userMessage);

            const mailOptions = {
                from: process.env.EMAIL,
                to: "siddhantsinghchandel4@gmail.com", 
                subject: 'Query raised from Portfolio',
                text:  `A query is raised by ${fname +" "+ lname} from Email ${email}, contact No ${mobile} and the message is \n${message} \n\nkindly look into it.`,
            };
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error is" + error);
                } else {
                    console.log("Email sent:" + info.response);
                    res.status(201).json({ status: 201, message: "email sent Successfully" })
                }
            })

        }else{
            const finalUser = new siduser({
                fname, lname, email, mobile, message
            });


            const storeData = await finalUser.save();
    
    
            const mailOptions = {
                from: "sidthakur869@gmail.com",
                to: "siddhantsinghchandel4@gmail.com", 
                subject: 'Query raised from Portfolio',
                text: `A query is raised by ${fname +" "+ lname} from Email ${email}, contact No ${mobile} and the message is \n${message} \n\n kindly look into it.`,
 
            };
    
            transporter.sendMail(mailOptions,(error, info) => {
                if (error) {
                    console.log("error in sending mail and error is " + error);
                } else {
                    console.log("Email sent: " + info.response);
                    res.status(201).json({ status: 201, message: "email sent Successfully" })
                }
            })
    
    
           res.status(201).json({ status: 201, storeData })
        }
    } catch (error) {
        res.status(401).json({ status: 401, error });
        console.log("catch block error");
    }
});

module.exports = router;