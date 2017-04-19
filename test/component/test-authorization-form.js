import React from 'react';
import { expect } from 'chai';
import { render } from 'react-dom'
import {hashHistory} from 'react-router';
import { shallow, mount } from 'enzyme';
import VirtualDom from '../create-dom-for-test';
'use strict';

let myVirtualDom = new VirtualDom();
myVirtualDom.createDom();
let wrap = myVirtualDom.createEnzymeDom();

describe('<AutorizationForm/ >', () => {
  before(function() {
    console.log("#before1");
    //console.log(".list_a",wrap.find('.list a'));
    wrap.find('.list a').first().simulate('click', { button: 0 });
    return new Promise(function(resolve, reject) {
      wrap.find('.list a').first().node.addEventListener("click", function(){ resolve(); });
    });
  });

  after(function() {
    console.log("#after1");
    return new Promise(function(resolve, reject) {
      hashHistory.go(-2);
      resolve();
    });
  });

  it('existence render components', () => {
    console.log("#1.1");
    let wrapper = wrap;
    expect(wrapper.find('.first-symbol')).to.have.length(1);
    expect(wrapper.find('.phone-input #phone')).to.have.length(1);
    expect(wrapper.find('.autorization-btn button')).to.have.length(1);
    expect(wrapper.find('.warningAuth')).to.have.length(1);
  });

  it('existing left side menu for Guest', () => {
    console.log("#1.2");
    let wrapper = wrap;
    let headerSideMenu = wrapper.find('.snap-drawers .bar-header h1 .title');
    let itemSideMenu1 = wrapper.find('.content .list .item').nodes[0];
    let itemSideMenu2 = wrapper.find('.content .list .item').nodes[1];
    expect(headerSideMenu.node.innerText).to.equal("Гость");
    expect(itemSideMenu1.innerText).to.equal("Быстрая парковка ");
    expect(itemSideMenu2.innerText).to.equal("О приложении ");
  });

  it('enter phone to input and click, and click to popup', () => {
    console.log("#1.3");
    let wrapper = wrap;
    //const handleClickStub = sinon.spy();
    let inputPhone = wrapper.find('.phone-input #phone');
    inputPhone.node.value = '(918)-785-7644';
    let buttonEnter = wrapper.find('.autorization-btn button');

    buttonEnter.simulate('click');
    return new Promise((resolve,reject) => {
      buttonEnter.node.addEventListener("click", function(){
        expect(wrapper.find('.popup')).to.have.length(1);
        expect(wrapper.find('.popup-body span p').node.innerText).to.equal("+7 (918)-785-7644");
        let buttonPopup = wrapper.find('.popup-buttons button').last();
        buttonPopup.simulate('click');
        resolve();
      });
    }) .then ( () => {
        return new Promise((resolve, reject) => {
          window.addEventListener('popstate', (event) => {
            window.setTimeout(function () {
              expect(wrapper.find('.verification')).to.have.length(1);
              resolve();
            });
          }, false);
        });
      }
    );

  });

});
