import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyConversion from './API-js/currency.js';

function clearField() {
  $('#dollars').val("");
}

function displayConversion(dollars, apiCurrencyValue, currency) {
  $('.currency-conversion').text(`${dollars} is equal to ${apiCurrencyValue} ${currency}`);
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

$(document).ready(function() {
  $('#submitButton').click(function(){
    const dollars = $('#dollars').val();
    let currency = $("#currency").val();
    clearField();
    displayConversion(dollars,currency);
    CurrencyConversion.getConversion(dollars,currency)
      .then(function(apiResponse) {
        if (apiResponse instanceof Error) {
          throw Error(`Conversion API error: ${apiResponse.message}`);
        }
        let path = require('path');
        let apiCurrencyValue = path.join('apiResponse.conversion_rates.',(currency));
        // let apiCurrencyValue = apiResponse.conversion_rates.append(currency);
        displayConversion(dollars,apiCurrencyValue,currency);
      })
      .catch(function(error){
        displayErrors(error.message);
      });
  });
});

  