/*
 * SetsUtils.java Created on June 23, 2004
 * 
 * To change the template for this generated file go to
 * Window>Preferences>Java>Code Generation>Code and Comments
 */
package com.fedex.airops.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.SortedMap;
import java.util.StringTokenizer;
import java.util.TreeMap;

import javax.naming.AuthenticationException;
import javax.naming.CommunicationException;
import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import com.fedex.airops.dao.User;


/**
 * Helper class for building UserBeans based on LDAP information 
 */
public class LDAPHelper {
	private static final Logger LOG = LogManager.getLogger(LDAPHelper.class);

	//private static final String LDAP_SERVER_VALUE = "directory.fedex.com";
	//private static final String LDAP_PORT_VALUE = "389";
	//private static final String LDAP_CONTEXT_VALUE = "o=fedex,c=US";
	
	public static final String LDAP_SERVER = "ldap.server";
	public static final String LDAP_SSL_PORT = "ldap.port.ssl";
	public static final String LDAP_PORT = "ldap.port";
	public static final String LDAP_CONTEXT = "ldap.context";

	public static final String USER_ID = "uid";
	public static final String EMPLOYEE_NUMBER = "employeenumber";
	public static final String FIRST_NAME = "givenname";
	public static final String NICK_NAME = "nickname";
	public static final String LAST_NAME = "sn";
	public static final String MIDDLE_INITIAL = "initials";
	public static final String NAME_SUFFIX = "namesuffix";
	
	public static final String PAGER = "pager";
	public static final String PAGER_TYPE = "pagertype";
	public static final String MOBILE = "mobile";
	public static final String PHONE = "telephonenumber";
	public static final String MAIL = "mail";
	public static final String FAX_COMMUNITY = "faxcommunity";
	public static final String FAX_PRIVATE = "facsimiletelephonenumber";

	public static final String JOB_TITLE = "title";
	public static final String JOB_NUMBER = "jobnumber";
	public static final String VENDOR_TYPE = "vendortype";
	public static final String DEPT_NUMBER = "departmentnumber";
	public static final String EMPLOYEE_TYPE = "employeetype";
	public static final String EMPLOYEE_TYPE_CODE = "employmenttypecode";

	public static final String COMAT_STATION_ID = "comatstationid";
	public static final String STREET = "street";
	public static final String SUPPLEMENTAL_ADDRESS = "supplementaladdress";
	public static final String WORK_CITY = "l";
	public static final String POSTAL_CODE = "postalcode";
	public static final String COUNTRY_CODE = "countrycode";
	public static final String COUNTRY_NAME = "country";
	public static final String INTERNATIONAL_COUNTRY = "internationalcountry";
	public static final String WORK_STATE = "st";
	public static final String COMAT = "comat";
	public static final String COST_CENTER = "costcenter";
	public static final String DEPARTMENT_NAME = "departmentname";
	
	public static final String MANAGER_EMP_ID = "manager";
	public static final String MGMT_LEVEL = "managementlevel";
	
	public static final String URL = "labeleduri";
	

	
	public static final String[] LDAP_ATTRIBUTES = { USER_ID, LAST_NAME,
		FIRST_NAME, NICK_NAME, PAGER, PAGER_TYPE, MOBILE, MAIL, PHONE,
		COMAT_STATION_ID, JOB_TITLE, JOB_NUMBER, VENDOR_TYPE, DEPT_NUMBER,
		WORK_CITY, COUNTRY_CODE, COUNTRY_NAME, MANAGER_EMP_ID, MGMT_LEVEL,
		FAX_COMMUNITY, FAX_PRIVATE };

