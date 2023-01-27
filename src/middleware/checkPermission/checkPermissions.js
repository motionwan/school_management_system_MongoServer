// Middleware to check if user has permission to access the requested path
const checkPathPermission = (req, res, next) => {
  const { permissions } = req.user;
  const allowedPaths = permissions.map((permission) => permission.path);

  if (!allowedPaths.includes(req.path)) {
    return res.status(404).send('Page Not Found');
  }

  next();
};
