export function calculatePageInfo(offset, limit, totalCount) {
  const hasNextPage = offset + limit < totalCount;
  const hasPreviousPage = offset > 0;
  return {
    hasNextPage,
    hasPreviousPage,
  };
}
// export function edges(allTodos) {
//   const edges = allTodos.map((todo) => ({
//     node: todo,
//   }));
//   const createEdge = allTodos.map((todo) => ({
//     node: todo,
//   }));
//   return {
//     crea,
//   };
// }
