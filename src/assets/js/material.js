 //Material Form
 setTimeout(function() {
  var input  = $(".form-control");
  input.on('focus blur', function (e) {
    $(this).parents('.form-group').toggleClass('active', (e.type === 'focus' || this.value.length > 0));
  });
    $(input).on('focus', function() {
      $(this).parents('.form-group').addClass('focus')
    })
    $(input).on('blur', function() {
      $(this).parents('.form-group').removeClass('focus')
    })
      .trigger('blur');

  // Form Change Between Login and Signup
  //Singup Login changer between the forms login.html
  $('.change-form a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "400");
  });
}, 400);


//open acordion
$(document).on("click", '.chapter.has-sub a' ,function(evt){
  evt.stopPropagation();

  var clickActiveElem=$(this).closest('li').hasClass('open');
  $(this).closest('.side-nav').find('.open').removeClass('open')

  if(!clickActiveElem)
    $(this).closest('li').addClass('open')
})


// $(document).on('scroll', '.editor-wrapper', function(){
//   console.log('windows was scrool')
// })
$(document).ready(function(){
//   debugger
// $().scroll(function(){
//   debugger
//   console.log('windows was scrool')
// });


var typingTimer;                //timer identifier
var doneTypingInterval = 5000;  //time in ms, 5 second for example

//on keydown, clear the countdown
$(document).on('keydown', '.trumbowyg-editor', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//user is "finished typing," do something
function doneTyping () {
  var text = $('.scene.focus .trumbowyg-editor').html();
  var scene = $('.scene.focus')
  debugger
  if(text.length != 0){
    $('.scene.focus').find('.placeholder').addClass('hidden')
  }
  else{
    $('.scene.focus').find('.placeholder').removeClass('hidden')
  }

  $('.scene.focus').find(' .text-description').val(text)
  console.log(text)
  //do something
}

})
