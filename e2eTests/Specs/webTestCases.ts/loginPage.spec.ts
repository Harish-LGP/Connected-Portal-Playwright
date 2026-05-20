import {test, expect, Locator} from "playwright/test";
import { counsellorPortal } from '../../../e2eTests/testdata/webtestdata';

const userName = `//input[@id="email"]`;
const passWord =`//input[@id="password"]`;
const loginbtn ='//button[@type="submit"]';

test("Login to Counsellor Portal", async ({page}) => {

    await page.goto(counsellorPortal.URL);
    let PageTitle :string =await page.title();
    console.log("Title of the Page",  PageTitle);
    await page.waitForTimeout(5000);
    // await expect(page).toHaveTitle(/School Management/);
    // let reverse= PageTitle.split("").reverse().join("")
    // console.log(reverse);
    let logo:Locator= await page.getByAltText('ConnectED School', {exact : true});
     await logo.click();
    await expect(logo).toBeVisible();

    await page.fill(userName,counsellorPortal.username);
    await page.fill(passWord,counsellorPortal.password);
    await page.locator('//button[@type="submit"]').click();
      await page.waitForTimeout(5000);
      
});

