var splitByValue = '|';
export var processCheckBoxFilters = function(data) {
  var checkBoxesToReturn = [];
  data.forEach(function(element) {
    var checkBoxData = {
      name: element,
      checked: false,
    };
    checkBoxesToReturn.push(checkBoxData);
  });
  return Promise.resolve(checkBoxesToReturn);
};
export var serializeCheckBoxesToStringArray = function(data) {
  var strings = [];
  data.forEach(function(element) {
    var item = element.name;
    strings.push(item);
  });
  // toString().split(',').toString()
  return strings
    .toString()
    .split(',')
    .toString();
};
export var serializeNumbersArrayToStringArray = function(data) {
  var strings = [];
  data.forEach(function(element) {
    var item = element.toString();
    strings.push(item);
  });
  // toString().split(',').toString()
  return strings
    .toString()
    .split(',')
    .toString();
};
export default {
  processCheckBoxFilters: processCheckBoxFilters,
  serializeCheckBoxesToStringArray: serializeCheckBoxesToStringArray,
  serializeNumbersArrayToStringArray: serializeNumbersArrayToStringArray,
};
//# sourceMappingURL=util-service.js.map
