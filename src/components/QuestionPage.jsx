import React, { useEffect, useState } from 'react';
import '../css/questionPage.css';

export function QuestionPage({ question, teams, onScore }) {
    const [timeLeft, setTimeLeft] = useState(60);
    const [feedback, setFeedback] = useState('');
    const [clicked, setClicked] = useState(null);
    const [pendingTeam, setPendingTeam] = useState(null);
    const [clickedWrong, setClickedWrong] = useState([]);
    const [showImage, setShowImage] = useState(false);
    const [showWrongGif, setShowWrongGif] = useState(false);

    useEffect(() => {
        if (timeLeft === 0) {
            const audio = new Audio('/alarm.mp3');
            audio.play().catch(() => {});
        }
    }, [timeLeft]);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);

    const handleAnswer = (option, index) => {
        setClicked(index);
        const audio = new Audio(option.correct ? '/correct.mp3' : '/wrong.mp3');
        audio.play().catch(() => {});

        if (option.correct) {
            setShowImage(true);
            setTimeout(() => setShowImage(false), 5000);
            const imageAudio = new Audio('/celebration.mp3');
            imageAudio.play().catch(() => {});

            setFeedback('Правильно! Выберите команду, которой начислить очки:');
            setPendingTeam(option);
        } else {
            setShowWrongGif(true);
            setTimeout(() => setShowWrongGif(false), 4000);
            setFeedback('Неправильно!');
            setClickedWrong(prev => [...prev, index]);
            setTimeout(() => setFeedback(''), 2000);
        }
    };

    const confirmTeam = (team) => {
        if (pendingTeam) {
            onScore(team, question.points);
            setPendingTeam(null);
            setFeedback('Очки начислены!');
            setTimeout(() => setFeedback(''), 3000);
        }
    };

    return (
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>{question.text || `Вопрос (ячейка ${question.row + 1}-${question.col + 1})`}</h2>
            <p>Правильный ответ приносит {question.points} очков.</p>

            <div>Осталось времени: {timeLeft} сек.</div>

            {showImage && (
                <div
                    className="celebration-image"
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1000,
                        backgroundColor: 'transparent',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <img src="/right.gif" alt="Праздник!" style={{ width: '70vw', height: 'auto' }} />
                </div>
            )}

            {showWrongGif && (
                <div
                    className="wrong-gif"
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1000,
                        backgroundColor: 'transparent',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <img src="/wrong.gif" alt="Ошибка!" style={{ width: '70vw', height: 'auto' }} />
                </div>
            )}

            <div className="answer-buttons">
                {question.options?.map((opt, idx) => {
                    let className = 'answer-button';
                    if (clicked === idx && opt.correct) className += ' correct';
                    if (clickedWrong.includes(idx)) className += ' wrong';

                    const isDisabled = pendingTeam !== null || (clicked === idx && opt.correct) || clickedWrong.includes(idx);

                    return (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(opt, idx)}
                            className={className}
                            disabled={isDisabled}
                        >
                            {opt.text}
                        </button>
                    );
                })}
            </div>

            {feedback && <div className="text-lg font-semibold text-center mb-4">{feedback}</div>}

            {pendingTeam && (
                <div className="team-select-buttons">
                    <button onClick={() => confirmTeam('team1')} className="team-button team1">
                        {teams.team1}
                    </button>
                    <button onClick={() => confirmTeam('team2')} className="team-button team2">
                        {teams.team2}
                    </button>
                </div>
            )}
        </div>
    );
}
