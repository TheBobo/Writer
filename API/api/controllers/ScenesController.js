/**
 * ScenesController
 *
 * @description :: Server-side logic for managing scenes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function (req, res) {
        res.send('What did you want to see here?');
    },
    getAll: function (req, res) {
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
                        Chapters.findOne(chapterId).populate('scenes').exec(function (err, chapters) {
                            if (err) {
                                return res.json(500, {err: err});
                            }
                            if (chapters) {
                                return res.json({scenes: chapters.scenes, token: jwToken.issue({id: user.id})});
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
                        var newScene = req.body;
                        delete newScene.email;
                        delete newScene.token;
                        delete newScene.chapterId;
                        newScene.chapter = chapterId;
                        Scenes.create(newScene).exec(function (err, scene) {
                            if (err) {
                                return res.json(500, {err: err});
                            }
                            if (scene) {
                                return res.json({
                                    status: 'scene created',
                                    scene: scene,
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
        var sceneId = req.param('sceneId');

        if (!email || !token || !sceneId) {
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
                        var newScene = req.body;
                        delete newScene.email;
                        delete newScene.token;
                        delete newScene.sceneId;

                        Scenes.update({id: sceneId}, newScene).exec(function (err, scene) {
                            if (err) {
                                return res.json(500, {err: err});
                            } else {
                                return res.json({
                                    status: 'scene updated',
                                    scene: scene,
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
        var sceneId = req.param('sceneId');

        if (!email || !token || !sceneId) {
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
                        Scenes.destroy(sceneId).exec(function (err) {
                            if (err) {
                                return res.json(500, {err: err});
                            } else {
                                return res.json({status: 'Scene deleted', token: jwToken.issue({id: user.id})});
                            }
                        });
                    }
                });
            } else {
                return res.json(400, {err: 'invalid email'});
            }
        });
    },
    addCharacter: function (req, res) {
        var email = req.param('email');
        var token = req.param('token');
        var sceneId = req.param('sceneId');
        var characterId = req.param('characterId');

        if (!email || !token || !sceneId || !characterId) {
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
                        Scenes.findOne({id: sceneId}, function (err, scene) {
                            if (err) {
                                return res.json(500, {err: err});
                            }
                            if (scene) {
                                scene.characters.add(characterId);
                                scene.save(function (err) {
                                    if (err) {
                                        return res.json(400, {err: err});
                                    } else {
                                        return res.json({
                                            status: 'character added to scene',
                                            token: jwToken.issue({id: user.id})
                                        });
                                    }
                                });
                            } else {
                                return res.json(400, {err: 'invalid sceneId'});
                            }
                        });
                    }
                });
            } else {
                return res.json(400, {err: 'invalid email'});
            }
        });
    },
    getAllCharacters: function (req, res) {
        var email = req.param('email');
        var token = req.param('token');
        var sceneId = req.param('sceneId');

        if (!email || !token || !sceneId) {
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
                        Scenes.findOne({id: sceneId}).populate('characters').exec(function (err, scene) {
                            if (err) {
                                return res.json(500, {err: err});
                            }
                            if (scene) {
                                return res.json({
                                    characters: scene.characters,
                                    token: jwToken.issue({id: user.id})
                                });
                            } else {
                                return res.json(400, {err: 'invalid sceneId'});
                            }
                        });
                    }
                });
            } else {
                return res.json(400, {err: 'invalid email'});
            }
        });
    },
    getLabel: function (req, res) {
        var email = req.param('email');
        var token = req.param('token');
        var sceneId = req.param('sceneId');

        if (!email || !token || !sceneId) {
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
                        Scenes.findOne({id: sceneId}).populate('label').exec(function (err, scene) {
                            if (err) {
                                return res.json(500, {err: err});
                            }
                            if (scene) {
                                return res.json({
                                    label: scene.label,
                                    token: jwToken.issue({id: user.id})
                                });
                            } else {
                                return res.json(400, {err: 'invalid sceneId'});
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

