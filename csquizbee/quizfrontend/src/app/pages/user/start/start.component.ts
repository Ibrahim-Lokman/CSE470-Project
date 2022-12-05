import { Component, OnInit } from '@angular/core';
import {LocationStrategy} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid = 0;
  questions = {} as any;
  constructor(
    private locationSt: LocationStrategy, 
    private _route: ActivatedRoute,
    private _question: QuestionService
    ){ }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();
  }
  loadQuestions(){
    this._question
    .getQuestionsOfQuizForTest(this.qid)
    .subscribe((data:any) => {
      this.questions = data;
      console.log(data);
    },
    (error:any) => {
      console.log(error);
      Swal.fire("Error!!", "Error in loading question of quiz","error")
    }
    );
  }

  preventBackButton(){
    history.pushState('', '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState('', '', location.href);
    });
  }

}
