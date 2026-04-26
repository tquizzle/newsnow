export default defineSource({
  yahoofinance: defineRSSSource("https://finance.yahoo.com/news/rssindex"),
  marketwatch: defineRSSSource("https://feeds.content.dowjones.io/public/rss/mw_topstories"),
  motleyfool: defineRSSSource("https://feeds.fool.com/usmffeatured"),
})
