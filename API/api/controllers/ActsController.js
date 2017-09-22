/**
 * ActsController
 *
 * @description :: Server-side logic for managing acts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function (req, res) {
        res.send('What did you want to see here?');
    },
    getAll: function (req, res) {
        var email = req.param('email');
        var token = req.param('token');
        var storyId = req.param('storyId');

        if (!email || !token || !storyId) {
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
                        Stories.findOne(storyId).populate('acts').exec(function (err, story) {
                            if (err) {
                                return res.json(500, {err: err});
                            }
                            if (story) {
                                return res.json({acts: story.acts, token: jwToken.issue({id: user.id})});
                            } else {
                                return res.json(400, {err: 'this storyId is not exist'});
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
        var storyId = req.param('storyId');

        if (!email || !token || !storyId) {
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
                        var newAct = req.body;
                        delete newAct.email;
                        delete newAct.token;
                        delete newAct.storyId;
                        newAct.story = storyId;
                        Acts.create(newAct).exec(function (err, act) {
                            if (err) {
                                return res.json(500, {err: err});
                            }
                            if (act) {
                                return res.json({status: 'act created', act: act, token: jwToken.issue({id: user.id})});
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
        var actId = req.param('actId');

        if (!email || !token || !actId) {
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
                        var newAct = req.body;
                        delete newAct.email;
                        delete newAct.token;
                        delete newAct.actId;
                        // newStory.user = user.id;

                        Acts.update({id: actId}, newAct).exec(function (err, act) {
                            if (err) {
                                return res.json(500, {err: err});
                            } else {
                                return res.json({status: 'act updated', act: act, token: jwToken.issue({id: user.id})});
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
        var actId = req.param('actId');

        if (!email || !token || !actId) {
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
                        Acts.destroy(actId).exec(function (err) {
                            if (err) {
                                return res.json(500, {err: err});
                            } else {
                                return res.json({status: 'Act deleted', token: jwToken.issue({id: user.id})});
                            }
                        });
                    }
                });
            } else {
                return res.json(400, {err: 'invalid email'});
            }
        });
    },
    getWordsCount: function (req, res) {
        var email = req.param('email');
        var token = req.param('token');
        var actId = req.param('actId');

        if (!email || !token || !actId) {
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
                        var wordsCount = 0;

                        Acts.findOne(actId).populate('chapters').exec(function (err, acts) {
                            if (err) {
                                return res.json(500, {err: err});
                            }
                            if (acts) {
                                var nChapters = acts.chapters.length;
                                acts.chapters.forEach(function (elC, iC, massC) {
                                    Chapters.findOne(elC.id).populate('scenes').exec(function (err, chapters) {
                                        if (err) {
                                            return res.json(500, {err: err});
                                        }
                                        if (chapters) {
                                            nChapters--;
                                            chapters.scenes.forEach(function (elS, iS, massS) {
                                                wordsCount += Number(elS.wordCount);
                                            });
                                            if (nChapters == 0) {
                                                return res.json({
                                                    wordsCount: wordsCount,
                                                    token: jwToken.issue({id: user.id})
                                                });
                                            }
                                        } else {
                                            return res.json(400, {err: 'chapters not found!'});
                                        }
                                    });
                                })
                            } else {
                                return res.json(400, {err: 'acts not found!'});
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

