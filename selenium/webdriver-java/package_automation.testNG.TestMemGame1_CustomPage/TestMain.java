package automation.testNG.TestMemGame1_CustomPage;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class TestMain {


	public static void main(String[] args) {		
		WebDriver driver = new FirefoxDriver(); 
		driver.get("https://mmborres.github.io/index.html");

		String title = driver.getTitle();

		if (title.contains("Projects at GA")) {
			System.out.println("Successfully opened [" + title + "]");
		} else {
			System.out.println("Test FAILED: Expected title contains [Projects at GA], Actual [" + title + "]");
		}

		driver.quit();

	}

}
