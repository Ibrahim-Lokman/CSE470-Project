package com.quiz.service.impl;

import com.quiz.model.User;
import com.quiz.model.UserRole;
import com.quiz.repo.RoleRepository;
import com.quiz.repo.UserRepository;
import com.quiz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    // creating user
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {
       User local = this.userRepository.findByUsername(user.getUsername());
       if(local != null) {
           System.out.println("User already exits");
           throw new Exception("User already exits!!");
       } else{
            for(UserRole ur : userRoles){
                roleRepository.save(ur.getRole());
            }

            user.getUserRoles().addAll(userRoles);
            local = this.userRepository.save(user);
       }


        return local;
    }

    //getting user by username
    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }
}
