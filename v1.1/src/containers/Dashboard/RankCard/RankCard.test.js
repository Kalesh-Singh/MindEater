import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import RankCard from './RankCard';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("Player Rank Test Suite", function() {
    const div = document.createElement('div');
    const rankCard = ReactDOM.render(<RankCard />, div);
    it('recognizes beginner level points', () => {
        let points = 0;
        expect((rankCard.getStateFromPoints(points)).rankTitle).to.equal('Beginner');
    });
    it('recognizes grandmaster level points', () => {
        let points = 462;
        expect((rankCard.getStateFromPoints(points)).rankTitle).to.equal('Grandmaster');
    });
    it('recognizes elite level points', () => {
        let points = 420;
        expect((rankCard.getStateFromPoints(points)).rankTitle).to.equal('Elite');
    });
    it('recognizes legendary level points', () => {
        let points = 380;
        expect((rankCard.getStateFromPoints(points)).rankTitle).to.equal('Legendary');
    });
    it('recognizes heroic level points', () => {
        let points = 342;
        expect((rankCard.getStateFromPoints(points)).rankTitle).to.equal('Heroic');
    });
    it('recognizes champion level points', () => {
        let points = 306;
        expect((rankCard.getStateFromPoints(points)).rankTitle).to.equal('Champion');
    });
    it('recognizes supreme level points', () => {
        let points = 272;
        expect((rankCard.getStateFromPoints(points)).rankTitle).to.equal('Supreme');
    });
    it('recognizes outstanding level points', () => {
        let points = 240;
        expect((rankCard.getStateFromPoints(points)).rankTitle).to.equal('Outstanding');
    });
    it('recognizes master level points', () => {
        let points = 210;
        expect((rankCard.getStateFromPoints(points)).rankTitle).to.equal('Master');
    });
    it('recognizes star level points', () => {
        let points = 182;
        expect((rankCard.getStateFromPoints(points)).rankTitle).to.equal('Star');
    });
    it('recognizes professional level points', () => {
        let points = 162;
        expect((rankCard.getStateFromPoints(points)).rankTitle).to.equal('Professional');
    });
    it('recognizes highly distinguished level points', () => {
        let points = 132;
        expect((rankCard.getStateFromPoints(points)).rankTitle).to.equal('Highly Distinguished');
    });
    it('recognizes veteran level points', () => {
        let points = 90;
        expect((rankCard.getStateFromPoints(points)).rankTitle).to.equal('Veteran');
    });
    it('recognizes highly competent level points', () => {
        let points = 72;
        expect((rankCard.getStateFromPoints(points)).rankTitle).to.equal('Highly Competent');
    });
    it('recognizes competent level points', () => {
        let points = 56;
        expect((rankCard.getStateFromPoints(points)).rankTitle).to.equal('Competent');
    });
    it('recognizes above average level points', () => {
        let points = 42;
        expect((rankCard.getStateFromPoints(points)).rankTitle).to.equal('Above Average');
    });
    it('recognizes reasonable level points', () => {
        let points = 30;
        expect((rankCard.getStateFromPoints(points)).rankTitle).to.equal('Reasonable');
    });
    it('recognizes average level points', () => {
        let points = 20;
        expect((rankCard.getStateFromPoints(points)).rankTitle).to.equal('Average');
    });
    it('recognizes novice level points', () => {
        let points = 12;
        expect((rankCard.getStateFromPoints(points)).rankTitle).to.equal('Novice');
    });
    it('recognizes rookie level points', () => {
        let points = 6;
        expect((rankCard.getStateFromPoints(points)).rankTitle).to.equal('Rookie');
    });
    it('recognizes inexperienced level points', () => {
        let points = 2;
        expect((rankCard.getStateFromPoints(points)).rankTitle).to.equal('Inexperienced');
    });
})