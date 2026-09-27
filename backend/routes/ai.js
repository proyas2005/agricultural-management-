// ============================================================
// backend/routes/ai.js
// RAG-powered AI chat endpoint.
// User question → embed → vector search in MongoDB →
// retrieved chunks → Gemini LLM → answer.
// ============================================================

const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// ---------- Config ----------
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = 'agriculture_ai';
const MONGODB_COLLECTION = 'knowledge_chunks';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;



const EMBEDDING_MODEL = 'gemini-embedding-2';
const CHAT_MODEL = 'gemini-3.8-flash';

const TOP_K = 30;

// ---------- Cached clients (created once, reused) ----------
let mongoClient = null;
let genAI = null;

async function getMongoClient() {
    if (!mongoClient) {
        mongoClient = new MongoClient(MONGODB_URI);
        await mongoClient.connect();
        console.log('  [ai.js] MongoDB client connected');
    }
    return mongoClient;
}

function getGenAI() {
    if (!genAI) {
        genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    }
    return genAI;
}


// ============================================================
// POST /api/ai/chat
// Body: { question: "..." }
// Returns: { answer: "...", sources: [...] }
// ============================================================
router.post('/api/ai/chat', async (req, res) => {
    try {
        const question = (req.body.question || '').trim();

        if (!question) {
            return res.status(400).json({ error: 'Question is required' });
        }

        console.log(`\n[AI Chat] Question: "${question}"`);

        const ai = getGenAI();

        // ---- Step 1: Embed the user's question ----
        const embeddingModel = ai.getGenerativeModel({ model: EMBEDDING_MODEL });
        const embedResult = await embeddingModel.embedContent(question);
        const questionVector = embedResult.embedding.values;
        console.log(`[AI Chat] Question embedded (${questionVector.length} dims)`);

        // ---- Step 2: Vector search in MongoDB ----
        const client = await getMongoClient();
        const collection = client.db(MONGODB_DB).collection(MONGODB_COLLECTION);

        const matches = await collection.aggregate([
            {
                $vectorSearch: {
                    index: 'vector_index',
                    path: 'embedding',
                    queryVector: questionVector,
                    numCandidates: 100,
                    limit: TOP_K
                }
            },
            {
                $project: {
                    _id: 0,
                    text: 1,
                    source_table: 1,
                    source_id: 1,
                    score: { $meta: 'vectorSearchScore' }
                }
            }
        ]).toArray();

        console.log(`[AI Chat] Found ${matches.length} relevant chunks`);

        if (matches.length === 0) {
            return res.json({
                answer: "I couldn't find any relevant information in the Agriculture Management System database for that question.",
                sources: []
            });
        }

        // ---- Step 3: Build the prompt with retrieved context ----
        const context = matches
            .map((m, i) => `[${i + 1}] (from ${m.source_table}) ${m.text}`)
            .join('\n\n');

        const prompt = `You are an AI assistant for the Agriculture Management System database website.
Answer the user's question using ONLY the information provided in the context below.
If the answer is not in the context, say so honestly — do not invent facts.
Keep the answer clear, friendly, and concise. Use the actual data values (numbers, names, dates) from the context.

Context from the database:
${context}

User's question: ${question}

Answer:`;

        // ---- Step 4: Ask Gemini to generate the answer ----
        const chatModel = ai.getGenerativeModel({ model: CHAT_MODEL });



 


        // ---- Retry logic: Gemini sometimes returns 503 / 429 ----
        let chatResult = null;
        let lastError = null;
        const MAX_RETRIES = 3;
        const RETRY_DELAY_MS = 2000;

        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                chatResult = await chatModel.generateContent(prompt);
                break; // success — exit the loop
            } catch (err) {
                lastError = err;
                const status = err.status || (err.response && err.response.status);
                const isTransient = status === 503 || status === 429 || !status;

                if (!isTransient || attempt === MAX_RETRIES) {
                    throw err; // non-transient or out of retries
                }

                console.log(`[AI Chat] Attempt ${attempt} failed (status ${status}). Retrying in ${RETRY_DELAY_MS}ms...`);
                await new Promise(r => setTimeout(r, RETRY_DELAY_MS));
            }
        }

        const answer = chatResult.response.text();






        console.log(`[AI Chat] Answer generated (${answer.length} chars)`);

        // ---- Step 5: Return to frontend ----
        res.json({
            answer: answer,
            sources: matches.map(m => ({
                table: m.source_table,
                id: m.source_id,
                snippet: m.text.length > 120 ? m.text.slice(0, 120) + '…' : m.text
            }))
        });

    } catch (error) {
        console.error('[AI Chat] Error:', error);
        res.status(500).json({
            error: 'Failed to generate answer',
            details: error.message
        });
    }
});


// ============================================================
// GET /api/ai/health
// Simple check to verify AI dependencies are configured.
// ============================================================
router.get('/api/ai/health', async (req, res) => {
    const status = {
        gemini_api_key: GEMINI_API_KEY ? 'set' : 'MISSING',
        mongodb_uri: MONGODB_URI ? 'set' : 'MISSING',
        mongodb_connected: false,
        chunk_count: 0
    };

    try {
        const client = await getMongoClient();
        const collection = client.db(MONGODB_DB).collection(MONGODB_COLLECTION);
        status.mongodb_connected = true;
        status.chunk_count = await collection.countDocuments();
    } catch (err) {
        status.mongodb_error = err.message;
    }

    res.json(status);
});


module.exports = router;