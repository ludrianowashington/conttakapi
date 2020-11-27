const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');

module.exports = {
  async loggedIn(request, response, next) {
    let token = request.header('Authorization');
    if (!token)
      return response.status(401).json({ msg: "Access Denied" });

    try {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, authConfig.secret); 
        
        request.user = verified;
        
        next();
    } catch {
      response.status(400).json({msg: "Invalid Token"});
    }
  }
}