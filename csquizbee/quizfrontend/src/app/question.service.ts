import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './services/helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private _http: HttpClient) { }

  public getQuestionsOfQuiz(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

}
