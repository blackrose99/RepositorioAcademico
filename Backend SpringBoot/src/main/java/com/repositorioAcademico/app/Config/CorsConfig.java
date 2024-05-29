package com.repositorioAcademico.app.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {
	 @Override
	    public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/api/**")
	        .allowedOrigins(
	                "http://localhost:3000", 
	                "https://443jgg2q-3000.use2.devtunnels.ms",
	                "http://443jgg2q-3000.use2.devtunnels.ms")
	            .allowedMethods("GET", "POST", "PUT", "DELETE")
	            .allowCredentials(true);
	    }
}
