var isResult = false;
var numberClick = '';
 var firstNumber = '';
 var secondNumber= '';
 var method='';

$(document).ready(function(){
  console.log('JQuery sourced:');
  var curNumb=1;
  for (var i = 0; i< 10; i++) {

      //
      $(".numberContainer").append('<span><button class="number" data-id="' + i + '"name="number' + i + '">' + i + '</button></span>');
        if (i%3 === 0 ) {
          $(".numberContainer").append('<p></p>');
        }
  }//end of loop

  //click number to get two numbers
  $('.numberContainer').on('click', '.number', function() {

    var input ='' ;
      //remove all in the result shown after number button clicked
    //isResult == true? than clear input and set to false
// console.log(isResult);
// console.log('2nd numb =' + secondNumber);
    if (isResult == true ) {
      $('.resultContainer').empty();

    }


    input = $(this).data("id");

    if (method === '') {

      firstNumber += input;
      $('.resultContainer').append('<span>' + input +'</span>');
    } else {
      secondNumber += input;
      $('.resultContainer').append('<span>' + input +'</span>');

    }



  });  //end of get 2 numbers

  //get the method
  $('.operationContainer').on('click', '.mathButton', function() {

     method = $(this).data('id');
     $('.resultContainer').append('<span>' + $(this).text() + '</span>');
   } ); //end of method function

   //equal button click
   $('.operationContainer').on('click', '.equal', function() {
      isResult = true;

       var inputNumberNMethod = {};
      inputNumberNMethod.firstNumber = firstNumber;
      inputNumberNMethod.secondNumber =  secondNumber;
      inputNumberNMethod.method   = method;

      //in case the button being clicked without having numbers
      // if (method === ''){
      //   $('.resultContainer').append('<span>Enter the number!</span>');
      // }

      $('.resultContainer').empty();
      firstNumber = '';
      secondNumber= '';
      method='';
    // //sending over the server
      $.ajax( {
        type: 'POST',
        url: '/operation',
        data: inputNumberNMethod,
        success: function(response) {
          console.log("SUCCESS!");

          $('.resultContainer').append('<span>' + response.answer +'</span>');
        //getResult();
      }

    }); //end of equal button clicked

   });

   $('.operationContainer').on('click', '.clear', function() {
     $('.resultContainer').empty();
     firstNumber = '';
     secondNumber= '';
     method='';
   });



}); //end doc.ready.function
