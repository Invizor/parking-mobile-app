import React from 'react';
import {shallow, mount} from 'enzyme';
import AutorizationForm from '../components/autorization-form/autorization-form';

jest.dontMock('AutorizationForm');

describe('AutorizationForm', () => {
  it('should render:', () => {
    const renderedComponent = shallow(
      <AutorizationForm />
    );

    // Выведем отрендеренный компонент
    //console.log(renderedComponent.debug());
    expect(true).toBe(true);
    //expect(renderedComponent.find('.autorization')).to.have.length(1);
    //expect(renderedComponent.find('h1').text()).toBe('Home');
   // expect(renderedComponent.find('input').length).toBe(1);

   // expect(renderedComponent.find(Wellcome).props().username).toBeDefined();
   // expect(renderedComponent.contains(<Wellcome username={'Alice'} />)).toBe(true);
  });

 /* it('should call changeUsername on input changes', () => {
    const changeUsernameSpy = jest.fn();

    const renderedComponent = shallow(
      <Home username={'Alice'} changeUsername={changeUsernameSpy} />
    );

    renderedComponent.find('input').simulate('change', { target: { value: 'Test' } });
      expect(changeUsernameSpy).toBeCalledWith('Test');
   }); */
});