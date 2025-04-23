import React, { useState } from 'react';
import { TeamInput } from './components/TeamInput';
import { GameBoard } from './components/GameBoard';
import { ScoreBoard } from './components/ScoreBoard';
import { QuestionPage } from './components/QuestionPage';
import './css/cake.css';

export default function App() {
    const [teams, setTeams] = useState({ team1: '', team2: '' });
    const [scores, setScores] = useState({ team1: 0, team2: 0 });
    const [started, setStarted] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [disabledCells, setDisabledCells] = useState({}); // <--- добавлено

    const startGame = (t1, t2) => {
        setTeams({ team1: t1, team2: t2 });
        setStarted(true);
    };

    const updateScore = (team, points) => {
        setScores(prev => ({ ...prev, [team]: prev[team] + points }));
        setActiveQuestion(null);
    };

    const triggerQuestion = (question) => {
        setActiveQuestion(question);
    };

    return (
        <div>
            {!started ? (
                <TeamInput onStart={startGame} />
            ) : activeQuestion ? (
                <QuestionPage
                    question={activeQuestion}
                    teams={teams}
                    onScore={updateScore}
                />
            ) : (
                <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <ScoreBoard teams={teams} scores={scores} />
                    <GameBoard
                        onTrigger={triggerQuestion}
                        disabledCells={disabledCells}
                        setDisabledCells={setDisabledCells}
                    />
                </div>
            )}
        </div>
    );
}
