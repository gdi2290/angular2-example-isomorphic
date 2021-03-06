// Zone.js
function HTMLElement() {
}
HTMLElement.prototype.onclick = function(fn) {
  fn()
};

function Element() {
}
Element.prototype.onclick = function(fn) {
  fn()
};

function logging(type) {
  return function(...args) {
    console.log('logging mock ', type, ':', ...args);

  }
}
function XMLHttpRequest() {
  this.abort = logging('about');
  this.send  = logging('send');
  this.open  = logging('open');
  this.addEventListener = logging('addEventListener');
  this.removeEventListener = logging('removeEventListener');
}

function WebSocket() {
}

var document = {
  createElement: function() {
    return new Element();
  }
}

global.HTMLElement = HTMLElement;
global.Element = Element;
global.document = document;
global.XMLHttpRequest = XMLHttpRequest;
global.WebSocket = WebSocket;
global.window = global;

// typescript decoratos
import 'reflect-metadata';

// legacy angular22
import 'traceur-runtime';

// angular2 assert
import * as rtts_assert from 'rtts_assert/rtts_assert';
var assert = rtts_assert.assert;
global.assert = global.assert || assert;
if (global.assert) {
  global.assert.define = global.assert.define || function() {};
}

// dom closure hack
import {Parse5DomAdapter} from 'angular2/src/dom/parse5_adapter';
Parse5DomAdapter.makeCurrent();

