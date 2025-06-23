import React, { useState, useRef, useEffect } from 'react';
import '../styles/Chatbot.css';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  blogUrls?: BlogResult[];
  themeConfirmation?: ThemeConfirmation;
  colorPalettes?: ColorPalette[];
  copyable?: boolean;
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

interface ThemeConfirmation {
  themeName: string;
  colors: ColorPalette;
  messageId: number;
}

interface ColorPalette {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  description: string;
}

// Predefined color palettes - expanded with more AI-generated themes
const COLOR_PALETTES: ColorPalette[] = [
  {
    name: "Default Theme",
    primary: "#6633cc",
    secondary: "#8855ee", 
    accent: "#6633cc",
    background: "#ffffff",
    text: "#223139",
    description: "Original site colors with purple accent"
  },
  {
    name: "Dark Mode",
    primary: "#374151",
    secondary: "#4b5563",
    accent: "#8b5cf6",
    background: "#1f2937",
    text: "#f9fafb",
    description: "Dark theme perfect for night coding"
  },
  {
    name: "Ocean Blue",
    primary: "#0891b2",
    secondary: "#06b6d4",
    accent: "#0e7490",
    background: "#f0f9ff",
    text: "#1f2937",
    description: "Deep ocean blue palette"
  },
  {
    name: "Forest Green",
    primary: "#059669",
    secondary: "#10b981",
    accent: "#047857",
    background: "#f0fdf4",
    text: "#1f2937",
    description: "Nature-inspired green palette"
  },
  {
    name: "Sunset Orange",
    primary: "#ea580c",
    secondary: "#fb923c",
    accent: "#c2410c",
    background: "#fff7ed",
    text: "#1f2937",
    description: "Warm orange theme like sunset"
  },
  {
    name: "Rose Gold",
    primary: "#e11d48",
    secondary: "#f43f5e",
    accent: "#be123c",
    background: "#fff1f2",
    text: "#1f2937",
    description: "Elegant rose gold theme"
  },
  {
    name: "Midnight Purple",
    primary: "#7c3aed",
    secondary: "#8b5cf6",
    accent: "#6d28d9",
    background: "#1e1b4b",
    text: "#e0e7ff",
    description: "Deep purple night theme"
  },
  {
    name: "Arctic Ice",
    primary: "#0ea5e9",
    secondary: "#38bdf8",
    accent: "#0284c7",
    background: "#f0f9ff",
    text: "#0c4a6e",
    description: "Cool arctic ice theme"
  },
  {
    name: "Golden Hour",
    primary: "#f59e0b",
    secondary: "#fbbf24",
    accent: "#d97706",
    background: "#fffbeb",
    text: "#1f2937",
    description: "Warm golden hour vibes"
  },
  {
    name: "Emerald Dream",
    primary: "#10b981",
    secondary: "#34d399",
    accent: "#059669",
    background: "#ecfdf5",
    text: "#064e3b",
    description: "Rich emerald green theme"
  },
  {
    name: "Cyberpunk",
    primary: "#ec4899",
    secondary: "#f472b6",
    accent: "#db2777",
    background: "#0f0f23",
    text: "#00ff88",
    description: "Futuristic cyberpunk theme"
  },
  {
    name: "Coral Reef",
    primary: "#f97316",
    secondary: "#fb923c",
    accent: "#ea580c",
    background: "#fff7ed",
    text: "#1f2937",
    description: "Vibrant coral reef colors"
  },
  {
    name: "Lavender Fields",
    primary: "#8b5cf6",
    secondary: "#a78bfa",
    accent: "#7c3aed",
    background: "#faf5ff",
    text: "#581c87",
    description: "Soft lavender field theme"
  },
  {
    name: "Cherry Blossom",
    primary: "#f472b6",
    secondary: "#f9a8d4",
    accent: "#ec4899",
    background: "#fdf2f8",
    text: "#831843",
    description: "Delicate cherry blossom pink"
  },
  {
    name: "Neon Nights",
    primary: "#06b6d4",
    secondary: "#22d3ee",
    accent: "#0891b2",
    background: "#0c1222",
    text: "#00ffff",
    description: "Electric neon night theme"
  },
  {
    name: "Autumn Leaves",
    primary: "#dc2626",
    secondary: "#ef4444",
    accent: "#b91c1c",
    background: "#fef2f2",
    text: "#7f1d1d",
    description: "Warm autumn leaf colors"
  },
  {
    name: "Mint Fresh",
    primary: "#14b8a6",
    secondary: "#2dd4bf",
    accent: "#0d9488",
    background: "#f0fdfa",
    text: "#134e4a",
    description: "Fresh mint green theme"
  },
  {
    name: "Royal Blue",
    primary: "#1d4ed8",
    secondary: "#3b82f6",
    accent: "#1e40af",
    background: "#eff6ff",
    text: "#1e3a8a",
    description: "Classic royal blue elegance"
  },
  {
    name: "Coffee Bean",
    primary: "#92400e",
    secondary: "#b45309",
    accent: "#78350f",
    background: "#fefce8",
    text: "#451a03",
    description: "Rich coffee bean brown"
  },
  {
    name: "Galaxy Purple",
    primary: "#6366f1",
    secondary: "#818cf8",
    accent: "#4f46e5",
    background: "#0f0f1a",
    text: "#c7d2fe",
    description: "Deep space galaxy theme"
  },
  {
    name: "Crimson Fire",
    primary: "#dc2626",
    secondary: "#ef4444",
    accent: "#b91c1c",
    background: "#fef2f2",
    text: "#7f1d1d",
    description: "Bold crimson red theme"
  }
];

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
  const [currentTheme, setCurrentTheme] = useState<ColorPalette>(COLOR_PALETTES[0]);
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Theme management functions (moved up to fix hoisting issue)
  const applyTheme = (palette: ColorPalette) => {
    const root = document.documentElement;
    
    // Convert hex to RGB for CSS variables
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const primaryRgb = hexToRgb(palette.primary);
    const secondaryRgb = hexToRgb(palette.secondary);
    const accentRgb = hexToRgb(palette.accent);
    const backgroundRgb = hexToRgb(palette.background);
    const textRgb = hexToRgb(palette.text);

    if (primaryRgb && secondaryRgb && accentRgb && backgroundRgb && textRgb) {
      // Apply CSS custom properties with proper RGB values
      root.style.setProperty('--accent', palette.accent);
      root.style.setProperty('--accent-light', palette.secondary);
      
      // Determine if this is a dark theme
      const isDarkTheme = palette.name.toLowerCase().includes('dark') || 
                         palette.name.toLowerCase().includes('night') || 
                         palette.name.toLowerCase().includes('midnight') ||
                         palette.name.toLowerCase().includes('galaxy') ||
                         palette.name.toLowerCase().includes('neon') ||
                         palette.name.toLowerCase().includes('cyberpunk') ||
                         backgroundRgb.r + backgroundRgb.g + backgroundRgb.b < 300; // Dark background detection
      
      // Add theme class to body for CSS targeting
      document.body.classList.remove('theme-dark', 'theme-light');
      document.body.classList.add(isDarkTheme ? 'theme-dark' : 'theme-light');
      document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
      
      // For dark mode, we need to handle colors differently
      if (isDarkTheme) {
        root.style.setProperty('--gray-dark', `${textRgb.r}, ${textRgb.g}, ${textRgb.b}`);
        root.style.setProperty('--gray', `156, 163, 175`); // Medium gray for dark mode
        root.style.setProperty('--gray-light', `55, 65, 81`); // Dark gray for backgrounds
        root.style.setProperty('--black', `${textRgb.r}, ${textRgb.g}, ${textRgb.b}`);
      } else {
        // Light mode colors
        root.style.setProperty('--gray-dark', `${textRgb.r}, ${textRgb.g}, ${textRgb.b}`);
        root.style.setProperty('--gray', `107, 114, 128`);
        root.style.setProperty('--gray-light', `243, 244, 246`);
        root.style.setProperty('--black', `0, 0, 0`);
      }
      
      // Set body background and text color
      document.body.style.backgroundColor = palette.background;
      document.body.style.color = palette.text;
      
      // Apply theme to all major elements
      const elementsToStyle = [
        'main', 'header', 'nav', 'section', 'article', 'aside', 'footer',
        '.container', '.content', '.post', '.blog-post'
      ];
      
      elementsToStyle.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          if (element instanceof HTMLElement) {
            element.style.backgroundColor = palette.background;
            element.style.color = palette.text;
          }
        });
      });
      
      // Apply to headings
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(heading => {
        if (heading instanceof HTMLElement) {
          heading.style.color = palette.text;
        }
      });
      
      // Apply to paragraphs
      const paragraphs = document.querySelectorAll('p');
      paragraphs.forEach(p => {
        if (p instanceof HTMLElement) {
          p.style.color = palette.text;
        }
      });
      
      // Apply to links
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        if (link instanceof HTMLElement) {
          link.style.color = palette.accent;
        }
      });
      
      // Apply theme data attribute to input for styling
      const chatbotInput = document.querySelector('.chatbot-input input') as HTMLInputElement;
      if (chatbotInput) {
        chatbotInput.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
      }
      
      setCurrentTheme(palette);
      localStorage.setItem('chatbot-theme', JSON.stringify(palette));
      
      console.log('Theme applied:', palette.name);
      console.log('Is dark theme:', isDarkTheme);
      console.log('Colors applied:', {
        background: palette.background,
        text: palette.text,
        accent: palette.accent,
        primary: palette.primary,
        secondary: palette.secondary
      });
    }
  };

  const loadTheme = () => {
    try {
      const savedTheme = localStorage.getItem('chatbot-theme');
      if (savedTheme) {
        const theme = JSON.parse(savedTheme);
        applyTheme(theme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  // Load chatbot state and messages from localStorage on component mount
  useEffect(() => {
    // Load chatbot open state
    const savedIsOpen = localStorage.getItem('chatbot-isOpen');
    if (savedIsOpen !== null) {
      setIsOpen(JSON.parse(savedIsOpen));
    }

    // Load theme
    loadTheme();

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
      text: "🤖 **Hi! I'm BlogBot** - Your AI assistant for:\n\n📝 **Blog Search** - Find articles\n🎨 **20+ Themes** - Beautiful color palettes & custom themes\n💬 **Questions** - Ask me anything!\n\n**Try:** \"Show color palettes\", \"Generate sunset theme\", \"Search JavaScript\"",
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
      
      // Fallback with real blog data if API is not available
      return [
        {
          title: "JavaScript for Beginners",
          summary: "Learn JavaScript fundamentals with variables, functions, objects, DOM manipulation, and hands-on projects. Build dynamic, interactive websites.",
          content: "Ready to bring your websites to life? JavaScript is the programming language that makes web pages interactive, dynamic, and engaging. It handles user interactions, animations, data processing, and much more.",
          link: "/blog/javascript-for-beginners",
          url: "/blog/javascript-for-beginners",
          id: "javascript-for-beginners"
        },
        {
          title: "Responsive Web Design",
          summary: "Master responsive web design with CSS Grid, Flexbox, Tailwind CSS, media queries, and mobile-first approach. Complete guide with practical examples.",
          content: "Responsive Web Design (RWD) ensures your website looks and functions perfectly on all devices—from smartphones to desktop computers. With mobile traffic accounting for over 50% of web usage, responsive design isn't optional—it's essential.",
          link: "/blog/responsive-web-design",
          url: "/blog/responsive-web-design",
          id: "responsive-web-design"
        },
        {
          title: "Git & GitHub for Beginners",
          summary: "Learn Git version control and GitHub collaboration with step-by-step tutorials, commands, and best practices for developers.",
          content: "Git is a distributed version control system that tracks changes in your code, while GitHub is a cloud-based platform for hosting Git repositories and collaborating with other developers.",
          link: "/blog/git-github-for-beginners",
          url: "/blog/git-github-for-beginners",
          id: "git-github-for-beginners"
        },
        {
          title: "CSS for Beginners",
          summary: "Learn CSS fundamentals including selectors, properties, layouts, and styling techniques to create beautiful websites.",
          content: "CSS (Cascading Style Sheets) is the language used to style and layout web pages. It controls colors, fonts, spacing, positioning, and visual effects.",
          link: "/blog/css-for-beginners",
          url: "/blog/css-for-beginners",
          id: "css-for-beginners"
        },
        {
          title: "HTML for Beginners",
          summary: "Learn HTML basics including elements, attributes, semantic markup, and structure to build web pages from scratch.",
          content: "HTML (HyperText Markup Language) is the foundation of web development. It provides the structure and content of web pages using elements and tags.",
          link: "/blog/html-for-beginners",
          url: "/blog/html-for-beginners",
          id: "html-for-beginners"
        },
        {
          title: "Web Design Resources",
          summary: "Comprehensive collection of web design tools, resources, frameworks, and inspiration for modern web development.",
          content: "Discover essential web design resources including design tools, CSS frameworks, icon libraries, color palettes, typography, and inspiration galleries.",
          link: "/blog/web-design-resources",
          url: "/blog/web-design-resources",
          id: "web-design-resources"
        },
        {
          title: "Markdown Style Guide",
          summary: "Complete Markdown syntax guide with examples for formatting text, creating lists, links, images, and more.",
          content: "Markdown is a lightweight markup language that allows you to format text using simple syntax. It's widely used for documentation, README files, and content creation.",
          link: "/blog/markdown-style-guide",
          url: "/blog/markdown-style-guide",
          id: "markdown-style-guide"
        }
      ];
    } catch (error) {
      console.error('Error fetching blog data:', error);
      // Return real blog data as fallback
      return [
        {
          title: "JavaScript for Beginners",
          summary: "Learn JavaScript fundamentals with variables, functions, objects, DOM manipulation, and hands-on projects. Build dynamic, interactive websites.",
          content: "Ready to bring your websites to life? JavaScript is the programming language that makes web pages interactive, dynamic, and engaging.",
          link: "/blog/javascript-for-beginners",
          url: "/blog/javascript-for-beginners",
          id: "javascript-for-beginners"
        },
        {
          title: "Responsive Web Design",
          summary: "Master responsive web design with CSS Grid, Flexbox, Tailwind CSS, media queries, and mobile-first approach. Complete guide with practical examples.",
          content: "Responsive Web Design ensures your website looks and functions perfectly on all devices—from smartphones to desktop computers.",
          link: "/blog/responsive-web-design",
          url: "/blog/responsive-web-design",
          id: "responsive-web-design"
        },
        {
          title: "Git & GitHub for Beginners",
          summary: "Learn Git version control and GitHub collaboration with step-by-step tutorials, commands, and best practices for developers.",
          content: "Git is a distributed version control system that tracks changes in your code, while GitHub is a cloud-based platform for hosting Git repositories.",
          link: "/blog/git-github-for-beginners",
          url: "/blog/git-github-for-beginners",
          id: "git-github-for-beginners"
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
      // Check for theme-related commands
      const query = userMessage.text.toLowerCase();
      let botResponse: Message;

      // Theme-related commands
      if (query.includes('dark mode') || query.includes('apply dark')) {
        const darkTheme = COLOR_PALETTES.find(p => p.name === 'Dark Mode');
        if (darkTheme) {
          confirmThemeChange(darkTheme, userMessage.id);
          setIsTyping(false);
          return;
        }
      } else if (query.includes('light mode') || query.includes('default theme')) {
        const defaultTheme = COLOR_PALETTES.find(p => p.name === 'Default Theme');
        if (defaultTheme) {
          confirmThemeChange(defaultTheme, userMessage.id);
          setIsTyping(false);
          return;
        }
      } else if (query.includes('show colors') || query.includes('show palettes') || query.includes('available themes') || 
                 query.includes('color themes') || query.includes('theme options') || query.includes('all themes')) {
        showColorPalettes();
        setIsTyping(false);
        return;
      } else if (query.includes('generate theme') || query.includes('create theme') || query.includes('custom theme') || 
                 query.includes('make theme') || query.includes('design theme') || query.includes('build theme') ||
                 query.match(/\b(theme|color|palette)\b.*\b(like|for|with|inspired|based)\b/i) ||
                 query.match(/\b(make|create|generate|design|build)\b.*\b(red|blue|green|yellow|orange|purple|pink|black|white|gray|brown)\b.*\b(theme|color|palette)\b/i) ||
                 query.match(/\b(red|blue|green|yellow|orange|purple|pink|black|white|gray|brown)\b.*\b(theme|color|palette)\b/i)) {
        // Extract theme description
        let themeDescription = query
          .replace(/generate|create|make|design|build|apply/gi, '')
          .replace(/theme|color|palette/gi, '')
          .replace(/like|for|with|inspired|based|and/gi, '')
          .trim();

        // If it's a simple color request, enhance the description
        const colorMatch = query.match(/\b(red|blue|green|yellow|orange|purple|pink|black|white|gray|brown|crimson|scarlet|ruby|cherry|rose|coral)\b/i);
        if (colorMatch && themeDescription.length < 10) {
          const color = colorMatch[0].toLowerCase();
          themeDescription = `${color} theme with warm and vibrant ${color} colors`;
        }

        if (themeDescription.length < 5) {
          const helpMessage: Message = {
            id: Date.now() + 1,
            text: 'Please provide a more detailed description for your custom theme. For example:\n\n• "Generate a sunset beach theme"\n• "Create a cyberpunk theme"\n• "Make a red theme"\n• "Design colors inspired by autumn leaves"',
            isUser: false,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, helpMessage]);
          setIsTyping(false);
          return;
        }

        // Show loading message
        const loadingMessage: Message = {
          id: Date.now() + 1,
          text: '🎨 Generating your custom theme... This may take a moment!',
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, loadingMessage]);

        try {
          const customTheme = await generateCustomTheme(themeDescription);
          if (customTheme) {
            // Remove loading message and add success message
            setMessages(prev => prev.slice(0, -1));
            confirmThemeChange(customTheme, userMessage.id);
          } else {
            // Replace loading message with error message
            const errorMessage: Message = {
              id: Date.now() + 2,
              text: 'Sorry, I had trouble generating that theme. Please try describing it differently or be more specific about the colors and mood you want.',
              isUser: false,
              timestamp: new Date()
            };
            setMessages(prev => [...prev.slice(0, -1), errorMessage]);
          }
        } catch (error) {
          console.error('Theme generation error:', error);
          // Replace loading message with error message
          const errorMessage: Message = {
            id: Date.now() + 2,
            text: 'I encountered an error while generating your theme. Please try again with a different description.',
            isUser: false,
            timestamp: new Date()
          };
          setMessages(prev => [...prev.slice(0, -1), errorMessage]);
        }
        setIsTyping(false);
        return;
      } else if (query.includes('apply') && (query.includes('theme') || query.includes('color'))) {
        // Try to find theme by name in the message
        const foundTheme = COLOR_PALETTES.find(p => 
          query.includes(p.name.toLowerCase()) ||
          (p.name.includes('Green') && query.includes('green')) ||
          (p.name.includes('Orange') && query.includes('orange')) ||
          (p.name.includes('Purple') && query.includes('purple')) ||
          (p.name.includes('Blue') && query.includes('blue')) ||
          (p.name.includes('Pink') && query.includes('pink')) ||
          (p.name.includes('Rose') && query.includes('rose')) ||
          (p.name.includes('Red') && (query.includes('red') || query.includes('crimson') || query.includes('cherry'))) ||
          (p.name.includes('Autumn') && (query.includes('red') || query.includes('autumn'))) ||
          (p.name.includes('Cherry') && (query.includes('red') || query.includes('pink') || query.includes('cherry'))) ||
          (p.name.includes('Coral') && (query.includes('red') || query.includes('orange') || query.includes('coral')))
        );
        
        if (foundTheme) {
          confirmThemeChange(foundTheme, userMessage.id);
          setIsTyping(false);
          return;
        } else {
          botResponse = {
            id: Date.now() + 1,
            text: `🎨 I couldn't find that specific theme. Here are all available themes you can apply:`,
            isUser: false,
            timestamp: new Date(),
            colorPalettes: COLOR_PALETTES
          };
        }
      } else if (query.includes('current theme') || query.includes('what theme')) {
        botResponse = {
          id: Date.now() + 1,
          text: `🎨 **Current Theme**: ${currentTheme.name}\n\n${currentTheme.description}\n\nWould you like to see other available themes? Just ask me to "show color palettes"!`,
          isUser: false,
          timestamp: new Date()
        };
      } else if (query.includes('search') || query.includes('find') || query.includes('look for')) {
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
    console.log('🔗 Opening blog URL:', url);
    window.open(url, '_blank');
  };

  const copyToClipboard = async (text: string, messageId: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    }
  };

  // Theme management functions
  const confirmThemeChange = (palette: ColorPalette, messageId: number) => {
    const confirmationMessage: Message = {
      id: Date.now(),
      text: `🎨 **Theme Change Confirmation**\n\nAre you sure you want to apply the **${palette.name}** theme?\n\n${palette.description}`,
      isUser: false,
      timestamp: new Date(),
      themeConfirmation: {
        themeName: palette.name,
        colors: palette,
        messageId: messageId
      }
    };
    
    setMessages(prev => [...prev, confirmationMessage]);
  };

  const handleThemeConfirmation = (confirmed: boolean, themeData: ThemeConfirmation) => {
    if (confirmed) {
      applyTheme(themeData.colors);
      const successMessage: Message = {
        id: Date.now(),
        text: `🎨 ✅ **Theme Applied Successfully!**\n\nThe **${themeData.themeName}** theme has been applied to your website. All settings are saved automatically!`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, successMessage]);
    } else {
      const cancelMessage: Message = {
        id: Date.now(),
        text: `🎨 Theme change cancelled. Your current theme remains unchanged.`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, cancelMessage]);
    }
  };

  const showColorPalettes = () => {
    const paletteMessage: Message = {
      id: Date.now(),
      text: `🎨 **Amazing Color Collection!**\n\nExplore **${COLOR_PALETTES.length} stunning themes** - from elegant classics to bold modern designs!\n\n✨ **Categories include:**\n• Professional themes (Default, Royal Blue, Coffee Bean)\n• Dark modes (Dark Mode, Midnight Purple, Galaxy Purple)\n• Nature-inspired (Forest Green, Ocean Blue, Autumn Leaves)\n• Vibrant & Fun (Cyberpunk, Neon Nights, Cherry Blossom)\n• Warm & Cozy (Golden Hour, Coral Reef, Rose Gold)\n\n**Click any palette below to preview and apply instantly!**`,
      isUser: false,
      timestamp: new Date(),
      colorPalettes: COLOR_PALETTES
    };
    
    setMessages(prev => [...prev, paletteMessage]);
  };

  // AI Theme Generation Function
  const generateCustomTheme = async (userDescription: string): Promise<ColorPalette | null> => {
    try {
      const prompt = `Generate a color palette based on this description: "${userDescription}"

Please create a cohesive color theme with:
- A descriptive name (2-4 words)
- Primary color (main brand color)
- Secondary color (lighter/complementary)
- Accent color (for highlights/links)
- Background color (main background)
- Text color (readable on background)
- A brief description (under 50 characters)

Respond with ONLY a JSON object in this format:
{
  "name": "Theme Name",
  "primary": "#hexcolor",
  "secondary": "#hexcolor", 
  "accent": "#hexcolor",
  "background": "#hexcolor",
  "text": "#hexcolor",
  "description": "Brief theme description"
}

Make sure colors have good contrast and work well together. For dark themes, use dark backgrounds with light text. For light themes, use light backgrounds with dark text. Ensure colors are not too dark or too light, and avoid colors that are too similar to each other. Avoid problematic combinations like yellow with light purple. When users specify colors or gradients, create harmonious color schemes that complement their preferences.`;

      const response = await fetch(`${API_BASE_URL}/summarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          blogContent: prompt,
          title: `Custom Theme: ${userDescription}`
        }),
      });
      
      if (!response.ok) {
        throw new Error('Theme generation request failed');
      }
      
      const data = await response.json();
      
      if (data.success && data.data.summary) {
        try {
          // Try to extract JSON from the response
          const jsonMatch = data.data.summary.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const themeData = JSON.parse(jsonMatch[0]);
            
            // Validate the theme data
            if (themeData.name && themeData.primary && themeData.secondary && 
                themeData.accent && themeData.background && themeData.text && 
                themeData.description) {
              return themeData;
            }
          }
        } catch (parseError) {
          console.error('Error parsing generated theme:', parseError);
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error generating custom theme:', error);
      return null;
    }
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
                  
                  {/* Theme Confirmation Buttons */}
                  {message.themeConfirmation && (
                    <div className="theme-confirmation">
                      <div className="theme-preview" style={{
                        background: `linear-gradient(135deg, ${message.themeConfirmation.colors.primary}, ${message.themeConfirmation.colors.secondary})`,
                        color: message.themeConfirmation.colors.text,
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        padding: '12px',
                        borderRadius: '8px',
                        margin: '12px 0'
                      }}>
                        <strong>{message.themeConfirmation.colors.name}</strong>
                      </div>
                      <div className="confirmation-buttons">
                        <button 
                          className="confirm-button yes"
                          onClick={() => handleThemeConfirmation(true, message.themeConfirmation!)}
                        >
                          Apply
                        </button>
                        <button 
                          className="confirm-button no"
                          onClick={() => handleThemeConfirmation(false, message.themeConfirmation!)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Color Palettes Display */}
                  {message.colorPalettes && message.colorPalettes.length > 0 && (
                    <div className="color-palettes">
                      {message.colorPalettes.map((palette, index) => (
                        <div key={index} className="palette-card" onClick={() => confirmThemeChange(palette, message.id)}>
                          <div className="palette-colors">
                            <div className="palette-colors-row">
                              <div className="color-stripe" style={{ backgroundColor: palette.primary }}></div>
                              <div className="color-stripe" style={{ backgroundColor: palette.secondary }}></div>
                              <div className="color-stripe" style={{ backgroundColor: palette.accent }}></div>
                              <div className="color-stripe" style={{ backgroundColor: palette.background }}></div>
                              <div className="color-stripe" style={{ backgroundColor: palette.text }}></div>
                            </div>
                          </div>
                          <div className="palette-info">
                            <h5>{palette.name}</h5>
                            <p>{palette.description}</p>
                          </div>
                          <div className="theme-preview-badge">Apply</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Blog Results */}
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
                  {/* Message Time and Copy Button */}
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