"use client";

import { useMemo, useState } from "react";

const informationTypes = [
  "全部类型",
  "综合资料库",
  "角色资料",
  "武器/装备",
  "素材物品",
  "怪物数据",
  "卡池信息",
  "抽卡记录",
  "抽卡统计",
  "高难关卡",
  "高难成绩",
  "机制研究",
  "伤害公式",
  "高难攻略",
  "队伍排轴",
  "养成计算",
  "养成规划",
  "互动地图",
  "任务成就",
  "周期事项",
  "术语词典",
  "文本搜索",
  "创作工具",
  "版本数据",
  "版本对比",
] as const;

type Game = "原神" | "星铁" | "绝区零" | "鸣潮" | "异环";
type InformationType = Exclude<
  (typeof informationTypes)[number],
  "全部类型"
>;

const featuredGames: Array<{
  name: Game;
  logo: string;
  logoClass?: string;
}> = [
  { name: "原神", logo: "/game-logos/genshin.png" },
  { name: "星铁", logo: "/game-logos/star-rail.png", logoClass: "logo-wide" },
  {
    name: "绝区零",
    logo: "/game-logos/zenless-zone-zero.png",
    logoClass: "logo-wide",
  },
  {
    name: "鸣潮",
    logo: "/game-logos/wuthering-waves.png",
    logoClass: "logo-wide",
  },
  {
    name: "异环",
    logo: "/game-logos/neverness-to-everness.png",
    logoClass: "logo-wide",
  },
];

type SiteLink = {
  label: string;
  url: string;
  game?: Game;
};

type DirectorySite = {
  id: string;
  index: string;
  name: string;
  eyebrow: string;
  description: string;
  accent: string;
  games: Game[];
  tags: InformationType[];
  links: SiteLink[];
};

type DirectorySiteEntry = Omit<DirectorySite, "index">;

