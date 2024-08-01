import { createHandler } from "graphql-http/lib/use/express";
import expressPlayground from "graphql-playground-middleware-express";
import AppSchema from "../models/schema.graphql.js";
const graphQLPlayground = expressPlayground.default;

const graphql = (app) => {
  app.use(
    "/api/graphql",
    (req, res, next) => {
      if (req.method === "OPTIONS") {
        return res.status(200).send();
      } else {
        next();
      }
    },
    createHandler({
      schema: AppSchema,
      context: ({ raw }) => {
        console.log("context", raw.userId);
        return { user: raw.userId || null };
      },
    })
  );
  app.get("/api/playground", graphQLPlayground({ endpoint: "/api/graphql" }));
};
export default graphql;
