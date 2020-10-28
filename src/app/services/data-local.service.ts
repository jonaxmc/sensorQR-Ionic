import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.models';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicStorageModule } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro[]=[];

  constructor(private navCtrl:NavController,private inAppBrowser:InAppBrowser,private storage:Storage) { 
    this.cargarStorage();
  }


  async cargarStorage(){
    this.guardados=await this.storage.get('registros') || [];
  }
  async guardarRegistro(format:string, text: string){
    await this.cargarStorage();
    const nuevoRegistro=new Registro(format,text);
    this.guardados.unshift(nuevoRegistro);
    this.storage.set('registro',this.guardados);
    this.abrirRegistro(nuevoRegistro);
  }



  abrirRegistro(registro:Registro){
    this.navCtrl.navigateForward('/tabs/tab2');
    switch(registro.type){
      case 'http':
        //abrir un navegador
        this.inAppBrowser.create(registro.text, '_system');
      break;
      case 'geo':
        //abrir un mapa
      break;
    }
  }
}
