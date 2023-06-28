const express = require('express')
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");


const productsRouter = require('./routes/product_routes');
const authRouter = require('./routes/auth_route')
const config = require('./config')



const app = express()
const port = 3000


mongoose
    .connect(config.DB)
    .then(() => {
        console.log("connection successful");
    })
    .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', authRouter)

app.use('/products', productsRouter)

app.use('/verifyToken/:token', async (req, res) => {
    const token = req.params.token;

    await jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Invalid token" })
        }
        req.user = decoded;
        res.json({ success: true, message: "Valid token" })
    })
})



app.listen(port, () => console.log(`JWT-CRUD app listening on port ${port}!`))
