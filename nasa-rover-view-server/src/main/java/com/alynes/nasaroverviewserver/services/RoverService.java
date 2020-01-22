package com.alynes.nasaroverviewserver.services;

import javax.inject.Inject;

import org.springframework.stereotype.Component;

import com.alynes.nasaroverviewserver.beans.RoverList;
import com.alynes.nasaroverviewserver.client.NasaRestClient;

@Component
public class RoverService {
	
	@Inject
	private NasaRestClient nasaRestClient;
	
	public RoverList getRoverList() {
		return nasaRestClient.getRoverList();
	}

}
