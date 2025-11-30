
export class ChatWidget {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.conversationId = localStorage.getItem('heras_conversation_id');
    this.apiUrl = 'http://localhost:8000'; // Adjust if needed
    
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
    if (this.conversationId) {
      this.loadConversation();
    }
  }

  render() {
    // Create container
    this.container = document.createElement('div');
    this.container.id = 'heras-chat-widget';
    document.body.appendChild(this.container);

    // Create Toggle Button
    this.button = document.createElement('button');
    this.button.id = 'heras-chat-toggle';
    this.button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    `;
    this.container.appendChild(this.button);

    // Create Chat Window
    this.window = document.createElement('div');
    this.window.id = 'heras-chat-window';
    this.window.classList.add('hidden');
    this.window.innerHTML = `
      <div class="chat-header">
        <h3>Heras AI</h3>
        <button id="heras-chat-close" aria-label="Close chat">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="chat-messages" id="heras-chat-messages">
        <div class="message bot">
          <div class="message-content">
            Hola, soy la IA de Heras. ¿En qué puedo ayudarte hoy?
          </div>
        </div>
      </div>
      <div class="chat-input-area">
        <input type="text" id="heras-chat-input" placeholder="Escribe tu mensaje..." autocomplete="off">
        <button id="heras-chat-send" aria-label="Send message">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    `;
    this.container.appendChild(this.window);

    this.messagesContainer = this.window.querySelector('#heras-chat-messages');
    this.input = this.window.querySelector('#heras-chat-input');
    this.sendButton = this.window.querySelector('#heras-chat-send');
    this.closeButton = this.window.querySelector('#heras-chat-close');
  }

  attachEventListeners() {
    this.button.addEventListener('click', () => this.toggleChat());
    this.closeButton.addEventListener('click', () => this.toggleChat());
    
    this.sendButton.addEventListener('click', () => this.sendMessage());
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.window.classList.remove('hidden');
      this.button.classList.add('hidden');
      this.scrollToBottom();
      this.input.focus();
    } else {
      this.window.classList.add('hidden');
      this.button.classList.remove('hidden');
    }
  }

  appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    this.messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.id = 'heras-typing-indicator';
    indicator.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    this.messagesContainer.appendChild(indicator);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    const indicator = this.messagesContainer.querySelector('#heras-typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  async sendMessage() {
    const text = this.input.value.trim();
    if (!text) return;

    // Clear input
    this.input.value = '';

    // Add user message
    this.appendMessage('user', text);

    // Show typing indicator
    this.showTypingIndicator();

    try {
      const payload = {
        query: text,
        source: 'web',
        conversation_id: this.conversationId ? parseInt(this.conversationId) : null
      };

      const response = await fetch(`${this.apiUrl}/rag/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      
      // Save conversation ID if new
      if (data.conversation_id) {
        this.conversationId = data.conversation_id;
        localStorage.setItem('heras_conversation_id', this.conversationId);
      }

      // Hide typing indicator before showing response
      this.hideTypingIndicator();

      // Add bot message
      this.appendMessage('bot', data.answer);

    } catch (error) {
      console.error('Error sending message:', error);
      this.hideTypingIndicator();
      this.appendMessage('bot', 'Lo siento, hubo un error al conectar con el servidor.');
    }
  }

  async loadConversation() {
    try {
      const response = await fetch(`${this.apiUrl}/conversations/${this.conversationId}`);
      if (!response.ok) {
        // If not found (e.g. db reset), clear local storage
        if (response.status === 404) {
          localStorage.removeItem('heras_conversation_id');
          this.conversationId = null;
        }
        return;
      }

      const data = await response.json();
      
      // Clear default welcome message if we have history
      if (data.messages && data.messages.length > 0) {
        this.messagesContainer.innerHTML = '';
        data.messages.forEach(msg => {
          this.appendMessage(msg.sender, msg.content);
        });
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  }
}
