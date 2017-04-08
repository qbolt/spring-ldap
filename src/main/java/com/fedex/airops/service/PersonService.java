package com.fedex.airops.service;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.URL;
import java.util.LinkedList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fedex.airops.dao.Person;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Service
public class PersonService {

	private final static String dataUrl = "https://api.myjson.com/bins/qiver";
	
	private List<Person> personList = new LinkedList<>();
	
	public PersonService() {
		try {

			URL url = new URL(dataUrl);
			//Proxy proxy = new Proxy(Proxy.Type.HTTP, new InetSocketAddress("internet.proxy.fedex.com", 3128));
			//HttpURLConnection connection = (HttpURLConnection) url.openConnection(proxy);
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			InputStream input = connection.getInputStream();
			this.personList = new Gson().fromJson(new InputStreamReader(input, "UTF-8"), new TypeToken<List<Person>>() {
			}.getType());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public List<Person> getPersonList() {
		return this.personList;
	}

}
