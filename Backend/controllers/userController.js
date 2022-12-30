const Users = require('../models/users')
var bcrypt = require('bcryptjs');

const userList = async (req, resp) => {
    let data = await Users.find();
    resp.json(data);
}

const userAdd = async (req, resp) => {
    let { name, email, mobile, password } = req.body;
    let data = new Users({
        name,
        // email : req.body.email, we also call this way if name is different 
        email,
        mobile,
        password
    });
    let response = await data.save()
    let myToken = await data.getAuthToken();
    resp.status(200).json({ message: 'ok', token: myToken });
}

const userLogin = async (req, resp) => {
    if (!req.body.email || !req.body.password) {
        resp.status(301).json({ message: 'Error! please enter email and password' });
    }
    let user = await Users.findOne({ email: req.body.email });
   
    var responseType = {
        message: 'ok'
    }
    if (user) {
        var match = await bcrypt.compare(req.body.password, user.password);
        let myToken = await user.getAuthToken();
        
        if (match) {
            responseType.message = 'Login Successfully';
            responseType.token = user.tokens;
            responseType.status = 200;
        } else {
            responseType.message = 'Wrong Password';
            responseType.status = 401;
        }
    } else {
        responseType.message = 'Invalid Email id';
        responseType.status = 404;
    }
    resp.status(responseType.status).json({ message: 'ok', data: responseType });


}



module.exports = {
    userList,
    userAdd,
    userLogin
}