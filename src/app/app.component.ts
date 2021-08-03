import { AfterViewInit, Component, OnInit ,ViewChild} from '@angular/core';

import { interval, Subscription } from 'rxjs';
import {take} from 'rxjs/operators';
import { GameService } from './services/game.service';

declare var M:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,AfterViewInit{
    
  title = "Memorizacion";
  bloquesDOM: any;

  points = 0;
  tiempoMsg = 0;

  waiting =  true;
  estadoMsg = "wating ...";

  modal:any;


  constructor(private gameService:GameService){
    
    this.bloquesDOM = document.getElementsByClassName('bloques');
    
  }

  ngOnInit(){
    var modalDOM = document.getElementById("gameOverPopup");
    this.modal = M.Modal.init(modalDOM);
   
    this.cargarLevel();
  }

  ngAfterViewInit(){

  }



  cargarLevel(){
    this.gameService.generateCorrectsBloques();
    this.mostrarBloquesCorrectos();

    this.gameService.tiempo$.subscribe(ns =>{
      this.tiempoMsg = ns + 1;
    },() => {},
    
    () =>{
      this.desmarcarBloques();
      this.waiting = false;
      this.estadoMsg = "GO!!";
    })
    
  }



  clickBloque(bloqueNum:number){
    if(this.waiting){
      return;
    }

    if(this.gameService.checkIfBloqueIsCorrect(bloqueNum)){
      this.gameService.sumarAcertadas();
      this.marcarBloque(bloqueNum);
      if(this.gameService.IsLevelComplete()){
        this.points ++;

        this.waiting = true;
        this.estadoMsg = "waiting ... ";


        this.gameService.resetAcertadas();
        this.desmarcarBloques();
        this.cargarLevel();
      }

    }else{
      this.points = 0;
      this.modal.open();
      
  
      this.waiting = true;
      this.estadoMsg = "waiting ..."


      this.desmarcarBloques();
      this.cargarLevel();
    }
  }

  mostrarBloquesCorrectos(){
    const BLOQUES_CORRECTOS  = this.gameService.getCORRECTS_BLOQUES;
    for(let i = 0 ; i < BLOQUES_CORRECTOS.length ; i ++){
      this.bloquesDOM[BLOQUES_CORRECTOS[i]].style.backgroundColor = "#2978B5";
    }
  }
  
  desmarcarBloques(){
    for(let i = 0; i < this.bloquesDOM.length; i++){
      this.bloquesDOM[i].style.backgroundColor = "#f5f5f5";
    }
  }

  marcarBloque(bloqNum:number){
    this.bloquesDOM[bloqNum].style.backgroundColor = "#2978B5";
  }




}
