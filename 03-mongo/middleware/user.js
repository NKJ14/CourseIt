const {User} = require("../db")

function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    //to check if user exists or nah. if yes, then pass through.
    User.findOne({
        username:username,
        password:password
    })
    .then((value)=>{
        if(value){
            next();
        } else{
            //don't next()
            res.status(403).json({
                msg:"User doesn't exist"
            })
        }
    })
    
}

module.exports = userMiddleware;