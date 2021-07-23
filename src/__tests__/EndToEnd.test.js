import _ from "lodash";
import puppeteer from "puppeteer";

let browser;
let page;
beforeAll(async () => {
    jest.setTimeout(300000);
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 250,
        ignoreDefaultArgs: ['--disable-extensions']
    });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector('.Event');
});

afterAll(() => {
    browser.close();
});

describe("show/hide an event details", () => {
    test("An event element is collapsed by default", async () => {
        await expect(page.$(".Event .EventDetails")).resolves.toBe(null);
        await expect(page.$(".showLess")).resolves.toBe(null);
    });

    test("User can expand an event to see its details and the 'Show Less' button", async () => {
        await page.click(".Event .showMore");
        const eventDetails = await page.$(".EventDetails");
        const showLess = await page.$(".showLess");
        expect(eventDetails).toBeDefined();
        expect(showLess).toBeDefined();
    });

    test("User can collapse an event to hide details", async () => {
        await page.click(".Event .showLess");
        await expect(page.$(".EventDetails")).resolves.toBe(null);
    });
});