package com.quiz.controller;


import com.quiz.model.exam.Category;
import com.quiz.model.exam.Quiz;
import com.quiz.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;


    @PostMapping("/")
    public ResponseEntity<Quiz> add(@RequestBody Quiz quiz) {
        return ResponseEntity.ok(this.quizService.addQuiz(quiz));
    }

    @PutMapping("/")
    public ResponseEntity<Quiz> update(@RequestBody Quiz quiz){
        return ResponseEntity.ok(this.quizService.updateQuiz(quiz));
    }

    @GetMapping("/")
    public ResponseEntity<?> quizzes() {
        return ResponseEntity.ok(this.quizService.getQuizzes());
    }


    @GetMapping("/{qid}")
    public Quiz quiz (@PathVariable("qid") Long qid) {
        return this.quizService.getQuiz(qid);
    }

    @DeleteMapping("/{qid}")
    public void delete(@PathVariable("qid") Long qid) {
        this.quizService.deleteQuiz(qid);
    }




}
