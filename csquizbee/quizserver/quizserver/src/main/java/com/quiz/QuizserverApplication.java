package com.quiz;

import com.quiz.helper.UserFoundException;
import com.quiz.model.Role;
import com.quiz.model.User;
import com.quiz.model.UserRole;
import com.quiz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class QuizserverApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public static void main(String[] args) {

		SpringApplication.run(QuizserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		try {
			System.out.println("starting code");


			User user = new User();
			user.setFirstName("Ibrahim");
			user.setLastName("Lokman");
			user.setUsername("admin1");
			user.setPassword(this.bCryptPasswordEncoder.encode("admin1"));
			user.setEmail("ibrahim31@gmail.com");
			user.setProfile("default.png");

			Role role1 = new Role();
			role1.setRoleId(44L);
			role1.setRoleName("Admin");

			Set<UserRole> userRoleSet = new HashSet<>();
			UserRole userRole = new UserRole();
			userRole.setRole(role1);
			userRole.setUser(user);
			userRoleSet.add(userRole);

			User user1 = this.userService.createUser(user, userRoleSet);
			System.out.println(user1.getUsername());

		}catch (UserFoundException e){
			e.printStackTrace();
		}

	}
}
