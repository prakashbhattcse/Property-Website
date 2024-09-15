const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const headerToken = req.headers['authorization'];

        // Check if token exists
        if (!headerToken) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        // Directly use the token from the header
        const token = headerToken; 

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user ID from token to request object
        req.userId = decoded.id; 

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            errorMessage: 'Invalid token!',
            isTokenExpires: true,
        });
    }
};

module.exports = { verifyToken };
