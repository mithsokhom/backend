//https://www.youtube.com/watch?v=prOC9Px4wtg&list=PLqrQf0z-Hg7jD3ASYy9febJhQoUbzC8kb&index=11
function verifyToken(req, res, next){
  const bearerToken = req.header('user');
  if (typeof bearerToken !== 'undefined') {
    req.token = bearerToken;
    next();
  }else {
    res.sendStatus(401);
  }
}

module.exports = verifyToken;