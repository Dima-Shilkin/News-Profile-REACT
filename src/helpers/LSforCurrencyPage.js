export const saveBaseCurrencyToLS = (currency) => {
  localStorage.setItem("baseCurrency", currency);
};

export const getBaseCurrencyFromLS = () => {
  localStorage.getItem("baseCurrency");
};
