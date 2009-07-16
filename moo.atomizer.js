/*
Script: moo.atomizer.js

License:
	MIT license.

Copyright:
	Copyright (c) 2009 Boost New Media (http://boost.co.nz)
*/
var Atomizer = new Class({
  initialize: function(input) {
    this.input = input;
    this.setup();
  },

  setup: function() {
    this.text = this.input.get('rel');
    this.changed = true;

    if(this.input.value == "" || this.input.value == this.text) {
      this.changed = false;
      this.input.set('value', this.text);
      this.input.addClass('atom');
    }

    this.input.addEvent('focus', this.focusHandler.bindWithEvent(this));
    this.input.addEvent('blur', this.blurHandler.bindWithEvent(this));

    this.setupForm();
  },

  focusHandler: function(event) {
    if(!this.changed) this.input.set('value', '');
    this.input.removeClass('atom');
  },

  blurHandler: function(event) {
    if(this.input.get('value') != '') this.changed = true;
    if(!this.changed) this.input.set('value', this.text);
    if(!this.changed) this.input.addClass('atom');
  },

  setupForm: function() {
    this.form = this.input.getParent('form');
    if(this.form) {
      this.form.addEvent('submit', this.formSubmitHandler.bindWithEvent(this));
    }
  },

  formSubmitHandler: function(event) {
    if(!this.changed) this.input.value = "";
  }
});

Atomizer.atomizeInputs = function() {
  $$('input').each(function(input) {
    new Atomizer(input);
  });
}

// window.addEvent('domready', function() {
//   Atomizer.atomizeInputs();
// });