	public static final String[] LDAP_ATTRIBUTES_ALL = { USER_ID, LAST_NAME,
		FIRST_NAME, NICK_NAME, PAGER, PAGER_TYPE, MOBILE, MAIL, PHONE,
		COMAT_STATION_ID, JOB_TITLE, JOB_NUMBER, VENDOR_TYPE, DEPT_NUMBER, 
		WORK_CITY, COUNTRY_CODE, COUNTRY_NAME, MANAGER_EMP_ID, MGMT_LEVEL, 
		FAX_COMMUNITY, FAX_PRIVATE, 
		WORK_STATE, STREET, SUPPLEMENTAL_ADDRESS, NAME_SUFFIX, EMPLOYEE_NUMBER,
		MIDDLE_INITIAL, COMAT, EMPLOYEE_TYPE, POSTAL_CODE, COST_CENTER, DEPARTMENT_NAME,
		URL, INTERNATIONAL_COUNTRY};
	
	
	public static final String[] LDAP_ATTRIBUTES_ID = { USER_ID };

	private static final String[] LDAP_HIERARCHY_ATTRIBUTES = { USER_ID, MANAGER_EMP_ID, MGMT_LEVEL };

	private static final String LDAP_CONTEXT_FACTORY = "com.sun.jndi.ldap.LdapCtxFactory";


	public static DirContext getDirectoryContext() throws NamingException {
		DirContext ctx = null;

		Hashtable env = new Hashtable();
		String  url = getLdapUrl(false);
		
		env.put(Context.INITIAL_CONTEXT_FACTORY, LDAP_CONTEXT_FACTORY);
		env.put(Context.PROVIDER_URL, url);
		env.put(Context.SECURITY_AUTHENTICATION, "none");
		
		try{
			ctx = new InitialDirContext(env);
		}catch(CommunicationException e){
			LOG.error("error connecting to: ["+url+"]");
			NamingException ne = new NamingException();
            ne.setStackTrace(e.getStackTrace());
            throw ne;
		}

		return ctx;
	}

	
	
	public static void closeDirectoryContext(DirContext ctx) {
		if (ctx != null) {
			try {
				ctx.close();
			} catch (NamingException e) {
				LOG.error("Problem closing directory context",e);
			}
		}
	}

	
	
	public static User getUserProfile(User userProfile) {
		LOG.debug("TEST");
		return getUserProfile(userProfile, LDAP_ATTRIBUTES_ALL);
	}
	
	
	
	
	public static User getUserProfile(User userProfile, String[] ldapAttributes) {
		if (userProfile != null && userProfile.getEmpId() != null){
			DirContext dirCtx = null;
			try {
				dirCtx = getDirectoryContext();
				if (dirCtx != null){
					userProfile = getUserProfile(dirCtx, userProfile, ldapAttributes);
				}
			} catch (NamingException e) {
				LOG.error("NamingException",e);
				userProfile.setIsLdapUp(false);
			} finally {
				closeDirectoryContext(dirCtx);
			}
		}else{
			userProfile = null;
		}
		return userProfile;
	}

	
	
    public static User getUserProfile(DirContext dirCtx, User userProfile, String[] ldapAttributes) {
    	if (userProfile == null || userProfile.getEmpId() == null || userProfile.getEmpId().trim().length() == 0) {
			LOG.warn("Cannot retrieve profile if employee number not set!");
			return null;
		}
		LOG.debug("Getting Profile for: "+userProfile);
		
		Map ldapData = getUserMapData(dirCtx, userProfile, ldapAttributes);
		
		return buildUserProfile(userProfile, ldapData);
    	
    }
    
    
    public static Map getUserMapData(DirContext dirCtx, User userProfile, String[] ldapAttributes) {
		LOG.debug("Getting Map Data for: "+userProfile.getEmpId());
		Map ldapData = new Hashtable();
		
		try {
			String searchCriteria = "uid=" + userProfile.getEmpId().trim() + ",ou=People";

			Attributes answer = dirCtx.getAttributes(searchCriteria, ldapAttributes);
			//Attributes answer = dirCtx.getAttributes(searchCriteria);

			String attValue = "";
			String attID = "";
			LOG.debug("LDAP Answer: "+answer);
			for (NamingEnumeration ae = answer.getAll(); ae.hasMore();) {
				Attribute attr = (Attribute) ae.next();
				for (NamingEnumeration e = attr.getAll(); e.hasMore();) {
					attValue = (String) e.next();
					attID = attr.getID();
					//logger.debug("LDAP Attribute=[" + attID.toLowerCase() + "], Value = [" + attValue + "]");
					ldapData.put(attID.toLowerCase(), attValue);
				}
			}

		} catch (NamingException e) {
			userProfile.setIsLdapUp(false);
		}

		return ldapData;
	}
    
    
    
    
    
