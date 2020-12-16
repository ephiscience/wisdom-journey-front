import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../game/game.component';

export interface Question {
  text: string
}

export interface Criterion {
  text: string
}

const questions = [
  { text: "Quel temps fait-il aujourd'hui?" },
  { text: "Comment vas-tu?" },
  { text: "C'est bien Angular?" },
  { text: "Blabla" }
]

function randomQuestion(): Question {
  const index = Math.floor(Math.random() * questions.length)

  return questions[index]
}

@Component({
  selector: 'app-board',
  template: `
    <div>
      board works!
      <button (click)="loadQuestion()">Nouvelle question</button>
      <div>
        <app-question [question]="displayedQuestion" [reversed]="true"></app-question>

        <div *ngIf="displayedCriterions.length; else noCriterion">
          <app-criterion-card *ngFor="let c of displayedCriterions" [criterion]="c" (validated)="onCriterionValidated(c)"></app-criterion-card>
        </div>
        <ng-template #noCriterion>Tous les critères ont été validés, bravo!</ng-template>

        <app-question [question]="displayedQuestion"></app-question>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class BoardComponent implements OnInit {
  displayedQuestion: Question | null = null
  displayedCriterions = [
    { text: "Expliquer" },
    { text: "Expliquer" },
    { text: "Expliquer" },
    { text: "Expliquer" },
    { text: "Decrire" },
    { text: "Plaisanter" }
  ]

  @Input() game: Game | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  onCriterionValidated(c: Criterion) {
    this.displayedCriterions = this.displayedCriterions.filter(
      e => e.text != c.text
    )
  }

  loadQuestion(){
    setTimeout(() => {
      this.displayedQuestion = randomQuestion()
    }, 3000)
  }
}
