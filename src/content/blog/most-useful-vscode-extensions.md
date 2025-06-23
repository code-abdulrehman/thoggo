---
title: 'Most Useful VS Code Extensions'
description: 'Discover the 10 most essential VS Code extensions for web development in 2025. Complete guide with installation steps, features, and productivity tips.'
pubDate: 2025-06-24
heroImage: '/vscode-extensions-box.png'
---

### The 10 Most Useful VS Code Extensions for Web Development

Visual Studio Code is already a powerful editor, but its true strength lies in its vast ecosystem of extensions. With over 45,000 extensions available, choosing the right ones can transform your coding experience and supercharge your productivity.

In this comprehensive guide, you'll discover:

- **Top 10 essential VS Code extensions**
- **Step-by-step installation instructions**
- **Detailed features and benefits**
- **Configuration tips and best practices**
- **Productivity shortcuts and workflows**
- **Extension combinations that work great together**

---

#### Why VS Code Extensions Matter

Extensions can:
✅ **Boost Productivity** - Automate repetitive tasks  
✅ **Improve Code Quality** - Catch errors before they happen  
✅ **Enhance Experience** - Better syntax highlighting and IntelliSense  
✅ **Save Time** - Automated formatting and code generation  
✅ **Customize Workflow** - Tailor VS Code to your needs  

---

#### 1. **Prettier - Code Formatter** ⭐⭐⭐⭐⭐

**Downloads**: 30M+  
**Publisher**: Prettier  
**Category**: Code Formatting

Prettier is the most popular code formatter that automatically formats your code to ensure consistency across your project.

##### **Why Prettier is Essential**

🎯 **Consistent Formatting** - Never worry about code style again  
⚡ **Auto-Format on Save** - Code gets formatted automatically  
🔧 **Supports Multiple Languages** - JavaScript, TypeScript, CSS, HTML, JSON, and more  
👥 **Team Consistency** - Everyone's code looks the same  
🚀 **Zero Configuration** - Works out of the box  

##### **Installation Process**

###### **Method 1: Extensions Marketplace (Recommended)**
```bash
# Step 1: Open VS Code
# Step 2: Press Ctrl+Shift+X (Windows/Linux) or Cmd+Shift+X (Mac)
# Step 3: Search for "Prettier - Code formatter"
# Step 4: Click "Install" on the extension by Prettier
```

###### **Method 2: Command Line**
```bash
code --install-extension esbenp.prettier-vscode
```

###### **Method 3: Quick Open**
```bash
# Press Ctrl+P (Windows/Linux) or Cmd+P (Mac)
# Type: ext install esbenp.prettier-vscode
# Press Enter
```

##### **Configuration Setup**

```json
// settings.json - Add these settings for optimal Prettier experience
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "prettier.singleQuote": true,
  "prettier.semi": true,
  "prettier.tabWidth": 2,
  "prettier.trailingComma": "es5",
  "prettier.printWidth": 80,
  "prettier.bracketSpacing": true,
  "prettier.arrowParens": "avoid",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

##### **Create Prettier Config File**
```json
// .prettierrc - Project-level configuration
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

##### **Keyboard Shortcuts**
- **Format Document**: `Shift+Alt+F` (Windows/Linux) or `Shift+Option+F` (Mac)
- **Format Selection**: `Ctrl+K Ctrl+F` (Windows/Linux) or `Cmd+K Cmd+F` (Mac)

---

#### 2. **ESLint** ⭐⭐⭐⭐⭐

**Downloads**: 25M+  
**Publisher**: Microsoft  
**Category**: Linting

ESLint helps identify and fix problems in your JavaScript and TypeScript code before they cause issues.

##### **Why ESLint is Crucial**

🐛 **Catch Bugs Early** - Find errors before runtime  
📏 **Enforce Code Standards** - Consistent coding practices  
🔧 **Auto-Fix Issues** - Many problems can be fixed automatically  
⚡ **Real-time Feedback** - See issues as you type  
🎯 **Customizable Rules** - Configure rules for your project  

