import { useState, useEffect } from "react";
// Prism for syntax highlighting
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
// React Simple Editor for editing code
import Editor from "react-simple-code-editor";
// Axios for making API requests to the backend
import axios from "axios";
// Markdown for proper formatting of backend response
import Markdown from "react-markdown";
// Rehype Highlight for highlighting code blocks in Markdown
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function App() {
  const [code, setcode] = useState(`
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

  // Fetch review from backend
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
    <>
      <main className="h-screen p-3 gap-2 w-screen bg-gray-500 flex">
        {/* Left Section: Code Editor */}
        <div className="left  p-10 border border-[#ddd] relative rounded-sm h-full w-[40%]">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setcode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={12}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 17,
                height: "100%",
                width: "100%",
                overflow: "auto",
                caretColor: "#ffffff",
                backgroundColor: "#000000",
                color: "#ffffff",
                borderRadius: "0.75rem",
              }}
            />
          </div>
          <div className="button">
            <button
              className="review absolute bottom-6 right-6 cursor-pointer hover:bg-blue-600 font-bold bg-blue-500 text-white px-8 py-2 rounded-md"
              onClick={getReview}
            >
              Review
            </button>
          </div>
        </div>

        {/* Right Section: Review Response / Loader */}
        <div className="right overflow-auto p-3 h-full w-[60%] rounded-md bg-[#343434]">
          <div className="response h-full">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                {/* Loader Spinner */}
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="review space-y-3 text-[20px] text-white">
                <Markdown rehypePlugins={[rehypeHighlight]}>
                  {review}
                </Markdown>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
