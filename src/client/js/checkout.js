$(document).ready (function () {
	console.log('sup bud');
});
 
//clicking checkbox on checkout.html disables billing text fields - CP

	$('#sameAsBilling').change(function () {
		$('#firstNameBilling').prop('disabled', $(this).is(':checked'));
		$('#lastNameBilling').prop('disabled', $(this).is(':checked'));
		$('#emailBilling').prop('disabled', $(this).is(':checked'));
		$('#addressBilling').prop('disabled', $(this).is(':checked'));
		$('#cityBilling').prop('disabled', $(this).is(':checked'));
		$('#stateBilling').prop('disabled', $(this).is(':checked'));
		$('#zipCodeBilling').prop('disabled', $(this).is(':checked'));
	});


$('#purchaseButton').on('click', function () {
	var shippingInfo = {
		nameShipping: $('#firstNameShipping').val() +' '+ $('#lastNameShipping').val(),
		addressShipping: $('#addressShipping').val() +' '+ $('#cityShipping').val() +', '+ $('#zipCodeShipping').val(),
		emailShipping: $('#emailShipping').val()
	};

	var billingInfo = {
		nameBilling: $('#firstNameBilling').val() +' '+ $('#lastNameBilling').val(),
		addressBilling: $('#addressBilling').val() +' '+ $('#cityBilling').val() +', '+ $('#zipCodeBilling').val(),
		emailBilling: $('#emailBilling').val()
	};
	
	//populates NameOnCard
	var nameCreditCard = function () {
		if (shippingInfo.nameShipping === billingInfo.nameBilling) {
			return shippingInfo.nameShipping;
		} else {
			return billingInfo.nameBilling;
		}
	};

	//populates zipCard
	var zipShip = $('#zipCodeShipping').val();
	var zipBill = $('#zipCodeBilling').val();
	var zipKing = function () {
		if (zipShip === zipBill) {
			return zipShip;
		} else {
			return zipBill;
		}
	};	
	
	var creditCardInfo = {
	 	nameOnCard: nameCreditCard(),
	 	ccNumber: $('#creditCardNumber').val(),
	 	expDate: $('#expirationDate').val(),
	 	ccv: $('#ccvNumber').val(),
	 	zipCard: zipKing 
	};

	console.log(shippingInfo, billingInfo, creditCardInfo);
});

// Stripe
$(document).on('ready', function() {
  console.log('sanity check!');
  Stripe.setPublishableKey('pk_test_LTr6gQDMbMAcaJRzahfFGi9N');
});

$('.order').on('click', function(){
  var cardInfo = {
    number: $( '.card-number' ).val(),
    cvc: $('.card-cvc').val(), 
    exp_month: $('.card-expiry').val().split('/')[0],
    exp_year: $('.card-expiry').val().split('/')[1]
  };
  
  Stripe.card.createToken(cardInfo, stripeResponseHandler);  
});

$('.card-number').on('blur', function(){
  // do something
  var cardNum = $('.card-number')
  if (!Stripe.card.validateCardNumber(cardNum.val())){
    cardNum.css('color', 'red');
  } else {
    cardNum.css('color', 'green');
  } 
}); 

$('.card-cvc').on('blur', function(){
  // do something
  var cardCVC = $('.card-cvc')
  if (!Stripe.card.validateCVC(cardCVC.val())){
    cardCVC.css('color', 'red');
  } else {
    cardCVC.css('color', 'green');
  } 
});

$('.card-expiry').on('blur', function(){
  // do something
  var cardExpiry = $('.card-expiry');
  var cardExpiryMonth = $('.card-expiry').val().split('/')[0];
  var cardExpiryYear = $('.card-expiry').val().split('/')[1]
  if (!Stripe.card.validateExpiry(cardExpiryMonth, cardExpiryYear)){
    cardExpiry.css('color', 'red');
  } else {
    cardExpiry.css('color', 'green');
  } 
});

function stripeResponseHandler(status, response) {
  if (response.error) {
    console.log(response.error.message);
  } else {
    console.log(response);
  }
};
