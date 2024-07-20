const jwt = require("jsonwebtoken");
const JWT_SECRET = "sujit's jwt token key";

const fetchuser = (req,res,next) => {
    const token  = req.header("jwttoken");
    try {
        if(!token){
             res.status(401).json({error: "Please authenticate the user"});
        }

        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
         res.status(401).json({error: "Please authenticate the user"});
    }

};

module.exports = fetchuser;
