const express = require('express');
const productRouter = new express.Router();
const Product = require('../models/ProductCollection');
const authentication = require('../middelware/authontication');
const aminstration = require('../middelware/adminstration');
const manage = require('../middelware/mangement');


////////Base /api/product


/////Allowed for all users
/**to get all products of brand=>id of the brand  */
productRouter.get('/:id', async(req, res) => {
    try {
        const products = await Product.find({ BrandID: req.params.id });
        res.send(products);
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
})




/**to get one product of brand=>id of the brand and id of the product  */
productRouter.get('/:id/:pid', async(req, res) => {
    try {
        const products = await Product.findOne({ BrandID: req.params.id, _id: req.params.pid });
        res.send(products);
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
});

productRouter.use(authentication)

productRouter.use(manage)
    /////Allowed for Admins only
productRouter.post('/:id', async(req, res) => {
    try {
        const Name = req.body.Name;
        const img = req.body.img;
        const status = req.body.status || "NaN";
        const Price = req.body.Price;
        const BrandID = req.params.id;
        const product = await Product.create({ Name, img, status, Price, BrandID });
        res.send(product);
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
})

productRouter.patch('/:id/:pid', async(req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.pid })
        const Name1 = req.body.Name || product.Name;
        const img1 = req.body.img || product.img;
        const status1 = req.body.status || product.status || "NaN";
        const Price1 = req.body.Price || product.Price;
        const updatedProduct = await Product.updateOne({ _id: req.params.pid }, {
            $set: {
                Name: Name1,
                img: img1,
                status: status1,
                Price: Price1
            }

        });
        res.send(updatedProduct)
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
})

productRouter.delete('/:id/:pid', async(req, res) => {
    try {
        const products = await Product.deleteOne({ _id: req.params.pid });
        res.send(products);
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
})




module.exports = productRouter;