import _ from "underscore";
import Todo from "./todo/model.js";
import User from "./user/model.js";

const Model = {
  Todo,
  User,
};
_.each(Model, (model) => {
  if (model.associate) {
    model.associate(Model);
  }
});
_.each(Model, (model) => {
  const scopes = model.scopes ? model.scopes(Model) : [];
  _.each(scopes || {}, (scope, key) => {
    model.addScope(key, scope);
  });
});
export default Model;
