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
  if(text.length != 0){
    $('.scene.focus').find('.placeholder').addClass('hidden')
  }
  else{
    $('.scene.focus').find('.placeholder').removeClass('hidden')
  }

  $('.scene.focus').find('.text-description').val(text)
  console.log(text)
  //do something
}


$(document).on("keyup", ".trumbowyg-editor", function(e) {

  if (this.textContent.indexOf("@") == this.textContent.length - 1 && this.textContent.length != 0) {
    var postion = getCaretPosition();
    $("#characters").css({top: postion.y-28, left: postion.x, display:'block'});
    $("#characters > li").each(function() {
       $(this).show();   
    });
  }
  else if (this.textContent.indexOf("@") != -1 ){
    var index = this.textContent.indexOf("@")+1;
    var filter =  this.textContent.substr(index);
    
    $(this).find('.char').text(filter)

    var posStart  = $(".trumbowyg-editor").prop('selectionStart')
    console.log(posStart)

      $("#characters > li").each(function() {
          if(filter == ''){
            $(this).show();
          }
          else if ($(this).text().search(filter) > -1) {
              $(this).show();
          }
          else {
              $(this).hide();
              
          }
      });
  }
  else  if (this.textContent.indexOf("@") == -1 ){
    $("#characters").css({ display:'none'});
  }
  
});

})

function getCaretPosition() {
  var x = 0;
  var y = 0;
  var sel = window.getSelection();
  if(sel.rangeCount) {
      var range = sel.getRangeAt(0).cloneRange();
      if(range.getClientRects()) {
      range.collapse(true);
      var rect = range.getClientRects()[0];
      if(rect) {
          y = rect.top;
          x = rect.left;
      }
      }
  }

  return {
      x: x,
      y: y
  };
}