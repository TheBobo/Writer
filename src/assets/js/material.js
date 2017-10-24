

var isInTag=false;
var tagText='';
var startIndex = -1;
var indexPosition=-1;

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

$(document).on('focus','.form-control input', function(evt){
  $(evt.target).closest('.form-control').addClass('active')
})


$(document).on('blur','.form-control input', function(evt){

  if($(evt.target).val().length == 0 )
    $(evt.target).closest('.form-control').removeClass('active')
})

//open acordion
$(document).on("click", '.chapter.has-sub a' ,function(evt){
  evt.stopPropagation();

  var clickActiveElem=$(this).closest('li').hasClass('open');
  $(this).closest('.side-nav').find('.open').removeClass('open')

  if(!clickActiveElem)
    $(this).closest('li').addClass('open')
})

$(document).ready(function(){

var debounce = null;
var date =  new Date();

$('.minutes-count').text(0);

var interval=null;

function setTimeOut(){  
  setInterval(function(){
    var now = new Date();
    var minutes = parseInt((now - date)/60000);
    $('.minutes-count').text(minutes);
  }, 10000);  
}

var textContent = '';

$(document).on("click", ".trumbowyg-editor", function(e) {
  textContent = this.textContent;
})

function findChanges(oldContent, newContent){
  var contentLength = oldContent.length;
  if(contentLength < newContent.length)
    contentLength = newContent.length;

  for(var i=0; i<contentLength; i++){
    if( (oldContent[i] != newContent[i]) ){
      indexPosition = i;
      if(newContent[i] == '@'){
        startIndex = i;
        isInTag = true;
      }

      if(isInTag){
        tagText += newContent[i];
      }
      console.log('character is: ' + newContent[i])
      console.log('Tag text is: ' + tagText)
      debugger
      break;
    }
  }
}

$(document).on("keyup", ".trumbowyg-editor", function(e) {
  
    if(interval==null){
      interval = setTimeOut();
    }
    clearTimeout(debounce);
    debounce = setTimeout(function(){
        // SAVE
        clearInterval(interval);
        interval = null;
        $('.auto-timer').hide();
        $('.auto-timer').find('.minutes-count').text('0')
        $(".autosave").show();
        setTimeout(function(){
          $(".autosave").hide();
          $('.auto-timer').show();  
          date = new Date();
        },500)
    }, 3000);

    findChanges(textContent, this.textContent);
    //console.log('Old content: ' + textContent);
    textContent = this.textContent
    //console.log('New content: ' + textContent)

  if (this.textContent.indexOf("@", ) == this.textContent.length - 1 && this.textContent.length != 0) {
    var postion = getCaretPosition();
    $("#characters").css({top: postion.y-28, left: postion.x-300, display:'block'});
    $("#characters > li").each(function() {
       $(this).show();
    });
  }
  else if (this.textContent.indexOf("@") != -1 ){
    var index = this.textContent.indexOf("@")+1;
    var endIndex = this.textContent.indexOf(' ',index)
    var filter =  this.textContent.substr(index, endIndex-index);

    if(filter == ''){
      // $("#characters").hide();
    }

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
      debugger
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

$(document).keyup(function(evt){
  var currentScroll = $('#editor-wrapper').scrollTop();
  if(evt.keyCode == 38){
    currentScroll -= 100;
  }
  else if(evt.keyCode == 40){
    currentScroll += 100;
  }

  $('#editor-wrapper').animate({
    scrollTop: (currentScroll)
  }, 400);
})

// $(document).on("keyup",".trumbowyg-editor",function(evt){
//   var textWithFormat = $(evt.target).html();
//   var text = $(evt.target).text();
//   var words = text.split(' ').length;
  
//   $(evt.target).closest('.description-holder').find('.description').val(textWithFormat);
  
//   var wordCountInput = $(evt.target).closest('.description-holder').find('.wordCount');
//   wordCountInput.val(words);
//   wordCountInput.trigger('input'); 
//   wordCountInput.trigger('change');

// })
