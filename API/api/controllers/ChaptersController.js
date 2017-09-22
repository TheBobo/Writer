/**
 * ChaptersController
 *
 * @description :: Server-side logic for managing chapters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function (req, res) {
        res.send('What did you want to see here?');
    },
    getAll: function (req, res) {
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
                        Acts.findOne(actId).populate('chapters').exec(function (err, act) {
                            if (err) {
                                return res.json(500, {err: err});
                            }
                            if (act) {
                                return res.json({chapters: act.chapters, token: jwToken.issue({id: user.id})});
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
                        var newChapter = req.body;
                        delete newChapter.email;
                        delete newChapter.token;
                        delete newChapter.actId;
                        newChapter.act = actId;
                        Chapters.create(newChapter).exec(function (err, chapter) {
                            if (err) {
                                return res.json(500, {err: err});
                            }
                            if (chapter) {
                                return res.json({
                                    status: 'chapter created',
                                    chapter: chapter,
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
        var chapterId = req.param('chapterId');

        if (!email || !token || !chapterId) {
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
                        var newChapter = req.body;
                        delete newChapter.email;
                        delete newChapter.token;
                        delete newChapter.chapterId;

                        Chapters.update({id: chapterId}, newChapter).exec(function (err, chapter) {
                            if (err) {
                                return res.json(500, {err: err});
                            } else {
                                return res.json({
                                    status: 'chapter updated',
                                    chapter: chapter,
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
        var chapterId = req.param('chapterId');

        if (!email || !token || !chapterId) {
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
                        Chapters.destroy(chapterId).exec(function (err) {
                            if (err) {
                                return res.json(500, {err: err});
                            } else {
                                return res.json({status: 'Chapter deleted', token: jwToken.issue({id: user.id})});
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
        var chapterId = req.param('chapterId');

        if (!email || !token || !chapterId) {
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
                        Chapters.findOne(chapterId).populate('scenes').exec(function (err, chapters) {
                            if (err) {
                                return res.json(500, {err: err});
                            }
                            if (chapters) {
                                chapters.scenes.forEach(function (elS, iS, massS) {
                                    wordsCount += Number(elS.wordCount);
                                });
                                return res.json({
                                    wordsCount: wordsCount,
                                    token: jwToken.issue({id: user.id})
                                });
                            } else {
                                return res.json(400, {err: 'chapters not found!'});
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

