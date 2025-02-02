import useSWR from "swr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaDiceFive, FaCheckCircle } from "react-icons/fa";
import { LuCopy } from "react-icons/lu";
import { useState, useEffect } from "react";
import LoadingBar from "./LoadingBar";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
function QuoteGenerator() {
  const { data, error, mutate } = useSWR(
    "https://api.adviceslip.com/advice",
    fetcher,
    { revalidateOnFocus: false },
  );
  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (data) {
      setLoading(false);
      setFadeIn(true);
    }
  }, [data]);

  if (error) return <div className="content">Failed to load data</div>;

  const advice = data?.slip?.advice;
  const adviceId = data?.slip?.id;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(advice).then(() => {
      toast(
        <div className={'notification'}
        >
          <span style={{ fontSize: "0.8rem" }}>copied to clipboard 🎉</span>
          <FaCheckCircle
            style={{ marginTop: "5px", color: "#4CAF50", fontSize: "1.5rem" }}
          />
        </div>,
      );
    });
  };

  const handleRandomizeClick = () => {
    setFadeOut(true);
    setLoading(true);
    setFadeIn(false);
    setTimeout(() => {
      mutate();
      setFadeOut(false);
    }, 500);
  };

  return (
    <>
      {loading && <LoadingBar />}
      <div
        className={`content ${fadeOut ? "fade-out" : fadeIn ? "fade-in" : ""}`}
      >
        <h1 className="title">ADVICE #{adviceId}</h1>
        <p className="quote">“{advice}”</p>
      </div>
      <div className="copy-container">
        <button
          onClick={copyToClipboard}
          className="copy"
          copy-text="Copy Quote"
        >
          <LuCopy />
        </button>
      </div>
      <ToastContainer
        autoClose={1000}
        hideProgressBar
        pauseOnHover={false}
        draggable={false}
        closeButton={false}

      />
      <a onClick={handleRandomizeClick} className="randomize">
        <FaDiceFive />
      </a>
    </>
  );
}

export default QuoteGenerator;
