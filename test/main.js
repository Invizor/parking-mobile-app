import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import AutorizationForm from '../app/client/imports/components/autorization-form/autorization-form'
'use strict';

//console.log(AutorizationForm);

describe('<AutorizationForm/ >', () => {
  it('should render phone-input', () => {
    const wrapper = shallow(<AutorizationForm />);
    console.log(wrapper);

  });

});

/*describe('hello world', () => {
  it('works!', () => {
    expect(true).to.equal(true);
  });
});*/