import { Injectable } from '@angular/core';

import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private CORRECTS_BLOQUES : number[] = [];
  private COUNT_CORRECT = 0;


  points = 0;
  tiempoMsg: number = 0;
  tiempo$ = interval(1000).pipe(take(3));

  constructor() { }

  public get getCORRECTS_BLOQUES(){
    return this.CORRECTS_BLOQUES;
  }

  public get getCountsCorrect(){
    return this.COUNT_CORRECT;
  }

  
  generateCorrectsBloques(): void {
    this.CORRECTS_BLOQUES = [];
    const CANTIDAD_BLOQUES = this.getRandomNumber(4, 5);
    let count = 0;

    while (count < CANTIDAD_BLOQUES) {
      let bloque = this.getRandomNumber(0, 8);
      if (!this.checkIfBloqueIsCorrect(bloque)) {
        this.CORRECTS_BLOQUES.push(bloque);
        count = count + 1;
      }
    }
  }


  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }




  checkIfBloqueIsCorrect(bloqueNum: number) {
    let correct = false;
    for (let i = 0; i < this.CORRECTS_BLOQUES.length; i++) {
      if (this.CORRECTS_BLOQUES[i] === bloqueNum) {
        correct = true;
        break;
      }
    }
    return correct;
  }


  IsLevelComplete(){
    if(this.COUNT_CORRECT == this.CORRECTS_BLOQUES.length){
      return true;
    }
    return false;
  }


  sumarAcertadas(){
    this.COUNT_CORRECT ++;
  }

  resetAcertadas(){
    this.COUNT_CORRECT = 0;
  }


}
