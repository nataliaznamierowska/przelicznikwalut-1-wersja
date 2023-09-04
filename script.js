const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

convertBtn.addEventListener("click", convertCurrency);

function convertCurrency(event) {
  event.preventDefault();

  const amount = parseFloat(document.getElementById("amount").value);
  const currency = document.getElementById("currency").value;

  if (isNaN(amount) || amount < 0.01) {
    result.textContent = "Wprowadź poprawną kwotę (min. 0.01).";
    return;
  }

  const url =
    "https://api.nbp.pl/api/exchangerates/rates/A/" +
    currency +
    "/?format=json";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const exchangeRate = data?.rates?.[0]?.mid;

      if (exchangeRate) {
        const resultValue = (amount * exchangeRate).toFixed(2);
        result.textContent = resultValue + " PLN";
      } else {
        result.textContent = "Nie udało się pobrać kursu waluty.";
      }
    })
    .catch((error) => {
      console.log(error);
      result.textContent = "Wystąpił błąd przy pobieraniu kursu waluty.";
    });
}
