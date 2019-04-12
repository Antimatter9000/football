import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

test('it renders loading message', () => {
    const component = shallow(<App />);

    expect(component.find('p').text()).toBe('Awaiting results...');
});

test('it renders content', () => {
    const component = shallow(<App />);
    component.update();

    expect(component.find('h1')).toBeTruthy();
    expect(component.find('.league-table')).toBeTruthy();
});

test('it renders error message', () => {
    const component = mount(<App />);
    component.setState({error: 'oops'});

    expect(component.find('h1').text()).toBe('No job for this guy!');
    expect(component.find('p').text()).toBe('oops');
});

const data = {
    rounds: [{
        matches: [{
            team1: {
                name: 'Winners'
            },
            team2: {
                name: 'Losers'
            },
            score1: 2,
            score2: 0
        }, {
            team1: {
                name: 'OtherTeam1'
            },
            team2: {
                name: 'OtherTeam2'
            },
            score1: 1,
            score2: 1
        }]
    }, {
        matches: [{
            team1: {
                name: 'OtherTeam3'
            },
            team2: {
                name: 'OtherTeam1'
            },
            score1: 3,
            score2: 1
        }, {
            team1: {
                name: 'Winners'
            },
            team2: {
                name: 'Losers'
            },
            score1: 7,
            score2: 0
        }]
    }]
};

test('getRankings', () => {
    const component = shallow(<App />);
    const newData = component.instance().getRankings(data.rounds);
    expect(newData[0].teamName).toBe('Winners');
    expect(newData[newData.length - 1].teamName).toBe('Losers');
});

test('processMatch', () => {
    const component = shallow(<App />);
    const newData = component.instance().processMatch({}, data.rounds[0].matches[0]);
    expect(newData).toEqual({
        Winners: {
            teamName: 'Winners',
            wins: 1,
            draws: 0,
            defeats: 0,
            goalsFor: 2,
            goalsAgainst: 0,
            goalDiff: 0,
            points: 3,
        },
        Losers: {
            teamName: 'Losers',
            wins: 0,
            draws: 0,
            defeats: 1,
            goalsFor: 0,
            goalsAgainst: 2,
            goalDiff: 0,
            points: 0,
        }
    })
});

test('compare', () => {
    const component = shallow(<App />);
    let data = [{
        teamName: 'teamA',
        points: 5,
        goalDiff: 10,
        goalsFor: 10
    }, {
        teamName: 'teamB',
        points: 10,
        goalDiff: 5,
        goalsFor: 5
    }];

    let newData = data.sort(component.instance().compare);
    expect(newData[0].teamName).toBe('teamB');

    data = [{
        teamName: 'team1',
        points: 5,
        goalDiff: 10,
        goalsFor: 10
    }, {
        teamName: 'team2',
        points: 5,
        goalDiff: 5,
        goalsFor: 5
    }];

    newData = data.sort(component.instance().compare);
    expect(newData[0].teamName).toBe('team1');

    data = [{
        teamName: 'teamX',
        points: 5,
        goalDiff: 5,
        goalsFor: 5
    }, {
        teamName: 'teamY',
        points: 5,
        goalDiff: 5,
        goalsFor: 10
    }];

    newData = data.sort(component.instance().compare);
    expect(newData[0].teamName).toBe('teamY');
});

