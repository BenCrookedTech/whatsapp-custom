import QRCode from 'qrcode';
import qrcode from 'qrcode-terminal';
import { sock } from './index.js';
import dotenv from 'dotenv';

dotenv.config();

const phoneNumber = process.env.PHONENUMBER;

export function qrCodeAuthentication(){
    sock.ev.on('connection.update', async(update) => {
        const{connection, lastDisconnect, qr} = update
        if(qr){
            
            qrcode.generate(qr, {small: true})
        }
        if(connection == 'close' && (lastDisconnect?.error instanceof Boom)?.output?.statusCode === DisconnectReason.restartRequired){
                sock();
            }
    })
}


export function pairingCodeAuthentication(){
    sock.ev.on('connection.update', async (update) => {
            const{connection, lastDisconnect, qr } = update
            if(connection == 'connecting' || !!qr){
                const code = await sock.requestPairingCode(phoneNumber);
            }
        })
}