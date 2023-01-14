import React from 'react';
import styles from './keyboard.module.css';

const KEYS = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
];

type KeyboardProps = {
    activeLetters: string[];
    inactiveLetters: string[];
    disabled: boolean;
    addGuessedLetter: (letter: string) => void;
};

function Keyboard({
    activeLetters,
    inactiveLetters,
    disabled,
    addGuessedLetter,
}: KeyboardProps) {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr)',
                gap: '.5rem',
            }}
        >
            {KEYS.map((key) => {
                const isActive = activeLetters.includes(key);
                const isInactive = inactiveLetters.includes(key);

                return (
                    <button
                        disabled={isActive || isInactive || disabled}
                        className={`
                            ${styles.btn} 
                            ${isActive ? styles.active : ''} ${styles.btn} 
                            ${isInactive ? styles.inactive : ''} 
                        `}
                        key={key}
                        onClick={() => addGuessedLetter(key)}
                    >
                        {key}
                    </button>
                );
            })}
        </div>
    );
}

export default Keyboard;
