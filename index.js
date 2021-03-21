const express = require('express');
const cors = require('cors')
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




app.use(cors())
    // app.use((req, res, next) => {
    //     res.setHeader('Access-Control-Allow-Origin', '*');
    //     res.setHeader(
    //         'Access-Control-Allow-Headers',
    //         'Origin,X-Requested-Width,Content-Type,Accept,authorization'
    //     );
    //     res.setHeader(
    //         'Access-Control-Allow-Methods',
    //         'GET,POST,PATCH,DELETE,PUT,OPTIONS'
    //     );
    //     next();
    // })

app.use(express.json());
app.use(express.static('public'));

app.use("/api/", mainRouter);
app.use('/api/user/profile', profileRouter);
app.use('/api/user', userRouter);
app.use('/api/brand', brandRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);
app.use('/api/resturant', ResturantRouter);
app.use('/api/cart', cartRouter);

app.listen(port, () => {
    console.log(`Running at port ${port}`);
})