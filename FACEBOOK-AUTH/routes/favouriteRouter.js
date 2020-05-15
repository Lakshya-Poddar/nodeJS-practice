const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const authenticate = require('../authenticate')
const Favourites = require('../models/favoriteSchema')
const cors = require('./cors')
const  favouriteRouter= express.Router();
favouriteRouter.use(bodyParser.json())

favouriteRouter.route('/')
.get(authenticate.verifyUser,(req,res,next)=>{
    console.log(req.user)
     Favourites.find({'author':req.user._id})
     .populate('author')
     .populate('dishes')
     .exec(function(err,fav){
         if(err) return err;
         res.json(fav);
     })
})
.post(authenticate.verifyUser,(req,res,next)=>{
    Favourites.findOne({'author':req.user._id})
    .then(favourite=>{
        if(favourite)
        {
            for(var i=0;i<req.body.length;i++)
            {
                if(favourite.dishes.indexOf(req.body[i]._id)===-1)
                favourite.dishes.push(req.body[i]._id);
            }
            favourite.save()
            .then((favourite)=>{
                console.log('FAVOURITE CREATED : ',favourite);
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(favourite)
            },(err)=>{next(err)})
        }
        else{
            Favourites.create({'author':req.user._id},(err,favorite)=>{
        
                if (err) throw err;
                favorite.dishes.push(req.body._id);
                favorite.save(function (err, favorite) {
                    if (err) throw err;
                    console.log('Something is up!');
                    console.log(favorite);
                    res.json(favorite);
                });
            })
        }
    })
    

})
.delete(authenticate.verifyUser,(req,res,next)=>{
    Favourites.findOneAndRemove({'author':req.user._id})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(resp)
    },(err)=>next(err))
    .catch(err=>{
        next(err)
    })
})



favouriteRouter.route('/:dishId')

.post(authenticate.verifyUser,(req,res,next)=>{
    Favourites.findOne({'author':req.user._id})
    .then((favourite)=>{
        if(favourite)
        {
            if(favourite.dishes.indexOf(req.params.dishId)===-1)
            favourite.dishes.push(req.params.dishId)
            favourite.save()
            favourite.save()
            .then((favourite)=>{
                console.log('FAVOURITE CREATED : ',favourite);
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(favourite)
            },(err)=>{next(err)})
        }
        else{
            Favourites.create({'author':req.user._id},(err,favorite)=>{
        
                if (err) throw err;
                favorite.dishes.push(req.body._id);
                favorite.save(function (err, favorite) {
                    if (err) throw err;
                    console.log('Something is up!');
                    console.log(favorite);
                    res.json(favorite);
                });
            })
        }
})
})

.delete(authenticate.verifyUser, (req, res, next) => {
    Favourites.findOne({'author': req.user._id})
    .then((favorite) => {
        if (favorite) {            
            index = favorite.dishes.indexOf(req.params.dishId);
            if (index >= 0) {
                favorite.dishes.splice(index, 1);
                favorite.save()
                .then((favorite) => {
                    console.log('Favorite Deleted ', favorite);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                }, (err) => next(err));
            }
            else {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            }
        }
        else {
            err = new Error('Favorites not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports =favouriteRouter;






