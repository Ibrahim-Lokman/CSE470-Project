import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

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


  deleteQuestion(qId:any) {

    Swal.fire(
      {
        icon: "info",
        title: "Sure I want to delete",
        confirmButtonText: "Yes, delete",
        showCancelButton: true,
      }).then((result) => {
        if(result.isConfirmed) {
          this._question.deleteQuestion(qId).subscribe( 
            (data:any) => {
            this.questions = this.questions.filter((q:any) => q.quesId != qId); 
            Swal.fire('Success', 'Quiz deleted successfully','success');
          },(error) => {
            Swal.fire('Error', 'Error in deleting','error');
          }
          );
        }
      });
   }

}
