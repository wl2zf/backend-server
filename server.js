// server.js (النسخة النهائية مع إعدادات CORS المتقدمة)
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require('dotenv').config();

const app = express();

// إعدادات CORS للسماح بالاتصال من أي مكان
app.use(cors({
  origin: '*' // يسمح لجميع النطاقات بالوصول، وهو مناسب لمشروعك
}));

app.use(express.json());

const HF_TOKEN = `Bearer ${process.env.HF_TOKEN}`;

app.post("/api/chat", async (req, res) => {
  try {
    const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": HF_TOKEN,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: { message: "Server failed to contact Hugging Face API." } });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server is running on port ${PORT}`));