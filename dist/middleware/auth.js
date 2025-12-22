import jwt from "jsonwebtoken";
import { JWT_ADMIN_PASSWORD } from "../config/config.js";
export const auth = (roles = []) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        try {
            const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
            req.user = decoded;
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: "Forbidden" });
            }
            next();
        }
        catch (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
    };
};
//# sourceMappingURL=auth.js.map