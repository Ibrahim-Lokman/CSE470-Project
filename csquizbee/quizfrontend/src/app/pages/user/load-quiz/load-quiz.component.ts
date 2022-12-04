import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  catId = null as any;
  quizzes = null as any;
  constructor(private _route: ActivatedRoute, private _quiz: QuizService) { }

  ngOnInit(): void {

    this.catId = this._route.snapshot.params['catId'];
    if(this.catId == 0) {
      this._quiz.quizzes().subscribe(
        (data:any) => {
          this.quizzes = data;
          console.log(this.quizzes);
        },
        (error) => {
          alert("Error in loading quizzes");
        },
      );
    }else {
      console.log("Load specific quiz");

    }



  }

}
