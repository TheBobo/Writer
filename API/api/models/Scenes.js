/**
 * Scenes.js
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
        wordCount: {
            type: 'int'
        },

        setting: {
            type: 'string'
        },
        modeTone: {
            type: 'string'
        },
        objective: {
            type: 'string'
        },

        characters: {
            collection: 'characters',
            via: 'scenes'
        },


        chapter: {
            model: 'chapters'
        },

        label: {
            model: 'labels'
        }
    }
};

