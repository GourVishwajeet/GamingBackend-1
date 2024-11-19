import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            },
        // fullname:{
        //     type:String,
        //     required:false,
        //     unique:true,
        //     lowercase:true,
        //     trim:true,
        //     index:true
        // },  
        country:{
            type: String,
            trim: true
        }, 
        phone: {
          type: String,
          unique: true, 
          trim: true,
        //   match: [/^\d{10,15}$/, 'Phone number must be in 10 digits']
        },
        dateOfBirth: {
          type: Date,
          required: [true, 'Date of birth is required'],
          validate: {
            validator: function(v) {
              // Ensure date of birth is in the past
              return v < new Date();
            },
            message: 'Date of birth must be a past date'
          }
        },
        password:{
            type:String,
            required:[true, 'Password is required']
        },
        refreshToken:{
            type:String
        }
    },
    {
        timestamps:true

    }
)

userSchema.pre("save", async function (next) {
   
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function
(password){
   return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
       return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
           
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema)