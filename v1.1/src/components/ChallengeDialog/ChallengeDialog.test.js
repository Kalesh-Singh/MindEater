import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import ChallengeDialog from './ChallengeDialog';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("Challenge Dialog Testing Suite", function() {
    const div = document.createElement('div');
    const challengeDialog = ReactDOM.render(<ChallengeDialog/>, div);
    describe("Title Tests", function() {
        it('rejects empty-string titles', () => {
            var title = {
                value: '',
                error: '',
                focused: true,
                valid: false
            }
            expect(challengeDialog.checkTitle(title)).to.not.equal('');
        });
        it('rejects titles longer than 50 characters', () => {
            var title = {
                value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                error: '',
                focused: true,
                valid: false
            }
            expect(challengeDialog.checkTitle(title)).to.not.equal('');
        });
    })
    describe("Description Tests", function() {
        it('rejects descriptions longer than 200 characters', () => {
            var title = {
                value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                error: '',
                focused: true,
                valid: false
            }
            expect(challengeDialog.checkTitle(title)).to.not.equal('');
        });
    })
})