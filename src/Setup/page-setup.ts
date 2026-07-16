import {Page,  test as baseTest } from "@playwright/test";

let page: Page;



export function getPage(): Page {
  return page;
}

 export function setPage(pageInstance: Page): void {
  page = pageInstance;
}


baseTest.beforeEach(({ page } : {page : Page }) => {
   setPage(page);
});

export const test=baseTest;
