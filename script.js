// 轮播图功能
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');

function showSlide(n) {
    if (slides.length > 0) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}

if (slides.length > 0) {
    setInterval(() => showSlide(currentSlide + 1), 5000); // 每5秒切换一次
}

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

document.addEventListener('DOMContentLoaded', () => {
    const articleList = document.getElementById('article-list');

    console.log('开始加载文章...');
    fetch('1.md')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(markdown => {
            const article = parseArticle(markdown);
            displayArticle(article);
        })
        .catch(error => {
            console.error('加载文章失败:', error);
            const errorElement = document.createElement('p');
            errorElement.textContent = `加载文章失败: ${error.message}`;
            articleList.appendChild(errorElement);
        });

    function parseArticle(markdown) {
        const lines = markdown.split('\n');
        const title = lines[0].replace(/^#\s+/, '');
        const content = lines.slice(1).join('\n');
        return { title, content };
    }

    function displayArticle(article) {
        const articleElement = document.createElement('article');
        const previewContent = article.content.length > 200 ? article.content.substring(0, 200) + '...' : article.content;
        articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <p class="article-preview">${marked.parse(previewContent)}</p>
            <p class="full-content" style="display: none;">${marked.parse(article.content)}</p>
            <a href="#" class="read-more">阅读更多</a>
        `;
        articleList.appendChild(articleElement);
        console.log('文章已添加:', article.title);

        const readMoreLink = articleElement.querySelector('.read-more');
        const preview = articleElement.querySelector('.article-preview');
        const fullContent = articleElement.querySelector('.full-content');

        readMoreLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (preview.style.display !== 'none') {
                preview.style.display = 'none';
                fullContent.style.display = 'block';
                readMoreLink.textContent = '收起';
            } else {
                preview.style.display = 'block';
                fullContent.style.display = 'none';
                readMoreLink.textContent = '阅读更多';
            }
        });
    }
});
