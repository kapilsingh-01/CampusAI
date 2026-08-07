import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { askGemini, askPDF } from "../services/geminiService";
import PDFUploader from "../components/PDFUploader";

function AIAssistant() {

    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: `# 👋 Welcome to CampusAI

Hello! I'm **CampusAI**, your AI study assistant.

I can help you with:

- 📚 Study Notes
- 💻 Coding
- 📝 Assignments
- 📖 Concepts
- 🎯 Exam Preparation

Upload a PDF and ask me anything about it.`
        }
    ]);

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    
    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages]);

    async function sendMessage(customPrompt = null) {
            
        if (loading) return;

        const prompt = customPrompt || input;

        if (!prompt.trim()) return;

        if (!customPrompt) {

            setMessages((prev) => [
                ...prev,
                {
                    sender: "user",
                    text: prompt
                }
            ]);

            setInput("");

        }

        setLoading(true);

        try {

            const reply = await askGemini(prompt);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: reply
                }
            ]);

        }

        catch (error) {

            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: "❌ Unable to contact CampusAI."
                }
            ]);

        }

        finally {

            setLoading(false);

        }

    }

   async function sendSummary() {

    if (loading) return;

    setLoading(true);

    try {

        const reply = await askPDF(
            "Summarize the uploaded PDF with headings, important concepts, key points and exam tips."
        );

        setMessages(prev => [

            ...prev,

            {

                sender: "ai",

                text: reply

            }

        ]);

    }

    catch (error) {

        console.error(error);

    }

    finally {

        setLoading(false);

    }

}

    async function generateQuiz() {

    if (loading) return;

    setLoading(true);

    try {

        const reply = await askPDF(
            "Generate 10 MCQs from the uploaded PDF."
        );

        setMessages(prev => [

            ...prev,

            {

                sender: "ai",

                text: reply

            }

        ]);

    }

    catch (error) {

        console.error(error);

    }

    finally {

        setLoading(false);

    }

}

    async function generateNotes() {

    if (loading) return;

    setLoading(true);

    try {

        const reply = await askPDF(
            "Generate short notes from the uploaded PDF."
        );

        setMessages(prev => [

            ...prev,

            {

                sender: "ai",

                text: reply

            }

        ]);

    }

    catch (error) {

        console.error(error);

    }

    finally {

        setLoading(false);

    }

}

    async function generateQuestions() {

    if (loading) return;

    setLoading(true);

    try {

        const reply = await askPDF(
            "Generate important exam questions from the uploaded PDF."
        );

        setMessages(prev => [

            ...prev,

            {

                sender: "ai",

                text: reply

            }

        ]);

    }

    catch (error) {

        console.error(error);

    }

    finally {

        setLoading(false);

    }

}

    return (

    <div className="assistant-page">

        <h1>🤖 AI Study Assistant</h1>

        {/* PDF Upload */}

        <PDFUploader />

        {/* Chat */}

        <div className="chat-box">

            {

              messages.map((message, index) => (

    <div
        key={index}
        className={
            message.sender === "user"
                ? "user-message"
                : "ai-message"
        }
    >

        {
            message.sender === "ai"
                ?
                <>
                    <ReactMarkdown>
                        {message.text}
                    </ReactMarkdown>

                    <button
                        className="copy-btn"
                        onClick={() => {
                            navigator.clipboard.writeText(message.text);
                            alert("✅ Copied!");
                        }}
                    >
                        📋 Copy
                    </button>
                </>
                :
                message.text
        }

    </div>

))
            }

            {

                loading &&

                <div className="ai-message">

                    ⏳ CampusAI is thinking...

                </div>

            }

            <div ref={bottomRef}></div>

        </div>

        {/* AI Quick Actions */}

        <div className="ai-buttons">

            <button

                className="summary-btn"

                onClick={sendSummary}

                disabled={loading}

            >

                📑 Summary

            </button>

            <button

                className="summary-btn"

                onClick={generateNotes}

                disabled={loading}

            >

                📝 Notes

            </button>

            <button

                className="summary-btn"

                onClick={generateQuiz}

                disabled={loading}

            >

                ❓ Quiz

            </button>

            <button

                className="summary-btn"

                onClick={generateQuestions}

                disabled={loading}

            >

                🎯 Questions

            </button>

                <button
    className="clear-btn"
    onClick={() => {
        setMessages([]);
        setInput("");
    }}
>
    🗑️ Clear Chat
</button>





        </div>

                {/* Input */}

        <div className="chat-input">

            <input

                type="text"

                placeholder="Ask CampusAI anything..."

                value={input}

                onChange={(e) => setInput(e.target.value)}

                onKeyDown={(e) => {

                    if (e.key === "Enter") {

                        e.preventDefault();

                        sendMessage();

                    }

                }}

            />

            <button

                onClick={() => sendMessage()}

                disabled={loading}

            >

                {

                    loading

                        ? "Thinking..."

                        : "Send"

                }

            </button>

        </div>

    </div>

);

}

export default AIAssistant;