import MongoStore from "wwebjs-mongo/src/MongoStore";
import dotenv from 'dotenv';

dotenv.config();

const {Client, RemoteAuth, Client} = require('whatsapp-web.js');
const {MongoStore} = require('wwebjs-mongo');

const mongoose = require('mongoose');
const mongodbUrl = process.env.MONGODB_URL;
export function cloudStore(){
    try {

        mongoose.connect(mongodbUrl).then(() => {
        const store = new MongoStore({mongoose: mongoose });
        const Client = new Client({
        authStrategy: new RemoteAuth({
            store: store,
            backupSyncIntervalMs: 300000
        })
    });

    client.initialize();

    console.log("connected successfully!");
    
});
        
    } catch (error) {
        console.log(error);
    }
}
