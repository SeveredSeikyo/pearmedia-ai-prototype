<div align="center">
    <a href="https://github.com/SeveredSeikyo/pearmedia-ai-prototype" style="text-color: black; text-decoration: none">
        <h1>🎨 Pear Media AI Studio</h1>
    </a>
    <p><strong>A dual-workflow AI-powered creative platform for intelligent image generation and style analysis</strong></p>
</div>

---

## 📋 Overview

**Pear Media AI Studio** is a React-based web application that leverages cutting-edge AI models to enable two powerful creative workflows:

1. **Creative Studio (Text → Image)**: Transform your ideas into stunning visuals by enhancing text prompts and generating images
2. **Style Lab (Image → Style)**: Upload an image, analyze its artistic style, and generate creative variations

The application combines Google's Gemini API for intelligent prompt enhancement and image analysis with Stability AI for high-quality image generation.

---

## ✨ Features

- **Dual Workflow Support**
  - 📝 Text-to-Image: Convert written ideas into visual masterpieces
  - 🖼️ Image-to-Image: Analyze style and generate variations

- **Smart Prompt Engineering**
  - Automatic prompt enhancement using Gemini AI
  - Intelligent extraction of visual elements (subject, lighting, camera angle, style, etc.)

- **Advanced Image Analysis**
  - Analyze uploaded images for style, color palette, lighting, and composition
  - Generate detailed descriptions for precise style reproduction

- **Responsive Design**
  - Mobile-first UI with Tailwind CSS
  - Fixed bottom navigation on mobile, horizontal nav on desktop
  - Optimized for all screen sizes

- **Real-time Feedback**
  - Loading indicators during processing
  - Error handling with user-friendly messages
  - Editable prompts for fine-tuning results

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Lucide React Icons
- **API Integration**: 
  - Google Generative AI (Gemini 2.5 Flash)
  - Stability AI (Image Generation)
- **HTTP Client**: Axios
- **Loading State**: React Spinners

---

## 📖 Usage

### Creative Studio (Text → Image Workflow)

1. Navigate to the **Creative Studio** tab (or select from navbar)
2. Enter your creative idea or concept in the text area
3. Click **"Enhance Prompt"** - Gemini AI will refine your prompt with:
   - Subject description
   - Visual details (lighting, camera angle, style)
   - Color palette and composition
4. Review and edit the enhanced prompt if needed
5. Click **"Generate Image"** - Stability AI generates your image
6. Download or modify the result

### Style Lab (Image → Style Workflow)

1. Navigate to the **Style Lab** tab
2. Click the upload area or select an image file (PNG, JPG, GIF, WebP)
3. Preview your uploaded image
4. Click **"Analyze Style"** - Gemini analyzes:
   - Subject and environment
   - Lighting and camera angle
   - Color palette and textures
   - Overall artistic style
5. The style description appears in an editable text area
6. Click **"Generate Variation"** to create a new image with the analyzed style
7. Refine the style description and regenerate as needed

---

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js (v14 or higher)
- npm or yarn package manager
- API keys for:
  - [Google Gemini API](https://ai.google.dev/)
  - [Stability AI API](https://platform.stability.ai/)

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/SeveredSeikyo/pearmedia-ai-prototype.git
cd pear-media-lab
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory with:
```env
REACT_APP_GEMINI_KEY=your_gemini_api_key_here
REACT_APP_STABILITY_KEY=your_stability_api_key_here
REACT_APP_STABILITY_MODEL=stable-diffusion-3-5-large
REACT_APP_STABILITY_URL=https://api.stability.ai
```

**Getting Your API Keys:**
- **Gemini API Key**: Visit [Google AI Studio](https://ai.google.dev/), create a new API key
- **Stability API Key**: Sign up at [Stability AI Platform](https://platform.stability.ai/), create an API key

### 4. Start the Development Server
```bash
npm start
```
The application will open at `http://localhost:3000`

---

## 📁 Project Structure

```
pear-media-lab/
├── public/                 # Static files
├── src/
│   ├── components/
│   │   ├── Navbar.js      # Navigation component (tab switching)
│   │   ├── WorkflowText.js # Text-to-Image workflow
│   │   ├── WorkflowImage.js # Image-to-Image workflow
│   │   └── ImageCard.js    # Image display component
│   ├── utils/
│   │   ├── apiHelpers.js  # API integration functions
│   │   └── constants.js   # API keys & system prompts
│   ├── App.js             # Main app component
│   ├── App.css            # App styles
│   └── index.css          # Global styles (Tailwind imports)
├── build/                 # Production build output
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
└── README.md              # This file
```

---

## 🔧 API Integration Details

### Google Gemini API

**Used for:**
- Prompt Enhancement (Text → Image workflow)
- Image Analysis (Image → Style workflow)

**Model**: Gemini 2.5 Flash

**Key Files**: [apiHelpers.js](src/utils/apiHelpers.js)

### Stability AI API

**Used for:**
- Image Generation from prompts

**Endpoint**: `/v1/generation/{model}/text-to-image`

**Configuration**:
- Steps: 30
- CFG Scale: 7
- Image Size: 1024x1024
- Samples: 1

---

## 🎯 Key Components

### Navbar.js
- Displays navigation tabs for workflow selection
- Mobile-optimized with bottom-fixed positioning
- Desktop view with horizontal layout

### WorkflowText.js
- Manages text input for creative ideas
- Handles prompt enhancement and image generation
- Displays enhanced prompts and generated images

### WorkflowImage.js
- Handles image uploads and file preview
- Manages image analysis workflow
- Displays analysis results and generated variations

### apiHelpers.js
- `getEnhancedPrompt()` - Enhances user text using Gemini
- `generateImage()` - Generates images using Stability AI
- `analyzeImage()` - Analyzes uploaded images using Gemini

---

## 🚀 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

---

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Runs development server (port 3000) |
| `npm build` | Creates optimized production build |
| `npm test` | Runs test suite |
| `npm eject` | Ejects from Create React App (irreversible) |

---

## ⚠️ Error Handling

The application includes error handling for:
- Missing or invalid API keys
- Network connectivity issues
- API rate limits
- Invalid image formats
- Failed image generation or analysis

Errors are displayed with clear messages to guide the user.

---

## 🎨 Customization

### Modify System Prompts
Edit the prompt templates in [constants.js](src/utils/constants.js) to adjust:
- Prompt engineering behavior
- Image analysis criteria
- Output structure

### Update Styling
- Global styles: [index.css](src/index.css)
- Tailwind config: [tailwind.config.js](tailwind.config.js)
- Component styles: Use Tailwind classes in component files

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this project and submit pull requests.

---

## 📄 License

This project is available under the MIT License.

---

## 📞 Support

For issues, questions, or suggestions, please open an issue on the [GitHub repository](https://github.com/SeveredSeikyo/pearmedia-ai-prototype).

---

<div align="center">
    <p><strong>Built with ❤️ for creative AI enthusiasts</strong></p>
</div>