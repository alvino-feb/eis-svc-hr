export const buildTree = (
  items,
  idKey = "id",
  parentKey = "parentId",
  childKey = "children"
) => {

  const map = {};
  const roots = [];

  items.forEach((item) => {
    map[item[idKey]] = {
      ...item,
      level: 1,
      [childKey]: [],
    };
  });

  items.forEach((item) => {
    const node = map[item[idKey]];

    if (!item[parentKey]) {
      roots.push(node);
      return;
    }

    const parent = map[item[parentKey]];

    if (parent) {
      node.level = parent.level + 1;
      parent[childKey].push(node);
    }
  });

  return roots;
};