import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyConversion from './API-js/currency.js';

function clearField() {
  $('#dollars').val("");
}

function displayConversion(apiCurrencyValue) {
  //Currently attempting to just get the conversion number to display from API when currency is selected
  $('.currency-conversion').text(`The amount you entered you entered is equal to ${apiCurrencyValue}!`);
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
        const apiCurrencyValue = 
        apiResponse.conversion_rates.CAD;
        displayConversion(apiCurrencyValue);
      })
      .catch(function(error){
        displayErrors(error.message);
      });
  });
});

  