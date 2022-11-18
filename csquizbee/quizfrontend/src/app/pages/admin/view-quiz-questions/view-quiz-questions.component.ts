import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../question.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId= null as any;
  qTitle = null as any;
  questions = [] as any;

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];

    this._question.getQuestionsOfQuiz(this.qId).subscribe((data:any) => {
      console.log(data)
      this.questions = data;
    }, (error) => {
      console.log(error);
    }
    );

  }

}
