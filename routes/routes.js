import { error } from 'console';
import express from 'express';
import { getSock } from '../whatsapp-client.js';

const router = express.Router();
const app = express();
app.use(express.json);

app.get("/wa/status", (res, req) => {
    res.json({ ok: true});
});

app.post("/wa/send", async(res, req) => {
    try {
        const {to, text} = req.body;
        if(!to || !text) return res.statusCode(400).json({error: "to and text required"});

        const jid = to.includes("@s.whatsapp.net") ? to : `${to}@s.whatsapp.net`;
        const sock = getSock();

        const result = await sock.sendMessage(jid, {text});
        res.json({ ok: true, result});
    } catch (error) {
        res.status(500).json({ok: false, error: e.message});
    }
})

app.get("/api/wa/chats", (req, res) => {
    const chats = store.chats.all().map((c) => ({
        id: c.id,
        name: c.name,
        unreadCount: c.unreadCount,
    }));
    res.json({ok: true, chats });
});

export default router;