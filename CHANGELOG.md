# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**Note:** This is a fork of [ourongxing/newsnow](https://github.com/ourongxing/newsnow) v0.0.39, adapted for English-speaking audiences.

## [Unreleased] — 2026-04-25

### Added

**New Content Columns:**
- World News, Local (Tulsa), Tech, AI & ML, Finance, Sports, Science, Entertainment, Podcasts, Community

**World News Sources:**
- CNN (US + World sub-sources) via RSS
- BBC News (World + US & Canada sub-sources) via RSS
- Reuters Top News via RSS
- PBS NewsHour via RSS
- AllSides via RSS
- ProPublica via RSS

**Local News:**
- Google News – Tulsa, OK via RSS

**Tech Sources:**
- Slashdot via RSS
- selfh.st newsletter via RSS
- The Verge via RSS
- Ars Technica via RSS

**AI & ML Sources:**
- The Rundown AI via RSS
- VentureBeat AI via RSS
- MIT Tech Review via RSS
- Hugging Face Blog via RSS

**Finance & Crypto:**
- Yahoo Finance via RSS
- MarketWatch via RSS
- Motley Fool via RSS
- CoinDesk via RSS
- CoinTelegraph via RSS
- Decrypt via RSS

**Sports:**
- ESPN Top Stories, NFL, NBA, MLB via RSS
- Bleacher Report via RSS

**Science:**
- ScienceDaily via RSS
- NASA via RSS
- Phys.org via RSS

**Entertainment:**
- Deadline via RSS
- Variety via RSS
- IGN via RSS

**Community:**
- Reddit: r/technology, r/promptEngineering, r/tulsa via JSON API

**Podcasts (YouTube):**
- SmartLess, Huberman Lab, On Purpose (Jay Shetty), Jefferson Fisher, 10% Happier, Mel Robbins, Motiversity, Leadercast via YouTube native RSS feeds

### Removed

- All 40+ Chinese news sources (Weibo, Baidu, Bilibili, Zhihu, Douyin, Kuaishou, Tencent News, 36Kr, ITHome, V2EX, and others)
- Chinese-language column structure and identifiers
- Chinese UI labels and metadata

### Changed

- `shared/metadata.ts`: Replaced Chinese column definitions with English semantic equivalents
- `shared/pre-sources.ts`: Complete rewrite for English-language sources
- Column IDs updated from Chinese names (`china`, `world`) to semantic English names (`news`, `local`, `ai`, `sports`, `science`, `entertainment`, `podcasts`, `community`)
- All source icons regenerated for new sources

## [0.0.39] — Original Fork Point

Baseline version from [ourongxing/newsnow](https://github.com/ourongxing/newsnow).

---

[Unreleased]: https://github.com/yourusername/newsnow/compare/v0.0.39...HEAD
[0.0.39]: https://github.com/ourongxing/newsnow/releases/tag/v0.0.39
