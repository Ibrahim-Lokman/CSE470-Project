package com.quiz.service;

import com.quiz.model.User;
import com.quiz.model.UserRole;

import java.util.Set;

public interface UserService {

    //user creation
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;

    //get user data by username
    public User getUser(String username);

    //delete user by id
    public void deleteUser(Long userId);

}
