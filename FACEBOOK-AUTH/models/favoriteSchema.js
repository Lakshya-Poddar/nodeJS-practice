var  mongoose = require('mongoose')
var Schema =mongoose.Schema;




const favoriteSchema = new Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    dishes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Dish'
    }]
},{
    timestamps:true
})
var Favourites = mongoose.model('Favourite',favoriteSchema);
module.exports=Favourites;