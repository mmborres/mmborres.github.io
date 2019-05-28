package automation.testNG.TestMemGame1_CustomPage;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class A_GameLevel_Positive_Test {
	WebDriver driver = null;
	
	@Test
	public void testGameLevel_Positive() throws Exception {
		driver.findElement(By.id("minHiScore")).click();
		//driver.findElement(By.id("minHiScore")).clear(); //to clear the input
		driver.findElement(By.id("minHiScore")).sendKeys("2");
		Assert.assertTrue(testNoAlertPopUp(driver));
		// test for game level
		driver.findElement(By.id("gameLevel")).click();
		//driver.findElement(By.id("gameLevel")).clear();
		driver.findElement(By.id("gameLevel")).sendKeys("3");
		Thread.sleep(2000);
		driver.findElement(By.xpath("//input[@value='Ready? Game On!']")).click();
		Assert.assertTrue(testNoAlertPopUp(driver));
		
		//opens game page
		String actualUrl = driver.getCurrentUrl();
		String title = driver.getTitle();
		System.out.println(actualUrl);
		System.out.println(title);
		Assert.assertTrue(actualUrl.contains("index.html"));
		driver.close();
	}

	@BeforeTest
	public void beforeTest() {
		driver = new FirefoxDriver(); 
		driver.get("https://mmborres.github.io/prework.html");
		driver.findElement(By.xpath("//a[contains(@href, 'memory_game/index.html')]")).click();
		driver.findElement(By.xpath("//a[contains(@href, 'custom.html')]")).click();
	}

	@AfterTest
	public void afterTest() {
		try {
			driver.quit(); //close
		} catch (Exception e) {
			System.out.println("Browser already closed.");
		}
	}
	
	private boolean testNoAlertPopUp(WebDriver driver) {
		try {
			System.out.println("alert = " + driver.switchTo().alert());
		} catch (Throwable e) {
			//should be NoSuchMethodError if no alerts
			return(e instanceof NoSuchMethodError);
		}
		
		return false;
	}

}
