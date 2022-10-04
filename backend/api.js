const cheerio = require("cheerio");
const { gotScraping } = require("got-scraping");

const result = {
  word: null,
  success: true,
  meanings: [],
  langName: null,
};

async function getData(word, lang) {
  lang = encodeURI(lang);
  result.langName = decodeURI(lang);
  word = encodeURI(word);
  result.word = decodeURI(word);
  result.meanings = [];
  const response = await gotScraping({
    url: `https://tureng.com/en/${lang}/${word}`,
    headerGeneratorOptions: {
      browsers: [
        {
          name: "chrome",
          minVersion: 87,
          maxVersion: 89,
        },
      ],
      devices: ["desktop"],
      locales: ["de-DE"],
      operatingSystems: ["windows", "linux"],
    },
  });
  const langsArray = [
    { langName: "turkish-english", flang: "tr" },
    { langName: "french-english", flang: "fr" },
    { langName: "german-english", flang: "de" },
    { langName: "spanish-english", flang: "es" },
  ];
  let ls = null;
  langsArray.forEach((item) => {
    if (lang === item.langName) {
      ls = item.flang;
    }
  });

  return fetchData(response.body, word, ls);
}

function fetchData(response, word, flang) {
  var $ = cheerio.load(response);
  $("table.searchResultsTable")
    .eq(0)
    .find("tr")
    .each(function (i, el) {
      var gen = $(el).find("td:nth-child(2)").text().trim();
      var enItem = $(el).find("td[lang=en] > a").text().trim();

      if (enItem == word) {
        var item = $(el).find(`td[lang=${flang}] > a`);
        var meaning = item.text().trim();

        if (meaning.length > 1) {
          result.meanings.push({
            usage: gen,
            meaning,
          });
        }
        return;
      }

      var item = $(el).find("td[lang=en] > a");
      var meaning = item.text().trim();
      if (meaning.length > 1) {
        result.meanings.push({
          usage: gen,
          meaning,
        });
      }
    });

  if ($("table.searchResultsTable").length === 0) {
    result.meanings.push("No result found");
    result.success = false;
  }

  return result;
}
module.exports = getData;
