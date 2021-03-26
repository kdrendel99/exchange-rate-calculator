import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyConversion from './API-js/currency';

function clearField() {
  $('#dollars').val("");
}

function displayConversion(dollars,currency) {
  $('.currency-conversion').text(`The amount you entered you entered is equal to ${dollars} ${currency}!`);
}

// function displayErrors(error) {
//   $('.show-errors').text(`${error}`);
// }

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
        // const apiCurrencyValue = 
        // apiResponse.
      })
  });
});

  