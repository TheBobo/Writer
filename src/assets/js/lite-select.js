/* ============================================================
   Lite Select
   version 1.0.0
   © Point Theme, 2017
   https://github.com/LiteSelect

   GitHub page:     https://github.com/LiteSelect

   Released under MIT licence:

  ============================================================ */


  jQuery.fn.extend({
      liteSelect: function (options) {
      options = options || {};

      if (typeof options === 'object') {
        this.each(function () {
          var instanceOptions = $.extend(true, {}, options);

          var instance = new LiteSelect($(this), instanceOptions);
        });

        return this;
      } else {
        throw new Error('Invalid arguments for LiteSelect: ' + options);
      }
    }



  });

var selectedItem = 0;

var LiteSelectFunctionality = (function(){

var _config, _element;

function buildLiteSelectComponent() {
  var $this=_element;

  // Cache the number of options
  var  elements = $this.children();

  // Hides the select element
  $this.addClass('ls-hidden s-hidden');

  // Wrap the select element in a div
  var attrNewSelect = {
      'class': 'ls-select'
  }

  var attributesSelect= $this[0].attributes;

  if(attributesSelect)
    for(var i=0; i<attributesSelect.length; i++){
      if(attributesSelect[i].nodeName != 'class')
        attrNewSelect[attributesSelect[i].nodeName] = attributesSelect[i].value;
      else if(attributesSelect[i].nodeName == 'class' && attributesSelect[i].nodeName == undefined){

      }
      else{
        var clsItms = attributesSelect[i].value;
        clsItms = clsItms.replace("ls-hidden", '')
        clsItms = clsItms.replace("s-hidden", '')
        attrNewSelect.class =  attrNewSelect.class + " " + clsItms;
      }
    }

  $select = $('<div />',attrNewSelect );

  $this.wrap($select);

  $selectInner = $('<div />', {
      'class': 'ls-wrapper ls-placeholder'
  });
  // Insert a styled div to sit over the top of the hidden select element
  $this.after($selectInner);

  // Cache the styled div
  var $lsList = $this.next('div.ls-wrapper');

  var $placeholder =  $('<div />', {
      'class': 'ls-placeholder'
  }).appendTo($lsList);


  // Insert an unordered list after the styled div and also cache the list

  var $wrapperList =  $('<div />', {
      'class': 'ls-options'
  }).insertAfter($lsList);


  var $multiSelect = $('<div />', {
    'class':'ls-multiselect'
  });
  $multiSelect.appendTo($wrapperList.parent());

  var $searchLi = $('<div />', {
    'class':'ls-search'
  });
  $searchLi.appendTo($wrapperList);

  var $list = $('<ul />', {
  }).appendTo($wrapperList);

  var $searchDD = $('<input type="text" class="ls-search-input" />', {
  }).appendTo($searchLi);


  var categoryLvl=0;

  function appendItems(elements, category){
     for (var i = 0; i < elements.length; i++) {
      if($(elements[i]).is('optgroup') ){
        categoryLvl++;
        var cat = "nested-"+categoryLvl;
        var categoryTxt = "Category: "+$(elements[i]).attr('label');
        appendCategory(categoryTxt)
        appendItems($(elements[i]).children(), cat);
        categoryLvl--;
      }
      else{
          appendOption($(elements[i]),category)
      }
     }
  }


  appendItems(elements, "");

  var attrNewSelect = {
      'class': 'ls-select',
      'attributes':[]
  }
  var attributesSelect = $this.attributes;
  if(attributesSelect)
    for(var i=0; i<attributesSelect.length; i++){
      attrNewSelect[attributesSelect[i]] = attributesSelect[i];
    }

  $select = $('<div />',attrNewSelect );


  function appendCategory(categoryText){
    var $newItm = $('<li />', {
          text: categoryText,
          rel: categoryText,
          'class':'ls-option ls-category',
          'attributes':[]
      });

  var attributesItm = elements.attributes;

  if(attributesItm)
    for(var i=0; i<attributesItm.length; i++){
      $newItm.attr(attributesSelect[i], attributesSelect[i]);
    }

      $newItm.appendTo($list);

  }

  function appendOption(elem, category){
  var classes = category + ' ls-option';
  var attrNewSelect = {
          'text': elem.text(),
          'rel': elem.val(),
          'class':classes
      };

  var attributesSelect= elem[0].attributes;
  if(attributesSelect)
    for(var i=0; i<attributesSelect.length; i++){
      if(attributesSelect[i].nodeName != 'class')
        attrNewSelect[attributesSelect[i].nodeName] = attributesSelect[i].value;
      else if(attributesSelect[i].nodeName == 'class' && attributesSelect[i].nodeName == undefined){

      }
      else{
        var clsItms = attributesSelect[i].value;
        clsItms = clsItms.replace("ls-hidden", '')
        clsItms = clsItms.replace("s-hidden", '')
        attrNewSelect['class'] =  category + ' ls-option' + " " + clsItms;
      }
    }

    var $catOpt = $('<li />', attrNewSelect);
    $catOpt.appendTo($list);
  }

  // Cache the list items
  var $listItems = $list.children('li');

  // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
  $lsList.click(function (e) {
    if($(e.target).hasClass("close")){
        $(e.target).parent().remove();
        return;
    }
      if($lsList.hasClass("active")){
          $(this).removeClass('active');
          $wrapperList.removeClass("active");
          if($multiSelect.find(".selected-item").length == 0){
            $placeholder.addClass('visible');
            $multiSelect.hide();
          }
        else{
          $multiSelect.show();
          $searchDD.val("");
          $searchDD.hide();
        }
          return;
      }
      else{
        e.stopPropagation();

        $placeholder.removeClass('visible');
        $multiSelect.show();
        setTimeout(function() {
          $searchDD.show();
          if($this.find(".ls-search-input").parent().parent().hasClass("ls-multiselect")){
            $searchDD.width("1em");
          }
          $searchDD.focus();

        }, 400);
      $(".ls-select").find(".active").removeClass("active");

      var elemBottomPoingOffset = GetBottomLineYLine($(this));
      if(isElementVisiblePositionBottomPoint(elemBottomPoingOffset)){
        showOnTop($(this));
      }
      else{
        showOnBottom($(this));
      }

      $(this).addClass('active');
      $wrapperList.addClass("active")
      debugger;
      var elementsUL = $wrapperList.find("ul li");
      elementsUL.addClass("ls-hidden")
      var timeOut = 450;
      var itm = $wrapperList.find("li.selected");

        var itms = $wrapperList.find("li");
        for(var i=0; i<elementsUL.length; i++){
          if(i < 10){
            setTimeout(showElement, timeOut, elementsUL[i])
            timeOut=timeOut+150;
          }
          else{
            setTimeout(showElement, 0, elementsUL[i])
          }
        }

    }
  });

  function showElement(elem){
    $(elem).removeClass('ls-hidden');
  }

  function showOnTop(elem){
    elem.parent().addClass("ls-showOnTop");
  }

  function showOnBottom(elem){
     elem.parent().removeClass("ls-showOnTop");
  }

  function currentYPageVisible(){
    return window.pageYOffset + window.innerHeight;
  }

  function GetBottomLineYLine(elem){
    var bottomLefPoint = elem.offset().top + elem.height();
    var ddOptions =elem.parent().find(".ls-options");
    var ddOptionsUl = ddOptions.find('ul');
    var ddOptionsLsSearch = ddOptions.find('ls-search');

    var bottomLefPointOptions = ddOptionsUl.height()+ddOptionsLsSearch.height();
     return  bottomLefPoint + bottomLefPointOptions;
  }

  function isElementVisiblePositionBottomPoint(elemBottomPointOffset){
    return elemBottomPointOffset > currentYPageVisible();
  }

  //Seach DD options
  $searchLi.find(".ls-search-input").keyup(function(){
    var searchTxt = $searchDD.val();
    filterItem(searchTxt);
  });

  function filterItem(searchTxt){

    searchTxt=searchTxt.toLowerCase();
    var options = $list.find("li");

    for(var i=1; i<options.length; i++){
       var $options = $(options[i]);
       var optionTxt = $options.text();
       optionTxt=optionTxt.toLowerCase();
       if(optionTxt.indexOf(searchTxt) !== -1){
         $options.removeClass("hidden");
       }
       else{
         $options.addClass("hidden");
       }
    }
    if($this.find(".ls-search-input").parent().parent().hasClass("ls-multiselect")){
      $this.find(".ls-search-input").width("1em");
    }
    $this.find(".ls-search-input").show();
    $this.find(".ls-search-input").focus();
  }

  $searchDD.click(function (e) {
      e.stopPropagation();
  });
  // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
  // Updates the select element to have the value of the equivalent option
  $listItems.click(function (e) {
      //e.stopPropagation();
      $(e.target).parent().find("li").removeClass("selected")
      $(e.target).addClass("selected")
      if($(e.target).hasClass("ls-category")){
        return;
      }
      else if($(e.target).parent().hasClass(".ls-search") === false)
      {

        if($wrapperList.parent().find('.ls-multiselect').css('display') != 'none' && ($wrapperList.parent().attr("data-multiselect") == true || $wrapperList.parent().attr("data-multiselect") == "true")){
          var selectEmlemTxt = $(this).text();
          $placeholder.hide();
          var $clsElem = $('<span/>', {
            'class':'close icon icon-close'
          });

          var $elem = $('<div/>', {
            'class':'selected-item'
          });
          $elem.text(selectEmlemTxt);

          $clsElem.appendTo($elem);
          $elem.appendTo($multiSelect);
          $(this).addClass('selected');
          return;
        }
        $lsList.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $wrapperList.removeClass("active");
        if($multiSelect.find(".selected-item").length == 0){
            $placeholder.show();
            $multiSelect.hide();

        }
        else{
          $multiSelect.show();
        }
        $searchDD.val("");
        $searchDD.hide();
        filterItem("");
        $lsList.removeClass("ls-placeholder")
      }
      else{
        if($this.find(".ls-search-input").parent().parent().hasClass("ls-multiselect")){
          $this.find(".ls-search-input").width("1em");
        }
        $this.find(".ls-search-input").show();
        $this.find(".ls-search-input").focus();

      }
  });

  // Hides the unordered list when clicking outside of it
  $(document).click(function () {
      $lsList.removeClass('active');
      $wrapperList.removeClass("active");
      if($multiSelect.find(".selected-item").length == 0){
            $placeholder.show();
            $multiSelect.hide();
          }
        else{
          $multiSelect.show();
        }

        $searchDD.val("");
        $searchDD.hide();
        filterItem("");
  });

  function _configSelect() {

    if(_config.multiselect && _config.multiselect === true){

      $multiSelect.show();
      $select.addClass("ls-mselect");
      $searchLi.appendTo($multiSelect);
      $multiSelect.hide();

      $searchDD.val("");
      $searchDD.hide();
      filterItem("");
      $multiSelect.appendTo($selectInner)
    }
    else{
      $multiSelect.hide();
      $searchDD.val("");
      $searchDD.hide();
      filterItem("");
    }

    if(_config.hasSearch && _config.hasSearch === true){
      $searchLi.show();
    }
    else{
      $searchLi.hide();
      $list.css("margin-top",0);
    }

    if(_config.width){
        $selectInner.parent().css("width",_config.width+"px");
        //$selectInner.css("width",_config.width+"px");
        //$wrapperList.css("width",_config.width+"px");
    }

    if(_config.placeholder){
      $placeholder.text(_config.placeholder);
    }

      if(_config.minSelectOptionHeight){
      $list.css("min-height", _config.minSelectOptionHeight+"px")
    }

    if(_config.maxSelectOptionHeight){
      $list.css("max-height", _config.maxSelectOptionHeight+"px")
    }
  }

  _configSelect();
}



  function init(config, element){
    _config = config;
    _element = element;
    buildLiteSelectComponent();
  }

  function initLiteItems() {
    setTimeout(function() {
      
    var items = $('.lite-select')
    for(var i=0; i<items.length; i++){
      var lSelectObj = {
        placeholder: "",
        maxSelectOptionHeight:300,
        hasSearch: false,
        multiselect:false
      };

      var attr = $(items[i]).attr("data-placeholder");
      if(attr){
        lSelectObj.placeholder=attr;
      }

      attr = $(items[i]).attr("data-width");
      if(attr){
        lSelectObj.width=attr;
      }

      attr = $(items[i]).attr("data-max-height");
      if(attr){
        lSelectObj.maxSelectOptionHeight=attr;
      }

      attr = $(items[i]).attr("data-searchbox");
      if(attr == "true" || attr == true){
        lSelectObj.hasSearch=true;
      }

      attr = $(items[i]).attr("data-multiselect");
      if(attr == "true" || attr == true){
        lSelectObj.multiselect=true;
      }
      $(items[i]).liteSelect(lSelectObj);
    }
    
  }, 600);
  }

  return {
    init: init,
    initLiteItems:initLiteItems
  }
})();


var LiteSelect = function ($element, options) {
  LiteSelectFunctionality.init( options,$element);
}


$(document).ready(function(){
      $(document).on("keyup",".ls-search-input",function(e){
            var itm = e.target;

            var txt = $(itm).val()
            var len = txt.length;
            if($(e.target).parent().parent().hasClass("ls-multiselect")){
              var widthInput = (0.5 + len*0.75) +"em";
              $(itm).width(widthInput);
            }

          })


    });

    