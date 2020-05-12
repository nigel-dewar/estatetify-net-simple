export var currency = function (value) {
    // var amount = "$" + parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    var amount = '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return amount;
};
export var date = function (value) {
    var date = new Date(value);
    var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    var MM = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
    var yyyy = date.getFullYear();
    return dd + '/' + MM + '/' + yyyy;
};
//# sourceMappingURL=index.js.map