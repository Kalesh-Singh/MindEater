import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import SignUp from './SignUp';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("SignUp Testing Suite", function() {
    const div = document.createElement('div');
    const signUp = ReactDOM.render(<SignUp />, div);
    var sinon = require('sinon');
    describe("Password Tests", function() {
        it('rejects empty-string passwords', () => {
            var password = {
                value: '', //valid in all aspects except length
                error: '',
                focused: false,
                valid: false
            }
            expect(signUp.checkPassword(password)).to.not.equal('');
        });
        it('rejects passwords shorter than 6 characters', () => {
            var password = {
                value: 'P@Ss1', //valid in all aspects except length
                error: '',
                focused: false,
                valid: false
            }
            expect(signUp.checkPassword(password)).to.not.equal('');
        });
        it('rejects passwords shorter than 6 characters', () => {
            var password = {
                value: 'P@Ss1', //valid in all aspects except length
                error: '',
                focused: false,
                valid: false
            }
            expect(signUp.checkPassword(password)).to.not.equal('');
        });
        it('rejects passwords longer than 26 characters', () => {
            var password = {
                value: 'P@Ss1aaaaaaaaaaaaaaaaaaaaaa', //valid in all aspects except length
                error: '',
                focused: false,
                valid: false
            }
            expect(signUp.checkPassword(password)).to.not.equal('');
        });
        it('rejects passwords not containing at least 1 uppercase letter', () => {
            var password = {
                value: 'p@ssw0rd', //valid in all aspects except length
                error: '',
                focused: false,
                valid: false
            }
            expect(signUp.checkPassword(password)).to.not.equal('');
        });
        it('rejects passwords not containing at least 1 lowercase letter', () => {
            var password = {
                value: 'P@SSW0RD', //valid in all aspects except length
                error: '',
                focused: false,
                valid: false
            }
            expect(signUp.checkPassword(password)).to.not.equal('');
        });
        it('rejects passwords not containing at least 1 digit', () => {
            var password = {
                value: 'P@ssword', //valid in all aspects except length
                error: '',
                focused: false,
                valid: false
            }
            expect(signUp.checkPassword(password)).to.not.equal('');
        });
        it('accepts valid passwords', () => {
            var password = {
                value: 'P@ssw0rd', //valid in all aspects except length
                error: '',
                focused: false,
                valid: false
            }
            expect(signUp.checkPassword(password)).to.equal('');
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
            expect(signUp.checkEmail(email)).to.not.equal('');
        });
        it('rejects emails not following RFC 5322 standard', () => {
            var email = {
                value: 'invalidEmail',
                error: '',
                focused: false,
                valid: false
            }
            expect(signUp.checkEmail(email)).to.not.equal('');
        });
        it('accepts emails following RFC 5322 standard', () => {
            var email = {
                value: 'testEmail@domain.com',
                error: '',
                focused: false,
                valid: false
            }
            expect(signUp.checkEmail(email)).to.equal('');
        });
    })
    describe("Username Tests", function() {
        it('rejects empty-string usernames', () => {
            var username = {
                value: '',
                error: '',
                focused: false,
                valid: false
            }
            expect(signUp.checkUserName(username)).to.not.equal('');
        });
        it('rejects usernames longer than 15 characters', () => {
            var username = {
                value: 'aaaaaaaaaaaaaaaa',
                error: '',
                focused: false,
                valid: false
            }
            expect(signUp.checkUserName(username)).to.not.equal('');
        });
        it('rejects usernames containing invalid characters', () => {
            var username = {
                value: 'test&',
                error: '',
                focused: false,
                valid: false
            }
            expect(signUp.checkUserName(username)).to.not.equal('');
        });
        it('accepts valid usernames', () => {
            var username = {
                value: 'bobGuy14',
                focused: false,
                valid: false
            }
            expect(signUp.checkUserName(username)).to.equal('');
        });
    })
    ReactDOM.unmountComponentAtNode(div);
})