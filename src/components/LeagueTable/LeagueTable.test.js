import React from 'react';
import LeagueTable from './';
import { shallow } from 'enzyme';

test('component with no data', () => {
    const component = shallow(
        <LeagueTable />
    );

    expect(component.find('table')).toBeTruthy();
    expect(component.find('table').hasClass('league-table')).toBeTruthy();
    expect(component.find('thead').text()).toBe('RankTeam nameTotal winsTotal drawsTotal defeatsGoals forGoals againstGoal differencePoints')
    expect(component.find('tbody').text()).toBe('Awaiting data...');
});

test('component with data', () => {
    const component = shallow(
        <LeagueTable rankings={[
            {
                teamName: 'Team1',
                wins: 10,
                draws: 11,
                defeats: 12,
                goalsFor: 13,
                goalsAgainst: 14,
                goalDiff: 15,
                points: 16
            },
            {
                teamName: 'Team2',
                wins: 20,
                draws: 22,
                defeats: 22,
                goalsFor: 23,
                goalsAgainst: 24,
                goalDiff: 25,
                points: 26
            },
            {
                teamName: 'Team3',
                wins: 30,
                draws: 33,
                defeats: 32,
                goalsFor: 33,
                goalsAgainst: 34,
                goalDiff: 35,
                points: 36
            }
        ]} />
    );

    expect(component.find('tbody tr').length).toBe(3);
    expect(component.find('tbody tr').first().text()).toBe('1Team110111213141516');
    expect(component.find('tbody tr').last().childAt(0).text()).toBe('3');
});
