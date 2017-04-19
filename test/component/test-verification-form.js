import React from 'react';
import { expect } from 'chai';
import { render } from 'react-dom'
import { shallow, mount } from 'enzyme';
import createHashHistory from "history/lib/createHashHistory";
import {hashHistory} from 'react-router';
import VirtualDom from '../create-dom-for-test';
'use strict';

let myVirtualDom = new VirtualDom();
myVirtualDom.createDom();
let wrap = myVirtualDom.createEnzymeDom();

describe('<VerificationForm/ >', () => {

  before(function() {
    console.log("#before2");

    console.log("wrapEvent",wrap.find('.list a').at(1));
    wrap.find('.list a').at(1).simulate('click', { button: 0 });
    return new Promise(function(resolve, reject) {
      wrap.find('.list a').at(1).node.addEventListener("click", function(){ resolve(); });
    });
  });

  after(function() {
    console.log("#after2");
    return new Promise(function(resolve, reject) {
      hashHistory.goBack();
      resolve();
    });
  });

  it('existence render components', () => {
    console.log("#2.1");

    let wrapper = wrap;
    expect(wrapper.find('.verification-code')).to.have.length(1);
    expect(wrapper.find('.verification-code input')).to.have.length(1);
    expect(wrapper.find('.verification-button')).to.have.length(1);
    expect(wrapper.find('.verification-button button')).to.have.length(1);
  });


});