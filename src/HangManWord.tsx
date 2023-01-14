import React from 'react';

type HangManWordProps = {
    guessedLetters: string[];
    wordToGuess: string;
    reveal: boolean;
};

function HangManWord({
    guessedLetters,
    wordToGuess,
    reveal,
}: HangManWordProps) {
    return (
        <div
            style={{
                display: 'flex',
                gap: '.25em',
                fontSize: '6rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
            }}
        >
            {wordToGuess.split('').map((letter, index) => {
                return (
                    <span
                        style={{ borderBottom: '.1em solid black' }}
                        key={index}
                    >
                        <span
                            style={{
                                visibility:
                                    guessedLetters.includes(letter) || reveal
                                        ? 'visible'
                                        : 'hidden',
                                color:
                                    !guessedLetters.includes(letter) && reveal
                                        ? 'tomato'
                                        : 'black',
                            }}
                        >
                            {letter}
                        </span>
                    </span>
                );
            })}
        </div>
    );
}

export default HangManWord;
