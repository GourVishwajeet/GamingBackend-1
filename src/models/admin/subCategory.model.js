
import mongoose,{Schema} from "mongoose";


const categorySchema = new Schema(
    {
        title:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            index:true
        },
        icon:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            },
     
        status:{
            type: String,
            trim: true,
            required:true
        }, 
    },
    {
        timestamps:true

    }
)


export const Category = mongoose.model("CategorySchema", categorySchema)