const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: "aniketdesai1103@outlook.com",
    pass: "aniketneo11",
  },
});

app.post("/send-email", async (req, res) => {
  try {
    const {
      selectedTime,
      customTime,
      pickupOption,
      name,
      age,
      gender,
      hot_cute,
    } = req.body;

    const mailOptions = {
      from: "aniketdesai1103@outlook.com",
      to: "aniketd936@gmail.com",
      subject: `Shruu's Response`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Hot or Cute:</strong> ${hot_cute}</p>
        <p><strong>Selected Time:</strong> ${selectedTime}</p>
        <p><strong>Custom Time:</strong> ${customTime}</p>
        <p><strong>Pickup Option:</strong> ${pickupOption}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    res.status(201).json({
      status: 201,
      message: "Email sent successfully",
      response: info.response,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Internal Server error");
  }
});

app.get("/test", async (req, res) => {
  try {

    res.send("test")
  } catch (error) {
    res.status(500).send("Internal Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
