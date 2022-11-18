import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(
    private _route:ActivatedRoute, 
    private _quiz: QuizService,
    private _cat:CategoryService, 
    private _snack:MatSnackBar,
    private _router:Router ) {}

  qId = 0;
  quiz = null as any;
  categories  = [] as any;


  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    
    this._quiz.getQuiz(this.qId).subscribe(
      (data:any) => {
      this.quiz = data;
      console.log(this.quiz);
  },
  (error) => {
    console.log(error);
    Swal.fire("Error!!", "Error in loading data","error")
  });


  this._cat.categories().subscribe((data:any) => {
    this.categories = data;
    console.log(this.categories);
  },
  (error) => {
    console.log(error);
    Swal.fire('Error!!', 'Error in loading data from server', 'error');
  }
  );

  }

  public updateData(){

    if(this.quiz.title.trim()== '' || this.quiz.title == null ){
      this._snack.open('Title is required', '', {
        duration: 3000,
      });
      return;
    }

    this._quiz.updateQuiz(this.quiz).subscribe((data:any) => {
      Swal.fire('Update', 'Quiz update successfully','success').then((e) =>{
        this._router.navigate(['/admin/quizzes']);
      });
    },
    (error) => {
      console.log(error);
      Swal.fire('Error...', 'Something went wrong! please try again.', 'error');
    });
  }

}
