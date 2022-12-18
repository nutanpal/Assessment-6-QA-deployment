///////////Part4 - Automated Testing

import { Builder, Capabilities, By } from "selenium-webdriver";

require("chromedriver");

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeEach(async () => {
  driver.get("http://localhost:4000/");
});

afterAll(async () => {
  driver.quit();
});

test("Title shows up when page loads", async () => {
  const title = await driver.findElement(By.id("title"));
  const displayed = await title.isDisplayed();
  expect(displayed).toBe(true);
});

//np: the local host had to be changed from 3000 to 4000 as page loading error and duelDuo.test failed
test('On clicking "Draw" button, choices section is displayed', async () => {
  await driver.findElement(By.id("draw")).click();
  const secChoices = await driver.findElement(By.id("choices"));
  const displayed = await secChoices.isDisplayed();
  await driver.sleep(4000);
  expect(displayed).toBe(true);
});


test("On clicking 'Add to Duo'btn displays div 'player-duo'", async() => {
    await driver.findElement(By.id('draw')).click()
    await driver.findElement(By.css('.bot-btn')).click()
    const divPlayerDuo = await driver.findElement(By.id('player-duo'))
    const displayed = await divPlayerDuo.isDisplayed()
    await driver.sleep(4000)
    expect(displayed).toBe(true)
})


// test("On clicking 'AddtoDuo' bot gets added under new div 'player-duo'", async () => {
//   await driver.findElement(By.id("draw")).click();
//   await driver.sleep(3000);
//   await driver.findElement(By.xpath('(//*[text() ="play again!"])[1]')).click();
//   const divPlayerDuo = await driver.findElement(By.id("duel!"));
//   const displayed = await divPlayerDuo.isDisplayed();
 
//   expect(displayed).toBe(true);
// });


