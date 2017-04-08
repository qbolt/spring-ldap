package com.fedex.airops.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fedex.airops.dao.Person;
import com.fedex.airops.service.PersonService;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
public class PersonController {

	PersonService personService;
	
	@Autowired
	public PersonController(PersonService personService) {
		this.personService = personService;
	}

	@GetMapping("/personList")
	public List<Person> getPersonList() {
		return personService.getPersonList();
	}
	
	@GetMapping("/test")
	public String getTest() {
		return "test";
	}
}
