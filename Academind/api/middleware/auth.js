const jwt = require("jsonwebtoken")

 const checkAuth = (req, res, next) => {
    //console.log("==> Authorization header: " + JSON.stringify(req.header("Authorization")))
    const token = parseAuthorizationToken(req);
    if (!token) {
        return res.status(401).json({
            message: "Not authorized"
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            console.log("jwt NOT verified")
            return res.status(401).json({
                message: err.toString()
            })
        }

        console.log("jwt verified, decoded: " + JSON.stringify(decoded))
        req.user = decoded

        next()
    });
}

const checkAuthIsAdmin = (req, res, next) => {
    //console.log("==> Authorization header: " + JSON.stringify(req.header("Authorization")))
    const token = parseAuthorizationToken(req);
    if (!token) {
        return res.status(401).json({
            message: "Not authorized"
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            console.log("jwt NOT verified")
            return res.status(401).json({
                message: err.toString()
            })
        }

        console.log("jwt verified, decoded: " + JSON.stringify(decoded))

        if (!decoded.user.isadmin) {
            console.log("jwt decoded is NOT admin")
            return res.status(401).json({
                message: "Not admin authorized"
            })
        }

        req.user = decoded

        next()
    });
}

function parseAuthorizationToken(req) {
    if (!req || !req.header("Authorization")) {
        return null;
    }

    const arr = req.header("Authorization").split(" ")
    if (arr.length < 2) {
        return null;
    } 

    if (arr[0].trim().toLowerCase() != "bearer") {
        return null;
    }

    return arr[1].trim();
}

module.exports = {
    checkAuth,
    checkAuthIsAdmin
}