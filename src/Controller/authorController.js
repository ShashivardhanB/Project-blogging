const authorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken")

//creating author by validating it is present or not


const isValid = function (value) {
  if (typeof value === 'undefined' || value === null) return false
  if (typeof value === 'string' && value.trim().length === 0) return false
  return true;
}
const isValidTitle = function (title) {
  return ['Mr', 'Mrs', 'Miss', 'Mast'].indexOf(title) !== -1
}
const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0
}



const createAuthor = async function (req, res) {
  try {
    const requestBody = req.body;

    if (!isValidRequestBody(requestBody)) {
      res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide author detalls' })
      return
    }

    const { fname, lname, title, email, password } = requestBody


    let emailCheck = await authorModel.findOne({ email })

    if (emailCheck) {
      return res.status(400).send({ status: false, msgsage: `${email} email address is already registered`, });
    }

    if (!isValid(email)) {
      return res.status(400).send({ status: false, msgsage: "please enter email" });
    }

    if (!isValid(password)) {
      return res.status(400).send({ status: false, msgsage: "please enter password" });
    }

    if (!isValid(fname)) {
      return res.status(400).send({ status: false, msgsage: "please enter First name" });
    }

    if (!isValid(lname)) {
      return res.status(400).send({ status: false, msgsage: "please enter Last name" });
    }

    if (!isValid(title)) {
      return res.status(400).send({ status: false, msgsage: "please enter title" });
    }

    if (!isValidTitle(title)) {
      return res.status(400).send({ status: false, msgsage: "please enter correct title" });
    }
    const regex = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]+)$/;    //using regex we will verify the email is valid or not

    if (!regex.test(email)) {
      res.status(400).send({ msg: "Enter Vaild Email" })

    }

    const authorData = (fname, lname, title, email, password)

    const savedData = await authorModel.create(authorData)
    res.status(201).send({ status: true, msg: savedData })



  } catch (error) {
    res.status(500).send({ status: false, message: error.message })

  }
}
module.exports.createAuthor = createAuthor



//------------------------------------------------------------------//
const loginUser = async function (req, res) {
  try {
    const requestBody = req.body;
    if (!isValidRequestBody(requestBody)) {
      res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide author detalls' })
      return
    }
    const { password, email } = requestBody;

    if (!isValid(email)) {
      res.status(400).send({ status: false, msg: "please enter email" })
    }

    const regex = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]+)$/;    //using regex we will verify the email is valid or not

    if (!regex.test(email)) {
      res.status(400).send({ msg: "Enter Vaild Email" })

    }
    if (!isValid(password)) {
      res.status(400).send({ status: false, msg: "please enter password" })
    }

    const user = await authorModel.findOne({ email: email, password: password });

    if (!user)
      return res.send({
        status: false,
        msg: "username or the password is not corerct",
      });

    let token = jwt.sign(
      {
        authorId: user._id,
        batch: "thorium",

      },
      "functionup"
    );
    res.header("x-auth-token", token);

    res.send({ status: true, data: token });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message })
  }
};
module.exports.loginUser = loginUser
