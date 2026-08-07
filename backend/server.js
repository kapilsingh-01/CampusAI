import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import fs from "fs";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// -----------------------------
// Multer Setup
// -----------------------------
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({

    storage,

    fileFilter: (req, file, cb) => {

        if (file.mimetype === "application/pdf") {

            cb(null, true);

        } else {

            cb(new Error("Only PDF files are allowed."));

        }

    },

    limits: {

        fileSize: 20 * 1024 * 1024 // 20 MB

    }

});

// -----------------------------
// OpenRouter Setup
// -----------------------------
const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

// -----------------------------
// Store PDF Text
// -----------------------------
let pdfText = "";

// -----------------------------
// Home Route
// -----------------------------
app.get("/", (req, res) => {
    res.send("🚀 CampusAI Backend Running");
});

// -----------------------------
// PDF Upload Route
// -----------------------------


app.post("/api/upload", upload.single("pdf"), async (req, res) => {

    console.log("🔥 Upload API Hit");

    try {

        console.log("📂 Uploaded File:", req.file);

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No PDF uploaded"
            });
        }

        const fileBuffer = fs.readFileSync(req.file.path);

        const loadingTask = pdfjsLib.getDocument({
            data: new Uint8Array(fileBuffer)
        });

        const pdf = await loadingTask.promise;

        let extractedText = "";

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {

            const page = await pdf.getPage(pageNum);

            const content = await page.getTextContent();

            const text = content.items
                .map(item => item.str)
                .join(" ");

            extractedText += text + "\n\n";
        }

        pdfText = extractedText;

        fs.unlinkSync(req.file.path);

        console.log("✅ PDF Uploaded Successfully");
        console.log("Characters:", pdfText.length);

        res.json({
            success: true,
            message: "PDF Uploaded Successfully"
        });

    } catch (error) {

        console.error("❌ Upload Error:");
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// -----------------------------
// AI Chat Route
// -----------------------------
app.post("/api/chat", async (req, res) => {

    try {

        const { message } = req.body;

        const lowerMessage = message.toLowerCase();

        const pdfKeywords = [
            "pdf",
            "notes",
            "note",
            "chapter",
            "summary",
            "summarize",
            "quiz",
            "question",
            "questions",
            "important",
            "explain",
            "topic",
            "unit",
            "mcq",
            "assignment",
            "document",
            "file"
        ];

        const usePDF =
            pdfText.length > 0 &&
            pdfKeywords.some(keyword => lowerMessage.includes(keyword));

        console.log("Using model: openrouter/free");
        console.log("PDF Mode:", usePDF);

        const completion = await client.chat.completions.create({

            model: "openrouter/free",

            messages: [

                {
                    role: "system",
                    content: usePDF
                        ? `You are CampusAI, an AI Study Assistant.

Use the uploaded PDF as your PRIMARY source.

Rules:

- Answer from the uploaded PDF whenever possible.
- If the requested information is not present in the uploaded PDF, first write:
"(This information is not available in the uploaded PDF.)"
Then answer using your own knowledge.
- Format answers with headings and bullet points whenever useful.

Uploaded PDF:

${pdfText}
`
                        : `You are CampusAI, a friendly AI assistant for college students.

- Reply naturally to greetings.
- Help with coding, studies, programming, college life and general knowledge.
- If the user asks something unrelated to the uploaded PDF, answer normally.`
                },

                {
                    role: "user",
                    content: message
                }

            ]

        });

        res.json({

            reply: completion.choices[0].message.content

        });

    } catch (error) {

        console.error("========== OPENROUTER ERROR ==========");
        console.error(error);
        console.error("======================================");

        res.status(500).json({

            error: error.message

        });

    }

});

// -----------------------------
// Start Server
// -----------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`🚀 Backend running on port ${PORT}`);

});