##### **Installation Process**

###### **Step 1: Install ESLint Extension**
```bash
# Method 1: Extensions Marketplace
# Search for "ESLint" by Microsoft and click Install

# Method 2: Command Line
code --install-extension dbaeumer.vscode-eslint

# Method 3: Quick Open
# Press Ctrl+P and type: ext install dbaeumer.vscode-eslint
```

###### **Step 2: Install ESLint in Your Project**
```bash
# Navigate to your project directory
cd your-project

# Install ESLint as dev dependency
npm install -D eslint

# Initialize ESLint configuration
npx eslint --init
```

###### **Step 3: Follow ESLint Setup Wizard**
```bash
# The wizard will ask you questions like:
# ✔ How would you like to use ESLint? › problems
# ✔ What type of modules does your project use? › esm
# ✔ Which framework does your project use? › react
# ✔ Does your project use TypeScript? › Yes
# ✔ Where does your code run? › browser
# ✔ What format do you want your config file to be in? › JSON
```

##### **ESLint Configuration Example**

```json
// .eslintrc.json - Basic React + TypeScript setup
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint",
    "react-hooks"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "no-console": "warn",
    "prefer-const": "error"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

##### **VS Code Settings for ESLint**
```json
// settings.json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.format.enable": true,
  "eslint.lintTask.enable": true
}
```

---

#### 3. **GitLens — Git Supercharged** ⭐⭐⭐⭐⭐

**Downloads**: 20M+  
**Publisher**: GitKraken  
**Category**: Version Control

GitLens supercharges the built-in Git capabilities in VS Code, providing rich visualizations and insights.

##### **Why GitLens is Indispensable**

📊 **Blame Annotations** - See who changed what and when  
📈 **File History** - Complete file change history  
🌳 **Repository Insights** - Visual commit graphs  
🔍 **Line-by-Line History** - Detailed change tracking  
🚀 **Enhanced Git Integration** - Better Git workflow  

##### **Installation Process**

```bash
# Method 1: Extensions Marketplace
# Search for "GitLens — Git supercharged" and install

# Method 2: Command Line
code --install-extension eamodio.gitlens

# Method 3: Quick Open
# Press Ctrl+P and type: ext install eamodio.gitlens
```

##### **GitLens Configuration**

```json
// settings.json - GitLens optimization
{
  "gitlens.blame.format": "${author}, ${agoOrDate}",
  "gitlens.blame.heatmap.enabled": true,
  "gitlens.blame.highlight.enabled": true,
  "gitlens.currentLine.enabled": true,
  "gitlens.currentLine.format": "${author}, ${agoOrDate} • ${message}",
  "gitlens.hovers.currentLine.over": "line",
  "gitlens.statusBar.enabled": true,
  "gitlens.views.repositories.files.layout": "tree",
  "gitlens.views.fileHistory.enabled": true,
  "gitlens.views.lineHistory.enabled": true
}
```

##### **Key GitLens Features**

###### **Blame Annotations**
- Hover over any line to see commit details
- Toggle blame with `Ctrl+Shift+G B`

###### **File History**
- Right-click any file → "Open File History"
- See complete change timeline

###### **Repository View**
- Access from Activity Bar
- Browse commits, branches, and tags visually

---

#### 4. **Live Server** ⭐⭐⭐⭐⭐

**Downloads**: 15M+  
**Publisher**: Ritwick Dey  
**Category**: Development Server

Live Server launches a local development server with live reload feature for static and dynamic pages.

##### **Why Live Server is Essential**

🚀 **Instant Preview** - See changes immediately  
🔄 **Auto Reload** - Page refreshes when you save  
📱 **Mobile Testing** - Access from any device on network  
⚡ **Zero Configuration** - Works out of the box  
🌐 **Custom Port** - Choose your preferred port  

##### **Installation Process**

```bash
# Method 1: Extensions Marketplace
# Search for "Live Server" by Ritwick Dey and install

