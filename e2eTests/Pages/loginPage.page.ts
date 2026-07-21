

import { expect, Page } from '@playwright/test';
import { counsellorPortal } from '../testdata/webtestdata'



const userName1 = (page: Page) => page.locator("#email");
const password1 = (page: Page) => page.getByLabel("password");
const loginbtn = (page: Page) => page.getByRole('button', { name: "Sign in" });

const pageHeader = (page: Page) => page.getByRole('heading', { name: "Welcome Test ConnectED!" });

const multipleWindows = (page: Page) => page.getByRole('link', { name: "Multiple Windows" });
const clickHereLinkText = (page: Page) => page.locator('//a[text()="Click Here"]');
const elementalSeleniumLinkText = (page: Page) => page.locator('//a[text()="Elemental Selenium"]');

const fileUploadLinkeText = (page: Page) => page.getByText("File Upload");
const fileUploaderPageHeaderText = (page: Page) => page.getByText("File Uploader");
const chooseFileOption = (page: Page) => page.locator("#file-upload");
const uploadButton = (page: Page) => page.getByRole('button', { name: "Upload" });

const filedownloadButton = (page: Page) => page.locator("//a[text()='File Download']");
const downloadFilelinkText = (page: Page) => page.getByRole('link', { name: "ISTQB-_CTAI_Syllabus_v2.0_Release.pdf" });


export async function loginToPage(page: Page) {

    await page.goto(counsellorPortal.URL);
    //   await page.waitForTimeout(3000);
    await userName1(page).fill(counsellorPortal.username);
    await password1(page).fill(counsellorPortal.password);
    await loginbtn(page).click();
    await expect(pageHeader(page)).toBeVisible();
}

export async function SwitchPages(page: Page) {
    await page.goto("https://the-internet.herokuapp.com/");

    await multipleWindows(page).click();
    // await page.waitForTimeout(3000);
    console.log(page.url());
    //const pagePromise=await page.context().waitForEvent('page');
    const [childPage] = await Promise.all([page.context().waitForEvent('page'),
    await clickHereLinkText(page).click()]);
    const secondTabURL = page.url();
    console.log("Second window : ", page.url());
    const windows = await page.context().pages();
    console.log(windows.length);
    for (const p of windows) {
        console.log("pages :", await p.title())
    }
    await childPage.waitForLoadState();
    console.log(await childPage.title());
    const [childPage2] = await Promise.all([page.context().waitForEvent('page'),
    await elementalSeleniumLinkText(page).click()
    ]);
    await childPage2.waitForLoadState();
    console.log(await childPage2.title());
    await childPage2.close();
    const windows3 = await page.context().pages();
    console.log("windowss List 3: ", windows3.length);
    await childPage.bringToFront();
    const switchbackSecondURL = page.url();
    console.log("Window URL : ", page.url());
    expect(secondTabURL).toBe(switchbackSecondURL);
    const windows2 = await page.context().pages();
    console.log("windows Three :", windows2.length);
    await childPage.close();
    const windows1 = await page.context().pages();
    console.log(windows1.length);
    console.log("Parent URL : ", page.url());
    await page.close();
    console.log(page.isClosed());
    console.log(childPage.isClosed());

}

export async function fileUpload(page: Page) {
    await page.goto("https://the-internet.herokuapp.com/");
    await fileUploadLinkeText(page).click();
    await expect(fileUploadLinkeText(page)).toHaveText("File Uploader");
    // // method to choose or input file when there is No Input Tag for File Upload
    // // const fileChoose = await page.waitForEvent('filechooser');
    // await chooseFileOption(page).setInputFiles(["C:/Users/varap/Downloads/Mynt Automation WDIO with Typescript Framework guide.docx"]);
    // // const fileuploader= await fileChoose;
    // // await fileuploader.setFiles("C:/Users/varap/Downloads/Mynt Automation WDIO with Typescript Framework guide.docx");
    // await uploadButton(page).click();
    // const windows= await page.context().pages();
    // for(const p of windows){
    //     console.log("pages :", await p.title())
    //     console.log("Urls" ,p.url());
    // }
    console.log("Before:", page.url());
    await page.goBack();
    console.log("After:", page.url());

    await filedownloadButton(page).click();
    //const filedownloadPromise = await page.waitForEvent('download');
    const [downloadsss] = await Promise.all([page.waitForEvent('download'),

    await downloadFilelinkText(page).click()]);
    console.log(await downloadsss.suggestedFilename());
    await downloadsss.saveAs(
        `Downloads/${await downloadsss.suggestedFilename()}`);
    const path = await downloadsss.path();
    console.log(path);

}