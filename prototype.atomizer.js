/*
Script: prototype.atomizer.js

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
    this.text = this.input.getAttribute('rel');
    this.changed = true;

    if(this.input.getValue() == "" || this.input.getValue() == this.text) {
      this.changed = false;
      this.input.value = this.text;
      this.input.addClassName('atom');
    }

    this.input.observe('focus', this.focusHandler.bindAsEventListener(this));
    this.input.observe('blur', this.blurHandler.bindAsEventListener(this));

    this.setupForm();
  },

  focusHandler: function(event) {
    if(!this.changed) this.input.setValue('');
    this.input.removeClassName('atom');
  },

  blurHandler: function(event) {
    if(this.input.getValue() != '') this.changed = true;
    if(!this.changed) this.input.value = this.text;
    if(!this.changed) this.input.addClassName('atom');
  },

  setupForm: function() {
    this.form = this.input.up('form');
    if(this.form) {
      this.form.observe('submit', this.formSubmitHandler.bindAsEventListener(this));
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

$(document).observe('dom:loaded', function() {
  Atomizer.atomizeInputs();
});