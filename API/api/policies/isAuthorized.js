/**
 * Created by annitka on 12.04.17.
 */
/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function (req, res, next) {
    var token;

    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(' ');
        // res.send('isAuthorized if');
        if (parts.length == 2) {
            var scheme = parts[0],
                credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            return res.json(401, {err: 'Format is Authorization: Bearer [token]'});
        }
    } else if (req.param('token')) {
        // res.send('isAuthorized else if ');
        token = req.param('token');
        // We delete the token from param to not mess with blueprints
        delete req.query.token;
    } else {
        // res.send('isAuthorized else ');
        return res.json(401, {errBoss: "This path is not correct !!!"});
    }

    jwToken.verify(token, function (err, token) {
        if (err) return res.json(401, {err: err});
        req.token = token; // This is the decrypted token or the payload you provided
        next();
    });
};
