import Model from "./model.js";
class UserService {
  static async findAll(filter) {
    return Model.findAll(filter);
  }
  static async findByPk(id) {
    return Model.findByPk(id);
  }
  static async findOne(filter) {
    return Model.findOne(filter);
  }
  static async getCount(where) {
    return Model.count({ where });
  }
  static async build(input) {
    return new Model(input);
  }
  static async create(input) {
    // console.log("input", input);
    const entity = await this.build(input);
    // console.log("entity", entity);
    return entity.save();
  }
  static buildUpdateCriteria(input) {
    const errors = [];
    const where = {};
    // Either id required.
    if (!input.id) {
      errors.push({ key: "id", message: "'id' is required" });
    }
    if (errors.length) {
      throw errors;
    }
    where.id = input.id;
    // eslint-disable-next-line no-param-reassign
    delete input.id;
    return where;
  }
  static async update(input) {
    const where = this.buildUpdateCriteria(input);
    return Model.update(input, { returning: true, where })
      .then(() => Model.findByPk(where.id))
      .catch((e) => {
        throw new Error(e);
      });
  }
  static delete(input) {
    const where = this.buildUpdateCriteria(input);
    console.log("where", where);
    return Model.update(
      { deletedAt: new Date() },
      {
        where,
      }
    );
  }
}
export default UserService;
