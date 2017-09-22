/**
 * LabelsController
 *
 * @description :: Server-side logic for managing labels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function (req, res) {
        res.send('What did you want to see here?');
    },
    getAll: function (req, res) {
        var email = req.param('email');
        var token = req.param('token');

        if (!email || !token) {
            return res.json(400, {err: 'not all parameters was set'});
        }

        Users.findOne({email: email}).exec(function (err, user) {
            var id = user.id;
            if (err) {
                return res.json(400, {err: err});
            }
            if (user) {
                jwToken.verify(token, function (err, token) {
                    if (err) {
                        return res.json(400, {err: 'invalid token'});
                    } else {
                        Labels.find().exec(function (err, labels) {
                            if (err) {
                                return res.json(500, {err: err});
                            }
                            if (labels) {
                                return res.json({labels: labels, token: jwToken.issue({id: user.id})});
                            }
                        });
                    }
                });
            } else {
                return res.json(400, {err: 'invalid email'});
            }
        });
    },
    add: function (req, res) {
        var email = req.param('email');
        var token = req.param('token');
        var type = req.param('type');
        var name = req.param('name');

        if (!email || !token || !type || !name) {
            return res.json(400, {err: 'not all parameters was set'});
        }

        Users.findOne({email: email}).exec(function (err, user) {
            var id = user.id;
            if (err) {
                return res.json(400, {err: err});
            }
            if (user) {
                jwToken.verify(token, function (err, token) {
                    if (err) {
                        return res.json(400, {err: 'invalid token'});
                    } else {
                        var newLabel = {
                            type: type,
                            name: name
                        };
                        // newScene.chapter = chapterId;
                        Labels.create(newLabel).exec(function (err, label) {
                            if (err) {
                                return res.json(500, {err: err});
                            }
                            if (label) {
                                return res.json({
                                    status: 'label created',
                                    label: label,
                                    token: jwToken.issue({id: user.id})
                                });
                            }
                        });
                    }
                });
            } else {
                return res.json(400, {err: 'invalid email'});
            }
        });
    },
    update: function (req, res) {
        var email = req.param('email');
        var token = req.param('token');
        var labelId = req.param('labelId');

        if (!email || !token || !labelId) {
            return res.json(400, {err: 'not all parameters was set'});
        }

        Users.findOne({email: email}).exec(function (err, user) {
            var id = user.id;
            if (err) {
                return res.json(400, {err: err});
            }
            if (user) {
                jwToken.verify(token, function (err, token) {
                    if (err) {
                        return res.json(400, {err: 'invalid token'});
                    } else {
                        var newLabel = req.body;
                        delete newLabel.email;
                        delete newLabel.token;
                        delete newLabel.labelId;

                        Labels.update({id: labelId}, newLabel).exec(function (err, label) {
                            if (err) {
                                return res.json(500, {err: err});
                            } else {
                                return res.json({
                                    status: 'label updated',
                                    label: label,
                                    token: jwToken.issue({id: user.id})
                                });
                            }
                        });
                    }
                });
            } else {
                return res.json(400, {err: 'invalid email'});
            }
        });
    },
    remove: function (req, res) {
        var email = req.param('email');
        var token = req.param('token');
        var labelId = req.param('labelId');

        if (!email || !token || !labelId) {
            return res.json(400, {err: 'not all parameters was set'});
        }

        Users.findOne({email: email}).exec(function (err, user) {
            var id = user.id;
            if (err) {
                return res.json(400, {err: err});
            }
            if (user) {
                jwToken.verify(token, function (err, token) {
                    if (err) {
                        return res.json(400, {err: 'invalid token'});
                    } else {
                        Labels.destroy(labelId).exec(function (err) {
                            if (err) {
                                return res.json(500, {err: err});
                            } else {
                                return res.json({status: 'label deleted', token: jwToken.issue({id: user.id})});
                            }
                        });
                    }
                });
            } else {
                return res.json(400, {err: 'invalid email'});
            }
        });
    }
};

