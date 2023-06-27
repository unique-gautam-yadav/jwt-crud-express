const express = require('express')
const mongoose = require('mongoose')


const productsRouter = require('./routes/product_routes');
const authRouter = require('./routes/auth_route')



const app = express()
const port = 3000


const db = 'mongodb://127.0.0.1:27017/crud2'


mongoose
    .connect(db)
    .then(() => {
        console.log("connection successful");
    })
    .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', authRouter)

app.use('/products', productsRouter)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))