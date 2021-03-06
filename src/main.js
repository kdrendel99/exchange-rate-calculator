import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyConversion from './API-js/currency.js';

function clearField() {
  $('#dollars').val("");
}

function displayConversion(dollars, apiCurrencyValue, currency) {
  let converted = (dollars * apiCurrencyValue).toFixed([2]);
  $('.currency-conversion').text(`$${dollars} USD is equal to ${converted} ${currency}'s`);
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

function badCurrency(currency){
  $('.show-errors').text(`We apologize, this API no longer supports '${currency}' as a valid currency. Please try another currency.`);
}
function invalidEntry(){
  $('.show-errors').text('Please enter a valid number.');
}

function selectOther() {
  $('.badSelection').text("This application is designed for only seven currencies. Please select one of the available for an exchange rate.");
}

function clearDom(){
  $('.currency-conversion').text('');

}

$(document).ready(function() {
  $('#submitButton').click(function() {
    clearDom();
    const dollars = parseFloat($('#dollars').val());
    let currency = $("#currency").val();
    clearField();
    if (currency === 'other'){
      selectOther();
      return;
    }
    if (isNaN(dollars)){
      invalidEntry();
      return;
    }
    CurrencyConversion.getConversion(dollars, currency)
      .then(function(apiResponse) {
        if (apiResponse instanceof Error) {
          throw Error(`Conversion API error: ${apiResponse.message}`);
        }
        if (currency !== 'other') {
          let apiCurrencyValue = apiResponse.conversion_rates[currency];
          if (apiCurrencyValue === undefined || apiCurrencyValue.isNaN){
            badCurrency(currency);
            return;
          }
          displayConversion(dollars, apiCurrencyValue, currency);
        }
      })

      .catch(function(error) {
        displayErrors(error.message);
      });
  });
});

  