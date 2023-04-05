const User = require('../models/user');

exports.getUsers = (req, res, next) => {
    User.findAll()
        .then(users => {
            if (!users) {
                return res.status(404).json({ message: 'Users not found' });
            }
            res.status(200).json({ usesr: users });
        })
        .catch(err => console.log(err));
};

exports.getUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `User ${userId} not found` });
            }
            res.status(200).json({ user: user });
        })
        .catch(err => console.log(err));
};



exports.createUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    User.create({
        name: name,
        email: email
    })
        .then(result => {
            console.log('User Created');
            res.status(201).json({
                message: 'User created successfully',
                user: result
            })
                .catch(err => console.log(err));

        });
};


exports.updateuser = (req, res, next) => {
    const userId = req.params.userId;
    const updatedName = req.body.name;
    const updatedEmail = req.body.email;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: 'user not found' });
            }
            user.name = updatedName;
            user.email = updatedEmail;
            return user.save();
        })
        .then(result => {
            res.status(200).json({ message: 'User updated successfully!', user: result });
        })
        .catch(err => console.log(err));
};

exports.deleteuser = (req, res, next) => {
    const userId = req.params.userId;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: 'user not found' });
            }

            return User.destroy({
                where:{
                    id:userId
                }
            });
        })
        .then( ()=> {
            res.status(200).json({ message: `User ${userId} deleted successfully` });
        })
        .catch(err => console.log(err));
};