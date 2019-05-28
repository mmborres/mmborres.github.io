package automation.testNG.TestMemGame1_CustomPage;

import org.testng.annotations.Test;

import org.junit.Assert;

import org.testng.annotations.BeforeTest;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.AfterTest;

public class GameLevel_NegativeTest_NonIntegerValue {
	WebDriver driver = null;
	
	@Test
	public void tesGameLevel_NonIntegerValue() throws Exception {
		// positive test for min high score
		driver.findElement(By.id("minHiScore")).click();
		driver.findElement(By.id("minHiScore")).sendKeys("1");
		// test for game level
		driver.findElement(By.id("gameLevel")).click();
		driver.findElement(By.id("gameLevel")).sendKeys("YA");
		Thread.sleep(2000);
		driver.findElement(By.xpath("//input[@value='Ready? Game On!']")).click();
		String actual = driver.switchTo().alert().getText();	
		System.out.println(actual);
		Assert.assertEquals("Number of Levels in the Game must be a positive number.", actual);	
		driver.switchTo().alert().accept();
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
