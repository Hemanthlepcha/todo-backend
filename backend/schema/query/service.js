import db from "../../models";

class TransactionService {
  static async findAll(filter) {
    return db.todo.findAll(filter);
  }

  static async findByPk(id) {
    return db.todo.findByPk(id);
  }

  static async getCount(where) {
    return db.todo.count(where);
  }
}
export default TransactionService;
