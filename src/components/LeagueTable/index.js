import React from 'react';

export default ({ rankings }) => {
	const displayRankings = () => {
		if (rankings) {
			return rankings.map((ranking, i) => (
				<tr
				  key={`ranking-${i}`}
				  tabindex="0">
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
				<tr tabindex="0">
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