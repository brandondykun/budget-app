import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Footer = () => {
  const [quote, setQuote] = useState({
    text: "My actions are my only true belongings",
    author: "Thich Nhat Hanh",
  });

  const getQuote = async () => {
    try {
      const data = await axios.get("https://api.goprogram.ai/inspiration");
      setQuote({ text: data.data.quote, author: data.data.author });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <footer className="primary-footer">
      {quote ? (
        <div>{`"${quote.text}" - ${quote.author}`}</div>
      ) : (
        "Get that Money!!"
      )}
    </footer>
  );
};

export default Footer;