# Method 2: Command Line
code --install-extension ritwickdey.liveserver

# Method 3: Quick Open
# Press Ctrl+P and type: ext install ritwickdey.liveserver
```

##### **How to Use Live Server**

###### **Method 1: Right-Click**
```bash
# 1. Open your HTML file in VS Code
# 2. Right-click in the editor
# 3. Select "Open with Live Server"
# 4. Your default browser will open with live reload
```

###### **Method 2: Status Bar**
```bash
# 1. Open any HTML file
# 2. Look for "Go Live" in the bottom status bar
# 3. Click "Go Live" to start the server
```

###### **Method 3: Command Palette**
```bash
# 1. Press Ctrl+Shift+P (Windows/Linux) or Cmd+Shift+P (Mac)
# 2. Type "Live Server: Open with Live Server"
# 3. Press Enter
```

##### **Live Server Configuration**

```json
// settings.json - Live Server customization
{
  "liveServer.settings.port": 5500,
  "liveServer.settings.CustomBrowser": "chrome",
  "liveServer.settings.root": "/",
  "liveServer.settings.file": "index.html",
  "liveServer.settings.mount": [["/components", "./src/components"]],
  "liveServer.settings.donotShowInfoMsg": true,
  "liveServer.settings.donotVerifyTags": true,
  "liveServer.settings.ignoreFiles": [
    ".vscode/**",
    "**/*.scss",
    "**/*.sass",
    "**/*.ts"
  ]
}
```

##### **Keyboard Shortcuts**
- **Start Live Server**: `Alt+L Alt+O`
- **Stop Live Server**: `Alt+L Alt+C`

---

#### 5. **Auto Rename Tag** ⭐⭐⭐⭐⭐

**Downloads**: 10M+  
**Publisher**: Jun Han  
**Category**: HTML/XML

Automatically renames paired HTML/XML tags when you modify one of them.

##### **Why Auto Rename Tag is a Lifesaver**

⚡ **Time Saver** - No more manual tag renaming  
🎯 **Error Prevention** - Prevents mismatched tags  
🔄 **Instant Updates** - Both tags change simultaneously  
📝 **Works with All Frameworks** - React, Vue, Angular, HTML  
✨ **Zero Configuration** - Works immediately after installation  

##### **Installation Process**

```bash
# Method 1: Extensions Marketplace
# Search for "Auto Rename Tag" by Jun Han and install

# Method 2: Command Line
code --install-extension formulahendry.auto-rename-tag

# Method 3: Quick Open
# Press Ctrl+P and type: ext install formulahendry.auto-rename-tag
```

##### **Configuration Options**

```json
// settings.json - Auto Rename Tag settings
{
  "auto-rename-tag.activationOnLanguage": [
    "html",
    "xml",
    "php",
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue"
  ],
  "auto-rename-tag.extension": [
    ".html",
    ".xml",
    ".php",
    ".jsx",
    ".tsx",
    ".vue"
  ]
}
```

##### **How It Works**

```html
<!-- Before: Change opening tag -->
<div className="container">
  <p>Content here</p>
</div>

<!-- After: Change "div" to "section" - closing tag updates automatically -->
<section className="container">
  <p>Content here</p>
</section>
```

---

#### 6. **Bracket Pair Colorizer 2** ⭐⭐⭐⭐⭐

**Downloads**: 8M+  
**Publisher**: CoenraadS  
**Category**: Visual Enhancement

**Note**: VS Code now has built-in bracket pair colorization, but this extension offers more customization.

##### **Why Bracket Colorization Matters**

🌈 **Visual Clarity** - Different colors for nested brackets  
🎯 **Easier Navigation** - Quickly identify code blocks  
🐛 **Bug Prevention** - Spot mismatched brackets instantly  
⚡ **Improved Readability** - Complex code becomes clearer  
🔧 **Customizable Colors** - Match your theme preferences  

##### **Installation Process**

```bash
# Method 1: Extensions Marketplace
# Search for "Bracket Pair Colorizer 2" and install

