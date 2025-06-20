# tilebot

#  Tile Calculator Chatbot with AI Integration

A smart, modern chatbot interface that helps users calculate how many tiles are needed for a floor or wall area. This project includes **voice assistant**, **image upload-based area detection**, and **product suggestions** using AI (LLaVA model with Ollama).

---

## 🌟 Features

| Feature                          | Description                                                                 |
|----------------------------------|-----------------------------------------------------------------------------|
| 📐 Unit Selection                | Choose between **Sq.Ft** or **Sq.M**                                        |
| 🧱 Surface Type                  | Select whether tiles are for **Floor** or **Wall**                          |
| 🔢 Manual or AI Area Input       | Enter area manually or use **image upload** for AI-based detection          |
| 🔊 Voice Assistant               | Use your **microphone** to speak instead of typing                         |
| 📦 Tile Size Options             | Select from various standard tile sizes                                     |
| 🧮 Automatic Calculation         | Calculates tile count and box estimate with **10% buffer**                 |
| 🖼️ Product Suggestions           | Shows **matching tile products** on the right side with images + links      |
| 💾 Export                        | Download the final **tile estimate as a PDF**                               |
| 🖥️ Mobile & Desktop Responsive   | Fully responsive layout                                                     |
| 🐳 Ollama + LLaVA                | Vision-Language AI model integration via Docker for image understanding     |

---

## 🛠️ Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Voice Recognition**: Web Speech API
- **Image AI**: Ollama + LLaVA model (via local API)
- **PDF Export**: JavaScript Blob
- **Deployment**: Netlify (frontend) + Render.com (Ollama backend via Docker)

  
 ### Voice Assistant
- Click mic button 🎤
- Speak your response (e.g. "600 square feet")
- Works via **Web Speech API** (no backend needed)

---

### 🖼Matching Products
- On calculation, shows tile suggestions (image, name, price, link)
- Displayed on **right-side scroll tab**

---

### 📄 5. PDF Export
- Click download button
- Generates a text-based **PDF with tile estimate summary**

---


## 📁 Project Structure


## 🧪 Ollama Integration (LLaVA)

- Uses **Ollama** with **LLaVA model** to estimate area from uploaded room images.
- Image is converted to base64 and sent to local Ollama server via API.
- Returns estimated square footage, passed into the chatbot flow.

---

## 🐳 Docker & Deployment (Render.com)

You can deploy this project with the included `Dockerfile` and `.render.yaml`:

                        
                     [OR]

## 🧪 Running Locally 

### Requirements:
- Ollama installed (or Docker container built)
- LLaVA model pulled


---

