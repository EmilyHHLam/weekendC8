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
  var inputNumberNMethod = {};
  var firstNumber =0;
  var secondNumber=0;
  var method='';
  //click number to get two numbers
  $('.numberContainer').on('click', '.number', function() {

    var curClicked = curNumb ++;

    if (curClicked ===1) {
        firstNumber = $(this).data("id");

    }else if (curClicked ===2) {
      secondNumber= $(this).data("id");

    }


  });  //end of get 2 numbers

  //get the method
  $('.operationContainer').on('click', '.mathButton', function() {
     method = $(this).attr('id');
   } ); //end of method function

   //equal button click
   $('.operationContainer').on('click', '.equal', function() {

      inputNumberNMethod.firstNumber = firstNumber;
      inputNumberNMethod.secondNumber = secondNumber;
      inputNumberNMethod.method   = method;
    // //sending over the server
      $.ajax( {
        type: 'POST',
        url: '/operation',
        data: inputNumberNMethod,
        sucess: function(response) {
          console.log("SUCCESS!");
        getResult();
        }


      }); //end of equal button clicked

   });


}); //end doc.ready.function
function getResult() {
  $.ajax( {
    type: 'GET',
    url: '/result',
    sucess: function(response) {
      console.log(response);
      displayResult();
    }
  });
}
function displayResult(result) {
  $("#result").empty();
  console.log(result);
  $(".resultContainer").append("<span>" + result + "</span>");
}
