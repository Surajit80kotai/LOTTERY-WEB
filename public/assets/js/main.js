// const dropdownBtn = document.getElementById("btn");
// const dropdownMenu = document.getElementById("dropdown");
// const toggleArrow = document.getElementById("arrow");

// // Toggle dropdown function
// const toggleDropdown = function () {
//   dropdownMenu.classList.toggle("show");
//   toggleArrow.classList.toggle("arrow");
// };

// // Toggle dropdown open/close when dropdown button is clicked
// dropdownBtn.addEventListener("click", function (e) {
//   e.stopPropagation();
//   toggleDropdown();
// });

// // Close dropdown when dom element is clicked
// document.documentElement.addEventListener("click", function () {
//   if (dropdownMenu.classList.contains("show")) {
//     toggleDropdown();
//   }
// });






// date




// slick slider

$('.slider_area').slick({
  dots: true,
  arrows: false,
  autoplay: true,
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,

});

$('.banslider').slick({
  dots: false,
  arrows: true,
  // autoplay: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  adaptiveHeight: true,
  prevArrow: "<button type='button' class='slick-prev'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
  nextArrow: "<button type='button' class='slick-next'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
});


// product thumbnail




// navbar
const menubar = document.querySelector('.hamburger-menu');
const menuList = document.querySelector('.menu_list');
const navbar = document.querySelector('.navbar');
menubar.onclick = () => {
  menubar.classList.toggle("active");
  menuList.classList.toggle("active");

}



// timer



// Set the date we're counting down to
var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"

  $('.days').html(days);
  $('.hours').html(hours);
  $('.minutes').html(minutes);
  $('.seconds').html(seconds);
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);



// load more

// $(function () {
//   $(".product_item").slice(0, 3).show();
//   $("body").on('click touchstart', '.load-more', function (e) {
//     e.preventDefault();
//     $(".product_item:hidden").slice(0, 3).slideDown();
//     if ($(".product_item:hidden").length == 0) {
//       $(".load-more").css('visibility', 'hidden');
//     }
//     $('html,body').animate({
//       scrollTop: $(this).offset().top
//     }, 1000);
//   });
// });




var buttonPlus  = $(".qty-btn-plus");
var buttonMinus = $(".qty-btn-minus");

var incrementPlus = buttonPlus.click(function() {
  var $n = $(this)
  .parent(".qty-container")
  .find(".input-qty");
  $n.val(Number($n.val())+1 );
});

var incrementMinus = buttonMinus.click(function() {
  var $n = $(this)
  .parent(".qty-container")
  .find(".input-qty");
  var amount = Number($n.val());
  if (amount > 0) {
    $n.val(amount-1);
  }
});




// progress area

window.onload = function () {
  if (
    document.querySelectorAll(".progressarea").length > 0 &&
    document.querySelectorAll(".progressarea [data-progress]").length > 0
  ) {
    // Get all elements with 'data-progress' attribute and run the 'AnimateProgress' funcion with each one
    document
      .querySelectorAll(".progressarea [data-progress]")
      .forEach((x) => AnimateProgress(x));
  }
};

function AnimateProgress(el) {
  // Get the element that came as parameter and add the class 'animated-progress' on it
  el.className = "animate-progress";
  // Set the attribute 'style' of this element with the custom attribute '--animate-progress' and the value of 'data-progress' as the width value
  el.setAttribute(
    "style",
    `--animate-progress:${el.getAttribute("data-progress")}%;`
  );
  // After this the CSS make its magic
}

// acordian

//On click of the 'next' anchor
$('.accordion--form__next-btn').on('click touchstart', function() {

  var parentWrapper = $(this).parent().parent();
  var nextWrapper = $(this).parent().parent().next('.accordion--form__fieldset');
  var sectionFields = $(this).siblings().find('.required');


  //Validate the .required fields in this section
  var empty = $(this).siblings().find('.required').filter(function() {

    return this.value === "";

  });

  if (empty.length) {

    $('.accordion--form__invalid').show();

  } else {

    $('.accordion--form__invalid').hide();

    //If valid
    //On the next fieldset -> accordion wrapper, toggle the active class
    nextWrapper.find('.accordion--form__wrapper').addClass('accordion--form__wrapper-active');

    //Close the others
    parentWrapper.find('.accordion--form__wrapper').removeClass('accordion--form__wrapper-active');

    //Add a class to the parent legend
    nextWrapper.find('.accordion--form__legend').addClass('accordion--form__legend-active');

    //Remove the active class from the other legends
    parentWrapper.find('.accordion--form__legend').removeClass('accordion--form__legend-active');

  }

  return false;
});

//On click of the 'prev' anchor
$('.accordion--form__prev-btn').on('click touchstart', function() {

  parentWrapper = $(this).parent().parent();
  prevWrapper = $(this).parent().parent().prev('.accordion--form__fieldset');

  //On the prev fieldset -> accordion wrapper, toggle the active class
  prevWrapper.find('.accordion--form__wrapper').addClass('accordion--form__wrapper-active');

  //Close the others
  parentWrapper.find('.accordion--form__wrapper').removeClass('accordion--form__wrapper-active');

  //Add a class to the parent legend
  prevWrapper.find('.accordion--form__legend').addClass('accordion--form__legend-active');

  //Remove the active class from the other legends
  parentWrapper.find('.accordion--form__legend').removeClass('accordion--form__legend-active');


  return false;
});
