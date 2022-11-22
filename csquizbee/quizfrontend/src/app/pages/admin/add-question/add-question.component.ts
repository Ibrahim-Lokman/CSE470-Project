import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { QuestionService } from '../../../services/question.service';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {



  qId = null as any;
  qTitle = null as any;
  question = {
    quiz : {} as any,
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',

  };

  constructor(private _route: ActivatedRoute,
    private _question: QuestionService,
    ) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.question.quiz['qid'] = this.qId;
  }

  formSubmit() {

    if (this.question.content.trim()== '' || this.question.content == null) {
      return;
  }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      return;
  }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      return;
  }
    if (this.question.answer.trim() == '' || this.question.answer == null) {
      return;
}

  this._question.addQuestion(this.question).subscribe(
    (data: any) => {
      Swal.fire('success', 'Question Added', 'success');
      this.question.content = '';
      this.question.option1 = '';
      this.question.option2 = '';
      this.question.option3 = '';
      this.question.option4 = '';
      this.question.answer = '';
    },
    (error) => {
      Swal.fire('Error', 'Error in adding question', 'error');
    }
    );

}
}