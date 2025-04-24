import React from 'react';
import '../css/GameBoard.css';

const pointsMatrix = [[100, 200, 300, 400, 500], [100, 200, 300, 400, 500], [100, 200, 300, 400, 500]];

const questionsMatrix = [
    [
        {
            text: 'Только одно верно...',
            options: [
                { text: 'Просыпаюсь почти каждую ночь в +- одно и то же время', correct: false },
                { text: 'Ругалась с папой, когда лунатила', correct: false },
                { text: 'Видела цветные сны', correct: true, team: 'team1' }
            ]
        },
        {
            text: 'Только одно верно...',
            options: [
                { text: 'Представлялась другим именем', correct: true, team: 'team2' },
                { text: 'Ездила в рейсовом автобусе по чужому паспорту', correct: false },
                { text: 'Сидела в тиктоке от лица 40-летней женщины', correct: false }
            ]
        },
        {
            text: 'Только одно верно...',
            options: [
                { text: 'Летала на самолете пьяная (не прям в мясо, но уже не просто подшофе)', correct: true, team: 'team1' },
                { text: 'Пьяная уснула на пляже и сгорела', correct: false },
                { text: 'Случайно приняла мощный транквилизатор и словила раскумар', correct: false }
            ]
        },{
        text: 'В детстве Ульяна:',
        options: [
            { text: 'Провалилась в колодец', correct: false },
            { text: 'Застряла в сугробе', correct: true, team: 'team2' },
            { text: 'Повисла на заборе', correct: false }
        ]
    },

        {
            text: 'Из-за чего выучила английский на B2?',
            options: [
                { text: 'Хотела уехать в Америку на ПМЖ', correct: false },
                { text: 'Чтобы не остаться на второй год в школе', correct: true, team: 'team1' },
                { text: 'Чтобы утереть нос сестре', correct: false }
            ]
        }
    ],
    [        {
        text: 'Только одно верно...',
        options: [
            { text: 'Получала штраф за хулиганство', correct: false },
            { text: 'Делала телефонные розыгрыши', correct: true, team: 'team2' },
            { text: 'Звонила в полицию наспор', correct: false }
        ]
    },{
        text: 'Только одно верно...',
        options: [
            { text: 'Врала о своей ориентации', correct: true, team: 'team1' },
            { text: 'Притворялась родной сестрой подруги', correct: false },
            { text: 'Распускала слухи о себе ради эксперимента', correct: false }
        ]
    },

        {
        text: 'Как звали первую кошку?',
        options: [
            { text: 'Сёма', correct: false },
            { text: 'Сема', correct: false },
            { text: 'Сима', correct: true, team: 'team1' }
        ]
    },{
        text: 'Когда родители вернулись из Чехии Ульяна встретила их со словами:',
        options: [
            { text: 'Здравствуйте, Дмитрий Александрович', correct: true, team: 'team2' },
            { text: 'А че так долго', correct: false,},
            { text: 'Я вас с собой тоже не возьму', correct: false }
        ]
    },
        {
            text: 'Купалась в море:',
            options: [
                { text: 'За доллар', correct: true, team: 'team2' },
                { text: 'За мороженое', correct: false },
                { text: 'За массаж', correct: false }
            ]
        },


    ],
    [{
        text: 'Только одно верно...',
        options: [

            { text: 'Показала фак представителю власти', correct: false },
            { text: 'Украла хомяка у знакомой', correct: false },
            { text: 'Подделывала документы ', correct: true, team: 'team2' }
        ]
    },
        {
            text: 'Только одно верно...',
            options: [
                { text: 'Купалась полностью голенькой блинб в реке (было холодно)', correct: true, team: 'team1' },
                { text: 'Устроила в детском саду день "без трусов"', correct: false },
                { text: 'Загорала полностью голой на балконе в Турции', correct: false }
            ]
        },{
        text: 'Только одно верно...',
        options: [
            { text: 'Претворялась сильно пьяной, чтобы нормально не разговаривать', correct: false },
            { text: 'Съела кусок свечи, думая, что это сыр', correct: false },
            { text: 'Врала, что нахожусь в отношениях', correct: true, team: 'team2' }
        ]
    },

        {
            text: 'Ульяна никогда не играла:',
            options: [
                { text: 'С какашками', correct: true, team: 'team2' },
                { text: 'С окурками', correct: false },
                { text: 'Со стеклом', correct: false },
                { text: 'С червями', correct: false }
            ]
        },

        {
        text: 'Ульяна никогда не ела:',
        options: [
            { text: 'Листья', correct: false },
            { text: 'Устрицы', correct: false },
            { text: 'Тюльпаны', correct: false },
            { text: 'Монеты', correct: false },
            { text: 'Мел', correct: false },
            { text: 'Корм для животных', correct: true, team: 'team1' },
        ]
    },
    ]
];


export function GameBoard({onTrigger, disabledCells, setDisabledCells}) {
    const handleClick = (row, col) => {
        const key = `${row}-${col}`;
        setDisabledCells(prev => ({...prev, [key]: true}));

        const question = questionsMatrix[row][col];
        const points = pointsMatrix[row][col];

        onTrigger({
            points, row, col, text: question?.text || '', options: question?.options || []
        });
    };

    return (<table className="gameboard-table">
        <tbody>
        {pointsMatrix.map((row, rowIndex) => (<tr key={rowIndex}>
            {row.map((points, colIndex) => {
                const key = `${rowIndex}-${colIndex}`;
                const isDisabled = disabledCells[key];
                const classes = `board-button ${isDisabled ? 'disabled-button' : ''}`;

                return (<td key={colIndex}>
                    <button
                        className={classes.trim()}
                        onClick={() => handleClick(rowIndex, colIndex)}
                        disabled={isDisabled}
                    >
                        {points}
                    </button>
                </td>);
            })}
        </tr>))}
        </tbody>
    </table>);
}
