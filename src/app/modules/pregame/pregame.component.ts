import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentGameService } from 'src/app/services/current-game.service';
import { Player } from 'src/app/modules/pregame/player-selection/player-selection.component';
import { ModalConfig } from 'src/app/modules/shared/mymodal/mymodal.config';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MymodalComponent } from 'src/app/modules/shared/mymodal/mymodal.component';

@Component({
  selector: 'app-pregame',
  template: `
    <div>
      <button type="button" id="button" class="btn btn-outline-dark" style="margin: auto" (click)="openModalTwo()">Click me</button>
    </div>
    <app-mymodal #modal [modalConfig]="modalConfig"> It works! </app-mymodal>
    <app-modal
      *ngIf="home"
      (answer)="closeModal($event)"
      title="Quitter"
      content="Etes vous surs de vouloir quitter la partie en cours ?"
    ></app-modal>
    <div class="container">
      <app-player-selection *ngIf="!this.level" (numPlayers)="loadLevelSelection($event)"></app-player-selection>
      <app-level-selection *ngIf="this.level" [playerNames]="this.playerNames"></app-level-selection>
      <button class="home" (click)="openModal()"></button>
    </div>
  `,
  styles: [
    `
      div.container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100vh;
      }

      button.play {
        width: 567px;
        height: 114px;
        background: #ffa935 0% 0% no-repeat padding-box;
        box-shadow: 3px 3px 3px #0000005f;
        border: 3px solid #707070;
        border-radius: 74px;
        text-align: center;
        font: normal normal normal 70px/82px Chela One;
        letter-spacing: 0px;
        cursor: pointer;
      }

      button.home {
        position: fixed;
        bottom: 1%;
        right: 1%;
        width: 56px;
        height: 56px;
        background: transparent url('../../../assets/images/home@2x.png') 0% 0% no-repeat padding-box;
        background-size: contain;
        border: 0px;
        cursor: pointer;
      }
    `,
  ],
})
export class PregameComponent {
  level = false;
  playerNames!: string[];
  home = false;

  constructor(private cg: CurrentGameService, private router: Router, private modalService: NgbModal) {}

  openModal(): void {
    this.home = true;
  }

  closeModal(answerFromModal: boolean): void {
    this.home = false;
    if (answerFromModal === true) {
      this.router.navigate(['']);
    }
  }

  loadLevelSelection(players: Player[]): void {
    this.playerNames = players.map((p) => p.name);
    this.level = true;
  }

  @ViewChild('modal') private modal!: MymodalComponent;

  public modalConfig: ModalConfig = {
    modalTitle: 'Title',
    onDismiss: () => {
      return true;
    },
    dismissButtonLabel: 'Dismiss',
    onClose: () => {
      return true;
    },
    closeButtonLabel: 'Close',
  };

  async openModalTwo() {
    return await this.modal.open();
  }
}
