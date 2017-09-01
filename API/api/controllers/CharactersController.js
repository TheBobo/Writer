/**
 * CharactersController
 *
 * @description :: Server-side logic for managing characters
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

        if (!email || !token) {
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
                        Stories.findOne(storyId).populate('characters').exec(function (err, story) {
                            if(err){
                                return res.json(500, {err: err});
                            }
                            if(story){
                                return res.json({characters: story.characters, token: jwToken.issue({id: user.id})});
                            }else{
                                return res.json(400, {err: 'this storyId is not exist'});
                            }
                        });
                    }
                });
            }else{
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
            var  id  = user.id;
            if(err){
                return res.json(400, {err: err});
            }
            if(user) {
                jwToken.verify(token, function (err, token) {
                    if (err) {
                        return res.json(400, {err: 'invalid token'});
                    }else{
                        var newCharacter = req.body;
                        delete newCharacter.email;
                        delete newCharacter.token;
                        delete newCharacter.storyId;
                        newCharacter.story = storyId;
                        Characters.create(newCharacter).exec(function (err, character) {
                            if(err){
                                return res.json(500, {err: err});
                            }
                            if(character){
                                return res.json({status: 'character created',character: character, token: jwToken.issue({id: user.id})});
                            }
                        });
                    }
                });
            }else{
                return res.json(400, {err: 'invalid email'});
            }
        });
    },
    update: function (req, res) {
        var email = req.param('email');
        var token = req.param('token');
        var storyId = req.param('storyId');

        if (!email || !token || !storyId) {
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

                    }
                });
            }else{
                return res.json(400, {err: 'invalid email'});
            }
        });
    },
    remove: function (req, res) {
        var email = req.param('email');
        var token = req.param('token');
        var characterId = req.param('characterId');

        if (!email || !token || !characterId) {
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
                        Characters.destroy(characterId).exec(function (err) {
                            if(err){
                                return res.json(500, {err: err});
                            }else{
                                return res.json({status: 'Characters deleted', token: jwToken.issue({id: user.id})});
                            }
                        });
                    }
                });
            }else{
                return res.json(400, {err: 'invalid email'});
            }
        });
    }
};

