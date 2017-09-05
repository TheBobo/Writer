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
$(document).on("click", '.chapter.has-sub' ,function(evt){
  evt.stopPropagation();

  var clickActiveElem=$(this).hasClass('open');
  $(this).closest('.side-nav').find('.open').removeClass('open')

  if(!clickActiveElem)
    $(this).addClass('open')
})