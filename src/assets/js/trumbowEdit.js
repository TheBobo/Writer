var TrumbowEdit = (function(){

var editableDiv = document.querySelector('.trumbowyg-editor');
editableDiv.addEventListener('keydown', function (event) {
  debugger
    if(event.keyCode === 8) {
      var range = window.getSelection().getRangeAt(0);
      if(editableDiv === range.commonAncestorContainer && range.endOffset === 0) {
        // remove the last readonly span
        var container = document.getElementsByClassName('trumbowyg')[0];
        var lastReadOnlyChild = document.querySelector('.character-name');
        container.removeChild(lastReadOnlyChild);
      }
    }
});
})()