# Method 2: Command Line
code --install-extension coenraads.bracket-pair-colorizer-2

# Method 3: Use Built-in Feature (VS Code 1.60+)
# Add to settings.json:
```

##### **Configuration (Built-in VS Code)**

```json
// settings.json - Use VS Code's built-in bracket colorization
{
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",
  "editor.guides.bracketPairsHorizontal": true,
  "editor.bracketPairColorization.independentColorPoolPerBracketType": true
}
```

##### **Advanced Configuration (Extension)**

```json
// settings.json - Bracket Pair Colorizer 2 settings
{
  "bracket-pair-colorizer-2.colors": [
    "#ffd700",
    "#da70d6",
    "#87ceeb",
    "#90ee90",
    "#ff6347"
  ],
  "bracket-pair-colorizer-2.unmatchedScopeColor": "#ff0000",
  "bracket-pair-colorizer-2.forceUniqueOpeningColor": false,
  "bracket-pair-colorizer-2.forceIterationColorCycle": false,
  "bracket-pair-colorizer-2.colorMode": "Consecutive",
  "bracket-pair-colorizer-2.highlightActiveScope": false,
  "bracket-pair-colorizer-2.activeScopeCSS": [
    "borderStyle : solid",
    "borderWidth : 1px",
    "borderColor : {color}",
    "opacity: 0.5"
  ]
}
```

---

#### 7. **ES7+ React/Redux/React-Native Snippets** ⭐⭐⭐⭐⭐

**Downloads**: 7M+  
**Publisher**: dsznajder  
**Category**: Snippets

Provides JavaScript and React/Redux snippets in ES7+ with Babel plugin features.

##### **Why React Snippets are Essential**

⚡ **Speed Up Development** - Type less, code faster  
🎯 **Consistent Code Structure** - Standardized component templates  
📚 **Learn Best Practices** - Snippets follow React conventions  
🔄 **Reduce Boilerplate** - Generate common patterns quickly  
🧠 **Memory Aid** - Don't memorize syntax, just trigger snippets  

##### **Installation Process**

```bash
# Method 1: Extensions Marketplace
# Search for "ES7+ React/Redux/React-Native snippets" and install

# Method 2: Command Line
code --install-extension dsznajder.es7-react-js-snippets

# Method 3: Quick Open
# Press Ctrl+P and type: ext install dsznajder.es7-react-js-snippets
```

##### **Most Useful Snippets**

###### **React Functional Components**
```javascript
// Trigger: rfc + Tab
import React from 'react'

function ComponentName() {
  return (
    <div>
      
    </div>
  )
}

export default ComponentName

// Trigger: rafce + Tab (Arrow Function with Export)
import React from 'react'

const ComponentName = () => {
  return (
    <div>
      
    </div>
  )
}

export default ComponentName
```

###### **React Hooks**
```javascript
// Trigger: useState + Tab
const [state, setState] = useState()

// Trigger: useEffect + Tab
useEffect(() => {
  
}, [])

// Trigger: useContext + Tab
const context = useContext(ContextName)
```

###### **React Class Components**
```javascript
// Trigger: rcc + Tab
import React, { Component } from 'react'

export default class ComponentName extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
```

##### **Complete Snippets Reference**

| Trigger | Description |
|---------|-------------|
| `rfc` | React Functional Component |
| `rafce` | React Arrow Function Component Export |
| `rcc` | React Class Component |
| `rccp` | React Class Component with PropTypes |
| `useState` | useState Hook |
| `useEffect` | useEffect Hook |
| `useContext` | useContext Hook |
| `useReducer` | useReducer Hook |
| `useMemo` | useMemo Hook |
| `useCallback` | useCallback Hook |

---

#### 8. **Thunder Client** ⭐⭐⭐⭐⭐

**Downloads**: 5M+  
**Publisher**: RangaVadhineni  
**Category**: API Testing

A lightweight REST API client for VS Code, similar to Postman but integrated directly into your editor.

##### **Why Thunder Client is Amazing**

⚡ **Lightweight** - No separate app needed  
🔧 **Integrated Workflow** - Test APIs without leaving VS Code  
📁 **Collections** - Organize your API requests  
🌍 **Environment Variables** - Switch between dev/staging/prod  
📊 **Response Formatting** - Beautiful JSON/XML formatting  

##### **Installation Process**

```bash
# Method 1: Extensions Marketplace
# Search for "Thunder Client" by RangaVadhineni and install

