/*
Script: jquery.atomizer.js

License:
	MIT license.

Copyright:
	Copyright (c) 2009 Boost New Media (http://boost.co.nz)
*/
jQuery.fn.atomize = function(text) {
  this.each(function() {
    var input = $(this);
    input.atomText = text;
    
    if(input.val() == '') {
      input.val(text);
      input.addClass('atom');
    }
    
    $(input.parents('form')).submit(function(event) {
      if(input.val() == text) input.val('');
    });
    
    input.focus(function(event) {
      if($(this).val() == text) {
        $(this).val('');
        $(this).removeClass('atom');
      }
    });
    
    input.blur(function(event) {
      if($(this).val() == '') {
        $(this).val(text);
        $(this).addClass('atom');
      }
    });
  });
}