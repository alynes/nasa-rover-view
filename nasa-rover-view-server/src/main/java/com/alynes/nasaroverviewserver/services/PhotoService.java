package com.alynes.nasaroverviewserver.services;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.inject.Inject;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.alynes.nasaroverviewserver.beans.PhotoList;
import com.alynes.nasaroverviewserver.client.NasaRestClient;

@Component
public class PhotoService {
	
	private static final String IMAGE_CACHE_PATH = "/tmp/";
	
	private final Logger logger = LoggerFactory.getLogger(PhotoService.class);

	@Inject
	private NasaRestClient nasaRestClient;
	
	public PhotoList getPhotoList(final String name, final String date) {
		return nasaRestClient.getPhotoList(name, date);
	}
	
	public File getPhoto(String url) throws IOException {
		final String sha = DigestUtils.sha512Hex(url);
		final String imageFileName = new StringBuilder(IMAGE_CACHE_PATH).append(sha).toString();
		
		File image;
		
		if (Files.exists(Paths.get(imageFileName))) { // Look for file in image cache first
			logger.trace("File {} found in cache", imageFileName);
			image = Paths.get(imageFileName).toFile();
		} else { // If not found in cache, go get it from NASA
			logger.trace("File {} NOT found in cache, requesting from {}", imageFileName, url);
			InputStream inputStream = nasaRestClient.getPhoto(url);
			Path cachedFile = Files.createFile(Paths.get(imageFileName));
			Files.copy(inputStream, cachedFile, StandardCopyOption.REPLACE_EXISTING);
			IOUtils.closeQuietly(inputStream);
			image = cachedFile.toFile();
		}
		
		return image;
	}
	
}
