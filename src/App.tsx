import { useCallback, useEffect, useState } from 'react';
import words from './word-list.json';
import HangManDrawing from './HangManDrawing';
import HangManWord from './HangManWord';
import Keyboard from './Keyboard';

function getWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function App() {
    const [wordToGuess, setWordToGuess] = useState(getWord);

    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    const incorrectLetters = guessedLetters.filter(
        (letter) => !wordToGuess.includes(letter)
    );

    const isLoser = incorrectLetters.length >= 6;

    const isWinner = wordToGuess
        .split('')
        .every((letter) => guessedLetters.includes(letter));

    const addGuessedLetter = useCallback(
        (letter: string) => {
            if (guessedLetters.includes(letter) || isLoser || isWinner) return;

            setGuessedLetters((prevLetters) => [...prevLetters, letter]);
        },
        [guessedLetters]
    );

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key;

            if (!key.match(/^[a-z]$/)) return;

            e.preventDefault();

            addGuessedLetter(key);
        };

        document.addEventListener('keypress', handler);

        return () => {
            document.removeEventListener('keypress', handler);
        };
    }, [guessedLetters]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key;

            if (key !== 'Enter') return;

            e.preventDefault();

            setGuessedLetters([]);

            setWordToGuess(getWord);
        };

        document.addEventListener('keypress', handler);

        return () => {
            document.removeEventListener('keypress', handler);
        };
    }, [guessedLetters]);

    return (
        <div
            style={{
                maxWidth: '800px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                margin: '0 auto',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    fontSize: '2rem',
                    fontFamily: 'sans-serif',
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}
            >
                {isWinner && 'Winner! Hit enter or refresh page to play again!'}
                {isLoser && 'Nice Try. Hit enter or refresh page to try again!'}
            </div>
            <HangManDrawing numberOfGuesses={incorrectLetters.length} />
            <HangManWord
                reveal={isLoser}
                guessedLetters={guessedLetters}
                wordToGuess={wordToGuess}
            />
            <div style={{ alignSelf: 'stretch' }}>
                <Keyboard
                    disabled={isWinner || isLoser}
                    activeLetters={guessedLetters.filter((letter) =>
                        wordToGuess.includes(letter)
                    )}
                    inactiveLetters={incorrectLetters}
                    addGuessedLetter={addGuessedLetter}
                />
            </div>
        </div>
    );
}

export default App;
