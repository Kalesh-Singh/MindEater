import React from 'react';
import ReactDOM from 'react-dom';
import {configure, shallow} from 'enzyme';
import {expect} from 'chai';
import QuestionDialog from './QuestionDialog';
import Adapter from 'enzyme-adapter-react-16'


configure({adapter: new Adapter()});
describe("Question Dialog Testing Suite", function () {
    const div = document.createElement('div');
    const quesDialog = ReactDOM.render(<QuestionDialog/>, div);
    describe("Explanation Tests", function () {
        it('rejects empty strings', () => {
            var explanation = {
                value: '',
                error: '',
                focused: false,
                valid: false
            };
            expect(quesDialog.checkValidity('explanation', explanation)).to.not.equal('');
        });
        it('rejects strings that contain whitespaces only', () => {
            var explanation = {
                value: '   ',
                error: '',
                focused: false,
                valid: false
            };
            expect(quesDialog.checkValidity('explanation', explanation)).to.not.equal('');
        });
        it('rejects strings of length greater than 300', () => {
            var long_string = '';
            for (var i = 0; i < 21; i++){
                long_string = long_string + 'LongExplanation';
            }
            var explanation = {
                value: long_string,
                error: '',
                focused: false,
                valid: false
            };
            expect(quesDialog.checkValidity('explanation', explanation)).to.not.equal('');
        });
        it('accepts valid explanations', () => {
            var explanation = {
                value: 'U is an abbreviation of you',
                error: '',
                focused: false,
                valid: false
            };
            expect(quesDialog.checkValidity('explanation', explanation)).to.equal('');
        });
    });
    describe("Hint Tests", function () {
        it('rejects empty strings', () => {
            var hint = {
                value: '',
                error: '',
                focused: false,
                valid: false
            };
            expect(quesDialog.checkValidity('hint', hint)).to.not.equal('');
        });
        it('rejects strings that contain whitespaces only', () => {
            var hint = {
                value: '   ',
                error: '',
                focused: false,
                valid: false
            };
            expect(quesDialog.checkValidity('hint', hint)).to.not.equal('');
        });
        it('rejects strings of length greater than 100', () => {
            var long_string = '';
            for (var i = 0; i < 14; i++){
                long_string = long_string + 'LongHint';
            }
            var hint = {
                value: long_string,
                error: '',
                focused: false,
                valid: false
            };
            expect(quesDialog.checkValidity('hint', hint)).to.not.equal('');
        });
        it('accepts valid hints', () => {
            var hint = {
                value: 'Spell it out.',
                error: '',
                focused: false,
                valid: false
            };
            expect(quesDialog.checkValidity('hint', hint)).to.equal('');
        });
    });
    describe("Question Tests", function () {
        it('rejects empty strings', () => {
            var question = {
                value: '',
                error: '',
                focused: false,
                valid: false
            };
            expect(quesDialog.checkValidity('question', question)).to.not.equal('');
        });
        it('rejects strings that contain whitespaces only', () => {
            var question = {
                value: '   ',
                error: '',
                focused: false,
                valid: false
            };
            expect(quesDialog.checkValidity('question', question)).to.not.equal('');
        });
        it('rejects strings of length greater than 300', () => {
            var long_string = '';
            for (var i = 0; i < 26; i++){
                long_string = long_string + 'LongQuestion';
            }
            var question = {
                value: long_string,
                error: '',
                focused: false,
                valid: false
            };
            expect(quesDialog.checkValidity('question', question)).to.not.equal('');
        });
        it('accepts valid questions', () => {
            var question = {
                value: 'I start with S and end with IT, and have you in the middle. What am I?',
                error: '',
                focused: false,
                valid: false
            };
            expect(quesDialog.checkValidity('question', question)).to.equal('');
        });
    });
    describe("Option Tests", function () {
        it('rejects empty strings', () => {
            var option = {
                value: '',
                error: '',
                focused: false,
                valid: false
            };
            expect(quesDialog.checkOption(option)).to.not.equal('');
        });
        it('rejects strings that contain whitespaces only', () => {
            var option = {
                value: '   ',
                error: '',
                focused: false,
                valid: false
            };
            expect(quesDialog.checkOption(option)).to.not.equal('');
        });
        it('rejects strings of length greater than 100', () => {
            var long_string = '';
            for (var i = 0; i < 11; i++){
                long_string = long_string + 'LongOption';
            }
            var option = {
                value: long_string,
                error: '',
                focused: false,
                valid: false
            };
            expect(quesDialog.checkOption(option)).to.not.equal('');
        });
        it('accepts valid options', () => {
            var option = {
                value: 'Suit',
                error: '',
                focused: false,
                valid: false
            };
            expect(quesDialog.checkOption(option)).to.equal('');
        });
    });
    ReactDOM.unmountComponentAtNode(div);
});