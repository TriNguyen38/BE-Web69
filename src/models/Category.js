import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        
    },
    slug: {
        type: String,
        required: true,
        unique: true,
   
    },
    products:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }]
},{
    versionKey: false, timestamp: true
})

export default mongoose.model('Category', categorySchema)