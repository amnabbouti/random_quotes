import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaDiceFive, FaCheckCircle } from "react-icons/fa";
import { LuCopy } from "react-icons/lu";

interface Quote {
    quote: string;
    author?: string;
}

interface QuoteGeneratorProps {
    quotes: Quote[];
    currentIndex: number;
    generateRandomIndex: () => void;
}

function QuoteGenerator(props: QuoteGeneratorProps) {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(props.quotes[props.currentIndex].quote).then(() => {
            toast(
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#333",
                        padding: "5px",
                        width: "100%",
                    }}
                >
          <span style={{ fontSize: "0.8rem"}}>
            copied to clipboard 🎉
          </span>
                    <FaCheckCircle
                        style={{ marginTop: "5px", color: "#4CAF50", fontSize: "1.5rem" }}
                    />
                </div>,
            );
        });
    };

    return (
        <>
            <p className="quote">“{props.quotes[props.currentIndex].quote}”</p>
            {props.quotes[props.currentIndex].author && (
                <p className="author">{props.quotes[props.currentIndex].author}</p>
            )}

            <div className="copy-container">
                <button onClick={copyToClipboard} className="copy">
                    <LuCopy />
                </button>
            </div>
            <ToastContainer
                autoClose={1000}
                hideProgressBar
                pauseOnHover={false}
                draggable={false}
                closeButton={false}
                style={{ width: "200px" }}
            />
            <a onClick={props.generateRandomIndex} className="randomize">
                <FaDiceFive />
            </a>
        </>
    );
}

export default QuoteGenerator;