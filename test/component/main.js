import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { render } from 'react-dom'
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import VirtualDom from '../create-dom-for-test';
'use strict';

let myVirtualDom = new VirtualDom();

myVirtualDom.createDom();

let wrap = myVirtualDom.createEnzymeDom();

describe('<AutorizationForm/ >', () => {
  let wrapper = wrap;
  wrapper.find('.list a').first().simulate('click', { button: 0 });

  it('existence render components', () => {

    expect(wrapper.find('.first-symbol')).to.have.length(1);
    expect(wrapper.find('.phone-input #phone')).to.have.length(1);
    expect(wrapper.find('.autorization-btn button')).to.have.length(1);
    expect(wrapper.find('.warningAuth')).to.have.length(1);

  });

  it('enter phone to input and click', () => {
    //const handleClickStub = sinon.spy();

    let inputPhone = wrapper.find('.phone-input #phone');
    inputPhone.node.value = '(918)-785-7644';
    let buttonEnter = wrapper.find('.autorization-btn button');
    buttonEnter.simulate('click');

    expect(wrapper.find('.popup')).to.have.length(1);
    expect(wrapper.find('.popup-body span p').node.innerText).to.equal("+7 (918)-785-7644");

    let buttonPopup = wrapper.find('.popup-buttons button').last();

    buttonPopup.simulate('click');

    return new Promise((resolve,reject) => {
      window.addEventListener('popstate', (event) => {
        window.setTimeout(function(){
          expect(wrapper.find('.verification')).to.have.length(1);
          resolve();
        });
      }, false);
    });

  });
});
