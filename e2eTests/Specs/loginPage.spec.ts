import * as login from "../Pages/loginPage.page";
import {test, expect, Page} from "@playwright/test"

test(`login to portal`, async({page :Page})=>{
 await login.loginToPage(Page);
});

test(`Switch to Pages`, async({page : Page})=>{
await login.SwitchPages(Page);
});

test(`Verify File Upload `, async({page:Page})=>{
    await login.fileUpload(Page);
});


test.only(`Fetch MObile name suggestion`, async ({page})=>{
 await page.goto("https://www.amazon.in/");
 await page.waitForTimeout(2000);
await expect(
  page.locator('//input[@id="twotabsearchtextbox"]')
).toBeVisible({ timeout: 60000 });
//  await page.waitForLoadState('load');
//  await page.waitForLoadState('networkidle');
  //  await page.setViewportSize({ width: 1920, height: 1080});
   let PageTitle :string =await page.title();
   console.log("Title of the Page :",  PageTitle);
   await page.locator('//input[@id="twotabsearchtextbox"]').fill("Samsung s24");
  //  await searchlist.fill("Samsung s24");
   await expect(page.locator('//div[@id="nav-flyout-searchAjax"]//div[@role="button"]').first()).toBeVisible();
   const suggestions = await page.locator('//div[@id="nav-flyout-searchAjax"]//div[@role="button"]');
   await expect(suggestions.first()).toBeVisible(); 
   const countt=await suggestions.count();
   await expect(countt).toBeGreaterThan(9);
   console.log(countt)
   const newSuggestions=[];
    for(let i=0; i < countt; i++){
      const suggestionsTexts = await suggestions.nth(i).getAttribute("aria-label");
      //  newSuggestions.push(suggestionsTexts);
       if(suggestionsTexts){
        console.log("Suggestions :", suggestionsTexts);
    }}
    });

    test(`automating dropdown`, async({page})=>{
      await page.goto("https://practice.expandtesting.com/dropdown");
      await page.getByRole('heading',  {name : 'Country selection'}).waitFor();
      // await page.getByText("Country selection").scrollIntoViewIfNeeded();
      await page.locator("#country").click();
      // await page.locator('#country').selectOption({index : 5});

      const coption=await page.locator("#country option");
      const count1 =await coption.count();
       console.log("Total Countries:", count1 - 1);
      for(let i=1; i< count1; i++){
        const contry=await coption.nth(i).innerText();
        console.log(contry.trim());
      }
    });