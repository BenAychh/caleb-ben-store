var options = {};
$(document).ready(function() {
    getData();
});
function getData() {
  $.ajax({
    url: '/json/inventory/',
    method: 'GET'
  }).then(function(data) {
    populateProducts(data);
  });
}

function updateOptions(option, data) {
  if (arguments.length === 0) {
    var keys = Object.keys(options);
    keys.forEach(function(key) {
      delete options[key];
    });
    console.log(options);
    getData();
  } else {
    options[option] = data;
    getData();
  }
}

function populateProducts(data) {
  $('#products').empty();
  for (i = 0; i < data.length; i++) {
    var animal = data[i];
    if (options['species']) {
      if (options['species'] !== animal.animal_type) {
        continue;
      }
    }
    if(options['gender']) {
      if(options['gender'] !== animal.gender) {
        continue;
      }
    }
    if(options['price']) {;
      var optionPrice = options['price'].split('-');
      if (optionPrice[1]) {
        if (animal.price <= optionPrice[0] || animal.price > optionPrice[1]) {
          continue;
        }
      } else {
        if (animal.price < optionPrice[0]) {
          continue;
        }
      }
    }
    var eachAnimal = animal.animal_type;
    var animalName = animal.animal_name;
    var animalAge = animal.age;
    var animalGender = animal.gender;
    var animalOrigin = animal.origin;
    var animalPrice = animal.price;
    animalPrice = '$' + animalPrice;
    var animalDescription = "This " +animalGender + " " + animalOrigin + " animal is " + animalAge + " years old" ;
    var animalImage = animal.image_url;
    var animalID = animal.id;
    var animalBlock = '<div class="row"><image class="col-md-4"src="' +
        animalImage +'"></image><div class="col-md-8"><h2>'+ animalName +
        '</h2><p>'+ animalPrice +'</p><p>'+ animalDescription +
        '</p></div><button id="' + animalID + 'button" onclick="updateCart(\''+ animalID +
        '\')">Add to Cart</button></div>' +
        '<div class="form-group">&nbsp;</div>';

    var createAnimalBlock = function() {
      $('#products').append(animalBlock);
    };
    createAnimalBlock();
  }
}
