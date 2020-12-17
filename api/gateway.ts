import { ApolloGateway } from "@apollo/gateway";
import { ApolloServer } from "apollo-server-micro";
import cors from "micro-cors";
const corsHandler = cors({
  allowMethods: ["OPTIONS", "POST", "GET"],
  allowHeaders: ["*"],
});
const gateway = new ApolloGateway();
const server = new ApolloServer({
  gateway,
  subscriptions: false,
  playground: {
    settings: {
      //@ts-ignore
      "schema.polling.enable": false,
    },
  },
  introspection: true,
  cacheControl: {
    defaultMaxAge: 60 * 60 * 24,
  },
});
const handler = server.createHandler({ path: "/" });
export default corsHandler((req, res) =>
  req.method === "OPTIONS" ? res.end() : handler(req, res)
);
