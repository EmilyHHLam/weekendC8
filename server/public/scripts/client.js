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
 var numberClick = '';
  var firstNumber = '';
  var secondNumber= '';
  var method='';
  //click number to get two numbers
  $('.numberContainer').on('click', '.number', function() {
    var str;
    var strInput = '';
    var input ='' ;
    var curClicked = curNumb ++;

    // input = $(this).data("id");
    // firstNumber +=  input;
    //
    // console.log(firstNumber);
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

       var inputNumberNMethod = {};
      inputNumberNMethod.firstNumber = firstNumber;
      inputNumberNMethod.secondNumber =  secondNumber;
      inputNumberNMethod.method   = method;
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

     firstNumber = '';
     secondNumber= '';
     method='';
   });



}); //end doc.ready.function



//
// function getResult() {
//    $.ajax( {
//     type: 'GET',
//     url: '/result',
//     sucess: function(response) {
//       response.log("here comes result: ");
//       console.log(response);
//       displayResult();
//     }
//   });
//
// }
// function displayResult(result) {
//
//   $("#result").empty();
//   console.log(result);
//   $("#result").append("<span>" + result + "</span>");
// }
