// middleware/checkApproval.js
const checkApproval = (req, res, next) => {
    if (req.userType === 'restaurantOwner' && req.approval === false) {
      return res.status(403).json({
        success: false,
        message: 'Your account is pending approval from the admin.'
      });
    }
    next();
  };
  
  export default checkApproval;
  