# Method 2: Command Line
code --install-extension rangav.vscode-thunder-client

# Method 3: Quick Open
# Press Ctrl+P and type: ext install rangav.vscode-thunder-client
```

##### **How to Use Thunder Client**

###### **Step 1: Open Thunder Client**
```bash
# Method 1: Activity Bar
# Click the Thunder Client icon in the Activity Bar

# Method 2: Command Palette
# Press Ctrl+Shift+P and type "Thunder Client: New Request"
```

###### **Step 2: Create Your First Request**
```javascript
// Example API request setup
{
  "method": "GET",
  "url": "https://jsonplaceholder.typicode.com/users",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer your-token-here"
  }
}
```

###### **Step 3: Organize with Collections**
```bash
# 1. Click "Collections" in Thunder Client
# 2. Click "New Collection"
# 3. Name it "User API"
# 4. Drag requests into the collection
```

##### **Environment Variables Setup**

```json
// Local Environment
{
  "name": "Local",
  "variables": {
    "baseUrl": "http://localhost:3000",
    "apiKey": "local-api-key",
    "userId": "123"
  }
}

// Production Environment
{
  "name": "Production",
  "variables": {
    "baseUrl": "https://api.myapp.com",
    "apiKey": "prod-api-key",
    "userId": "456"
  }
}
```

##### **Request Examples**

```javascript
// GET Request with Environment Variables
GET {{baseUrl}}/api/users/{{userId}}
Headers: {
  "Authorization": "Bearer {{apiKey}}"
}

