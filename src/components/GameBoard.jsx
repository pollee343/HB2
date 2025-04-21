import React from 'react';
import '../css/GameBoard.css';

const pointsMatrix = [
    [100, 200, 300, 400, 500],
    [100, 200, 300, 400, 500],
    [100, 200, 300, 400, 500]
];
/*todo распределить вопросы по сложности
*  творческий конкурс
*  ручное ищменеие очков
* анимация
* */
const questionsMatrix = [
    [
        {
            text: 'Я никогда не ела:',
            options: [
                {text: 'Листья', correct: false},
                {text: 'Устрицы', correct: false},
                {text: 'Тюльпаны', correct: false},
                {text: 'Корм для животных', correct: true, team: 'team1'},
                {text: 'Монеты', correct: false},
                {text: 'Мел', correct: false}
            ]
        },
        {
            text: 'Я никогда не играла:',
            options: [
                {text: 'С какашками', correct: true, team: 'team2'},
                {text: 'С окурками', correct: false},
                {text: 'Со стеклом', correct: false},
                {text: 'С червями', correct: false}
            ]
        },
        {
            text: 'Только одно верно...',
            options: [
                {text: 'Просыпаюсь почти каждую ночь в +- одно и то же время', correct: false},
                {text: 'Ругалась с папой, когда лунатила', correct: false},
                {text: 'Видела цветные сны', correct: true, team: 'team1'}
            ]
        },
        {
            text: 'Только одно верно...',
            options: [
                {text: 'Получала штраф за хулиганство', correct: false},
                {text: 'Делала телефонные розыгрыши (  ', correct: true, team: 'team2'},
                {text: 'Звонила в полицию наспор', correct: false}
            ]
        },
        {
            text: 'Только одно верно...',
            options: [
                {text: 'Не мыла руки 9 дней (я была дома и болела)', correct: false},
                {text: 'Всегда ношу с собой зубную нить', correct: false},
                {text: 'Пользовалась чужой зубной щеткой', correct: true, team: 'team1'}
            ]
        }
    ],
    [
        {
            text: 'Только одно верно...',
            options: [
                {text: 'Представлялась другим именем', correct: true, team: 'team2'},
                {text: 'Ездила в рейсовом автобусе по чужому паспорту', correct: false},
                {text: 'Сидела в тиктоке от лица 40-летней женщины', correct: false}
            ]
        },
        {
            text: 'Только одно верно...',
            options: [
                {
                    text: 'Летала на самолете пьяная (не прям в мясо, но уже не просто подшофе)',
                    correct: true,
                    team: 'team1'
                },
                {text: 'Пьяная уснула на пляже и сгорела', correct: false},
                {text: 'Случайно приняла мощный транквилизатор и словила раскумар', correct: false}
            ]
        },
        {
            text: 'Только одно верно...',
            options: [
                {text: 'Претворялась сильно пьяной, чтобы нормально не разговаривать', correct: false},
                {text: 'Съела кусок свечи, думая, что это сыр', correct: false},
                {text: 'Врала, что нахожусь в отношениях', correct: true, team: 'team2'}
            ]
        },
        {
            text: 'Только одно верно...',
            options: [
                {text: 'Купалась полностью голенькой блинб в реке (было холодно)', correct: true, team: 'team1'},
                {text: 'Устроила в детском саду день "без трусов" и заставила всю группу участвовать', correct: false},
                {text: 'Загорала полностью голой на балконе в Турции', correct: false}
            ]
        },
        {
            text: 'Только одно верно...',
            options: [
                {text: 'Ходила в пижаме в школу', correct: false},
                {text: 'Ходила кругами рядом с домом подруги, чтобы она увидела и позвала в гости', correct: false},
                {text: 'Ходила без нижнего белья по улице в осознанном возрасте', correct: true, team: 'team2'}
            ]
        }
    ],
    [
        {
            text: 'Только одно верно...',
            options: [
                {text: 'Притворялась родной сестрой подруги', correct: false},
                {text: 'Врала о своей ориентации', correct: true, team: 'team1'},

                {text: 'Распускала слухи о себе ради эксперимента', correct: false}
            ]
        },
        {
            text: 'Только одно верно...',
            options: [
                {text: 'Показала фак (🖕🏿🖕🏿🖕🏿) представителю власти (он не видел (наверное))', correct: false},
                {text: 'Подделывала документы (🖕🏿🖕🏿🖕🏿)', correct: true, team: 'team2'},
                {text: 'Украла хомяка у знакомой (мне был нужнее 🖕🏿🖕🏿🖕🏿)', correct: false}
            ]
        },
        {},
        {},
        {}
    ]
];

export function GameBoard({ onTrigger, disabledCells, setDisabledCells }) {
    const handleClick = (row, col) => {
        const key = `${row}-${col}`;
        setDisabledCells(prev => ({ ...prev, [key]: true }));

        const question = questionsMatrix[row][col];
        const points = pointsMatrix[row][col];

        onTrigger({
            points,
            row,
            col,
            text: question?.text || '',
            options: question?.options || []
        });
    };

    return (
        <table className="gameboard-table">
            <tbody>
            {pointsMatrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((points, colIndex) => {
                        const key = `${rowIndex}-${colIndex}`;
                        const isDisabled = disabledCells[key];
                        const classes = `board-button ${isDisabled ? 'disabled-button' : ''}`;

                        return (
                            <td key={colIndex}>
                                <button
                                    className={classes.trim()}
                                    onClick={() => handleClick(rowIndex, colIndex)}
                                    disabled={isDisabled}
                                >
                                    {points}
                                </button>
                            </td>
                        );
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
}
