package com.alynes.nasaroverviewserver.endpoints;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alynes.nasaroverviewserver.beans.RoverList;
import com.alynes.nasaroverviewserver.services.RoverService;

@CrossOrigin
@RestController
@RequestMapping("api/v1/")
public class RoverEndpoint {

	@Inject
	private RoverService roverService;
	
	@RequestMapping(value = "rovers", method = RequestMethod.GET)
	public RoverList getRovers() {
		return roverService.getRoverList();
	}
}
