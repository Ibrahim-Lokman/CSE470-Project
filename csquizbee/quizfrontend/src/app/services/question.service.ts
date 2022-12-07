import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private _http: HttpClient) { }

  public getQuestionsOfQuiz(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  public getQuestionsOfQuizForTest(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  public addQuestion(question:any){
    return this._http.post(`${baseUrl}/question/`, question);
  }

  public deleteQuestion(questionId:any){
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }

  public evalQuiz(questions:any){
    return this._http.post(`${baseUrl}/question/eval-quiz`, questions);
  }

}
