import React, { useState, useRef } from 'react';
import '../css/questionPage.css';

export function QuestionPage({ question, teams, onScore }) {
    const [feedback, setFeedback] = useState('');
    const [clicked, setClicked] = useState(null);
    const [pendingTeam, setPendingTeam] = useState(null);
    const [clickedWrong, setClickedWrong] = useState([]);
    const [showImage, setShowImage] = useState(false);
    const [showWrongImage, setShowWrongImage] = useState(false);

    const currentAudioRef = useRef(null); // Храним текущий звук

    const stopCurrentAudio = () => {
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current.currentTime = 0;
            currentAudioRef.current = null;
        }
    };

    const handleAnswer = (option, index) => {
        stopCurrentAudio(); // Остановить текущий звук
        setClicked(index);

        const audio = new Audio(option.correct ? 'correct.mp3' : 'wrong.mp3');
        currentAudioRef.current = audio;
        audio.play().catch(() => {});

        // Сброс обеих гифок перед показом новой
        setShowImage(false);
        setShowWrongImage(false);

        if (option.correct) {
            setShowImage(true);
            setTimeout(() => setShowImage(false), 3500);


            currentAudioRef.current = imageAudio;
            imageAudio.play().catch(() => {});

            setFeedback('Правильно! Выберите команду, которой начислить очки:');
            setPendingTeam(option);
        } else {
            setShowWrongImage(true);
            setTimeout(() => setShowWrongImage(false), 3500);
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
        <div style={{ position: 'relative', minHeight: '80vh' }}>
            <h2 style={{ margin: '3rem', marginTop: '6rem', fontSize: '2.75rem' }}>{question.text}</h2>

            {showImage && (
                <div
                    className="celebration-image"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1000,
                        padding: '0.1rem'
                    }}
                >
                    <img
                        src="right1.gif"
                        alt="правильно"
                        style={{ maxWidth: '600px', maxHeight: '600px', display: 'block', margin: '0 auto' }}
                    />
                </div>
            )}

            {showWrongImage && (
                <div
                    className="wrong-image"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1000,
                        padding: '0.1rem'
                    }}
                >
                    <img
                        src="wrong1.gif"
                        alt="Ошибка!"
                        style={{ maxWidth: '600px', maxHeight: '600px', display: 'block', margin: '0 auto' }}
                    />
                </div>
            )}

            <div className="answer-buttons">
                {question.options?.map((opt, idx) => {
                    let className = 'answer-button';
                    if (clicked === idx && opt.correct) className += ' correct';
                    if (clickedWrong.includes(idx)) className += ' wrong';

                    const isDisabled =
                        pendingTeam !== null || (clicked === idx && opt.correct) || clickedWrong.includes(idx);

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

            {feedback && <div style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '4rem' }}>{feedback}</div>}

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
