// ============================================================
// frontend/js/aiChat.js
// AI Chat Board — floating button + overlay panel.
// Sends questions to /api/ai/chat, displays the RAG answer.
// ============================================================

// ---------- State ----------
let chatHistory = [];


// ---------- Open / close the chat panel ----------
function openAiChat() {
    const panel = document.getElementById('ai-chat-panel');
    const fab = document.getElementById('ai-chat-fab');

    if (!panel) return;

    panel.classList.add('open');
    if (fab) fab.classList.add('hidden');

    // Focus the input for immediate typing
    setTimeout(() => {
        const input = document.getElementById('ai-chat-input');
        if (input) input.focus();
    }, 200);
}

function closeAiChat() {
    const panel = document.getElementById('ai-chat-panel');
    const fab = document.getElementById('ai-chat-fab');

    if (!panel) return;

    panel.classList.remove('open');
    if (fab) fab.classList.remove('hidden');
}


// ---------- Send a question to the backend ----------
async function sendChatMessage() {
    const input = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-chat-send');
    const messages = document.getElementById('ai-chat-messages');

    if (!input || !messages) return;

    const question = input.value.trim();
    if (!question) return;

    // ---- Append user's message ----
    appendChatMessage('user', question);
    input.value = '';

    // ---- Disable input while waiting ----
    if (sendBtn) sendBtn.disabled = true;
    input.disabled = true;

    // ---- Show loading indicator ----
    const loadingId = appendChatLoading();

    try {
        const response = await fetch('/api/ai/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: question })
        });

        const data = await response.json();

        // ---- Remove loading indicator ----
        removeChatLoading(loadingId);

        if (!response.ok) {
            appendChatMessage(
                'error',
                'Error: ' + (data.error || data.details || 'Failed to get an answer')
            );
            return;
        }

        // ---- Append the AI answer ----
        appendChatMessage('ai', data.answer);

        // ---- Optionally show sources ----------
        if (data.sources && data.sources.length > 0) {
            appendChatSources(data.sources);
        }

    } catch (error) {
        removeChatLoading(loadingId);
        appendChatMessage('error', 'Network error: ' + error.message);
    } finally {
        if (sendBtn) sendBtn.disabled = false;
        input.disabled = false;
        input.focus();
    }
}


// ---------- Append a chat bubble ----------
function appendChatMessage(role, text) {
    const messages = document.getElementById('ai-chat-messages');
    if (!messages) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'ai-chat-bubble ai-chat-bubble-' + role;

    if (role === 'user') {
        wrapper.innerHTML = `
            <div class="ai-chat-bubble-label">You</div>
            <div class="ai-chat-bubble-text"></div>
        `;
    } else if (role === 'ai') {
        wrapper.innerHTML = `
            <div class="ai-chat-bubble-label">🌾 Data Assistant</div>
            <div class="ai-chat-bubble-text"></div>
        `;
    } else {
        wrapper.innerHTML = `
            <div class="ai-chat-bubble-label">Error</div>
            <div class="ai-chat-bubble-text"></div>
        `;
    }

    // Use textContent to safely insert text (no HTML injection)
    const textEl = wrapper.querySelector('.ai-chat-bubble-text');
    textEl.textContent = text;

    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
}


// ---------- Loading bubble ----------
let loadingCounter = 0;

function appendChatLoading() {
    const messages = document.getElementById('ai-chat-messages');
    if (!messages) return null;

    loadingCounter++;
    const id = 'ai-chat-loading-' + loadingCounter;

    const wrapper = document.createElement('div');
    wrapper.id = id;
    wrapper.className = 'ai-chat-bubble ai-chat-bubble-ai ai-chat-bubble-loading';
    wrapper.innerHTML = `
        <div class="ai-chat-bubble-label">🌾 Data Assistant</div>
        <div class="ai-chat-bubble-text">Thinking<span class="ai-chat-dots">...</span></div>
    `;

    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;

    return id;
}

function removeChatLoading(id) {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.remove();
}


// ---------- Optional: show sources at the bottom of an answer ----------
function appendChatSources(sources) {
    const messages = document.getElementById('ai-chat-messages');
    if (!messages) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'ai-chat-bubble ai-chat-bubble-sources';

    let html = '<div class="ai-chat-bubble-label">Sources used</div><div class="ai-chat-bubble-text">';
    sources.forEach(s => {
        html += `<div class="ai-chat-source-line">📄 <strong>${s.table}</strong> #${s.id}: ${s.snippet}</div>`;
    });
    html += '</div>';

    wrapper.innerHTML = html;
    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
}


// ---------- Handle Enter key (Shift+Enter = new line) ----------
function handleChatKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendChatMessage();
    }
}


// ---------- Welcome message on first load ----------
function initAiChat() {
    const messages = document.getElementById('ai-chat-messages');
    if (!messages || messages.dataset.initialized === '1') return;

    messages.dataset.initialized = '1';

   

    appendChatMessage(
        'ai',
        'Hi! I am your Data Assistant for the Agriculture Management System. ' +
        'Ask me anything about the farmers, crops, land, harvests, sales, ' +
        'equipment, fertilizers, or profit records. For example:\n\n' +
        '• How many farmers do we have?\n' +
        '• Which farmer has the highest net profit?\n' +
        '• List the equipment available for rent.\n' +
        '• What crops are currently planted?'
    );



}