const express = require('express');
require("./db_connection");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;


const mainRouter = require("./routers/mainRouter")
const userRouter = require('./routers/userRouter');
const brandRouter = require('./routers/brandRouter');
const productRouter = require('./routers/productRouter');
const orderRouter = require('./routers/orderRouter');
const ResturantRouter = require('./routers/resturantRouter')
const profileRouter = require('./routers/profileRouter')
const cartRouter = require('./routers/cartRouter')


app.use(express.json());
app.use(express.static('public'));

app.use("/api/", mainRouter);
app.use('/api/user', userRouter);
app.use('/api/brand', brandRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);
app.use('/api/resturant', ResturantRouter);
app.use('/api/user/profile', profileRouter);
app.use('/api/cart', cartRouter);

app.listen(port, () => {
    console.log(`Running at port ${port}`);
})