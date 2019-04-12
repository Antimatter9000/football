import React from 'react';
import PropTypes from 'prop-types';

const LeagueTable = ({ rankings }) => {
    const displayRankings = () => {
        if (rankings) {
            return rankings.map((ranking, i) => (
                <tr
                  key={`ranking-${i}`}
                  tabIndex="0">
                    <td>{i + 1}</td>
                    <td>{ranking.teamName}</td>
                    <td>{ranking.wins}</td>
                    <td>{ranking.draws}</td>
                    <td>{ranking.defeats}</td>
                    <td>{ranking.goalsFor}</td>
                    <td>{ranking.goalsAgainst}</td>
                    <td>{ranking.goalDiff}</td>
                    <td>{ranking.points}</td>
                </tr>
            ));
        }
        return <tr>Awaiting data...</tr>
    }

    return (
        <table className="league-table">
            <thead>
                <tr tabIndex="0">
                    <th>Rank</th>
                    <th>Team name</th>
                    <th>Total wins</th>
                    <th>Total draws</th>
                    <th>Total defeats</th>
                    <th>Goals for</th>
                    <th>Goals against</th>
                    <th>Goal difference</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {displayRankings()}
            </tbody>
        </table>
    );
}

LeagueTable.propTypes = {
    rankings: PropTypes.arrayOf(
        PropTypes.shape({
            teamName: PropTypes.string,
            wins: PropTypes.number,
            draws: PropTypes.number,
            defeats: PropTypes.number,
            goalsFor: PropTypes.number,
            goalsAgainst: PropTypes.number,
            goalDiff: PropTypes.number,
            points: PropTypes.number,
        })
    )
}

export default LeagueTable;
