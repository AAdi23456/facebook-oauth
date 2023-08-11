const express = require('express');
const groute=require("./Oauth/Google")
const froute=require('./Oauth/facebook')
const otproute=require("./routes/otp")
const usersroute=require("./routes/users")
const app = express();
const session = require('express-session'); // Import express-session
const passport = require('passport');
const {connection}=require("./Database/Mongodb")
app.use(express.json())
//app.use("/auth",groute)
app.use("/auth",froute)
app.use("/otp",otproute)
app.use("/users",usersroute)






    
    app.get('/', (req, res) => {
       
            res.json(`Hello, its done!`);
       
    });

    app.listen(3000, () => {
      connection()
        console.log('Server started on https://cute-teal-jellyfish-vest.cyclic.app');
    });
