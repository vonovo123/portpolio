const filter = (ast, match) => {
  const result = ast.reduce((acc, node) => {
    if (match(node)) {
      const key = Math.floor(Math.random() * 100000) + "";
      node._key = "key_" + key;
      node = {
        el: node,
        tagName: node.tagName,
        level: node.tagName.slice(1),
      };
      io.observe(node.el);
      acc.push(node);
    }
    if (node.children) acc.push(...filter([...node.children], match));

    return acc;
  }, []);
  return result;
};

const findHeadings = (ast) => {
  return filter(ast, (node) => /H\d/.test(node.tagName));
};
const outline = { subheadings: [] };
const headings = findHeadings(ast);
const path = [];
let lastLevel = 0;
const get = (object, path) => {
  const result = path.reduce((prev, curr) => {
    return prev[curr];
  }, object);
  return result;
};
const getObjectPath = (path) => {
  return path.length === 0
    ? path
    : ["subheadings"].concat(path.join(".subheadings.").split("."));
};
headings.forEach((heading) => {
  const level = Number(heading.tagName.slice(1));
  heading.subheadings = [];
  if (level < lastLevel) {
    for (let i = lastLevel; i >= level; i--) path.pop();
  } else if (level === lastLevel) path.pop();
  const prop = get(outline, getObjectPath(path));
  prop.subheadings.push(heading);
  path.push(prop.subheadings.length - 1);
  lastLevel = level;
});