	private static String getLdapUrl(boolean useSSL) throws NamingException {
		String ldapUrl = null;
		String server = "directory.fedex.com";
		String port = "389";
		String context =  "o=fedex,c=US";
		
		
		if (server == null || port == null || context == null) {
			throw new NamingException(
					"Cannot read LDAP with the following Data"
							+ "LDAP Server =[" + server
							+ "],LDAP PORT = [" + port
							+ "],LDAP Context=[" + context + "]");
		}

		ldapUrl = "ldap://" + server.trim() + ":" + port.trim() + "/" + context.trim();
		LOG.debug("LDAP URL: " + ldapUrl);
		
		return ldapUrl;
	}
	
	
    public static void getEmployeeAttributeDump(String empId) throws NamingException{
    	DirContext dirCtx = getDirectoryContext();

		try {
			String searchCriteria = "ou=People";
			String parameters = USER_ID + "=" + empId;
			SearchControls sc = new SearchControls();
			sc.setSearchScope(SearchControls.SUBTREE_SCOPE);
			
			
	    	NamingEnumeration enumer = dirCtx.search(searchCriteria, parameters, sc);
	    	boolean isFound = false;
			while (enumer.hasMoreElements()) {
				LOG.debug("********************************************");
				isFound = true;
				SearchResult sr = (SearchResult) enumer.next();
				Attributes ab = sr.getAttributes();
				ab.getIDs();
				SortedMap sm = new TreeMap();
				for (NamingEnumeration ae = ab.getAll(); ae.hasMore();) {
					Attribute attr = (Attribute) ae.next();
					String attID = attr.getID();
					List data = new ArrayList();
					for (NamingEnumeration e = attr.getAll(); e.hasMore();) {
						String attValue = (String) e.next();
						if(!attID.startsWith("entrust")){
							//logger.debug(attID+" = ["+attValue+"]");
							data.add(attValue);
						}
					}
					Collections.sort(data);
					sm.put(attID,data);
				}
				
				for (Iterator i = sm.keySet().iterator();i.hasNext();) {
					Object key = i.next();
					List data = (List)sm.get(key);
					for (Iterator j = data.iterator();j.hasNext();) {
						LOG.debug(key+" = ["+j.next()+"]");
					}
					
				}
			}
			if(!isFound){
				LOG.debug("User not found!");
			}
		} finally {
			closeDirectoryContext(dirCtx);
		}
	}
	

	public static List getEmployeesForOrgCode(String orgCode, User userType) throws NamingException{

		DirContext dirCtx = getDirectoryContext();
		List employees = new ArrayList();
		try {
			employees = getEmployeesForOrgCode(orgCode, userType, dirCtx);
			
		} finally {
			closeDirectoryContext(dirCtx);
		}
		return employees;
	}
	
	public static List getEmployeesForOrgCode(String orgCode, User userType, DirContext dirCtx) throws NamingException{
		
		return searchProfiles(dirCtx, DEPT_NUMBER+"="+orgCode, LDAP_ATTRIBUTES, userType);
		
	}
	
	public static List getEmployeesForManager(String managerId, User userType) throws NamingException{
		List employees = new ArrayList();
		DirContext dirCtx = getDirectoryContext();
		
		try {
			employees = getEmployeesForManager(managerId, userType, dirCtx);
		} finally {
			closeDirectoryContext(dirCtx);
		}

		return employees;
	}
	
	
	public static List getEmployeesForManager(String managerId, User userType, DirContext dirCtx) throws NamingException{
		
		return searchProfiles(dirCtx, MANAGER_EMP_ID+"=uid\\="+managerId+",*", LDAP_ATTRIBUTES, userType);
		
	}

