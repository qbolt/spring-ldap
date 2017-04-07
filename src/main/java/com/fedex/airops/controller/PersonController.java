package com.fedex.airops.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fedex.airops.dao.Person;

@RestController
@RequestMapping("/api")
public class PersonController {

	@GetMapping("/")
	public List<Person> getPersonList() {
		return personService.getPersonList();
	}
	
}
