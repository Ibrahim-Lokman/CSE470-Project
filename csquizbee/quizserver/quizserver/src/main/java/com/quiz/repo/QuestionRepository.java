package com.quiz.repo;

import com.quiz.model.exam.Question;
import com.quiz.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Set<Question> findByQuiz(Quiz quiz);
}