// POST Request with JSON Body
POST {{baseUrl}}/api/users
Headers: {
  "Content-Type": "application/json"
}
Body: {
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

#### 9. **Path Intellisense** ⭐⭐⭐⭐⭐

**Downloads**: 6M+  
**Publisher**: Christian Kohler  
**Category**: IntelliSense

Provides intelligent autocompletion for file paths in your project.

##### **Why Path Intellisense is Essential**

🎯 **Accurate Paths** - No more typos in file paths  
⚡ **Faster Development** - Quick file path completion  
🔍 **File Discovery** - Browse project structure easily  
📁 **Supports All File Types** - Images, CSS, JS, everything  
🚀 **Works with Imports** - Perfect for module imports  

##### **Installation Process**

```bash
# Method 1: Extensions Marketplace
# Search for "Path Intellisense" by Christian Kohler and install

# Method 2: Command Line
code --install-extension christian-kohler.path-intellisense

# Method 3: Quick Open
# Press Ctrl+P and type: ext install christian-kohler.path-intellisense
```

##### **Configuration**

```json
// settings.json - Path Intellisense configuration
{
  "typescript.suggest.paths": false,
  "javascript.suggest.paths": false,
  "path-intellisense.extensionOnImport": true,
  "path-intellisense.showHiddenFiles": true,
  "path-intellisense.autoSlashAfterDirectory": true,
  "path-intellisense.absolutePathToWorkspace": true,
  "path-intellisense.mappings": {
    "@": "${workspaceRoot}/src",
    "@components": "${workspaceRoot}/src/components",
    "@utils": "${workspaceRoot}/src/utils",
    "@assets": "${workspaceRoot}/src/assets"
  }
}
```

##### **How It Works**

```javascript
// Type the beginning of a path and get suggestions
import Button from './com'  // Suggests: ./components/Button.jsx

// Works with CSS imports
import './sty'  // Suggests: ./styles/main.css

// Works with image paths
<img src="./ass"  // Suggests: ./assets/logo.png

// Works with absolute paths (if configured)
import utils from '@ut'  // Suggests: @utils/helpers.js
```

---

#### 10. **Material Icon Theme** ⭐⭐⭐⭐⭐

**Downloads**: 15M+  
**Publisher**: Philipp Kief  
**Category**: Theme

Beautiful file and folder icons based on Google's Material Design.

##### **Why Material Icons Enhance Your Experience**

🎨 **Visual Clarity** - Instantly recognize file types  
📁 **Better Navigation** - Folders and files are easier to distinguish  
🎯 **Reduced Cognitive Load** - Icons provide visual cues  
🌈 **Consistent Design** - Professional, clean appearance  
⚡ **Faster File Recognition** - Spot files quicker  

##### **Installation Process**

```bash
# Method 1: Extensions Marketplace
# Search for "Material Icon Theme" by Philipp Kief and install

# Method 2: Command Line
code --install-extension pkief.material-icon-theme

# Method 3: Quick Open
# Press Ctrl+P and type: ext install pkief.material-icon-theme
```

##### **Activation**

```bash
# Method 1: Command Palette
# Press Ctrl+Shift+P and type "Preferences: File Icon Theme"
# Select "Material Icon Theme"

# Method 2: Settings
# Go to File > Preferences > Settings
# Search for "icon theme"
# Select "Material Icon Theme" from dropdown
```

##### **Configuration Options**

```json
// settings.json - Material Icon Theme customization
{
  "material-icon-theme.activeIconPack": "react",
  "material-icon-theme.folders.theme": "specific",
  "material-icon-theme.folders.color": "#90a4ae",
  "material-icon-theme.hidesExplorerArrows": false,
  "material-icon-theme.opacity": 1,
  "material-icon-theme.saturation": 1,
  "material-icon-theme.files.associations": {
    "*.component.ts": "angular-component",
    "*.service.ts": "angular-service",
    "*.module.ts": "angular-module"
  },
  "material-icon-theme.folders.associations": {
    "components": "components",
    "utils": "utils",
    "hooks": "custom",
    "api": "api"
  }
}
```

##### **Icon Pack Options**

- **Angular** - Specific icons for Angular projects
- **React** - Optimized for React development
- **Vue** - Perfect for Vue.js projects
- **Node** - Great for Node.js backend projects

---

#### Extension Installation Summary

##### **Quick Install All Extensions**

Copy and paste this command to install all 10 extensions at once:

```bash
code --install-extension esbenp.prettier-vscode --install-extension dbaeumer.vscode-eslint --install-extension eamodio.gitlens --install-extension ritwickdey.liveserver --install-extension formulahendry.auto-rename-tag --install-extension coenraads.bracket-pair-colorizer-2 --install-extension dsznajder.es7-react-js-snippets --install-extension rangav.vscode-thunder-client --install-extension christian-kohler.path-intellisense --install-extension pkief.material-icon-theme
```

##### **Recommended Settings.json Configuration**

```json
{
  // Prettier Configuration
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "prettier.singleQuote": true,
  "prettier.semi": true,
  "prettier.tabWidth": 2,
  
  // ESLint Configuration
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  
  // GitLens Configuration
  "gitlens.currentLine.enabled": true,
  "gitlens.blame.heatmap.enabled": true,
  
  // Live Server Configuration
  "liveServer.settings.port": 5500,
  "liveServer.settings.donotShowInfoMsg": true,
  
  // Bracket Colorization (Built-in)
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",
  
  // Material Icon Theme
  "workbench.iconTheme": "material-icon-theme",
  "material-icon-theme.activeIconPack": "react",
  
  // Path Intellisense
  "path-intellisense.extensionOnImport": true,
  "path-intellisense.autoSlashAfterDirectory": true,
  
  // General Editor Settings
  "editor.fontSize": 14,
  "editor.fontFamily": "'Fira Code', 'Cascadia Code', Consolas, monospace",
  "editor.fontLigatures": true,
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000
}
```

---

#### Productivity Tips & Workflows

##### **Daily Development Workflow**

1. **Start Your Project**
   - Open project in VS Code
   - Live Server automatically available for HTML projects
   - GitLens shows recent changes

2. **Write Code**
   - Use React snippets for faster component creation
   - Path Intellisense helps with imports
   - Auto Rename Tag keeps HTML/JSX consistent

3. **Format & Fix**
   - Prettier formats on save
   - ESLint catches and fixes issues
   - Bracket colorization helps with nested code

4. **Test APIs**
   - Use Thunder Client for API testing
   - No need to leave VS Code
   - Save requests in collections

5. **Version Control**
   - GitLens shows blame information
   - Easy commit and push workflow
   - Visual diff comparisons

##### **Keyboard Shortcuts Cheat Sheet**

```bash
# Essential Shortcuts for Extensions
Ctrl+Shift+X    # Open Extensions
Ctrl+Shift+P    # Command Palette
Shift+Alt+F     # Format Document (Prettier)
Ctrl+`          # Toggle Terminal
Alt+L Alt+O     # Start Live Server
Ctrl+Shift+G    # Git Source Control
F12             # Go to Definition
Ctrl+D          # Select Next Occurrence
```

---

#### Extension Combinations That Work Great Together

##### **Frontend Development Stack**
1. **Prettier** + **ESLint** = Perfect code quality
2. **Auto Rename Tag** + **ES7 Snippets** = Faster React development
3. **Live Server** + **Path Intellisense** = Smooth development experience

##### **Full-Stack Development Stack**
1. **Thunder Client** + **GitLens** = API testing with version control
2. **Material Icons** + **Bracket Colorization** = Better visual experience
3. **ESLint** + **Prettier** + **GitLens** = Professional development workflow

---

#### Troubleshooting Common Issues

##### **Prettier Not Working**
```json
// Check these settings
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "prettier.requireConfig": false
}
```

##### **ESLint Not Showing Errors**
```bash
# Make sure ESLint is installed in your project
npm install -D eslint

