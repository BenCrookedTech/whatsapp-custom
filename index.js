import dotenv from 'dotenv';
import makeWASocket, { useMultiFileAuthState } from 'baileys';
import pino from 'pino';
import QRCode from 'qrcode';
import { DisconnectReason } from 'baileys';
import { Boom } from '@hapi/boom';
import qrcode from 'qrcode-terminal';
import { qrCodeAuthentication, pairingCodeAuthentication } from './whatsapp-auth.js';

// const groupCache = new NodeCache({

// })


const {state, saveCreds} = await useMultiFileAuthState('./auth');

export const sock = makeWASocket({
    auth: state,
    logger: pino({level: 'silent'}),
    browser: ['Web-spy', 'Chrome', '1.0.0'],
    cachedGroupMetadata: async(jid) => groupCache.get(jid)

})

qrCodeAuthentication();

sock.ev.on('messaging-history.set', ({
    chats: newChats,
    contacts: newContacts,
    messages: newMessages,
    syncType
}) =>{
    
}
)