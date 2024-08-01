import { GraphQLError } from "graphql";
import { read, write, platform } from "./permission-scopes.js";

export default (Model) => {
  Model.findStrict = async function (...args) {
    const result = await this.findById(...args);
    if (!result) {
      throw new GraphQLError("No entity found for this id.");
    }
    return result;
  };
  Model.readScope = function (context, override = false) {
    return this.scope(read(context, override));
  };
  Model.platformScope = function (context) {
    return this.scope(platform(context));
  };
  Model.writeScope = function (context) {
    return this.scope(write(context));
  };
};
