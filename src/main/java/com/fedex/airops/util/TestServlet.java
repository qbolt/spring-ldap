package com.fedex.airops.util;

import java.io.IOException;
import java.util.List;

import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import com.fedex.airops.dao.User;

public class TestServlet extends HttpServlet {
	private static final Logger LOG = LogManager.getLogger(LDAPHelper.class);
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		try {
			String action = request.getParameter("action");
			if(action == null){
				
				populateUser(request);
				populateOrg(request);
				
				request.getRequestDispatcher("test.vm").forward(request, response);
				
			}else{
				
				queryUsers(request);
				response.setContentType("text/xml");
				request.getRequestDispatcher("data.vm").forward(request, response);
				
			}
		} catch (NamingException e) {
			LOG.error("", e);
		}
		
	}
	
	private void populateUser(HttpServletRequest request) throws NamingException{

		String id = request.getParameter("id");
		if(id != null){
			LOG.debug("Getting user: " + id);
			User user = LDAPHelper.getUserProfile(new User(id));
			LOG.debug(user);
			request.setAttribute("user", user);
		}
	}
	
	private void populateOrg(HttpServletRequest request) throws NamingException{

		String org = request.getParameter("org");
		if(org != null){
			LOG.debug("Getting users: " + org);
			List users = LDAPHelper.getEmployeesForOrgCode(org, new User());
			//LOG.debug(users);
			request.setAttribute("users", users);
		}
	}
	
	private void queryUsers(HttpServletRequest request) throws NamingException{
		
		String query = request.getParameter("query");
		List<User> users = LDAPHelper.searchProfiles(query);

		for(User user : users){
			LOG.debug(user);
		}
		request.setAttribute("users", users);
	}
	
}
