// // middleware/authMiddleware.js
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const JWT_SECRET = process.env.JWT_SECRET;

// const protect = async (req, res, next) => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             // Token ko 'Bearer <token>' string se nikalna
//             token = req.headers.authorization.split(' ')[1];

//             // Token ko verify karna
//             const decoded = jwt.verify(token, JWT_SECRET);

//             // User ko database se fetch karna (password ke bina)
//             req.user = await User.findById(decoded.id).select('-password');

//             next(); // Agle middleware/controller function par jana
//         } catch (error) {
//             console.error('Token verification error:', error);
//             res.status(401).json({ message: 'Not authorized, token failed' });
//         }
//     }

//     if (!token) {
//         res.status(401).json({ message: 'Not authorized, no token' });
//     }
// };

// export default protect;