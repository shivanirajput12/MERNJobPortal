import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized, no token", success: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorized, invalid token", success: false });
    }
    req.id = decoded.userId;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized, invalid token", success: false });
  }
};

export default isAuthenticated;