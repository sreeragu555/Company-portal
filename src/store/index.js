import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
 
//Initializing Firebase Admin SDK
admin.initializeApp();
 
//Creating Nodemailer transporter using your Mailtrap SMTP details
let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
  port: 25,  
  auth: {
    user: "ce1f9976613e70",
    pass: "9e2a5b47e9cc28"
  }
});
 
//Creating a Firebase Cloud Function
exports.emailSender = functions.https.onRequest((req, res) => {   
      
        //     //Defining mailOptions
        //     const mailOptions = {
        //     from: 'NVScompany@gmail.com', //Adding sender's email
        //     to: req.query.dest, //Getting recipient's email by query string
        //     subject: 'Email Sent via Firebase', //Email subject
        //     html: '<b>Sending emails with Firebase is easy!</b>' //Email content in HTML
        // };
  
        // //Returning result
        // return transporter.sendMail(mailOptions, (err, info) => {
        //     if(err){
        //         return res.send(err.toString());
        //     }
        //     return res.send('Email sent succesfully');
        // });
       
});
