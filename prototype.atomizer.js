/*
 Script: prototype.atomizer.js

 License:
 MIT license.

 Copyright:
 Copyright (c) 2009 Boost New Media (http://boost.co.nz)
 */
var Atomizer = Class.create({
  initialize: function(input) {
    this.input = input;
    this.setup();
  },

  setup: function() {
    this.text = this.input.getAttribute('rel');
    if(!this.text) return;

    this.changed = true;

    if (this.input.getValue() == "" || this.input.getValue() == this.text) {
      this.changed = false;
      this.input.value = this.text;
      this.input.addClassName('atom');
    }

    this.input.observe('focus', this.focusHandler.bindAsEventListener(this));
    this.input.observe('blur', this.blurHandler.bindAsEventListener(this));

    this.setupForm();
  },

  focusHandler: function(event) {
    if (!this.changed) this.input.setValue('');
    this.input.removeClassName('atom');
  },

  blurHandler: function(event) {
    if (this.input.getValue() != '') this.changed = true;
    if (!this.changed) this.input.value = this.text;
    if (!this.changed) this.input.addClassName('atom');
  },

  setupForm: function() {
    this.form = this.input.up('form');
    if (this.form) {
      // Observe the form
      this.form.observe('submit', this.formSubmitHandler.bindAsEventListener(this));
      
      // Replace the form's submit function so we can capture it
      this.oldSubmit = this.form.submit;
      this.form.submit = this.submitReplacement.bind(this);
    }
  },

  // Handle the form submit event
  formSubmitHandler: function(event) {
    if (!this.changed) this.input.value = "";
  },

  // If form's submit method gets called by
  // javascript, this function gets called instead.
  submitReplacement: function() {
    if (!this.changed) this.input.value = "";
    this.oldSubmit.bind(this.form)();
  }
});

Atomizer.atomizeInputs = function() {
  $$('input').each(function(input) {
    new Atomizer(input);
  });
};

$(document).observe('dom:loaded', function() {
  Atomizer.atomizeInputs();
});