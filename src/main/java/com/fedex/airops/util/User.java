
package com.fedex.airops.util;

import java.io.Serializable;

public class User implements Comparable, Serializable {
	private String authenticationSource;
	private String token;
	private String empId;
	private String firstName;
	private String lastName;
	
	private String station;
	private String department;
	private String comat;
	private String comatStationId;
	private String addressLine1;
	private String addressLine2;
	private String postalCode;
	private String workCity;
	private String workState;
	private String countryCode;
	private String countryName;
	
	private String email;
	private String pager;
	private String pagerType;
	private String mobile;
	private String phone;
	
	private String jobTitle;
	private String jobCode;
	private String vendorType;
	private String orgCode;
	
	
	private String managerEmpId;
	private int mgmtLevel;
	private String FaxNumber;
	private boolean isLdapUp;
	private boolean autoLoadStationDepartment = true;
	
	public User newUser(){
		return new User();
	}
	
	public User(){}
	
	public User(String empId){
		setEmpId(empId);
	}
	
	public String getAuthenticationSource() {
		return authenticationSource;
	}
	public void setAuthenticationSource(String authenticationSource) {
		this.authenticationSource = authenticationSource;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getEmpId() {
		return empId;
	}
	public void setEmpId(String empId) {
		this.empId = empId;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getStation() {
		return station;
	}
	public void setStation(String station) {
		this.station = station;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPager() {
		return pager;
	}
	public void setPager(String pager) {
		this.pager = pager;
	}
	public String getPagerType() {
		return pagerType;
	}
	public void setPagerType(String pagerType) {
		this.pagerType = pagerType;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getComat() {
		return comat;
	}
	public void setComat(String comat) {
		this.comat = comat;
	}
	public String getComatStationId() {
		return comatStationId;
	}
	public void setComatStationId(String comatStationId) {
		this.comatStationId = comatStationId;
	}
	public String getJobTitle() {
		return jobTitle;
	}
	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}
	public String getJobCode() {
		return jobCode;
	}
	public void setJobCode(String jobCode) {
		this.jobCode = jobCode;
	}
	public String getVendorType() {
		return vendorType;
	}
	public void setVendorType(String vendorType) {
		this.vendorType = vendorType;
	}
	public String getOrgCode() {
		return orgCode;
	}
	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}
	public String getAddressLine1() {
		return addressLine1;
	}
	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}
	public String getAddressLine2() {
		return addressLine2;
	}
	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}
	public String getPostalCode() {
		return postalCode;
	}
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
	public String getWorkCity() {
		return workCity;
	}
	public void setWorkCity(String workCity) {
		this.workCity = workCity;
	}
	public String getWorkState() {
		return workState;
	}
	public void setWorkState(String workState) {
		this.workState = workState;
	}
	public String getCountryCode() {
		return countryCode;
	}
	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}
	public String getCountryName() {
		return countryName;
	}
	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}
	public String getManagerEmpId() {
		return managerEmpId;
	}
	public void setManagerEmpId(String managerEmpId) {
		this.managerEmpId = managerEmpId;
	}
	public int getMgmtLevel() {
		return mgmtLevel;
	}
	public void setMgmtLevel(int mgmtLevel) {
		this.mgmtLevel = mgmtLevel;
	}
	public String getFaxNumber() {
		return FaxNumber;
	}
	public void setFaxNumber(String faxNumber) {
		FaxNumber = faxNumber;
	}
	public boolean isLdapUp() {
		return isLdapUp;
	}
	public void setIsLdapUp(boolean isLdapUp) {
		this.isLdapUp = isLdapUp;
	}
	public boolean isAutoLoadStationDepartment() {
		return autoLoadStationDepartment;
	}
	public void setAutoLoadStationDepartment(boolean autoLoadStationDepartment) {
		this.autoLoadStationDepartment = autoLoadStationDepartment;
	}
	
	public String getFullName(){
		return firstName + " " + lastName;
	}

	public String toString() {
		StringBuffer buffer = new StringBuffer("User: ");
		buffer.append("EmpId=[" + getEmpId()+"], ");
		buffer.append("firstName=[" + getFirstName()+"], ");
		buffer.append("lastName=[" + getLastName()+"], ");
		buffer.append("station=[" + getStation()+"], ");
		buffer.append("department=[" + getDepartment()+"], ");
		buffer.append("orgCode=[" + getOrgCode()+"], ");
		buffer.append("jobTitle=[" + getJobTitle()+"], ");
		buffer.append("jobCode=[" + getJobCode()+"], ");
		buffer.append("vendorType=[" + getVendorType()+"], ");
		buffer.append("email=[" + getEmail()+"], ");
		buffer.append("phone=[" + getPhone()+"], ");
		buffer.append("faxNumber=[" + getFaxNumber()+"], ");
		buffer.append("managerEmpId=[" + getManagerEmpId()+"], ");
		buffer.append("mgmtLevel=[" + getMgmtLevel()+"], ");
		buffer.append("authenticationSource=[" + getAuthenticationSource()+"], ");
		buffer.append("token=[" + getToken()+"], ");
		return buffer.toString();
	}
	
	public int hashCode() {
		return toString().hashCode();
	}
	
    public boolean equals(Object o) {

		if (o == null) {
			return false;
		}

		return ((User) o).toString().equalsIgnoreCase(toString());
	}
    
    public int compareTo(Object o) {
		return toString().compareTo(((User) o).toString());
	}
}
