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
  $('.currency-conversion').text(`$${dollars} is equal to ${converted} ${currency}'s`);
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

function selectOther() {
  $('.badSelection').text("This application is designed for only seven currencies. Please select one of the available for an exchange rate.");
}

$(document).ready(function() {
  $('#submitButton').click(function() {
    const dollars = $('#dollars').val();
    let currency = $("#currency").val();
    clearField();
    displayConversion(dollars, currency);
    CurrencyConversion.getConversion(dollars, currency)
      .then(function(apiResponse) {
        if (apiResponse instanceof Error) {
          throw Error(`Conversion API error: ${apiResponse.message}`);
        }
        if (currency === 'other') {
          selectOther();
        }
        if (currency !== 'other') {
          let apiCurrencyValue = apiResponse.conversion_rates[currency];
          displayConversion(dollars, apiCurrencyValue, currency);
        }
      })

      .catch(function(error) {
        displayErrors(error.message);
      });
  });
});

  