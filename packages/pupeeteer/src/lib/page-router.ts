import { Router } from "itty-router";
import puppeteer from "puppeteer";
import { CustomEvent } from "../types/event";

export const PageRouter = () => {
  const router = Router({ base: "/" });
  router.get("/", pageHomeHandler);

  return router;
};

const pageHomeHandler = async ({ request }: CustomEvent) => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.PUPPETEER_BROWSERLESS_IO_KEY}`,
  });
  const page = await browser.newPage();

  // Navigate the page to a URL.
  await page.goto("https://example.com/");
  await page.setViewport({ width: 1080, height: 1024 });

  const screenshot = await page.screenshot();

  return new Response(screenshot, {
    headers: {
      "Content-Type": "image/png",
    },
    status: 200,
  });
};
