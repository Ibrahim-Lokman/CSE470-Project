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
  marksGot = 0; 
  correctAnswer = 0;
  attempted = 0;
  isSubmit = false;
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

      this.questions.forEach((q:any) => {
        q['givenAnswer'] = '';
      });

      console.log(this.questions);
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

  submitQuiz(){
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isSubmit= true;
        this.questions.forEach((q:any) => {
          if(q.givenAnswer == q.answer){
            this.correctAnswer++;
            let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
            this.marksGot += marksSingle;
          }

          if (q.givenAnswer.trim() != ''){
            this.attempted++;
          }
    
        });
        console.log('Correct Answers: ' + this.correctAnswer);
        console.log('Marks Got: '+ this.marksGot);
        console.log('Attempted: '+ this.attempted);
      } 
    });

  }

}
