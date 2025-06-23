import React, { useState, useRef, useEffect } from 'react';
import '../styles/Chatbot.css';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  blogUrls?: BlogResult[];
}

interface BlogResult {
  title: string;
  url: string;
  summary: string;
}

interface BlogData {
  title?: string;
  summary?: string;
  content?: string;
  link?: string;
  url?: string;
  id?: string;
}

const API_BASE_URL = 'https://ppost-backend.vercel.app/api/thoggo';

// Simple markdown renderer function
const renderMarkdown = (text: string): string => {
  let html = text
    // Escape HTML first
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    
    // Headers (must be at start of line)
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    
    // Code blocks (before inline code)
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    
    // Bold and italic
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/__([^_]+)__/g, '<strong>$1</strong>')
    .replace(/_([^_]+)_/g, '<em>$1</em>')
    
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // Lists - handle each line separately
    .split('\n')
    .map(line => {
      if (line.match(/^[\*\-\+] /)) {
        return '<li>' + line.replace(/^[\*\-\+] /, '') + '</li>';
      }
      return line;
    })
    .join('\n')
    
    // Wrap consecutive list items in ul tags
    .replace(/(<li>.*<\/li>\n?)+/g, match => '<ul>' + match + '</ul>')
    
    // Handle line breaks and paragraphs
    .split('\n\n')
    .map(paragraph => {
      if (paragraph.trim() === '') return '';
      if (paragraph.match(/^<[hul]/)) return paragraph; // Don't wrap headers, lists, etc.
      return '<p>' + paragraph.replace(/\n/g, '<br>') + '</p>';
    })
    .join('')
    
    // Clean up
    .replace(/<p><\/p>/g, '')
    .replace(/\n+/g, '');

  return html;
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);

  // Load chatbot state and messages from localStorage on component mount
  useEffect(() => {
    // Load chatbot open state
    const savedIsOpen = localStorage.getItem('chatbot-isOpen');
    if (savedIsOpen !== null) {
      setIsOpen(JSON.parse(savedIsOpen));
    }

    // Load messages
    const savedMessages = localStorage.getItem('chatbot-messages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Error loading messages from localStorage:', error);
        // Set default welcome message if loading fails
        setDefaultMessage();
      }
    } else {
      // Set default welcome message for new users
      setDefaultMessage();
    }
  }, []);

  // Save chatbot open state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chatbot-isOpen', JSON.stringify(isOpen));
  }, [isOpen]);

  const setDefaultMessage = () => {
    const defaultMessage: Message = {
      id: 1,
      text: "🤖 Beep beep! I'm BlogBot, your AI assistant. I can search blogs, answer questions, and find related content. What can I help you with? 🚀",
      isUser: false,
      timestamp: new Date()
    };
    setMessages([defaultMessage]);
    saveMessagesToLocalStorage([defaultMessage]);
  };

  // Save messages to localStorage whenever messages change
  const saveMessagesToLocalStorage = (messagesToSave: Message[]) => {
    try {
      localStorage.setItem('chatbot-messages', JSON.stringify(messagesToSave));
    } catch (error) {
      console.error('Error saving messages to localStorage:', error);
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      saveMessagesToLocalStorage(messages);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Clear chat function
  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatbot-messages');
    setDefaultMessage();
  };

  // Toggle chatbot open/close state
  const toggleChatbot = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    console.log('Chatbot toggled:', newIsOpen ? 'opened' : 'closed'); // Debug log
  };

  // Function to get blog data from your site
  const getBlogData = async (): Promise<BlogData[]> => {
    try {
      // Fetch actual blog data from your Astro site
      const response = await fetch('/api/blogs.json');
      if (response.ok) {
        const blogs = await response.json();
        return blogs;
      }
      
      // Fallback with complete blog data from our site
      return [
        {
          title: "How the Web Works",
          summary: "Learn how the internet works from the ground up. Understand HTTP, browsers, servers, DNS, and the complete journey from typing a URL to seeing a webpage.",
          content: "Ever wondered what happens when you type a URL into your browser and hit Enter? In just milliseconds, your browser displays a complete webpage from a server thousands of miles away. This comprehensive guide covers the complete journey from typing a URL to seeing a webpage, including HTTP/HTTPS protocols, DNS resolution, web servers, client-server architecture, and internet infrastructure.",
          link: "/blog/how-the-web-works",
          url: "/blog/how-the-web-works",
          id: "how-the-web-works"
        },
        {
          title: "Frontend vs Backend",
          summary: "Learn the key differences between frontend and backend development. Discover technologies, career paths, salaries, and which path might be right for you.",
          content: "When starting your web development journey, one of the first decisions you'll face is choosing between frontend and backend development. Both are essential for creating web applications, but they require different skills, tools, and mindsets. This comprehensive guide covers what frontend and backend development are, key technologies, career paths, salary expectations, and how to choose your path.",
          link: "/blog/frontend-vs-backend",
          url: "/blog/frontend-vs-backend",
          id: "frontend-vs-backend"
        },
        {
          title: "Most Useful VS Code Extensions",
          summary: "Discover the 10 most essential VS Code extensions for web development in 2025. Complete guide with installation steps, features, and productivity tips.",
          content: "Visual Studio Code is already a powerful editor, but its true strength lies in its vast ecosystem of extensions. With over 45,000 extensions available, choosing the right ones can transform your coding experience and supercharge your productivity. This comprehensive guide covers the top 10 essential VS Code extensions, step-by-step installation instructions, detailed features and benefits, configuration tips and best practices, and productivity shortcuts.",
          link: "/blog/most-useful-vscode-extensions",
          url: "/blog/most-useful-vscode-extensions",
          id: "most-useful-vscode-extensions"
        },
        {
          title: "Responsive Web Design",
          summary: "Master responsive web design with CSS Grid, Flexbox, Tailwind CSS, media queries, and mobile-first approach. Complete guide with practical examples.",
          content: "Responsive Web Design (RWD) ensures your website looks and functions perfectly on all devices—from smartphones to desktop computers. With mobile traffic accounting for over 50% of web usage, responsive design isn't optional—it's essential. Learn CSS Grid, Flexbox, media queries, and modern responsive techniques with interactive examples.",
          link: "/blog/responsive-web-design",
          url: "/blog/responsive-web-design",
          id: "responsive-web-design"
        },
        {
          title: "JavaScript for Beginners",
          summary: "Learn JavaScript fundamentals with variables, functions, objects, DOM manipulation, and hands-on projects. Build dynamic, interactive websites.",
          content: "Ready to bring your websites to life? JavaScript is the programming language that makes web pages interactive, dynamic, and engaging. It handles user interactions, animations, data processing, and much more. This comprehensive guide covers JavaScript fundamentals including variables, functions, objects, arrays, DOM manipulation, events, and practical projects.",
          link: "/blog/javascript-for-beginners",
          url: "/blog/javascript-for-beginners",
          id: "javascript-for-beginners"
        },
        {
          title: "Git & GitHub for Beginners",
          summary: "Learn Git version control and GitHub collaboration with step-by-step tutorials, commands, and best practices for developers.",
          content: "Git is a distributed version control system that tracks changes in your code, while GitHub is a cloud-based platform for hosting Git repositories and collaborating with other developers. This comprehensive guide covers Git fundamentals, essential commands, branching strategies, merging, GitHub workflows, and collaboration best practices.",
          link: "/blog/git-github-for-beginners",
          url: "/blog/git-github-for-beginners",
          id: "git-github-for-beginners"
        },
        {
          title: "CSS for Beginners",
          summary: "Learn CSS fundamentals including selectors, properties, layouts, and styling techniques to create beautiful websites.",
          content: "CSS (Cascading Style Sheets) is the language used to style and layout web pages. It controls colors, fonts, spacing, positioning, and visual effects. This comprehensive guide covers CSS selectors, properties, box model, flexbox, grid, responsive design techniques, and modern CSS features.",
          link: "/blog/css-for-beginners",
          url: "/blog/css-for-beginners",
          id: "css-for-beginners"
        },
        {
          title: "HTML for Beginners",
          summary: "Learn HTML basics including elements, attributes, semantic markup, and structure to build web pages from scratch.",
          content: "HTML (HyperText Markup Language) is the foundation of web development. It provides the structure and content of web pages using elements and tags. This guide covers HTML fundamentals, semantic markup, forms, accessibility, and best practices for creating well-structured web pages.",
          link: "/blog/html-for-beginners",
          url: "/blog/html-for-beginners",
          id: "html-for-beginners"
        },
        {
          title: "Web Design Resources",
          summary: "Comprehensive collection of web design tools, resources, frameworks, and inspiration for modern web development.",
          content: "Discover essential web design resources including design tools like Figma and Adobe XD, CSS frameworks, icon libraries, color palettes, typography resources, stock photos, inspiration galleries, and everything you need to create stunning, modern websites and user interfaces.",
          link: "/blog/web-design-resources",
          url: "/blog/web-design-resources",
          id: "web-design-resources"
        },
        {
          title: "Markdown Style Guide",
          summary: "Complete Markdown syntax guide with examples for formatting text, creating lists, links, images, and more.",
          content: "Markdown is a lightweight markup language that allows you to format text using simple syntax. It's widely used for documentation, README files, and content creation. This comprehensive guide covers all Markdown syntax including headers, lists, links, images, code blocks, tables, and advanced formatting techniques.",
          link: "/blog/markdown-style-guide",
          url: "/blog/markdown-style-guide",
          id: "markdown-style-guide"
        }
      ];
    } catch (error) {
      console.error('Error fetching blog data:', error);
      // Return essential blog data as fallback
      return [
        {
          title: "JavaScript for Beginners",
          summary: "Learn JavaScript fundamentals with variables, functions, objects, DOM manipulation, and hands-on projects.",
          content: "Complete JavaScript tutorial covering fundamentals, DOM manipulation, and practical projects for beginners.",
          link: "/blog/javascript-for-beginners",
          url: "/blog/javascript-for-beginners",
          id: "javascript-for-beginners"
        },
        {
          title: "Responsive Web Design",
          summary: "Master responsive web design with CSS Grid, Flexbox, Tailwind CSS, media queries, and mobile-first approach.",
          content: "Comprehensive guide to responsive design with modern CSS techniques and practical examples.",
          link: "/blog/responsive-web-design",
          url: "/blog/responsive-web-design",
          id: "responsive-web-design"
        },
        {
          title: "Git & GitHub for Beginners",
          summary: "Learn Git version control and GitHub collaboration with step-by-step tutorials, commands, and best practices.",
          content: "Master Git and GitHub with practical tutorials, essential commands, and collaboration workflows.",
          link: "/blog/git-github-for-beginners",
          url: "/blog/git-github-for-beginners",
          id: "git-github-for-beginners"
        },
        {
          title: "CSS for Beginners",
          summary: "Learn CSS fundamentals including selectors, properties, layouts, and styling techniques to create beautiful websites.",
          content: "CSS fundamentals covering selectors, properties, flexbox, grid, and responsive design techniques.",
          link: "/blog/css-for-beginners",
          url: "/blog/css-for-beginners",
          id: "css-for-beginners"
        },
        {
          title: "HTML for Beginners",
          summary: "Learn HTML basics including elements, attributes, semantic markup, and structure to build web pages from scratch.",
          content: "HTML fundamentals covering elements, attributes, semantic markup, and web page structure.",
          link: "/blog/html-for-beginners",
          url: "/blog/html-for-beginners",
          id: "html-for-beginners"
        },
        {
          title: "Web Design Resources",
          summary: "Comprehensive collection of web design tools, resources, frameworks, and inspiration for modern web development.",
          content: "Essential web design resources including tools, frameworks, inspiration, and modern development resources.",
          link: "/blog/web-design-resources",
          url: "/blog/web-design-resources",
          id: "web-design-resources"
        }
      ];
    }
  };

  // API call functions
  const searchBlogs = async (query: string): Promise<BlogResult[]> => {
    try {
      // Get actual blog data
      const blogs: BlogData[] = await getBlogData();
      console.log('Blog data for search:', blogs); // Debug log
      
      const response = await fetch(`${API_BASE_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query,
          blogs 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Search request failed');
      }
      
      const data = await response.json();
      console.log('Search API response:', data); // Debug log
      
      if (data.success && data.data.results) {
        const results = data.data.results.map((blog: any) => ({
          title: blog.title || 'Untitled',
          url: blog.link || blog.url || '#',
          summary: blog.summary || blog.reason || 'No summary available'
        }));
        console.log('Mapped search results:', results); // Debug log
        return results;
      }
      
      return [];
    } catch (error) {
      console.error('Error searching blogs:', error);
      return [];
    }
  };

  const summarizeBlog = async (blogContent: string, title?: string): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/summarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          blogContent,
          title 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Summarize request failed');
      }
      
      const data = await response.json();
      
      if (data.success && data.data.summary) {
        return data.data.summary;
      }
      
      return 'Summary not available';
    } catch (error) {
      console.error('Error summarizing blog:', error);
      return 'Summary not available';
    }
  };

  const getRelatedContent = async (topic: string): Promise<BlogResult[]> => {
    try {
      // Get actual blog data
      const allBlogs: BlogData[] = await getBlogData();
      const blogContent = `Content related to ${topic}`;
      console.log('Blog data for related content:', allBlogs); // Debug log
      
      const response = await fetch(`${API_BASE_URL}/related`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          blogContent,
          title: `Related to ${topic}`,
          allBlogs
        }),
      });
      
      if (!response.ok) {
        throw new Error('Related content request failed');
      }
      
      const data = await response.json();
      console.log('Related content API response:', data); // Debug log
      
      if (data.success && data.data.relatedBlogs) {
        const results = data.data.relatedBlogs.map((blog: any) => ({
          title: blog.title || 'Untitled',
          url: blog.link || blog.url || '#',
          summary: blog.summary || 'No summary available'
        }));
        console.log('Mapped related results:', results); // Debug log
        return results;
      }
      
      return [];
    } catch (error) {
      console.error('Error getting related content:', error);
      return [];
    }
  };

  // AI Chat function for general queries using summarize endpoint
  const getAIResponse = async (userInput: string): Promise<{ response: string; suggestedBlogs: BlogResult[] }> => {
    try {
      // Get blog data to find relevant posts
      const allBlogs: BlogData[] = await getBlogData();
      
      // Find relevant blogs based on user input
      const query = userInput.toLowerCase();
      const suggestedBlogs: BlogResult[] = [];
      
      // Check for relevant blog topics
      allBlogs.forEach(blog => {
        const blogTitle = blog.title?.toLowerCase() || '';
        const blogSummary = blog.summary?.toLowerCase() || '';
        
        if (blogTitle.includes(query) || blogSummary.includes(query) || 
            query.includes(blogTitle.split(' ')[0]) || 
            (query.includes('html') && blogTitle.includes('html')) ||
            (query.includes('css') && blogTitle.includes('css')) ||
            (query.includes('javascript') && blogTitle.includes('javascript')) ||
            (query.includes('git') && blogTitle.includes('git')) ||
            (query.includes('responsive') && blogTitle.includes('responsive')) ||
            (query.includes('web design') && blogTitle.includes('web design')) ||
            (query.includes('markdown') && blogTitle.includes('markdown'))) {
          
          suggestedBlogs.push({
            title: blog.title || 'Untitled',
            url: blog.link || blog.url || '#',
            summary: blog.summary || 'No summary available'
          });
        }
      });

      // Create a better contextual prompt
      const contextualContent = `User is asking: "${userInput}"

Please provide a helpful, direct answer as BlogBot, a friendly AI blog assistant robot. 

Instructions:
- Answer the user's question directly and helpfully in a natural, conversational way
- Use friendly, human-like language that feels warm and approachable
- Be encouraging and supportive
- If they're asking about programming topics (HTML, CSS, JavaScript, Git, etc.), provide practical advice
- Keep it conversational and friendly
- Don't describe what you're doing, just provide the helpful response

Provide a direct, helpful response to their question:`;

      const response = await fetch(`${API_BASE_URL}/summarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          blogContent: contextualContent,
          title: `Direct Answer to: ${userInput}`
        }),
      });
      
      if (!response.ok) {
        throw new Error('AI chat request failed');
      }
      
      const data = await response.json();
      
      if (data.success && data.data.summary) {
        return {
          response: data.data.summary,
          suggestedBlogs: suggestedBlogs.slice(0, 3) // Limit to 3 suggestions
        };
      }
      
      return {
        response: "🤖 Beep beep! I'm here to help! You can ask me to search for blog posts, find related content, or ask questions about programming and technology. My circuits are ready to assist! ⚡",
        suggestedBlogs
      };
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Fallback to a helpful message if AI fails
      return {
        response: "🤖 *Robot processing error* Beep! My circuits encountered a glitch, but I'm still here to help you explore blog content! Try asking me to search for specific topics like 'JavaScript', 'React', 'Python', or any programming concept you're interested in. 🔧",
        suggestedBlogs: []
      };
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Check if user is searching for content
      const query = userMessage.text.toLowerCase();
      let botResponse: Message;

      if (query.includes('search') || query.includes('find') || query.includes('look for')) {
        // Extract search terms (remove common words)
        const searchTerms = userMessage.text
          .replace(/search|find|look for|can you|please|help me|about/gi, '')
          .trim();

        if (searchTerms) {
          const blogResults = await searchBlogs(searchTerms);
          
          if (blogResults.length > 0) {
            botResponse = {
              id: Date.now() + 1,
              text: `🤖 *Scanning database* Beep beep! I found ${blogResults.length} blog post${blogResults.length > 1 ? 's' : ''} related to "${searchTerms}". My circuits have compiled the best results for you:`,
              isUser: false,
              timestamp: new Date(),
              blogUrls: blogResults
            };
          } else {
            botResponse = {
              id: Date.now() + 1,
              text: `🤖 *Search complete* Hmm, my sensors couldn't detect any blog posts related to "${searchTerms}". Try different keywords and I'll scan again! My database is always ready to help! 🔍`,
              isUser: false,
              timestamp: new Date()
            };
          }
        } else {
          botResponse = {
            id: Date.now() + 1,
            text: "🤖 Beep beep! What would you like me to search for? Please provide some keywords or topics and I'll scan my blog database for you! 📡",
            isUser: false,
            timestamp: new Date()
          };
        }
      } else if (query.includes('related') || query.includes('similar')) {
        const topic = userMessage.text
          .replace(/related|similar|content|posts|about/gi, '')
          .trim();

        if (topic) {
          const relatedResults = await getRelatedContent(topic);
          
          if (relatedResults.length > 0) {
            botResponse = {
              id: Date.now() + 1,
              text: `🤖 *Computing related content* Processing complete! Here are some related posts about "${topic}" that my AI circuits recommend:`,
              isUser: false,
              timestamp: new Date(),
              blogUrls: relatedResults
            };
          } else {
            botResponse = {
              id: Date.now() + 1,
              text: `🤖 *Analysis complete* My algorithms couldn't find related content for "${topic}". Try asking about different topics and I'll recalibrate my search! 🔧`,
              isUser: false,
              timestamp: new Date()
            };
          }
        } else {
          botResponse = {
            id: Date.now() + 1,
            text: "🤖 Beep! What topic would you like me to find related content for? My neural networks are ready to process your request! 🧠",
            isUser: false,
            timestamp: new Date()
          };
        }
      } else {
        // Use AI for general queries instead of mock responses
        const aiResponse = await getAIResponse(userMessage.text);
        botResponse = {
          id: Date.now() + 1,
          text: aiResponse.response,
          isUser: false,
          timestamp: new Date(),
          blogUrls: aiResponse.suggestedBlogs.length > 0 ? aiResponse.suggestedBlogs : undefined
        };
      }

      setTimeout(() => {
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000);

    } catch (error) {
      console.error('Error handling message:', error);
      const errorResponse: Message = {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error while processing your request. Please try again!",
        isUser: false,
        timestamp: new Date()
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, errorResponse]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBlogClick = (url: string) => {
    console.log('Opening blog URL:', url); // Debug log
    window.open(url, '_self', 'noopener,noreferrer');
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Message copied to clipboard');
      setCopiedMessageId(id);
      setTimeout(() => {
        setCopiedMessageId(null);
      }, 2000);
    }).catch(err => {
      console.error('Error copying to clipboard:', err);
    });
  };

  return (
    <div className="chatbot-container">
      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="10" rx="2" ry="2"></rect>
                <circle cx="12" cy="5" r="2"></circle>
                <path d="M12 7v4"></path>
                <line x1="8" y1="16" x2="8" y2="16"></line>
                <line x1="16" y1="16" x2="16" y2="16"></line>
              </svg>
            </div>
            <div>
              <h3>BlogBot</h3>  
              <span className="status">Online</span>
            </div>
          </div>
          <button 
            className="close-button"
            onClick={clearChat}
            aria-label="Clear chat"
            title="Clear chat history"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"></polyline>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
            </svg>
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.isUser ? 'user' : 'bot'}`}>
              <div className="message-content">
                
                <div className="message-bubble">
                {!message.isUser && (
                  <div className="message-avatar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="10" rx="2" ry="2"></rect>
                      <circle cx="12" cy="5" r="2"></circle>
                      <path d="M12 7v4"></path>
                      <line x1="8" y1="16" x2="8" y2="16"></line>
                      <line x1="16" y1="16" x2="16" y2="16"></line>
                    </svg>
                    <span className="message-avatar-text">BlogBot</span>
                  </div>
                )}
                  <div 
                    style={{ whiteSpace: 'pre-line' }}
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(message.text) }}
                  />
                  {message.blogUrls && message.blogUrls.length > 0 && (
                    <div className="blog-results">
                      {message.blogUrls.map((blog, index) => {
                        console.log(`Rendering blog ${index}:`, blog); // Debug log
                        return (
                          <div key={index} className="blog-result-card">
                            <h4>{blog.title}</h4>
                            <p className="blog-summary">{blog.summary}</p>
                            <button 
                              className="blog-url-button"
                              onClick={() => handleBlogClick(blog.url)}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15,3 21,3 21,9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                              </svg>
                              Read Article
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                
                {/* Message Time and Copy Button - moved outside bubble */}
                <div className="message-footer">
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <button 
                    className="copy-button"
                    onClick={() => copyToClipboard(message.text, message.id)}
                    title={copiedMessageId === message.id ? "Copied!" : "Copy message"}
                    aria-label="Copy message to clipboard"
                  >
                    {copiedMessageId === message.id ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20,6 9,17 4,12"></polyline>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot">
              <div className="message-content">
                <div className="message-avatar">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="10" rx="2" ry="2"></rect>
                    <circle cx="12" cy="5" r="2"></circle>
                    <path d="M12 7v4"></path>
                    <line x1="8" y1="16" x2="8" y2="16"></line>
                    <line x1="16" y1="16" x2="16" y2="16"></line>
                  </svg>
                </div>
                <div className="message-bubble typing">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input">
          <div className="input-container">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for blog topics, ask questions..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isTyping}
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="send-button"
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Toggle Button */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleChatbot}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>
    </div>
  );
};

export default Chatbot; 