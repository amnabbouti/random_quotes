import { useState } from 'react';
import QuoteGenerator from './Components/QuoteGenerator';
import './App.scss';
import quotesData from './quotes.json';

interface Quote {
    quote: string;
    author?: string;
}

function App() {
    const quotesArray: Quote[] = quotesData;
    const [quotes] = useState<Quote[]>(quotesArray);
    const [currentIndex, setCurrentIndex] = useState<number>(Math.floor(Math.random() * quotesArray.length));

    const generateRandomIndex = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setCurrentIndex(randomIndex);
    };

    if (quotes.length === 0) {
        return <div className="card"></div>;
    }

    return (
        <div className="card">
            <h1>ADVICE #{currentIndex + 1}</h1>
            <QuoteGenerator quotes={quotes} currentIndex={currentIndex} generateRandomIndex={generateRandomIndex} />
        </div>
    );
}

export default App;