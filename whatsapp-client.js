import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState
} from "@whiskeysockets/baileys";
import pino from "pino";

const logger = pino({ level: "silent" });

let sock = null;

export async function initWhatsApp(io) {
  const { state, saveCreds } = await useMultiFileAuthState("./auth");

  sock = makeWASocket({
    auth: state,
    logger,
    browser: ["Android-Gateway", "Chrome", "1.0.0"],
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) io.emit("wa:qr", { qr });

    
    if (connection) io.emit("wa:status", { connection });

    if (connection === "close") {
      const statusCode = lastDisconnect?.error?.output?.statusCode;

      if (statusCode === DisconnectReason.loggedOut) {
        io.emit("wa:status", { connection: "logged_out" });
        sock = null;
        return;
      }

      io.emit("wa:status", { connection: "reconnecting" });
      await initWhatsApp(io);
    }
  });

  sock.ev.on("messages.upsert", ({ type, messages }) => {
    if (type !== "notify") return;

    for (const msg of messages) {
      io.emit("wa:message", {
        jid: msg.key.remoteJid,
        fromMe: msg.key.fromMe,
        id: msg.key.id,
        timestamp: msg.messageTimestamp,
        message: msg.message,
      });
    }
  });

  return sock;
}

export function getSock() {
  if (!sock) throw new Error("WhatsApp not initialized yet");
  return sock;
}
