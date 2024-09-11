import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // get auth token from header
  const token = req.header('Authorization');
  
  // check token exist
  if( ! token ) {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }

  // verify token
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode.user;
    next();
  } catch(error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}

export default authMiddleware;