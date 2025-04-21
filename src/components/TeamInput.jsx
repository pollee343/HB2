import React, {useState} from 'react';

export function TeamInput({onStart}) {
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');

    return (
        <div>
            <h1 style={{fontSize: '6rem'}}>Введите название команд</h1>

            <div>
                <tr style={{
                    display: 'flex',
                    justifyContent: 'center', height: 'auto', padding: '5px'
                }}>
                    <input
                        style={{padding: '10px', margin: '10px', fontSize: '2rem', width: '90%', textAlign: 'center', color: '#4b2e11', fontWeight: 'bold'}}

                        placeholder="Команда легенд"
                        value={team1}
                        onChange={e => setTeam1(e.target.value)}
                    /></tr>
                <tr style={{
                    display: 'flex',
                    justifyContent: 'center', height: 'auto', padding: '5px'
                }}>
                    <input
                        style={{padding: '10px', margin: '10px', fontSize: '2rem', width: '90%', textAlign: 'center', color: '#4b2e11', fontWeight: 'bold' }}
                        placeholder="Команда ультрамегасуперкайфикхайпик-swagger'ов"
                        value={team2}
                        onChange={e => setTeam2(e.target.value)}
                    /></tr>
                <button
                    onClick={() => onStart(team1, team2)}

                    disabled={!team1 || !team2}
                    style={{
                        padding: '10px',
                        margin: '10px',
                        marginTop: '100px',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        width: '20%',
                        height: '20%',
                        borderRadius: '3px',
                        border: '1px solid gray'
                    }}
                >
                    Погнали!
                </button>
            </div>
        </div>
    );
}
