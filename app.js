require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./Routes/router")
require("./db/conn");
const port = 6001;


// middleware
app.use(cors());
app.use(express.json());

app.use(router);

app.listen(port,()=>{
    console.log("server start")
})