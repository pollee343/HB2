import React from 'react';
import '../css/ScoreBoard.css'; // Подключаем CSS-файл

export function ScoreBoard({ teams, scores }) {
    return (
        <div className="scoreboard-container">
            <table className="scoreboard-table">
                <tbody>
                <tr>
                    <td>{teams.team1}:</td>
                    <td>{teams.team2}:</td>
                </tr>
                <tr>
                    <td>{scores.team1} очков</td>
                    <td>{scores.team2} очков</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