# Check if .eslintrc file exists
ls -la | grep eslint
```

##### **Live Server Not Starting**
```bash
# Check if port is already in use
netstat -an | grep 5500

# Try different port in settings
"liveServer.settings.port": 3000
```

##### **GitLens Too Noisy**
```json
// Reduce GitLens information
{
  "gitlens.currentLine.enabled": false,
  "gitlens.blame.compact": true,
  "gitlens.hovers.enabled": false
}
```

---

#### Conclusion

These 10 VS Code extensions will transform your development experience, making you more productive, helping you write better code, and streamlining your workflow. 

##### **Key Takeaways**

🎯 **Start with the Essentials** - Install Prettier, ESLint, and GitLens first  
⚡ **Customize for Your Needs** - Configure extensions to match your workflow  
🔄 **Update Regularly** - Keep extensions updated for new features  
📚 **Learn the Shortcuts** - Master keyboard shortcuts for maximum efficiency  
🧪 **Experiment** - Try new extensions and see what works for you  

##### **Next Steps**

1. **Install these extensions** using the quick install command
2. **Configure your settings.json** with the recommended settings
3. **Learn the keyboard shortcuts** for your most-used features
4. **Explore more extensions** as your needs grow
5. **Share with your team** to maintain consistency

##### **Remember**

The best extensions are the ones that:
- ✅ **Save you time** daily
- ✅ **Improve code quality** automatically  
- ✅ **Match your workflow** and preferences
- ✅ **Work well together** without conflicts

Happy coding with your supercharged VS Code setup! 🚀

---

*Want to discover more VS Code tips and tricks? Check out our other development guides and stay updated with the latest web development trends!*