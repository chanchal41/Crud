const express = require('express');
require("./config");
const Product = require('./product');
const multer = require('multer');
const app = express();

app.use(express.json());


const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.post("/create", async (req, resp) => {
    console.log(req.body)
    let data = new Product(req.body);
    const result = await data.save();
    resp.send(result);
});


app.get("/list", async (req, resp) => {

    let data = await Product.find();
    resp.send(data);
})

app.delete("/delete/:_id", async (req, resp) => {
    console.log(req.params)
    let data = await Product.deleteOne(req.params);
    resp.send(data);
})


app.put("/update/:_id", async (req, resp) => {
    console.log(req.params)
    let data = await Product.updateOne(
        req.params,
        { $set: req.body }
    );
    resp.send(data);
})
app.listen(5000)