	public static List searchProfiles(String searchString) throws NamingException{
		
		List employees = new ArrayList();
		DirContext dirCtx = getDirectoryContext();
		
		try {

			LOG.debug(StringUtils.isAlphaSpace(searchString));
			LOG.debug(searchString.contains(" "));
			
			if(StringUtils.isNumeric(searchString)){
				searchString =  "" + USER_ID + "="+ searchString + "*";
				
			}else if(StringUtils.isAlphaSpace(searchString) && searchString.contains(" ")){
				LOG.debug("Splitting the name");
				String[] names = searchString.split(" ");
				searchString =  "(&(" + FIRST_NAME + "="+ names[0] + "*)(" + LAST_NAME + "="+ names[1] + "*))";
				
			}else{
				searchString =  "(|(" + FIRST_NAME + "="+ searchString + "*)(" + LAST_NAME + "="+ searchString + "*))";
				
			}
			
			LOG.debug("Filter: " + searchString);
			employees = searchProfiles(dirCtx, searchString, LDAP_ATTRIBUTES_ALL, new User());
		} finally {
			closeDirectoryContext(dirCtx);
		}

		return employees;
		
		
	}

    
    public static List searchProfiles(DirContext dirCtx, String filter, String[] attributes, User userType) throws NamingException{
		List employees = new ArrayList();

		SearchControls sc = new SearchControls();
		sc.setSearchScope(SearchControls.SUBTREE_SCOPE);
		sc.setReturningAttributes(attributes);
		LOG.debug(filter);
		NamingEnumeration answer = dirCtx.search("ou=People", filter, sc);
		
		
		while (answer.hasMore()) {
			//LOG.debug("**********************************");
			SearchResult sr = (SearchResult) answer.next();
			Map ldapData = new Hashtable();
			for (NamingEnumeration ae = sr.getAttributes().getAll(); ae.hasMore();) {
				Attribute attr = (Attribute) ae.next();
				for (NamingEnumeration e = attr.getAll(); e.hasMore();){
					String value = (String)e.next();
					//LOG.debug(sr.getName()+" - "+attr.getID()+":"+value);
					ldapData.put(attr.getID(), value);
				}
			}
			User user = buildUserProfile(userType.newUser(), ldapData);
			//LOG.info("Profile: "+user);
			employees.add(user);
		}

		return employees;
    }

