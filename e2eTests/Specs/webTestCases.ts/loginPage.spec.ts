
import { test , getPage } from '../../../src/Setup/page-setup';
import { Expect, Locator, expect } from '@playwright/test';
import { counsellorPortal } from '../../../e2eTests/testdata/webtestdata';



const userName = `//input[@id="email"]`;
const passWord =`//input[@id="password"]`;
const loginbtn ='//button[@type="submit"]';

test.describe.configure({mode : 'parallel'});

test("Login to Counsellor Portal", async ({page}) => {
  // const page=getPage();
    await page.goto(counsellorPortal.URL);
    // await page.setViewportSize({ width: 1920, height: 1080 });
    let PageTitle :string =await page.title();
    console.log("Title of the Page",  PageTitle);
    await page.waitForTimeout(5000);
    // await expect(page).toHaveTitle(/School Management/);
    // let reverse= PageTitle.split("").reverse().join("")
    // console.log(reverse);
    let logo: Locator= await page.getByAltText('ConnectED School', {exact : true});
     await logo.click();
    await expect(logo).toBeVisible();
    await page.fill(userName,counsellorPortal.username);
    await page.fill(passWord,counsellorPortal.password);
    await page.locator('//button[@type="submit"]').click();
      await page.waitForTimeout(5000);
      
});

test(`Fetch MObile name suggestion`, async ({page})=>{
 await page.goto("https://www.amazon.in/");
//  await page.waitForTimeout(2000);
await page.locator('#twotabsearchtextbox').waitFor();
//  await page.waitForLoadState('load');
//  await page.waitForLoadState('networkidle');
  //  await page.setViewportSize({ width: 1920, height: 1080});
   let PageTitle :string =await page.title();
   console.log("Title of the Page :",  PageTitle);
   await page.locator('//input[@id="twotabsearchtextbox"]').fill('samsung s24');
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
      console.log(coption.count());
      for(let i=0; i< count1; i++){
        const contry=await coption.nth(i).allInnerTexts();
        console.log(contry)


      }

    })