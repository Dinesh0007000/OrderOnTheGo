const checkRoles = (allowedRoles = []) => {
    return (req, res, next) => {
      const userType = req.user?.userType;
  
      if (!allowedRoles.includes(userType)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. This action is restricted to: ${allowedRoles.join(', ')}`
        });
      }
  
      next();
    };
  };
  
  export default checkRoles;
  