import React, { Component } from 'react';
import Title from './components/Title';
import LeagueTable from './components/LeagueTable';
import ErrorMessage from './components/ErrorMessage';
import './App.scss';

class App extends Component {
    state = {
        league: {}
    }

    render() {
        return (
            <div className="rankings-app">
                <main className="rankings-content">
                    {this.getContent()}
                </main>
                <footer>A quick test from Jonathan Stevens: enterprise standard javascript developer and all round good guy. Very hireable.</footer>
            </div>
        )
    }

    getContent() {
        if (this.state.league && this.state.league.rounds) {
            return (
                <div>
                    <Title>{this.state.league.name}</Title>
                    <LeagueTable rankings={this.getRankings(this.state.league.rounds)} />
                </div>
            )
        }
        if (this.state.error) {
            return <ErrorMessage message={this.state.error} />
        }
        return <p>Awaiting results...</p>
    }

    getRankings(rounds) {
        const results = rounds.reduce((startingObject, round) => (
            round.matches.reduce(
                this.processMatch,
                startingObject
            )
        ), {});
        return this.rank(results);
    }

    processMatch = (data, match) => {
        const teams = {
            1: match.team1.name,
            2: match.team2.name
        }

        data = this.dataWithTeams(data, teams);
        data = this.dataWithGoals(data, match, teams);        

        if (match.score1 === match.score2) {
            data = this.handleDraw(data, teams);
        } else {
            data = this.handleVictory(data, match, teams)
        }

        return data;
    }

    dataWithTeams(data, teams) {
        return {
            ...data,
            [teams[1]]: data[teams[1]] || this.createTeam(teams[1]),
            [teams[2]]: data[teams[2]] || this.createTeam(teams[2]),
        }
    }

    createTeam(teamName) {
        return {
            teamName,
            wins: 0,
            draws: 0,
            defeats: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            goalDiff: 0,
            points: 0
        }
    }

    dataWithGoals(data, match, teams) {
        data[teams[1]].goalsFor += match.score1;
        data[teams[2]].goalsFor += match.score2;

        data[teams[1]].goalsAgainst += match.score2;
        data[teams[2]].goalsAgainst += match.score1;

        return data;
    }

    handleDraw(data, teams) {
        data[teams[1]].draws += 1;
        data[teams[2]].draws += 1;

        data[teams[1]].points += 1;
        data[teams[2]].points += 1;

        return data;
    }

    handleVictory(data, match, teams) {
        const competitors = match.score1 > match.score2
            ? { winner: teams[1], loser: teams[2] }
            : { winner: teams[2], loser: teams[1] }

        data[competitors.winner].wins += 1;
        data[competitors.loser].defeats += 1;

        data[competitors.winner].points += 3;
        return data;
    }

    rank(data) {
        return Object.keys(data).map(key => ({
            ...data[key],
            goalDiff: data[key].goalsFor - data[key].goalsAgainst
        })).sort(this.compare);
    }

    compare = (a, b) => {
        if (b.points - a.points === 0) {
            return b.goalDiff - a.goalDiff === 0
                ? b.goalsFor - a.goalsFor
                : b.goalDiff - a.goalDiff;
        }
        return b.points - a.points
    }

    componentDidMount() {
        this.getResults();
    }

    getResults = async () => {
        try {
            const response = await fetch(
                '/results.json'
            );
            const league = await response.json();
            this.setState({league});
        } catch(e) {
            this.setState({
                error: `Damn, knew I shouldn't have tried to be so clever. Honestly, this worked locally I promise 😬`
            })
        }
    }
}

export default App;
