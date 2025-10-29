// src/data.js

export const convertToD3 = (node) => {
  if (!node) return null;
  const data = { name: node.value.toString() };
  const children = [];

  if (node.left) children.push(convertToD3(node.left));
  if (node.right) children.push(convertToD3(node.right));

  if (children.length > 0) data.children = children;
  return data;
};
