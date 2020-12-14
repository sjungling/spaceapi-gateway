const { ApolloServer } = require("apollo-server-lambda");
const { ApolloGateway } = require("@apollo/gateway");

const handler = async function (event, context) {
  const gateway = new ApolloGateway();
  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    playground: true,
    introspection: true,
    cacheControl: {
      defaultMaxAge: 60 * 60,
    },
  });
  return new Promise((resolve, reject) => {
    const cb = (err, args) => (err ? reject(err) : resolve(args));
    server.createHandler({
      cors: {
        origin: "*",
        methods: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        allowedHeaders: "*",
        credentials: true,
      },
    })(event, context, cb);
  });
};

module.exports = { handler };
