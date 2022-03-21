const jwt = require("jsonwebtoken");

const headerValidation = function (req, res, next) {
  try{
  let token = req.headers["x-auth-token"];
  if (!token) {
    return res.send({ status: false, msg: "token must be present" });
  }
  console.log(token);

  let decodedToken = jwt.verify(token, "functionup");
  console.log(decodedToken);
  if (!decodedToken) {
    return res.send({ status: false, msg: "token is invalid" });

  }

  req.authorId=decoded.authorId;
    next();
}catch(error){

  res.status(500).send({status:false,message:error.message})
}

};

module.exports.headerValidation = headerValidation;





  
