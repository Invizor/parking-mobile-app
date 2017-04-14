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
    //console.log("WRAP=",wrap);
    //console.log("Content=",wrap.find('div.content.overflow-scroll.has-header'));
    console.log("ListMy=",wrap.find('.list a'));
    //_wrap.find('.list a').first().simulate('click', { button: 0 });
  });

  after(function() {
    console.log("#after2");
    hashHistory.push('/');
  });

  it('aaaaaaaa', () => {
    console.log("#2.1");
  });


});