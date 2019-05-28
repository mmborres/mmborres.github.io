package automation.testNG.TestMemGame1_CustomPage;

import org.testng.annotations.Test;

import org.junit.Assert;

import org.testng.annotations.BeforeTest;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.AfterTest;

public class MinHighScore_NegativeTest_ZeroValue {
	WebDriver driver = null;

	@Test
	public void testHighScore_Zero() throws Exception {
		driver.findElement(By.id("minHiScore")).click(); //select element
		driver.findElement(By.id("minHiScore")).sendKeys("0"); //input value
		Thread.sleep(2000);
		driver.findElement(By.xpath("//input[@value='Ready? Game On!']")).click(); //submit button
		String actual = driver.switchTo().alert().getText(); //popup alert	
		System.out.println(actual);
		Assert.assertEquals("Minimum High Score must be a positive number.", actual); //what to test
		driver.switchTo().alert().accept(); //click OK in popup alert
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

}
