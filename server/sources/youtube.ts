function defineYouTubeSource(channelId: string) {
  return defineRSSSource(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
    { hiddenDate: false },
  )
}

export default defineSource({
  // SmartLess - Jason Bateman, Sean Hayes, Will Arnett
  smartless: defineYouTubeSource("UC-W8Qu2Zb407kjVhW-5U-SA"),
  // Huberman Lab - Andrew Huberman
  hubermanlab: defineYouTubeSource("UC2D2CMWXMOVWx7giW1n3LIg"),
  // On Purpose - Jay Shetty
  jayshettypodcast: defineYouTubeSource("UCbk_QsfaFZG6PdQeCvaYXJQ"),
  // Jefferson Fisher
  jeffersonfisher: defineYouTubeSource("UCXjnpu6lK0HoUyOMh2ZBwhQ"),
  // 10% Happier - Dan Harris
  tenpercent: defineYouTubeSource("UCb3AWCFuxotrXmgqUHQdwyg"),
  // Mel Robbins
  melrobbins: defineYouTubeSource("UCk2U-Oqn7RXf-ydPqfSxG5g"),
  // Motiversity (Motivation Daily)
  motiversity: defineYouTubeSource("UCAPByrKU5-R1emswVlyH_-g"),
  // Leadercast
  leadercast: defineYouTubeSource("UC50EVy8w6miK_dHGfVARwSw"),
})
