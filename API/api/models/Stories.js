/**
 * Stories.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        title: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        // wordCount: {
        //     type: 'int',
        //     defaultsTo: 0
        // },
        targetWords: {
            type: 'int'
        },

        oneParagraphSynopsis: {
            type: 'string',
            size: 160
        },
        fourParagraphSynopsis: {
            type: 'string',
            size: 160
        },
        fourPageSynopsis: {
            type: 'string',
            size: 160
        },

        characters: {
            collection: 'characters',
            via: 'story'
        },

        user: {
            model: 'users'
        },

        acts: {
            collection: 'acts',
            via: 'story'
        }
    }
};

