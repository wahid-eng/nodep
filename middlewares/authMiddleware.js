import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // get auth token from header
  const authHeader = req.header('Authorization');
  
  // check token exist
  if( ! authHeader || ! authHeader.startsWith('Bearer ') ) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1];

  // verify token
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode.user;
    next();
  } catch(error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

export default authMiddleware;