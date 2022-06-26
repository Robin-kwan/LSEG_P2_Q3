const puppeteer = require("puppeteer");
const key = process.argv[2] || "";
const url = "https://codequiz.azurewebsites.net";

async function scrape() {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  const cookies = [
    {
      name: "hasCookie",
      value: "true",
      url: url,
    },
  ];
  await page.setCookie(...cookies);
  await page.goto(url);
  const data = await page.evaluate(() => {
    const rows = document.querySelectorAll("tr");
    return Array.from(rows, (row) => {
      const columns = row.querySelectorAll("td");
      return Array.from(columns, (column) => column.innerText);
    });
  });
  const result = data.filter((item) => item[0] === key);
  console.log(result.length > 0 ? result[0][1] : "Fund name not found");
  await browser.close();
}
scrape();
