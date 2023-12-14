import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
  // get the token
  const authToken = req.headers.authorization;

  // checking
  if (!authToken || !authToken.startsWith('Bearer')) {
    return res.status(401).json({ success: false, message: 'No token, Authorization denied!' });
  }

  try {
    const token = authToken.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    req.name = decoded.name;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token is expired' });
    }
    return res.status(401).json({ success: false, message: 'Invalid Token' });
  }
};
