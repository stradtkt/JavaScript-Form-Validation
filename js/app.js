'use strict';

var totalCost = 0;
$('.activities').append("<p id='totalCost'>Total Cost Will Be: $" + totalCost + "</p>");

//setting the credit card as the default value
$('select option:contains("Credit Card")').prop('selected',true);

//setting focus to the name input
$('#name').focus();


//adding an input to the field set when the user selects the option value of other
$(document).ready(function() {
$('#title').change(function() {
	if($('#title option:selected').val() === 'other') {
		$('#fieldset').append('<input type="text" id="other-title" placeholder="Your Job Role">');
	} else {
		$('#other-title').remove();
	}
});
});



$(function() {
	//hides the color select initially
	$('#color').hide();
	$('#design').change(function() {
  //if design changes and the person selects js puns another selecting of colors will show that are related to js puns
	if($('#design option:selected').val() === 'js puns') {
		$('select option[value="cornflowerblue"]').show();
		$('select option[value="darkslategrey"]').show();
		$('select option[value="gold"]').show();
		$('select option[value="tomato"]').hide();
		$('select option[value="steelblue"]').hide();
		$('select option[value="dimgrey"]').hide();
		$('#color').show();
		//shows the color when someone selects a design
	} 
});

	$('#design').change(function() {
    //if design changes and the person selects heart js another selecting of colors will show that are related to heart js
	if($('#design option:selected').val() === 'heart js') {
		$('select option[value="tomato"]').show();
		$('select option[value="steelblue"]').show();
		$('select option[value="dimgrey"]').show();
		$('select option[value="cornflowerblue"]').hide();
		$('select option[value="darkslategrey"]').hide();
		$('select option[value="gold"]').hide();
		$('#color').show();
		//shows the color when someone selects a design
	}
});
});
//setting id attribute to the checkbox items, this is used to calculate the total cost
//also these id attributes are used to cancel out the checkboxes when others are selected when they have the same time
	$('.activities > label').each(function() {	
		//selecting the text using indexOf to match up with the target time that is Tuesday 9am-12pm
		 if($(this).text().indexOf('Tuesday 9am-12pm') >= 0) {
			$(this).children().attr('id', 'morningTues');
		} else if($(this).text().indexOf('Tuesday 1pm-4pm') >=0) {
			$(this).children().attr('id', 'afternoonTues');
			//all days that have Wednesday for times 
		} else if($(this).text().indexOf('Wednesday') >= 0) {
			$(this).children().attr('id', 'wed');
		} else {
			//setting the id to the main conference
			$(this).children().attr('id', 'main');
		}
	});
$(".activities").find("input:checkbox").change(function() {

$('#totalCost').remove();

//setting a global variable of $(this). to checkBox will be used through this section of the code
var checkedBox = $(this);
  if ($(this).prop('checked')) {
    if ($(this).attr("id") == "morningTues") {
      $(".activities > label").each (function() {
      	//finding the input with the id of morningTues
        if ($(this).find("input").attr("id") == "morningTues") {
        	//this is selecting the input elements that are related to the input that has just been checked
        	//gives a disabled attribute to the other related checkbox
          $(this).find("input:not(:checked)").attr('disabled', 'disabled');
          //when the checkBox becomes disabled it will append the X with a message that it is Unavailable
          $(this).find("input:not(:checked)").parent().append('<small id="Unavailable"><b> &#10060; Unavailable<b></small>');
        }
      });
      //adding 100 to the total cost when the user makes a choice
          totalCost += 100;
    } else if ($(this).attr("id") == "afternoonTues") {
     $(".activities > label").each (function() {
      //.each iterates over the specified elements using a function to continually run through all of the elements 
       if ($(this).children().attr("id") === "afternoonTues") {
        //selecting the elements that have a reserved id of afternoonTues
         $(this).find("input:not(:checked)").attr('disabled', 'disabled');
         //once one of the two events are chosen that hold this id the other will be disabled so the user cannot choose it
         $(this).find("input:not(:checked)").parent().append('<small id="Unavailable"><b> &#10060; Unavailable<b></small>');
         //this gets tied to the end of the event when one of them is already booked
       }
     });
     //adds 100 to the totalCost when the item is selected
        totalCost += 100;
   //for the main conference no additional steps are needed adds 200 to the totalCost when it is selected
  } else if ($(this).attr("id") == "main") {
     totalCost += 200; 
   //same as above once one of the Wednesday classes are chosen it will add 100
  } else if ($(this).attr("id") == "wed") {
     totalCost += 100;
   }
 } else if (!$(this).prop('checked')) {
  //if the elements have not been checked then preform these functions
      if ($(this).attr("id") == "morningTues") {
        //checking for the id of morningTues
        $(".activities > label").each (function() {
          //each is used to iterate through all of the elements within .activities
          if ($(this).find("input").attr("id") == "morningTues") {
            $(this).find("input:not(:checked)").prop('disabled', false);
            //if none of the morningTues were checked then it cancels the disable and opens both of them up
            $(this).find('#Unavailable').remove();
            //the #Unavailable is removed when none of the morningTues were checked
          }});
        //take away 100 when the user removes the check off of an item
          totalCost -= 100;
        } else if ($(this).attr("id") == "afternoonTues") {
          //this is the same as above, it is used of the other tuesday id that is afternoonTues
         $(".activities > label").each (function() {
           if ($(this).children().attr("id") === "afternoonTues") {
             $(this).find("input:not(:checked)").prop('disabled', false);
             $(this).children('#Unavailable').remove();
           }});
          totalCost -= 100;
       } else if ($(this).attr("id") == "main") {
           totalCost -= 200;
       } else if ($(this).attr("id") == "wed") {
           totalCost -= 100;
      }
  }
  $('.activities').append("<p id='totalCost'>Total Cost Will Be: $" + totalCost + "</p>");
  //this is appended to the form and is used to show the totalCost
  //if the totalCost is 0 then activity selected is false meaning that nothing was picked
  if (totalCost === 0) { 
    activitySelected = false;
  } else if (totalCost > 0) {
    activitySelected = true;
  }
});


