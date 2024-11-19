import jwt from "jsonwebtoken";

const ensureAuthenticated = (req, res, next)=>{
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403)
            .json({message:'Unauthorized, JWT token is required'})
    }
    try {
        const decoded = jwt.verify(auth, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403)
                .json({ message: 'Unauthorized, JWT token wrong or expired'})
    }
}

export  {ensureAuthenticated};