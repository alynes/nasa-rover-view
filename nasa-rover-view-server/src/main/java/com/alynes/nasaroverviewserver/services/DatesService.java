package com.alynes.nasaroverviewserver.services;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Stream;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;


@Component
public class DatesService {
	
	private final Logger logger = LoggerFactory.getLogger(DatesService.class);
	private List<String> dateList = new ArrayList<String>();
	
	public List<String> getDates() {
		return dateList;
	}
	
	@PostConstruct
	public void initializeDates() {
		String fileName = "/imageDates.txt";
		
		try (InputStream inputStream = getClass().getResourceAsStream(fileName);
				Stream<String> stream = new BufferedReader(new InputStreamReader(inputStream)).lines()) {
			
			String[] possibleFormats = {
				"MM/dd/yy",
				"MMM d, yyyy",
				"MMM-d-yyyy"
			};
			
			stream.forEach(date -> {
				try {
					logger.trace("Raw date from file: {}", date);
					Date parsedDate = DateUtils.parseDateStrictly(date, possibleFormats);
					SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
					dateList.add(formatter.format(parsedDate));
				} catch (ParseException e) {
					logger.error("{} is an invalid date.", date, e.getMessage());
				}
			});
			
		} catch (Exception e) {
			logger.error("Error reading file {}", fileName, e.getStackTrace());
		}
	}
}
