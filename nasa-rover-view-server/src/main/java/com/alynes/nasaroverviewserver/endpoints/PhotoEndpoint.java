package com.alynes.nasaroverviewserver.endpoints;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import javax.inject.Inject;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alynes.nasaroverviewserver.beans.PhotoList;
import com.alynes.nasaroverviewserver.services.PhotoService;

@CrossOrigin
@RestController
@RequestMapping("api/v1/")
public class PhotoEndpoint {
	
	@Inject
	private PhotoService photoService;
	
	@RequestMapping(value = "rovers/{name}/photos", method = RequestMethod.GET)
	public PhotoList getRoverPhotos(@PathVariable String name, @RequestParam("earth_date") String date) {
		return photoService.getPhotoList(name, date);
	}
	
	@RequestMapping(value = "rovers/{name}/photos/{id}", method = RequestMethod.GET)
	public ResponseEntity<byte[]> getImgUrl(@PathVariable String id, @RequestParam("img_src") String imgSrc) throws IOException {
		File file = photoService.getPhoto(imgSrc);
		return ResponseEntity.ok()
				.contentType(MediaType.IMAGE_JPEG)
				.body(Files.readAllBytes(file.toPath()));
	}

}
