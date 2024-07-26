import { cursorToOffset, offsetToCursor } from "graphql-relay";
import moment from "moment/moment";
import { Sequelize } from "sequelize";

/* eslint-disable no-useless-escape */
const { pipe, invertObj, mapObjIndexed } = require("ramda");

export const fromCursorHash = (string) =>
  Buffer.from(string, "base64").toString("ascii");

export const toCursorHash = (string) => Buffer.from(string).toString("base64");
export const toEdgeNode = (obj = {}) => ({
  node: obj,
});
export const toEdgesNode = (arr = [], hasNextPage = false) =>
  hasNextPage
    ? arr.slice(0, -1).map((item) => toEdgeNode(item))
    : arr.map((item) => toEdgeNode(item));
export const convertToKeyValue = (arr = []) => {
  const keyValue = {};

  arr.forEach((x) => {
    Object.assign(keyValue, {
      [x.name.toUpperCase().replace(/\s+/g, "_")]: x.name,
    });
  });
  return keyValue;
};

export const toGraphQLEnum = (ENUM) =>
  pipe(
    invertObj,
    mapObjIndexed((val, key) => ({ value: key }))
  )(ENUM);

export const getAppURL = () =>
  process.env.NODE_ENV === "development"
    ? process.env.LOCAL_APP_URL
    : process.env.PROD_APP_URL;

export const validateEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const getDefaultDescription = () => ({
  type: "doc",
  content: [{ type: "paragraph", content: null }],
});

// Helper function to create pageInfo
export const createPageInfo = (items, count) => {
  const hasNextPage = items.length < count;
  const hasPreviousPage = false;
  return {
    hasPreviousPage,
    hasNextPage,
    startCursor: items.length > 0 ? toCursorHash(items[0].createdAt) : null,
    endCursor:
      items.length > 0 ? toCursorHash(items[items.length - 1].createdAt) : null,
  };
};

export const formatToDBDate = (date) =>
  moment(date).format("YYYY-MM-DD HH:mm:ss.SSSSSSZZ");

export const buildCursorCondition = ({ cursor, options } = {}) => {
  if (cursor && cursor.before) {
    return {
      where: {
        createdAt: {
          [Sequelize.Op.lt]: formatToDBDate(fromCursorHash(cursor.before)),
        },
        ...options,
      },
    };
  }
  if (cursor && cursor.after) {
    return {
      where: {
        createdAt: {
          [Sequelize.Op.gt]: formatToDBDate(fromCursorHash(cursor.after)),
        },
        ...options,
      },
    };
  }
  return {
    where: {
      ...options,
    },
  };
};

export const validatePaginationParameters = ({
  after,
  before,
  first,
  last,
}) => {
  if (after && last) {
    throw new Error('Cannot provide both "last" and "after" parameters');
  }
  if (after && !first) {
    throw new Error(
      "You must provide a `first` value to properly paginate the connection."
    );
  }
  if (before && first) {
    throw new Error('Cannot provide both "first" and "before" parameters');
  }
  if (before && !last) {
    throw new Error(
      "You must provide a `last` value to properly paginate the connection."
    );
  }
};

export const validateAndCalculateOffsetLimit = (args, total) => {
  validatePaginationParameters(args);
  const { after, before, first, last } = args;
  let offset = 0;
  const limit = first || last || 100;

  if (after) {
    console.log({ after });
    const afterOffset = cursorToOffset(after);
    console.log({ afterOffset });
    if (afterOffset != null) {
      offset = afterOffset + 1; // Because Relay cursor offsets are 0-based
    }
  }
  if (before) {
    const beforeOffset = cursorToOffset(args.before);

    if (beforeOffset != null) {
      if (last) {
        offset = Math.max(beforeOffset - last, 0);
      } else {
        offset = Math.max(beforeOffset - 1, 0);
      }
    }
  }
  if (last && !after && !before) {
    offset = Math.max(0, total - last);
  }
  if (Number.isNaN(offset) || offset < 0) {
    offset = 0;
  }
  return { offset, limit };
};

export const createRelayPageInfo = (edges, offset, limit, count) => ({
  startCursor: edges.length > 0 ? edges[0].cursor : null,
  endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
  hasPreviousPage: offset > 0,
  hasNextPage: offset + limit < count,
});

export const createRelayEdges = (items, offset) =>
  items.map((model, index) => ({
    cursor: offsetToCursor(offset + index),
    node: model,
  }));
