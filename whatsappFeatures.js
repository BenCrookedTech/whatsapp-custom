import { sock } from "./index.js";

export function syncMessages(){
    sock.ev.on('messages.upsert', ({type, messages}) =>{
        if(type == "notify"){
            for(const message of messages){

            }
        }else{
            
        }
    })
}

export function updateMessages(){
    sock.ev.on('messages.update', async() =>{

    })
}

export function deleteMessages(){
    sock.ev.on('messages.delete', async() =>{

    })
}

export function deleteMessages(){
    sock.ev.on('messages.delete', async() =>{

    })
}

export function messageReaction(){
    //Whether a reaction was added or removed to a message

    sock.ev.on('messages.reaction', async() =>{

    })
}

export function whatsappReceipts(){
    sock.ev.on('message-receipt.update', async() =>{

    })
}


