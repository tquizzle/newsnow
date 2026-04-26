export default defineSource({
  coindesk: defineRSSSource("https://www.coindesk.com/arc/outboundfeeds/rss/"),
  cointelegraph: defineRSSSource("https://cointelegraph.com/rss"),
  decrypt: defineRSSSource("https://decrypt.co/feed"),
})
