import QRCode from 'qrcode';
import qrcode from 'qrcode-terminal';
import { sock } from './index.js';

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
const phoneNumber = "254789751049";

export function pairingCodeAuthentication(){
    sock.ev.on('connection.update', async (update) => {
            const{connection, lastDisconnect, qr } = update
            if(connection == 'connecting' || !!qr){
                const code = await sock.requestPairingCode(phoneNumber);
            }
        })
}