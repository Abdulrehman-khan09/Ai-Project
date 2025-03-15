import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function App() {
  const [code, setCode] = useState(`
// Welcome to Code Review Assistant! 🚀

// Example:

function add(a, b) {
  return a + b;
}
  `);
  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, [code]);

  const getReview = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ai/get-review`,
        { code }
      );
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Error fetching review. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <main className="h-screen p-3 gap-4 w-screen bg-gray-500 flex flex-col md:flex-row">
      {/* Left Section: Code Editor */}
      <div className="relative border border-[#ddd] rounded-lg p-5 bg-black text-white h-[50%] md:h-full w-full md:w-[40%] flex flex-col">
        <div className="flex-grow overflow-auto">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={12}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 17,
              minHeight: "100%",
              width: "100%",
              overflow: "auto",
              caretColor: "#ffffff",
              backgroundColor: "#000000",
              color: "#ffffff",
              borderRadius: "0.75rem",
            }}
          />
        </div>
        <button
          className="absolute bottom-4 right-4 md:static md:self-end cursor-pointer hover:bg-blue-600 font-bold bg-blue-500 text-white px-6 py-2 rounded-md"
          onClick={getReview}
        >
          Review
        </button>
      </div>

      {/* Right Section: Review Response / Loader */}
      <div className="p-3 h-[50%] md:h-full w-full md:w-[60%] rounded-lg bg-[#343434] flex items-center justify-center">
        <div className="w-full h-full max-h-[50vh] md:max-h-none overflow-auto md:overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-full">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="text-[20px] text-white">
              <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
