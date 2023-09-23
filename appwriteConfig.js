import { Client, Databases, Account } from 'appwrite';

export const Project_ID = '64ece93c3874fcc25834'
export const Database_ID = '64ececed86d09fa7456f'
export const Colection_ID_Messages = '64ecee4325a05bc161d0'

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64ece93c3874fcc25834');
    export const databases = new Databases(client);
    export const account = new Account(client);

    export default client
    