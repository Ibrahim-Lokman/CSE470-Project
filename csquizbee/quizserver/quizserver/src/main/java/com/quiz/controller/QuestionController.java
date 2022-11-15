package com.quiz.controller;


import com.quiz.model.exam.Question;
import com.quiz.model.exam.Quiz;
import com.quiz.service.QuestionService;
import com.quiz.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")


public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;


    @PostMapping("/")
    public ResponseEntity<Question> add(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    @PutMapping("/")
    public ResponseEntity<Question> update(@RequestBody Question question) {
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    @GetMapping("/quiz/{qid}")
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qid") Long qid) {
   /*
        Quiz quiz = new Quiz();
        quiz.setQid(qid);
        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);
    */
        Quiz quiz = this.quizService.getQuiz(qid);
        Set<Question> questions =  quiz.getQuestions();
        List list = new ArrayList(questions);
        if(list.size() > Integer.parseInt(quiz.getNumberOfQuestions())){
            list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions() + 1));
        }

        Collections.shuffle(list);
        return ResponseEntity.ok(list);

    }


    @GetMapping("/{quesId}")
    public Question get(@PathVariable("quesId") Long quesId){
        return this.questionService.getQuestion(quesId);
    }

    @DeleteMapping("/{quesId}")
    public void delete(@PathVariable("quesId") Long quesId){
        this.questionService.deleteQuestion(quesId);
    }
}
