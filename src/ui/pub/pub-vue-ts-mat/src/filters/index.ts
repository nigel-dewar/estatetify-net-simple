export const currency = (value: any) => {
  // var amount = "$" + parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  var amount = '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return amount;
};

export const date = (value: any) => {
  const date = new Date(value);
  const dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
  const MM = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
  const yyyy = date.getFullYear();

  return dd + '/' + MM + '/' + yyyy;
};
