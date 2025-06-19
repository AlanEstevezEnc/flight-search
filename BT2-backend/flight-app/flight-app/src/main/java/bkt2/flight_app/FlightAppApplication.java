package bkt2.flight_app;

import bkt2.flight_app.manager.TokenManager;
import bkt2.flight_app.manager.TokenResponse;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class FlightAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlightAppApplication.class, args);

		//RestTemplateBuilder rt = new RestTemplateBuilder();
		//TokenManager tk = new TokenManager(new RestTemplateBuilder());

		//System.out.println(tk.getToken());
		//tk.init();

	}

}
