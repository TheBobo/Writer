/**
 * StoriesController
 *
 * @description :: Server-side logic for managing stories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function (req, res) {
        res.send('What did you want to see here?');
    },
    getAll: function (req, res) {
        var email = req.param('email');
        var token = req.param('token');

        // console.log('email : ', email, ' , token : ', token);
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
                        Users.findOne(id).populate('stories').exec(function (err, stories) {
                            if(err){
                                return res.json(500, {err: err});
                            }
                            if(stories){
                                // console.log('all stories from stories : ', JSON.stringify(stories));
                                return res.json(500, {stories: stories.stories, token: jwToken.issue({id: user.id})});
                            }else{
                                return res.json(500, {err: 'it\'s impossible'});
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

        if (!email || !token) {
            return res.json(400, {err: 'not all parameters was set'});
        }

        Users.findOne({email: email}).populate('stories').exec(function (err, user) {
            var  id  = user.id;
            if(err){
                return res.json(400, {err: err});
            }
            if(user) {
                jwToken.verify(token, function (err, token) {
                    if (err) {
                        return res.json(400, {err: 'invalid token'});
                    }else{
                        var newStory = req.body;
                        delete newStory.email;
                        delete newStory.token;
                        newStory.user = user.id;

                        Stories.create(newStory).exec(function (err, story) {
                            if(err){
                                return res.json(500, {err: err});
                            }else{
                                return res.json({status: 'new story created', story: story, token: jwToken.issue({id: user.id})});
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

        Users.findOne({email: email}).populate('stories').exec(function (err, user) {
            var  id  = user.id;
            if(err){
                return res.json(400, {err: err});
            }
            if(user) {
                jwToken.verify(token, function (err, token) {
                    if (err) {
                        return res.json(400, {err: 'invalid token'});
                    }else{
                        var newStory = req.body;
                        delete newStory.email;
                        delete newStory.token;
                        delete newStory.storyId;
                        // newStory.user = user.id;

                        Stories.update({id: storyId}, newStory).exec(function (err, story) {
                            if(err){
                                return res.json(500, {err: err});
                            }else{
                                return res.json({status: 'story updated', story: story, token: jwToken.issue({id: user.id})});
                            }
                        });
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
                        Stories.destroy(storyId).exec(function (err) {
                            if(err){
                                return res.json(500, {err: err});
                            }else{
                                return res.json({status: 'story deleted', token: jwToken.issue({id: user.id})});
                            }
                        });
                    }
                });
            }else{
                return res.json(400, {err: 'invalid email'});
            }
        });
    },
    getSynopsis: function (req, res) {
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
                        Stories.findOne(storyId).exec(function (err, story) {
                            if(err){
                                return res.json(500, {err: err});
                            }
                            if(story){
                                synopsys = {
                                    oneParagraphSynopsis: story.oneParagraphSynopsis,
                                    fourParagraphSynopsis: story.fourParagraphSynopsis,
                                    fourPageSynopsis: story.fourPageSynopsis
                                }
                                return res.json({synopsis: synopsys, token: jwToken.issue({id: user.id})});
                            }else{
                                return res.json(400, {err : 'storyId not found!'});
                            }
                        });
                    }
                });
            }else{
                return res.json(400, {err: 'invalid email'});
            }
        });
    },

    getWordsCount: function (req, res) {
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
                        Stories.findOne(storyId).populate('acts').exec(function (err, story) {
                            if(err){
                                return res.json(500, {err: err});
                            }if(story){
                                console.log('it\'s work !!!');

                                var nActs = story.acts.length;
                                var wordsCount = 0;

                                story.acts.forEach(function (el, i, mass) {
                                    Acts.findOne(el.id).populate('chapters').exec(function (err, acts) {
                                        if(err){
                                            return res.json(500, {err: err});
                                        }
                                        if(acts){
                                            var nChapters = acts.chapters.length;
                                            nActs--;
                                            acts.chapters.forEach(function (elC, iC, massC) {
                                                Chapters.findOne(elC.id).populate('scenes').exec(function (err, chapters) {
                                                    if(err){
                                                        return res.json(500, {err: err});
                                                    }
                                                    if(chapters){
                                                        nChapters--;
                                                        chapters.scenes.forEach(function (elS, iS, massS) {
                                                            wordsCount += Number(elS.wordCount);
                                                        });
                                                        if(nActs == 0 && nChapters == 0){
                                                            return res.json({wordsCount: wordsCount, token: jwToken.issue({id: user.id})});
                                                        }
                                                    }else {
                                                        return res.json(400, {err : 'chapters not found!'});
                                                    }
                                                });
                                            })
                                        }else {
                                            return res.json(400, {err : 'acts not found!'});
                                        }
                                    });
                                });
                            }else{
                                return res.json(400, {err : 'storyId not found!'});
                            }
                        });
                    }
                });
            }else{
                return res.json(400, {err: 'invalid email'});
            }
        });
    },
};

