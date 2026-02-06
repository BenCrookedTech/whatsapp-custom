import { error } from 'console';
import express from "express";
import { getSock } from "../whatsapp-client.js";

const router = express.Router();

router.get("/wa/status", (req, res) => {
  res.json({ ok: true });
});

router.post("/wa/send", async (req, res) => {
  try {
    const { to, text } = req.body;
    if (!to || !text) return res.status(400).json({ error: "to and text required" });

    const jid = to.includes("@s.whatsapp.net") ? to : `${to}@s.whatsapp.net`;
    const sock = getSock();
    const result = await sock.sendMessage(jid, { text });

    res.json({ ok: true, result });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.post("/wa/pairing-code", async (req, res) => {
    try {
        const {phoneNumber} = req.body;

        const sock = getSock();
        const code = await sock.requestPairingCode(phoneNumber);
        // if(!phoneNumber) return res.status(400).json({error: "phoneNumber required"});

        

        return res.json({ ok: true, code});
    } catch (error) {
        res.status(500).json({ok: false, error: error.message});
    }
});


export default router;
