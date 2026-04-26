import process from "node:process"
import { Interval } from "./consts"
import { typeSafeObjectFromEntries } from "./type.util"
import type { OriginSource, Source, SourceID } from "./types"

const Time = {
  Test: 1,
  Realtime: 2 * 60 * 1000,
  Fast: 5 * 60 * 1000,
  Default: Interval, // 10min
  Common: 30 * 60 * 1000,
  Slow: 60 * 60 * 1000,
}

export const originSources = {
  // ── World News ──────────────────────────────────────────────────────────
  cnn: {
    name: "CNN",
    color: "red",
    home: "https://www.cnn.com",
    column: "news",
    type: "realtime",
    interval: Time.Fast,
    sub: {
      us: { title: "US" },
      world: { title: "World" },
    },
  },
  bbc: {
    name: "BBC News",
    color: "red",
    home: "https://www.bbc.com",
    column: "news",
    type: "realtime",
    interval: Time.Fast,
    sub: {
      world: { title: "World" },
      us: { title: "US & Canada" },
    },
  },
  reuters: {
    name: "Reuters",
    color: "orange",
    home: "https://www.reuters.com",
    column: "news",
    type: "realtime",
    interval: Time.Fast,
  },
  pbsnewshour: {
    name: "PBS NewsHour",
    color: "blue",
    home: "https://www.pbs.org",
    column: "news",
    type: "realtime",
    interval: Time.Common,
  },
  allsides: {
    name: "AllSides",
    color: "purple",
    home: "https://www.allsides.com",
    column: "news",
    type: "realtime",
    interval: Time.Common,
  },
  propublica: {
    name: "ProPublica",
    color: "indigo",
    home: "https://www.propublica.org",
    column: "news",
    type: "realtime",
    interval: Time.Common,
  },

  // ── Local ────────────────────────────────────────────────────────────────
  googlenews: {
    name: "Google News",
    color: "blue",
    home: "https://news.google.com",
    column: "local",
    type: "realtime",
    interval: Time.Common,
    sub: {
      tulsa: { title: "Tulsa, OK" },
    },
  },

  // ── Tech ─────────────────────────────────────────────────────────────────
  hackernews: {
    name: "Hacker News",
    color: "orange",
    column: "tech",
    type: "hottest",
    home: "https://news.ycombinator.com/",
  },
  producthunt: {
    name: "Product Hunt",
    color: "red",
    column: "tech",
    type: "hottest",
    home: "https://www.producthunt.com/",
  },
  github: {
    name: "Github",
    color: "gray",
    home: "https://github.com/",
    column: "tech",
    sub: {
      "trending-today": {
        title: "Today",
        type: "hottest",
      },
    },
  },
  slashdot: {
    name: "Slashdot",
    color: "green",
    home: "https://slashdot.org",
    column: "tech",
    type: "realtime",
    interval: Time.Common,
  },
  selfhosted: {
    name: "selfh.st",
    color: "teal",
    home: "https://selfh.st",
    column: "tech",
    type: "realtime",
    interval: Time.Slow,
  },
  theverge: {
    name: "The Verge",
    color: "purple",
    home: "https://www.theverge.com",
    column: "tech",
    type: "realtime",
    interval: Time.Common,
  },
  arstechnica: {
    name: "Ars Technica",
    color: "red",
    home: "https://arstechnica.com",
    column: "tech",
    type: "realtime",
    interval: Time.Common,
  },

  // ── AI & ML ───────────────────────────────────────────────────────────────
  therundownai: {
    name: "The Rundown AI",
    color: "orange",
    home: "https://therundown.ai",
    column: "ai",
    type: "realtime",
    interval: Time.Common,
  },
  venturebeatai: {
    name: "VentureBeat AI",
    color: "blue",
    home: "https://venturebeat.com",
    column: "ai",
    type: "realtime",
    interval: Time.Common,
  },
  mittechreview: {
    name: "MIT Tech Review",
    color: "red",
    home: "https://www.technologyreview.com",
    column: "ai",
    type: "realtime",
    interval: Time.Common,
  },
  huggingface: {
    name: "Hugging Face",
    color: "yellow",
    home: "https://huggingface.co",
    column: "ai",
    type: "realtime",
    interval: Time.Common,
  },

  // ── Finance ───────────────────────────────────────────────────────────────
  yahoofinance: {
    name: "Yahoo Finance",
    color: "purple",
    home: "https://finance.yahoo.com",
    column: "finance",
    type: "realtime",
    interval: Time.Fast,
  },
  marketwatch: {
    name: "MarketWatch",
    color: "blue",
    home: "https://www.marketwatch.com",
    column: "finance",
    type: "realtime",
    interval: Time.Fast,
  },
  motleyfool: {
    name: "Motley Fool",
    color: "green",
    home: "https://www.fool.com",
    column: "finance",
    type: "realtime",
    interval: Time.Common,
  },
  coindesk: {
    name: "CoinDesk",
    color: "blue",
    home: "https://www.coindesk.com",
    column: "finance",
    type: "realtime",
    interval: Time.Fast,
  },
  cointelegraph: {
    name: "CoinTelegraph",
    color: "orange",
    home: "https://cointelegraph.com",
    column: "finance",
    type: "realtime",
    interval: Time.Fast,
  },
  decrypt: {
    name: "Decrypt",
    color: "purple",
    home: "https://decrypt.co",
    column: "finance",
    type: "realtime",
    interval: Time.Fast,
  },

  // ── Sports ────────────────────────────────────────────────────────────────
  espn: {
    name: "ESPN",
    color: "red",
    home: "https://www.espn.com",
    column: "sports",
    type: "realtime",
    interval: Time.Common,
    sub: {
      news: { title: "Top Stories" },
      nfl: { title: "NFL" },
      nba: { title: "NBA" },
      mlb: { title: "MLB" },
    },
  },
  bleacherreport: {
    name: "Bleacher Report",
    color: "orange",
    home: "https://bleacherreport.com",
    column: "sports",
    type: "realtime",
    interval: Time.Common,
  },

  // ── Science ───────────────────────────────────────────────────────────────
  sciencedaily: {
    name: "ScienceDaily",
    color: "blue",
    home: "https://www.sciencedaily.com",
    column: "science",
    type: "realtime",
    interval: Time.Common,
  },
  nasa: {
    name: "NASA",
    color: "blue",
    home: "https://www.nasa.gov",
    column: "science",
    type: "realtime",
    interval: Time.Slow,
  },
  physorg: {
    name: "Phys.org",
    color: "teal",
    home: "https://phys.org",
    column: "science",
    type: "realtime",
    interval: Time.Common,
  },

  // ── Entertainment ─────────────────────────────────────────────────────────
  steam: {
    name: "Steam",
    column: "entertainment",
    title: "Most Played",
    color: "blue",
    type: "hottest",
    home: "https://store.steampowered.com",
  },
  deadline: {
    name: "Deadline",
    color: "gray",
    home: "https://deadline.com",
    column: "entertainment",
    type: "realtime",
    interval: Time.Common,
  },
  variety: {
    name: "Variety",
    color: "red",
    home: "https://variety.com",
    column: "entertainment",
    type: "realtime",
    interval: Time.Common,
  },
  ign: {
    name: "IGN",
    color: "red",
    home: "https://www.ign.com",
    column: "entertainment",
    type: "realtime",
    interval: Time.Common,
  },

  // ── Community / Reddit ────────────────────────────────────────────────────
  reddit: {
    name: "Reddit",
    color: "orange",
    home: "https://www.reddit.com",
    column: "community",
    type: "hottest",
    interval: Time.Common,
    sub: {
      technology: { title: "r/technology" },
      promptengineering: { title: "r/promptEngineering" },
      tulsa: { title: "r/Tulsa" },
    },
  },

  // ── Podcasts / YouTube ────────────────────────────────────────────────────
  smartless: {
    name: "SmartLess",
    color: "purple",
    home: "https://www.smartless.com",
    column: "podcasts",
    type: "realtime",
    interval: Time.Slow,
  },
  hubermanlab: {
    name: "Huberman Lab",
    color: "blue",
    home: "https://www.hubermanlab.com",
    column: "podcasts",
    type: "realtime",
    interval: Time.Slow,
  },
  jayshettypodcast: {
    name: "On Purpose",
    color: "orange",
    home: "https://jayshetty.me",
    column: "podcasts",
    type: "realtime",
    interval: Time.Slow,
  },
  jeffersonfisher: {
    name: "Jefferson Fisher",
    color: "teal",
    home: "https://www.jeffersonfisher.com",
    column: "podcasts",
    type: "realtime",
    interval: Time.Slow,
  },
  tenpercent: {
    name: "10% Happier",
    color: "blue",
    home: "https://www.tenpercent.com",
    column: "podcasts",
    type: "realtime",
    interval: Time.Slow,
  },
  melrobbins: {
    name: "Mel Robbins",
    color: "red",
    home: "https://www.melrobbins.com",
    column: "podcasts",
    type: "realtime",
    interval: Time.Slow,
  },
  motiversity: {
    name: "Motiversity",
    color: "orange",
    home: "https://www.youtube.com",
    column: "podcasts",
    type: "realtime",
    interval: Time.Slow,
  },
  leadercast: {
    name: "Leadercast",
    color: "blue",
    home: "https://www.leadercast.com",
    column: "podcasts",
    type: "realtime",
    interval: Time.Slow,
  },
} as const satisfies Record<string, OriginSource>

export function genSources() {
  const _: [SourceID, Source][] = []

  Object.entries(originSources).forEach(([id, source]: [any, OriginSource]) => {
    const parent = {
      name: source.name,
      type: source.type,
      disable: source.disable,
      desc: source.desc,
      column: source.column,
      home: source.home,
      color: source.color ?? "primary",
      interval: source.interval ?? Time.Default,
    }
    if (source.sub && Object.keys(source.sub).length) {
      Object.entries(source.sub).forEach(([subId, subSource], i) => {
        if (i === 0) {
          _.push([
            id,
            {
              redirect: `${id}-${subId}`,
              ...parent,
              ...subSource,
            },
          ] as [any, Source])
        }
        _.push([`${id}-${subId}`, { ...parent, ...subSource }] as [
          any,
          Source,
        ])
      })
    } else {
      _.push([
        id,
        {
          title: source.title,
          ...parent,
        },
      ])
    }
  })

  return typeSafeObjectFromEntries(
    _.filter(([_, v]) => {
      if (v.disable === "cf" && process.env.CF_PAGES) {
        return false
      } else {
        return v.disable !== true
      }
    }),
  )
}