const siteCatalog: DirectorySiteEntry[] = [
  {
    id: "nanoka",
    name: "nanoka.cc",
    eyebrow: "跨游戏资料库",
    description:
      "覆盖五款游戏的结构化数据库入口，提供角色、武器与装备、素材、怪物、成就及高难玩法数据，适合快速核对版本内容。",
    accent: "#79f2c0",
    games: ["原神", "星铁", "绝区零", "鸣潮", "异环"],
    tags: [
      "综合资料库",
      "角色资料",
      "武器/装备",
      "素材物品",
      "怪物数据",
      "高难关卡",
      "任务成就",
      "版本数据",
    ],
    links: [
      { label: "原神", url: "https://gi.nanoka.cc/" },
      { label: "星铁", url: "https://hsr.nanoka.cc/" },
      { label: "绝区零", url: "https://zzz.nanoka.cc/" },
      { label: "鸣潮", url: "https://ww.nanoka.cc/" },
      { label: "异环", url: "https://nte.nanoka.cc/" },
    ],
  },
  {
    id: "meropide",
    name: "梅信心",
    eyebrow: "机制研究站",
    description:
      "人工审阅的原神数据库与机制研究站，重点收录文本未注明的角色、装备和敌人机制，以及幽境危战敌人的血量、抗性与规则。",
    accent: "#ffc86b",
    games: ["原神"],
    tags: [
      "角色资料",
      "武器/装备",
      "怪物数据",
      "高难关卡",
      "机制研究",
      "伤害公式",
      "队伍排轴",
    ],
    links: [{ label: "访问站点", url: "https://meropide.cn/chs/" }],
  },
  {
    id: "yatta",
    name: "Project Amber / Yatta",
    eyebrow: "双游戏资料库",
    description:
      "原神与星铁综合资料库，提供角色、武器与光锥、装备、材料、怪物、任务和成就等结构化数据，并收录版本更新与活动信息。",
    accent: "#91a7ff",
    games: ["原神", "星铁"],
    tags: [
      "综合资料库",
      "角色资料",
      "武器/装备",
      "素材物品",
      "怪物数据",
      "卡池信息",
      "任务成就",
      "版本数据",
    ],
    links: [
      {
        label: "Project Amber",
        game: "原神",
        url: "https://gi.yatta.moe/chs",
      },
      {
        label: "Project Yatta",
        game: "星铁",
        url: "https://sr.yatta.moe/cn",
      },
    ],
  },
  {
    id: "paimon",
    name: "Paimon.moe",
    eyebrow: "祈愿与养成工具",
    description:
      "提供祈愿记录、社区抽卡统计、养成计算、素材规划、成就与活动日历。抽卡统计来自用户主动提交，样本存在选择偏差，仅供参考。",
    accent: "#c9a8ff",
    games: ["原神"],
    tags: [
      "抽卡记录",
      "抽卡统计",
      "卡池信息",
      "养成计算",
      "养成规划",
      "任务成就",
    ],
    links: [{ label: "访问站点", url: "https://paimon.moe/wish/tally" }],
  },
  {
    id: "genius",
    name: "The Genius Archive",
    eyebrow: "高难通关档案",
    description:
      "星铁高难通关记录库，覆盖混沌回忆、虚构叙事、末日幻影与异常仲裁，可按版本、关卡、分数、队伍人数和配置成本筛选。",
    accent: "#ff8b9a",
    games: ["星铁"],
    tags: ["高难成绩", "高难攻略", "机制研究", "怪物数据"],
    links: [{ label: "访问站点", url: "https://theherta.com/" }],
  },
  {
    id: "maante",
    name: "MaaNTE 在线地图",
    eyebrow: "世界探索工具",
    description:
      "异环互动地图，收录谕石、任务、委托、资源、传送点和怪物等点位，支持收藏、完成状态、路线、探索进度与本地数据导入导出。",
    accent: "#5bd6ff",
    games: ["异环"],
    tags: ["互动地图"],
    links: [{ label: "打开地图", url: "https://map.maante.org/" }],
  },
  {
    id: "lunaris",
    name: "Lunaris",
    eyebrow: "版本前瞻资料库",
    description:
      "原神新版本与测试服资料库，收录角色、武器、圣遗物、材料、怪物、任务、卡池与三类高难玩法；测试数据和卡池安排均可能变化。",
    accent: "#73a4ff",
    games: ["原神"],
    tags: [
      "综合资料库",
      "角色资料",
      "武器/装备",
      "素材物品",
      "怪物数据",
      "卡池信息",
      "高难关卡",
      "版本对比",
    ],
    links: [{ label: "访问站点", url: "https://lunaris.moe/" }],
  },
  {
    id: "light-cone",
    name: "流光忆庭",
    eyebrow: "自定义光锥生成器",
    description:
      "星铁自定义光锥创作工具，可编辑卡面、名称、命途、星级、属性、技能效果与介绍文案，生成仿游戏风格的光锥详情图。",
    accent: "#82e6ff",
    games: ["星铁"],
    tags: ["创作工具"],
    links: [
      {
        label: "开始创作",
        url: "https://light.shenmedouyou.top/",
      },
    ],
  },
  {
    id: "alioth",
    name: "Alioth.wiki",
    eyebrow: "双游戏机制资料库",
    description:
      "原神与星铁资料及机制库，提供角色、怪物、伤害公式、卡池、物品、文本与剧情搜索，并整理两款游戏的高难关卡数据和研究文章。",
    accent: "#f5a9d0",
    games: ["原神", "星铁"],
    tags: [
      "综合资料库",
      "角色资料",
      "素材物品",
      "怪物数据",
      "卡池信息",
      "高难关卡",
      "机制研究",
      "伤害公式",
      "任务成就",
      "文本搜索",
    ],
    links: [{ label: "访问站点", url: "https://alioth.wiki/" }],
  },
  {
    id: "gachabase",
    name: "Gachabase",
    eyebrow: "多游戏版本资料库",
    description:
      "覆盖原神、星铁与绝区零的正式服和测试服资料，提供角色、装备、物品、教程、更新日志与版本对比；测试内容实装前可能变化。",
    accent: "#ff7f6e",
    games: ["原神", "星铁", "绝区零"],
    tags: [
      "综合资料库",
      "角色资料",
      "武器/装备",
      "素材物品",
      "版本数据",
      "版本对比",
    ],
    links: [{ label: "访问站点", url: "https://gachabase.net/" }],
  },
  {
    id: "honey-impact",
    name: "Honey Impact",
    eyebrow: "原神综合资料库",
    description:
      "内容详尽的原神数据库，收录角色、武器、圣遗物、材料、怪物、秘境、任务、成就与尘歌壶等条目，也可查看版本新增内容。",
    accent: "#f0c66d",
    games: ["原神"],
    tags: [
      "综合资料库",
      "角色资料",
      "武器/装备",
      "素材物品",
      "怪物数据",
      "高难关卡",
      "任务成就",
      "版本数据",
    ],
    links: [
      {
        label: "访问站点",
        url: "https://gensh.honeyhunterworld.com/",
      },
    ],
  },
  {
    id: "homdgcat",
    name: "HomoDGCat",
    eyebrow: "原神文本搜索",
    description:
      "原神全文本检索工具，可按正式服、测试服与历史版本搜索中英文对话或全文，支持正则及新增、删除筛选；测试文本可能变化。",
    accent: "#b8a4ff",
    games: ["原神"],
    tags: ["文本搜索", "版本数据", "版本对比"],
    links: [
      {
        label: "搜索文本",
        url: "https://homodgcat.wiki/CHS",
      },
    ],
  },
  {
    id: "nte-notes",
    name: "异环手账",
    eyebrow: "异环轻量资料站",
    description:
      "整理异环的日常、周常与双周常等周期事项，以及国服卡池、好感度、名词解释、中英对照和外部链接，支持站内搜索。",
    accent: "#9de3c4",
    games: ["异环"],
    tags: ["卡池信息", "养成规划", "周期事项", "术语词典"],
    links: [
      {
        label: "访问站点",
        url: "https://watice555.github.io/nte-notes/",
      },
    ],
  },
];

