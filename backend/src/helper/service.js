import {
  createRelayEdges,
  createRelayPageInfo,
  validateAndCalculateOffsetLimit,
} from "./utils.js";

class GlobalService {
  static async fetchAndPrepareData(service, filter, args) {
    const totalCount = await service.getCount({ where: filter });
    const { offset, limit } = validateAndCalculateOffsetLimit(args, totalCount);

    const items = await service.findAll({
      where: filter,
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });

    const edges = createRelayEdges(items, offset);
    const pageInfo = createRelayPageInfo(edges, offset, limit, totalCount);

    return {
      edges,
      pageInfo,
      totalCount,
    };
  }
}
export default GlobalService;
