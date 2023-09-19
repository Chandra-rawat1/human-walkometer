const express = require('express');
const cors = require("cors");
const userRoute = require("./app/route/user.route.js");


const app = express();
app.use(cors());

 app.use(express.json());

 app.use(express.urlencoded({extended : true}));



 
 
 //db.dbSequelize.sync();

 //app.use('/api/user' , userRoute);
 app.use('/api/user' , userRoute);
 
 


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});

