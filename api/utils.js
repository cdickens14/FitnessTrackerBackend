const requireUser = (req, res, next)  => {
    if (!req.user){
    console.log(req.user)
      next({
        name: "MissingUserError",
        error: "MissingUserError",
        message: "You must be logged in to perform this action"
      });
    }
  
    next();
  }
  
  module.exports = {
    requireUser
  }