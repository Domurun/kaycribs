// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Allow your HTML file to talk to this server
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  try {
    const data = await resend.emails.send({
      // Use 'onboarding@resend.dev' for testing if you haven't verified a domain yet
      from: 'kaycribs@resend.dev', 
      to: 'domurunbeeyah@gmail.com', // Replace with where you want to RECEIVE the leads
      subject: `New Inquiry from ${name}: ${service}`,
      html: `
        <h2>New Website Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service Needed:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));