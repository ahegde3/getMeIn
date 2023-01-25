exports.checkArraySanity = (array) => {
  if (array && Array.isArray(array) && array.length) return true;
  return false;
};