//this is the variable for the activities used for validation
//initially set to false until the user selects one of the checkbox
var activitySelected = false;


/*====================================
=            PAYMENT SELECTION       =
====================================*/
  $(document).ready(function() {
    //initially hide the paypal and bitcoin payment types so credit card is the only one showing
    $('#paypal p').hide();
    $('#bitcoin p').hide();
  });

$(document).ready(function() {
  $('#fieldset-payment').on('change', function() {
    //target the fieldset as the item that is going to change
    if($('#fieldset-payment option:selected').val() === 'credit card') {
      //shows the credit card when it is selected
      $('#credit-card').show();
      $('#paypal p').hide();
      $('#bitcoin p').hide();
    } else if($('#fieldset-payment option:selected').val() === 'paypal') {
      //shows paypal when it is selected
      $('#credit-card').hide();
      $('#paypal p').show();
      $('#bitcoin p').hide();
    } else if($('#fieldset-payment option:selected').val() === 'bitcoin') {
      //shows bitcoin when it is selected
      $('#credit-card').hide();
      $('#paypal p').hide();
      $('#bitcoin p').show();
    } else {
      //hides everything if nothing is selected
      $('#credit-card').hide();
      $('#paypal p').hide();
      $('#bitcoin p').hide();
    }
  });
});

/*=======================================
=            Form Validation            =
=======================================*/

//this is validating the name, email, credit card, zip, and cvv fields using a jquery validator plugin 

jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});
$( "#fullStack" ).validate({
  //these classes below are in style.css coloring the error messages and success
  errorClass: 'myErrorClass',
  validClass: 'myValidClass',
  rules: {
    //name validation
    name: {
      required: true,
      minlength: 2
    },
    //email validation
     email: {
      required: true,
      email: true
    },
    //credit card validation
    creditcard: {
      required: true,
      creditcard: true
    },
    //zip validation
    zip: {
      required: true,
      minlength: 5,
      maxlength: 5
    },
    //cvv validation
    cvv: {
      required: true,
      minlength: 3,
      maxlength: 3
    }
}
});

$('button:submit').click(function() {
  //when not completing the theme selection the labels for the section of the theme are colored red if the user hasn't chosen anything
  if($('#design option:selected').text() === 'Select Theme') {
    $('label[for="design"]').css('color', 'red');
  } else {
    $('label[for="design"]').css('color', '#184f68');
  }
// when not completing the drop down for the color the label will turn red else it will stay the same color if successful
  if($('#color option:selected').text() === 'Please select color') {
    $('label[for="color"]').css('color', 'red');
  } else {
    $('label[for="color"]').css('color', '#184f68');
  }
//if no activity is selected it will make the color of the legend red until on is selected
  if(!activitySelected) {
    $('.activities > legend').css('color', 'red');
  }

});


/*=====  End of Form Validation  ======*/





