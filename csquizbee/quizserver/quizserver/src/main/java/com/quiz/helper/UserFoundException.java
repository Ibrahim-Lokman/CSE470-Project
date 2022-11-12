package com.quiz.helper;

public class UserFoundException extends Exception{

    public UserFoundException(){
        super("User Already exits, Try another name");
    }
    public UserFoundException(String msg) {
        super(msg);
    }

}
