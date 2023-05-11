const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Replace with your own secret key

// Middleware function to verify JWT token
function verifyToken(req, res, next) {
  // Get token from authorization header
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }
  try {
    // Verify token using the secret key
    const decoded = jwt.verify(token, secretKey);
    // Add the user information to the request object
    req.user = decoded;
    next(); 
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }
}
// Function to generate JWT token
function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role // Admin or Employee
  };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}
module.exports = { verifyToken, generateToken };