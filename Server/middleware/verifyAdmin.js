const verifyAdmin = (req, res, next) => {


    if (req.user && req.user.roles.includes("ADMIN")) {
        next();
    } else {
        return res.status(401).json({
            error: true,
            message: "Unauthorized user roles = ADMIN",
            data: null
        });
    }
};

module.exports = verifyAdmin;
