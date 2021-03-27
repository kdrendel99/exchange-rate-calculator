export default class CurrencyConversion {
  static getConversion() {
    return fetch(`https://v6.exchangerate-api.com/v6/89a8362dd064dd5ee720a9d2/latest/USD`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        console.log(response.statusText);
        return response.json();
      })
      .catch(function(error){
        console.log('help')
        return Error(error);
      });
  }
}