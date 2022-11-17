import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories  = [
    {
      cid: 26,
      title: 'Programming Language'
   },
   {
    cid: 27,
    title: 'Linux'
 },
]

  constructor() { }

  ngOnInit(): void {
  }

}
