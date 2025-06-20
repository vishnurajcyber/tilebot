document.addEventListener("DOMContentLoaded", () => {
  let step = 0;
  let userSelection = {};

  const chatBox = document.getElementById("chatBox");

  function appendMessage(text, sender = "bot") {
    const msg = document.createElement("div");
    msg.className = sender === "bot" ? "bot-message" : "user-message";
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function appendImage(src) {
    const img = document.createElement("img");
    img.src = src;
    img.style.maxWidth = "150px";
    img.style.borderRadius = "8px";
    img.style.margin = "8px 0";
    chatBox.appendChild(img);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  window.sendMessage = () => {
    const input = document.getElementById("userInput");
    const msg = input.value.trim();
    if (!msg) return;
    appendMessage(msg, "user");
    input.value = "";
    nextStep(msg);
  };
  document.getElementById("userInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});


  window.handleReply = (reply) => {
    appendMessage(reply, "user");
    document.querySelector(".quick-replies")?.remove();
    nextStep(reply);
  };

  function nextStep(input) {
   if (step === 0) {
  userSelection.type = input.toLowerCase(); 
  appendMessage("Please select the measurement unit:", "bot");
  const units = ["Sq.Ft", "Sq.M"];
  const replies = document.createElement("div");
  replies.className = "quick-replies";
  units.forEach(unit => {
    const btn = document.createElement("button");
    btn.innerText = unit;
    btn.onclick = () => handleReply(unit);
    replies.appendChild(btn);
  });
  chatBox.appendChild(replies);
  step++;
}
 else if (step === 1) {
      userSelection.unit = input.toLowerCase().includes("m") ? "sq.m" : "sq.ft";
      appendMessage(`Enter total area in ${userSelection.unit.toUpperCase()}:`, "bot");
      step++;
    } else if (step === 2) {
      const match = input.match(/([\d.]+)/);
      if (!match) {
        appendMessage("❌ Please enter a valid number.", "bot");
        return;
      }
      userSelection.area = parseFloat(match[1]);
      askTileSize();
      step++;
    } else if (step === 3) {
      const selected = tileSizes.find(t => t.label === input);
      if (!selected) {
        appendMessage("❌ Please select a valid tile size from the buttons.", "bot");
        return;
      }
      userSelection.tileSize = selected;
      calculateTiles();
      step++;
    } else if (step === 4 && input.toLowerCase().includes("yes")) {
      showProducts();
    }
  }

  const tileSizes = [
    { label: "1200x600 MM (7.75 sq.ft)", area: 7.75 },
    { label: "600x300 MM (1.94 sq.ft)", area: 1.94 },
    { label: "600x600 MM (3.87 sq.ft)", area: 3.87 },
    { label: "450×300 MM (1.45 sq.ft)", area: 1.45 },
    { label: "1600×800 MM (13.78 sq.ft)", area: 13.78 },
    { label: "300x300 MM (0.97 sq.ft)", area: 0.97 },
    { label: "1800×1200 MM (23.23 sq.ft)", area: 23.23 },
    { label: "2400×800 MM (20.67 sq.ft)", area: 20.67 },
    { label: "400×400 MM (1.72 sq.ft)", area: 1.72 },
    { label: "800x800 MM (6.89 sq.ft)", area: 6.89 },
    { label: "2400×1200 MM (31.15 sq.ft)", area: 31.15 },
    { label: "605×605 MM (3.94 sq.ft)", area: 3.94 },
    { label: "1214×193 MM (2.52 sq.ft)", area: 2.52 },
    { label: "1200x1200 MM (15.5 sq.ft)", area: 15.5 },
    { label: "1200x200 MM (2.58 sq.ft)", area: 2.58 },
    { label: "1000×200 MM (2.15 sq.ft)", area: 2.15 },
    { label: "1200x195 MM (2.52 sq.ft)", area: 2.52 },
    { label: "3100x1400 MM (46.69 sq.ft)", area: 46.69 },
    { label: "600x99 MM (0.64 sq.ft)", area: 0.64 },
    { label: "1214x141 MM (1.84 sq.ft)", area: 1.84 },
    { label: "800x130 MM (1.12 sq.ft)", area: 1.12 },
    { label: "1200x196 MM (2.53 sq.ft)", area: 2.53 },
    { label: "600×150 MM (0.97 sq.ft)", area: 0.97 },
    { label: "914×147 MM (1.45 sq.ft)", area: 1.45 },
    { label: "300×200 MM (0.65 sq.ft)", area: 0.65 },
    { label: "1219×225 MM (2.96 sq.ft)", area: 2.96 },
    { label: "1000x1000 MM (10.76 sq.ft)", area: 10.76 },
    { label: "600x145 MM (0.94 sq.ft)", area: 0.94 },
    { label: "395×395 MM (1.68 sq.ft)", area: 1.68 },
    { label: "300×100 MM (0.32 sq.ft)", area: 0.32 },
    { label: "600×1200 MM (7.75 sq.ft)", area: 7.75 }
  ];

  function askTileSize() {
    appendMessage("Choose a tile size:", "bot");
    const replies = document.createElement("div");
    replies.className = "quick-replies";
    tileSizes.forEach(t => {
      const btn = document.createElement("button");
      btn.innerText = t.label;
      btn.onclick = () => handleReply(t.label);
      replies.appendChild(btn);
    });
    chatBox.appendChild(replies);
  }

  function calculateTiles() {
    const area = userSelection.unit === "sq.m" ? userSelection.area * 10.764 : userSelection.area;
    const tileArea = userSelection.tileSize.area;
    const needed = Math.ceil(area / tileArea * 1.1);
    const boxes = Math.ceil(needed / 10);
    appendMessage(`✅ You will need approx ${needed} tiles (${boxes} boxes) including 10% buffer.`, "bot");
    appendMessage("Would you like to see matching tiles?", "bot");
  }

function showProducts() {
  const products = [
    {
      name: "Classic White 1200x600",
      price: "₹250/sq.ft",
      img: "https://via.placeholder.com/80",
      link: "https://arqonz.com/product/classic-white"
    },
    {
      name: "Grey Matte 600x600",
      price: "₹300/sq.ft",
      img: "https://via.placeholder.com/80",
      link: "https://arqonz.com/product/grey-matte"
    },
    {
      name: "Marble Beige 800x800",
      price: "₹350/sq.ft",
      img: "https://via.placeholder.com/80",
      link: "https://arqonz.com/product/marble-beige"
    }
  ];

 
  appendMessage(" Here are some matching tile options:", "bot");

  const wrapper = document.createElement("div");
  wrapper.className = "product-inline-wrapper";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-inline-card";
    card.innerHTML = `
      <a href="${p.link}" target="_blank">
        <img src="${p.img}" alt="${p.name}" />
        <div class="info">
          <h4>${p.name}</h4>
          <p>${p.price}</p>
        </div>
      </a>
    `;
    wrapper.appendChild(card);
  });

  document.getElementById("chatBox").appendChild(wrapper);
}




  const micBtn = document.getElementById("micBtn");

  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-IN';
    recognition.onstart = () => appendMessage("🎙️ Listening...", "bot");

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      document.getElementById("userInput").value = transcript;
      sendMessage();
    };

    recognition.onerror = (e) => {
      appendMessage("❌ Mic Error: " + e.error, "bot");
    };

    micBtn.onclick = () => recognition.start();
  } else {
    micBtn.disabled = true;
    micBtn.title = "Voice input not supported";
  }

 
  document.getElementById("fileUpload").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      appendImage(reader.result);
      appendMessage("📷 Analyzing image for area...", "bot");

      try {
        const response = await fetch("http://localhost:11434/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "llava",
            prompt: "Estimate the total tile area (in square feet or meters) from this image. Be specific and give a number.",
            images: [reader.result.replace(/^data:image\/(png|jpeg);base64,/, "")],
            stream: false
          })
        });

        const json = await response.json();
        console.log("📷 Ollama Response:", json);

        if (json.response) {
          appendMessage("📐 " + json.response.trim(), "bot");
          if (step === 2 && /([\d.]+)/.test(json.response)) {
            nextStep(json.response);
          }
        } else {
          appendMessage("❌ No valid response from Ollama.", "bot");
        }
      } catch (err) {
        appendMessage("❌ Failed to analyze image via Ollama: " + err.message, "bot");
      }
    };
    reader.readAsDataURL(file);
  });


  document.getElementById("downloadBtn").addEventListener("click", () => {
  const messages = document.querySelectorAll(".bot-message");
  const tileDetails = [];

  messages.forEach(msg => {
    if (msg.innerText.includes("✅ You will need approx")) {
      tileDetails.push(msg.innerText);
    }
  });

  if (tileDetails.length === 0) {
    alert("❌ No tile estimate found yet.");
    return;
  }


  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text(" Tile Estimate Summary", 20, 20);

  let y = 40;
  tileDetails.forEach(text => {
    doc.text(text, 20, y);
    y += 10;
  });

  doc.save("Tile_Estimate.pdf");
});

  
  nextStep();
});
