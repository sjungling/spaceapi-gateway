import { ApolloGateway } from "@apollo/gateway";
import { ApolloServer } from "apollo-server-micro";
import cors from "micro-cors";

const GRAPHQL_ENDPOINT = "/";
const corsHandler = cors({
  allowMethods: ["OPTIONS", "POST", "GET"],
  allowHeaders: ["*"],
});

const exampleQueries = {
  missions: `query findAllMissions {
    missions {
      __typename
      id
      mission
      astronauts {
        __typename
        firstName
        id
        lastName
      }
      commandModule
      duration
      launchDate
      launchVehicle
      lunarModule
      notes
    }
  }`,
  astronauts: `query astronauts($astronautId: Int) {
    astronaut(id: $astronautId) {
    ...on Astronaut {
      id
      firstName
      lastName
      missions {
        id
         mission
         launchDate
      }
    }
    }
  }`,
  missionAndImages: `query missionAndImages($missionId: Int!, $imagesLimit: Int) {
    mission(id: $missionId){
      ... on Mission {
        id
        mission
        launchDate
        images(limit: $imagesLimit) {
          id
          href
        }
      }
    }
  }`,
};
const gateway = new ApolloGateway();
const server = new ApolloServer({
  gateway,
  subscriptions: false,
  playground: {
    workspaceName: "SpaceAPI.dev",
    settings: {
      //@ts-ignore
      "schema.polling.enable": false,
      "editor.theme": "light",
      "tracing.hideTracingResponse": true,
      "queryPlan.hideQueryPlanResponse": true,
      "general.betaUpdates": true,
    },
    tabs: [
      {
        endpoint: GRAPHQL_ENDPOINT,
        name: "Missions",
        query: exampleQueries.missions,
      },
      {
        endpoint: GRAPHQL_ENDPOINT,
        name: "Astronauts",
        query: exampleQueries.astronauts,
        variables: '{"astronautId": 3}',
      },
      {
        endpoint: GRAPHQL_ENDPOINT,
        name: "Mission with Images",
        query: exampleQueries.missionAndImages,
        variables: '{"missionId": 3, "imageLimit": 3}',
      },
    ],
  },
  introspection: true,
  cacheControl: {
    defaultMaxAge: 60 * 60 * 24,
  },
});
const handler = server.createHandler({ path: GRAPHQL_ENDPOINT });
export default corsHandler((req, res) =>
  req.method === "OPTIONS" ? res.end() : handler(req, res)
);
