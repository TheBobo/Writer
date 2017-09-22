/**
 * Characters.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        firstName:{
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        age: {
            type: 'int'
        },
        gender: {
            type: 'string'
        },
        location: {
            type: 'string'
        },
        storyLine: {
            type: 'text'
        },
        goal: {
            type: 'string'
        },
        conflict: {
            type: 'string'
        },
        epiphany: {
            type: 'string'
        },

        story: {
            model: 'stories'
        },
        scenes: {
            collection: 'scenes',
            via: 'characters'
        }
    }
};