	/**
	 * @param ldapData
	 * @return
	 */
	private static User buildUserProfile(User userProfile, Map ldapData) {
		//LOG.debug(ldapData);
		userProfile.setEmpId((String) ldapData.get(USER_ID));
		userProfile.setLastName((String) ldapData.get(LAST_NAME));
		if (ldapData.get(NICK_NAME) != null
				&& ((String) ldapData.get(NICK_NAME)).trim().length() > 0) {
			userProfile.setFirstName((String) ldapData.get(NICK_NAME));
		} else {
			userProfile.setFirstName((String) ldapData.get(FIRST_NAME));
		}
		userProfile.setPager((String) ldapData.get(PAGER));
		userProfile.setPagerType((String) ldapData.get(PAGER_TYPE));
		userProfile.setMobile((String) ldapData.get(MOBILE));
		userProfile.setPhone((String) ldapData.get(PHONE));
		userProfile.setEmail((String) ldapData.get(MAIL));

		userProfile.setComat((String) ldapData.get(COMAT));
		userProfile.setComatStationId((String) ldapData.get(COMAT_STATION_ID));
		userProfile.setJobTitle((String) ldapData.get(JOB_TITLE));
		userProfile.setJobCode((String) ldapData.get(JOB_NUMBER));
		userProfile.setVendorType((String) ldapData.get(VENDOR_TYPE));
		userProfile.setOrgCode((String) ldapData.get(DEPT_NUMBER));

		userProfile.setAddressLine1((String) ldapData.get(STREET));
		userProfile.setAddressLine2((String) ldapData.get(SUPPLEMENTAL_ADDRESS));
		userProfile.setWorkCity((String) ldapData.get(WORK_CITY));
		userProfile.setWorkState((String) ldapData.get(WORK_STATE));
		userProfile.setPostalCode((String) ldapData.get(POSTAL_CODE));
		userProfile.setCountryCode((String) ldapData.get(COUNTRY_CODE));
		userProfile.setCountryName((String) ldapData.get(COUNTRY_NAME));
		
		userProfile.setManagerEmpId(getManagerValue((String)ldapData.get(MANAGER_EMP_ID)));
		
		int mgmtLevel = 0;
		if (ldapData.get(MGMT_LEVEL) != null){
			mgmtLevel = new Integer((String) ldapData.get(MGMT_LEVEL)).intValue();
		}
		userProfile.setMgmtLevel(mgmtLevel);
		
		if (ldapData.get(FAX_PRIVATE) != null
				&& ((String) ldapData.get(FAX_PRIVATE)).trim().length() > 0) {
			userProfile.setFaxNumber((String) ldapData.get(FAX_PRIVATE));
		} else {
			userProfile.setFaxNumber((String) ldapData.get(FAX_COMMUNITY));
		}
		userProfile.setIsLdapUp(true);
		return userProfile;
	}
	
	private static String getManagerValue(String haystack){
		String id = null;
		if(haystack != null){
			try{
				StringTokenizer managerAttr = new StringTokenizer(haystack, ",");

				while (managerAttr.hasMoreTokens()) {
					String mgrAttValue = (String) managerAttr.nextElement();
					// logger.debug("The Manager AttID=[" + attValue + "]");

					if (mgrAttValue.indexOf(USER_ID) > -1) {
						int index = mgrAttValue.indexOf("=");
						id = mgrAttValue.substring(index + 1);
					}
				}
			}catch (IndexOutOfBoundsException e) {
				LOG.debug("Problem with value=["+haystack+"]",e);
				id = haystack;
			}
		}
		return id;
	}
	
	public static boolean authenticate(String userId, String password) 
			throws NamingException{
		boolean isValid = false;
		
		DirContext dirCtx = null;
		String ldapUrl = getLdapUrl(true);
		try{
		        
			Hashtable env = new Hashtable();
	
			String principal = "uid=".concat(userId.concat( ", ou=people, o=fedex, c=us"));
			
			env.put(Context.INITIAL_CONTEXT_FACTORY, LDAP_CONTEXT_FACTORY);
			env.put(Context.PROVIDER_URL, ldapUrl);
			//env.put(Context.PROVIDER_URL, "ldap://directory.fedex.com:636/ou=messaging,dc=corp,dc=fedex,dc=com");
			//env.put(Context.PROVIDER_URL, "ldap://apptstldap.corp.fedex.com:636/ou=messaging,dc=corp,dc=fedex,dc=com");
			env.put(Context.SECURITY_PROTOCOL, "ssl");
			env.put(Context.SECURITY_AUTHENTICATION, "none");
			env.put(Context.SECURITY_AUTHENTICATION, "simple");
			env.put(Context.SECURITY_PRINCIPAL, principal );
			env.put(Context.SECURITY_CREDENTIALS, password );
	
			dirCtx = new InitialDirContext(env);

		    // Bind and authenticate
			dirCtx = new InitialDirContext(env);
			isValid = true;
        } catch (AuthenticationException e) {			// username/password failure
            //logger.debug("Authentication failed!");
        } catch (CommunicationException e) {			// pure communication failure
            LOG.warn("Communication failure to: "+ldapUrl,e);
            NamingException ne = new NamingException();
            ne.setStackTrace(e.getStackTrace());
            throw ne;
        } finally {
        	closeDirectoryContext(dirCtx);
        }
		
		
		return isValid;
	}
}