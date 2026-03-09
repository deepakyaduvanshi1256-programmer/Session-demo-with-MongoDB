const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express(); 
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({

        mongoUrl: 'mongodb://127.0.0.1:27017/sessiondb'
    }),
    cookie: {   
        // cookie ki life 24 hour
        maxAge:1000 * 60 * 60 * 24
    
     } 
}));

// home route
app.get('/',(req,res)=>{

    // check kar rahe hain session me username exist karta hai ya nahi
    if(req.session.username){
        // agar username hai to show karega
        res.send(`<h1>Username from session is: ${req.session.username}</h1>`)
    } else{
        // agar session me username nahi hai to ye message show hoga
        res.send(`<h1>No username found in session : ${req.session.username}</h1>`)
    }
})

// username set karne wala route
app.get('/set-username',(req,res)=>{
    // session me username store kar rahe hain
    req.session.username = 'Deepak Yadav';
    // confirmation message show kar rahe hain
    res.send(`<h1>Username set to: ${req.session.username}</h1>`)
})

// username ko session se read karne wala route
app.get('/get-username',(req,res)=>{
    // check kar rahe hain session me username hai ya nahi
    if(req.session.username){
        // agar hai to show karega
        res.send(`<h1>Username from session is: ${req.session.username}</h1>`)
    } else{
        // agar nahi hai to message show karega
        res.send(`<h1>No username found in session : ${req.session.username}</h1>`)
    }
})

// session destroy karne wala route
app.get('/destroy', (req,res) =>{
    // session ko delete / destroy kar rahe hain
    req.session.destroy((err) =>{
        // agar destroy karte time error aaye
        if(err){
            res.send('failed to destroying session')
        } else{
            // agar session successfully destroy ho gaya
            res.send('<h1>session destroyed succecsfully<h1>')
            
        }
    })

})
// server ko port 3000 par start kar rahe hain
app.listen(3000,()=>{
    // console me message print hoga jab server start ho jayega
    console.log('server is running on port', `https://localhost:${3000}`)
})