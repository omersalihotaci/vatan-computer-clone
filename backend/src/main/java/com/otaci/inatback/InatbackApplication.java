package com.otaci.inatback;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Locale;

@SpringBootApplication
public class InatbackApplication {

	public static void main(String[] args) {
        Locale.setDefault(Locale.US);
        SpringApplication.run(InatbackApplication.class, args);
	}

}