const siteOrder = [
  "nanoka",
  "lunaris",
  "alioth",
  "paimon",
  "genius",
  "meropide",
  "yatta",
  "maante",
  "light-cone",
  "gachabase",
  "honey-impact",
  "homdgcat",
  "nte-notes",
] as const;

const sites: DirectorySite[] = siteOrder.map((id, position) => {
  const site = siteCatalog.find((entry) => entry.id === id);

  if (!site) {
    throw new Error(`Missing directory site: ${id}`);
  }

  return {
    ...site,
    index: String(position + 1).padStart(2, "0"),
  };
});

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export function GachaDirectory() {
  const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? "";
  const [activeGame, setActiveGame] = useState<Game | "全部游戏">("全部游戏");
  const [activeType, setActiveType] = useState<
    (typeof informationTypes)[number]
  >("全部类型");
  const [query, setQuery] = useState("");

  const filteredSites = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("zh-CN");

    return sites.filter((site) => {
      const matchesGame =
        activeGame === "全部游戏" || site.games.includes(activeGame);
      const matchesType =
        activeType === "全部类型" || site.tags.includes(activeType);
      const searchableText = [
        site.name,
        site.eyebrow,
        site.description,
        ...site.games,
        ...site.tags,
      ]
        .join(" ")
        .toLocaleLowerCase("zh-CN");
      const matchesQuery =
        normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);

      return matchesGame && matchesType && matchesQuery;
    });
  }, [activeGame, activeType, query]);

  const hasFilters =
    activeGame !== "全部游戏" ||
    activeType !== "全部类型" ||
    query.trim().length > 0;

  const resetFilters = () => {
    setActiveGame("全部游戏");
    setActiveType("全部类型");
    setQuery("");
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Gacha Links 首页">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span className="brand-name">GACHA LINKS</span>
        </a>
        <nav className="topnav" aria-label="页面导航">
          <a href="#directory">站点目录</a>
        </nav>
      </header>

      <main id="top">
        <section className="intro-panel" aria-labelledby="intro-title">
          <div className="intro-copy">
            <h1 id="intro-title">二游导航站</h1>
            <p>整理五款游戏的资料站、数据工具与玩家创作工具。</p>
          </div>

          <div className="game-logo-filter" aria-label="按游戏筛选站点">
            <button
              className="all-games-button"
              type="button"
              aria-pressed={activeGame === "全部游戏"}
              onClick={() => setActiveGame("全部游戏")}
            >
              全部
            </button>
            {featuredGames.map((game) => (
              <button
                className="game-logo-button"
                type="button"
                key={game.name}
                aria-pressed={activeGame === game.name}
                aria-label={`筛选${game.name}站点`}
                onClick={() => setActiveGame(game.name)}
              >
                {/* Native images keep the small logo strip independent of image loaders. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={game.logoClass}
                  src={`${assetPrefix}${game.logo}`}
                  alt=""
                />
                <span>{game.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="directory-section" id="directory">
          <div className="section-heading">
            <h2>站点目录</h2>
            <p className="section-count" aria-live="polite">
              <strong>{filteredSites.length}</strong>
              <span>个结果</span>
            </p>
          </div>

          <div className="filter-panel" aria-label="站点筛选">
            <div className="search-row">
              <label htmlFor="site-search">搜索站点或标签</label>
              <div className="search-field">
                <span aria-hidden="true">⌕</span>
                <input
                  id="site-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="试试「抽卡」「高难」或站点名称"
                />
              </div>
            </div>

            <div className="filter-row filter-row-types">
              <p>信息类型</p>
              <div className="filter-options">
                {informationTypes.map((type) => (
                  <button
                    className="filter-chip"
                    type="button"
                    key={type}
                    aria-pressed={activeType === type}
                    onClick={() => setActiveType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="results-toolbar">
            <p>
              {hasFilters ? (
                <>
                  当前筛选：
                  <strong>
                    {[activeGame, activeType]
                      .filter(
                        (value) =>
                          value !== "全部游戏" && value !== "全部类型",
                      )
                      .join(" · ") || "关键词搜索"}
                  </strong>
                </>
              ) : (
                "全部站点"
              )}
            </p>
            {hasFilters && (
              <button type="button" onClick={resetFilters}>
                清除筛选 ×
              </button>
            )}
          </div>

          {filteredSites.length > 0 ? (
            <div className="site-grid">
              {filteredSites.map((site) => (
                <article
                  className="site-card"
                  key={site.id}
                  style={{ "--site-accent": site.accent } as React.CSSProperties}
                >
                  <div className="card-index">{site.index}</div>
                  <div className="card-heading">
                    <div>
                      <p>{site.eyebrow}</p>
                      <h3>{site.name}</h3>
                    </div>
                  </div>

                  <div className="game-tags" aria-label="支持游戏">
                    {site.games.map((game) => (
                      <span key={game}>{game}</span>
                    ))}
                  </div>

                  <p className="site-description">{site.description}</p>

                  <div className="info-tags" aria-label="信息类型">
                    {site.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div
                    className={`card-actions${
                      site.links.length > 2
                        ? " card-actions-multi"
                        : site.links.length > 1
                          ? " card-actions-dual"
                          : ""
                    }`}
                  >
                    {site.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${link.label}${link.game ? `，${link.game}` : ""}（新窗口打开）`}
                      >
                        <span>
                          {link.game && <small>{link.game}</small>}
                          {link.label}
                        </span>
                        <ArrowIcon />
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>NO MATCHES</p>
              <h3>暂时没有符合条件的站点</h3>
              <button type="button" onClick={resetFilters}>
                查看全部站点
              </button>
            </div>
          )}
        </section>

      </main>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span className="brand-name">GACHA LINKS</span>
        </a>
        <p>为二游玩家整理的实用站点索引</p>
        <a href="#top">回到顶部 ↑</a>
      </footer>
    </div>
  );
}
