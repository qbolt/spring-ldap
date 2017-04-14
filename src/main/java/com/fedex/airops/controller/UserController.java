package com.fedex.airops.controller;

import java.util.List;

import javax.naming.NamingException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fedex.airops.dao.User;
import com.fedex.airops.util.LDAPHelper;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000") // enables webpack-dev-server to be able to communicate with spring-dev-server
public class UserController {

	//Convert LDAP helper to service to avoid throwing exceptions to client. Static classes could/should injected services managed by spring.
	@GetMapping("/users/user/{id}")
	public User getUser(@PathVariable("id") String id) {
		return LDAPHelper.getUserProfile(new User(id));
	}
	
	@GetMapping("/users/query/{query}")
	public List<User> getUsers(@PathVariable("query") String query) throws NamingException {
		return LDAPHelper.searchProfiles(query);
	}

	@GetMapping("/org/{org}")
	public List<User> getOrgUsers(@PathVariable("org") String org) throws NamingException {
		return LDAPHelper.getEmployeesForOrgCode(org, new User());
	}
}
