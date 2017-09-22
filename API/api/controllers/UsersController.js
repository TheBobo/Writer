/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    registration: function (req, res) {
        if (req.body.password !== req.body.confirmPassword) {
            return res.json(400, {err: 'Password doesn\'t match.'});
        }

        Users.findOne({email: req.body.email}, function (err, user) {
            if (err) {
                return res.json(500, {err : 'server error!!!'});
            }
            if (user) {
                return res.json(400, {err: 'This EMAIL already exist !!!!'});
            }else{
                Users.create(req.body).exec(function (err, user) {
                    if (err) {
                        return res.json(500, {err: err});
                    }
                    if (user) {
                        delete user.encryptedPassword;
                        return res.json({user: user, token: jwToken.issue({id: user.id})});
                    }
                });
            }
        });
    },

    signIn: function (req, res) {
        var email = req.param('email');
        var password = req.param('password');

        Users.findOne({email: email}, function (err, user) {
            if (!user) {
                return res.json({err: 'invalid email or password'});
            }
            Users.comparePassword(password, user, function (err, valid) {
                if (err) {
                    return res.json({err: 'forbidden'});
                }
                if (!valid) {
                    return res.json({err: 'invalid email or password'});
                } else {
                    delete user.encryptedPassword;
                    res.json({
                        user: user,
                        token: jwToken.issue({id : user.id }),
                    });
                }
            });
        })
    },

    changePassword: function (req, res) {
        var email = req.param('email');
        var token = req.param('token');
        var password = req.param('oldPassword');
        var newPassword = req.param('newPassword');

        if (!email || !token || !password || !newPassword) {
            return res.json(400, {err: 'not all parameters was set'});
        }

        Users.findOne({email: email}).exec(function (err, user) {
            var  id  = user.id;
            if(err){
                return res.json(400, {err: err});
            }
            if(user) {
                jwToken.verify(token, function (err, token) {
                    if (err) {
                        return res.json(400, {err: 'invalid token'});
                    }else{
                        Users.comparePassword(password, user, function (err, valid) {
                            if (err) {
                                return res.json(400, {err: 'forbidden'});
                            }
                            if (!valid) {
                                return res.json(400, {err: 'invalid email or password'});
                            } else {
                                Users.update({id: user.id}, {password: newPassword}).exec(function afterwards(err, updated) {
                                    if (err) {
                                        return res.json(500, {err: err});
                                    }else{
                                        return res.json({status: 'password was updated', token: jwToken.issue({id: user.id})});
                                    }
                                });
                            }
                        });
                    }
                });
            }else{
                return res.json(400, {err: 'invalid email'});
            }
        });
    },

    getStatistics: function (req, res) {
        var email = req.param('email');
        var token = req.param('token');
        var password = req.param('password');

        if (!email || !token || !password) {
            return res.json(400, {err: 'not all parameters was set'});
        }

        Users.findOne({email: email}).exec(function (err, user) {
            var  id  = user.id;
            if(err){
                return res.json(400, {err: err});
            }
            if(user) {
                jwToken.verify(token, function (err, token) {
                    if (err) {
                        return res.json(400, {err: 'invalid token'});
                    }else{
                        Users.comparePassword(password, user, function (err, valid) {
                            if (err) {
                                return res.json(400, {err: 'forbidden'});
                            }
                            if (!valid) {
                                return res.json(400, {err: 'invalid email or password'});
                            } else {
                                if(user.role == 'admin') {
                                    Users.find().exec(function afterwards(err, statistic) {
                                        if (err) {
                                            return res.json(500, {err: err});
                                        }
                                        if (statistic) {

                                            var newUsers = [];
                                            var today = new Date();
                                            var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                                            console.log('today : ', today, " , yesterday : ", yesterday);

                                            for (var i in statistic) {
                                                if (statistic[i].createdAt > yesterday) {
                                                    newUsers.push({
                                                        firstName: statistic[i].firstName,
                                                        lastName: statistic[i].lastName,
                                                        email: statistic[i].email,
                                                        role: statistic[i].role,
                                                        // email: statistic[i].email,
                                                    })
                                                }
                                            }

                                            return res.json(
                                                {
                                                    usersCount: statistic.length,
                                                    newUsers: newUsers,
                                                    token: jwToken.issue({id: user.id})
                                                }
                                            );
                                        } else {
                                            return res.json(400, {err: 'nothing was find!'});
                                        }
                                    });
                                }else{
                                    return res.json(400, {err: 'you are not admin!'});
                                }
                            }
                        });
                    }
                });
            }else{
                return res.json(400, {err: 'invalid email'});
            }
        });
    },

    index: function (req, res) {
        res.send('Sorry, we don\'t have nothing for you!');
    }
};

