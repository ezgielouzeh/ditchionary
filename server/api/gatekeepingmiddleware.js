//storing all of our functions that will act as mware betw our request and our response, and we will use it as we see fit

// const User = require("../models/user")
const { models: { User }} = require('../db')


//if they are not logged in users or admins, no access, blocking with gates
const requireToken = async (req, res, next) => {
  try{
    //obtaining the token from our headers
    const token = req.headers.authorization
    //then finding the user by the token
    const user = await User.findByToken(token)
    //if this method is successful,we can attach the user instance to req.user
    req.user = user
    //for our request not to hang in express, we have to call next without an arg so that we can move on to the next piece of mware
    next()
  }
  catch(e){
    next(e)
  }
}

const isAdmin = (req,res,next) => {
  if(!req.user.isAdmin){
    res.status(403).send('You shall not pass!')
  }else{
    //if my user is an admin, pass them forward
    next()
  }
}

module.exports = {
  requireToken,
  isAdmin
}
