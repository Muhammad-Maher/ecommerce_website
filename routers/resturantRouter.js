const express = require('express');
const Product = require('../models/ProductCollection');
const Resturant = require('../models/resturantCollection');
const ResturantRouter = new express.Router();
const authentication = require('../middelware/authontication');
const adminstration = require('../middelware/adminstration');
const mangement = require('../middelware/mangement');


////////Base /api/resturant

ResturantRouter.use(authentication)
    /////Allowed for all users




/////GET THE IFO ABOUT RESTURANTS
ResturantRouter.get('/:id', async(req, res) => {
    try {
        const resturant = await Resturant.findOne({ _id: req.params.id });
        res.send(resturant);
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
})

ResturantRouter.use(mangement)

///Allowed for Admins only

ResturantRouter.post('/:id', async(req, res) => {
    try {
        const Name = req.body.Name;
        const img = req.body.img;
        const address = req.body.address || "NaN";
        const Mobile = req.body.Mobile;
        const BrandID = req.params.id;
        const worrkingHours = req.body.worrkingHours;
        const resturant = await Resturant.create({ Name, img, address, Mobile, BrandID, worrkingHours });
        res.send(resturant);
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
})

ResturantRouter.use(adminstration);

ResturantRouter.delete("/:id", async(req, res, next) => {

    try {

        await Resturant.findOneAndRemove({ _id: req.params.id });

        res.json({ message: "Deleted successfully" });

    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }

})

ResturantRouter.patch("/:id", async(req, res, next)=>{
    try {
        const Name1 = req.body.Name;
        const img1 = req.body.img;
        const address1 = req.body.address || "NaN";
        const Mobile1 = req.body.Mobile;
        const worrkingHours1 = req.body.worrkingHours;
        const resturant = await Resturant.updateOne({ _id: req.params.id }, {
            $set: {
                Name: Name1,
                img: img1,
                address: address1,
                Mobile: Mobile1,
                worrkingHours: worrkingHours1
            }

        });
        res.send(resturant);
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
})

module.exports = ResturantRouter;