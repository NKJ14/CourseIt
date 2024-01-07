const {Admin} = require("../db")

function adminMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    //to check if user exists or nah. if yes, then pass through.
    Admin.findOne({
        username:username,
        password:password
    })
    .then((value)=>{
        if(value){
            next();
        } else{
            //don't next()
            res.status(403).json({
                msg:"Admin doesn't exist"
            })
        }
    })
    
}
module.exports = adminMiddleware;