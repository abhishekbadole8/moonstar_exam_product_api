const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/token", async (req, res) => {
  try {
    const response = await axios.post(
      `https://devcore02.cimet.io/v1/generate-token`,
      {},
      {
        headers: { "Api-key": process.env.API_KEY },
      }
    );
    if (response) {
      const data = response.data.data;
      res.send(data);
    }
  } catch (error) {
    console.log("Generate Token Error", error);
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const authToken = req.headers.auth_token;

    const payload = {
      session_id: process.env.SESSIONID,
    };

    const response = await axios.post(
      `https://devcore02.cimet.io/v1/plan-list`,
      payload,
      {
        headers: {
          "Api-key": process.env.API_KEY,
          "Auth-token": authToken,
        },
      }
    );
    if (response) {
      const data = response.data;
      res.send(data);
    }
  } catch (error) {
    console.log("Error fetching Products", error);
  }
});

app.listen(port, () => {
  console.log("Server Connection Established..", port);
});
