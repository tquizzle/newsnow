import type { NewsItem } from "@shared/types"

interface RedditPost {
  data: {
    id: string
    title: string
    url: string
    permalink: string
    score: number
    selftext?: string
  }
}

interface RedditResponse {
  data: {
    children: RedditPost[]
  }
}

function defineRedditSource(subreddit: string) {
  return defineSource(async (): Promise<NewsItem[]> => {
    const data: RedditResponse = await myFetch(
      `https://www.reddit.com/r/${subreddit}/hot.json?limit=25`,
    )
    return data.data.children.map(({ data: post }) => ({
      id: post.id,
      title: post.title,
      url: `https://www.reddit.com${post.permalink}`,
      extra: {
        info: `▲ ${post.score}`,
        hover: post.selftext?.slice(0, 200) || undefined,
      },
    }))
  })
}

export default defineSource({
  "reddit-technology": defineRedditSource("technology"),
  "reddit-promptengineering": defineRedditSource("PromptEngineering"),
  "reddit-tulsa": defineRedditSource("tulsa"),
})
