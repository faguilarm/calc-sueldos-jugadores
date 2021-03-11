const validarPrim = (field, type) => typeof type === "string"? (type === "array"? Array.isArray(field) : typeof field === type) : false;

const validarComp = (field, {type, of}) => type === "array"? validarArr(field, of) : (type === "object"? validarObj(field, of) : false);

const validarObj = (obj, rules) =>
  typeof obj === "object" &&
  obj !== null &&
  Object.entries(rules)
    .map(([name, rule]) =>
      obj.hasOwnProperty(name) && (validarPrim(obj[name], rule) || validarComp(obj[name], rule)))
    .reduce((global, resultado) => global && resultado, true);

const validarArr = (arr, rules) =>
  Array.isArray(arr) &&
  arr
    .map(item => validarObj(item, rules))
    .reduce((global, resultado) => global && resultado, true);

module.exports = {
  validarPrim,
  validarComp,
  validarArr,
  validarObj
};