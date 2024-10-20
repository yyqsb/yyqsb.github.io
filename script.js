// 轮播图功能
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');

function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

setInterval(() => showSlide(currentSlide + 1), 5000); // 每5秒切换一次

// AI聊天功能
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// 请替换为您的 OpenAI API 密钥
const OPENAI_API_KEY = 'sess-U8R7FStmmjIFVg7T8b6suUAQjI8lY0FzPJCC89vY';

async function sendMessageToAI(message) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: message}],
            temperature: 0.7
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

function addMessage(message, isUser = false) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add(isUser ? 'user-message' : 'ai-message');
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendButton.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = '';
        
        try {
            const response = await sendMessageToAI(message);
            addMessage(response);
        } catch (error) {
            console.error('Error:', error);
            addMessage('抱歉，发生了错误。请稍后再试。');
        }
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});
