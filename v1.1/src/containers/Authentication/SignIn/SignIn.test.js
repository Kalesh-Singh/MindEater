import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import SignIn from './SignIn';
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });

describe("SignIn Testing Suite", function() {
    const div = document.createElement('div');
    const signIn = ReactDOM.render(<SignIn />, div);
    describe("Password Tests", function() {
        it('does not consider empty strings', () => {
            var password = {
                value: '', //valid in all aspects except length
                error: '',
                focused: true,
                valid: false
            }
            expect(signIn.checkValidity('password', password)).to.not.equal('');
        });
        it('considers non-empty strings', () => {
            var password = {
                value: 'unfRR', //valid in all aspects except length
                error: '',
                focused: false,
                valid: false
            }
            expect(signIn.checkValidity('password', password)).to.equal('');
        });
    })
    describe("Email Tests", function() {
        it('rejects empty-string emails', () => {
            var email = {
                value: '',
                error: '',
                focused: false,
                valid: false
            }
            expect(signIn.checkValidity('email', email)).to.not.equal('');
        });
        it('rejects emails not following RFC 5322 standard', () => {
            var email = {
                value: 'invalidEmail',
                error: '',
                focused: false,
                valid: false
            }
            expect(signIn.checkValidity('email', email)).to.not.equal('');
        });
        it('accepts emails following RFC 5322 standard', () => {
            var email = {
                value: 'testEmail@domain.com',
                error: '',
                focused: false,
                valid: false
            }
            expect(signIn.checkValidity('email', email)).to.equal('');
        });
    })
    ReactDOM.unmountComponentAtNode(div);
})