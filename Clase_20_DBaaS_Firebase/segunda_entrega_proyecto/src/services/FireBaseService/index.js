import { initializeApp } from 'firebase-admin/app';
/* import {} from "./CONFIG_DB.json" assert { type: "json" } */
initializeApp()



const conection = async()=>{
	try{
		const db=   conect.firestore();
		console.log('FIREBASE CONECTADO')
		return db
	}
	catch(e){
		console.log('ERROR AL CONECTAR A FIREBASE ',e)
	}

}
export const FireBaseService = {initializeApp}; 

