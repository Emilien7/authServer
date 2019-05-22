// const server = require('../');
//
// const db = require('../database');
// const AuthBearer = require('hapi-auth-bearer-token');
// server.register(AuthBearer);
// server.auth.strategy('simple', 'bearer-access-token', {
//     allowQueryToken: true,              // optional, false by default
//     validate: async (request, token, h) => {
//
//         // here is where you validate your token
//         // comparing with token from your database for example
//         const isValid = token === await db.users.findOne(token).token;
//         // console.log(await token);
//         const credentials = {token: await db.users.findOne(token)};
//         const artifacts = {test: 'info'};
//
//         return {isValid, credentials, artifacts};
//     }
// });
// const simple = server.auth.strategy;
// module.exports = simple;

module.exports = {
    validate: async (request, token, h) => {
        const db = require('../database');
        // here is where you validate your token
        // comparing with token from your database for example
        const user = await db.users.findOne({ token });
        if (user === null) {
            return `User doesn't exist`;
        }
        const isValid = token === user.token;

        const credentials = user;
        const artifacts = { test: 'info' };

        // console.log({ isValid, credentials, artifacts });

        return { isValid, credentials, artifacts };
    }
};