export const saveCityToLocalStorage = (city) => {
  const cities = JSON.parse(localStorage.getItem("cities")) || [];

  if (!cities.includes(city)) {
    if (cities.length >= 5) {
      cities.shift();
    }
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
  }
};

export const getCitiesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cities")) || [];
};
