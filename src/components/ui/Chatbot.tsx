'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Chatbot.module.css';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: "Hi there! 👋 I'm Awais's personal AI assistant. Looking to build an AI agent, automate workflows, or develop a custom web app? Ask me anything about Awais's skills, experience, or pricing!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    
    // Add user message to UI
    const newMessages: Message[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Send the last 6 messages for context
          messages: newMessages.slice(-6).map(m => ({
            role: m.role === 'ai' ? 'assistant' : 'user',
            content: m.content
          }))
        })
      });

      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: "I'm having a little trouble connecting right now. Please reach out to Awais directly on WhatsApp at +923472725754!" 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      {/* Toggle Button */}
      {!isOpen && (
        <button 
          className={styles.chatToggleBtn} 
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <span className={styles.notificationBadge}></span>
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.chatTitle}>
              <div className={styles.avatar}>🤖</div>
              <div className={styles.statusInfo}>
                <h3>Awais AI</h3>
                <span className={styles.status}>
                  <span className={styles.statusDot}></span>
                  Online
                </span>
              </div>
            </div>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
              ✖
            </button>
          </div>

          {/* Messages Area */}
          <div className={styles.messagesArea}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`${styles.messageWrapper} ${styles[msg.role]}`}>
                <div className={styles.message}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className={`${styles.messageWrapper} ${styles.ai}`}>
                <div className={`${styles.message} ${styles.typingIndicator}`}>
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={styles.inputArea}>
            <input
              type="text"
              className={styles.input}
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              className={styles.sendBtn} 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
