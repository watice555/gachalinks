"use client";

import { useMemo, useState } from "react";

const games = ["全部游戏", "原神", "星铁", "绝区零", "鸣潮", "异环"] as const;

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
  "创作工具",
  "版本数据",
  "版本对比",
] as const;

type Game = Exclude<(typeof games)[number], "全部游戏">;
type InformationType = Exclude<
  (typeof informationTypes)[number],
  "全部类型"
>;

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
  monogram: string;
  accent: string;
  games: Game[];
  tags: InformationType[];
  links: SiteLink[];
  note?: string;
};

const sites: DirectorySite[] = [
  {
    id: "nanoka",
    index: "01",
    name: "nanoka.cc",
    eyebrow: "跨游戏资料库",
    description:
      "覆盖五款游戏的结构化数据库入口，提供角色、武器与装备、素材、怪物、成就及高难玩法数据，适合快速核对版本内容。",
    monogram: "N",
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
    links: [{ label: "访问站点", url: "https://nanoka.cc/" }],
  },
  {
    id: "meropide",
    index: "02",
    name: "梅信心",
    eyebrow: "机制研究站",
    description:
      "人工审阅的原神数据库与机制研究站，重点收录文本未注明的角色、装备和敌人机制，以及幽境危战敌人的血量、抗性与规则。",
    monogram: "梅",
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
    index: "03",
    name: "Project Amber / Yatta",
    eyebrow: "双游戏资料库",
    description:
      "原神与星铁综合资料库，提供角色、武器与光锥、装备、材料、怪物、任务和成就等结构化数据，并收录版本更新与活动信息。",
    monogram: "Y",
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
    index: "04",
    name: "Paimon.moe",
    eyebrow: "祈愿与养成工具",
    description:
      "以祈愿记录管理和社区抽卡统计为核心，同时提供养成计算、素材规划、成就与活动日历。",
    monogram: "P",
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
    note: "抽卡统计来自用户主动提交，存在样本选择偏差；仅供参考，不代表全体玩家或官方概率。",
  },
  {
    id: "genius",
    index: "05",
    name: "The Genius Archive",
    eyebrow: "高难通关档案",
    description:
      "星铁高难通关记录库，覆盖混沌回忆、虚构叙事、末日幻影与异常仲裁，可按版本、关卡、分数、队伍人数和配置成本筛选。",
    monogram: "G",
    accent: "#ff8b9a",
    games: ["星铁"],
    tags: ["高难成绩", "高难攻略", "机制研究", "怪物数据"],
    links: [{ label: "访问站点", url: "https://theherta.com/" }],
  },
  {
    id: "maante",
    index: "06",
    name: "MaaNTE 在线地图",
    eyebrow: "世界探索工具",
    description:
      "异环互动地图，收录谕石、任务、委托、资源、传送点和怪物等点位，支持收藏、完成状态、路线、探索进度与本地数据导入导出。",
    monogram: "M",
    accent: "#5bd6ff",
    games: ["异环"],
    tags: ["互动地图"],
    links: [{ label: "打开地图", url: "https://map.maante.org/" }],
  },
  {
    id: "lunaris",
    index: "07",
    name: "Lunaris",
    eyebrow: "版本前瞻资料库",
    description:
      "偏重新版本与测试版本数据的原神资料库，收录角色、武器、圣遗物、材料、怪物、任务、卡池历史及三类高难玩法数据。",
    monogram: "L",
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
    note: "包含测试版本内容；未正式实装的数据与卡池安排均可能发生变化。",
  },
  {
    id: "light-cone",
    index: "08",
    name: "流光忆庭",
    eyebrow: "自定义光锥生成器",
    description:
      "星铁自定义光锥创作工具，可编辑卡面、名称、命途、星级、属性、技能效果与介绍文案，生成仿游戏风格的光锥详情图。",
    monogram: "光",
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
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export function GachaDirectory() {
  const [activeGame, setActiveGame] = useState<(typeof games)[number]>(
    "全部游戏",
  );
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
          <a href="#about">关于本站</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">SELECTED TOOLS FOR GACHA PLAYERS</p>
            <h1 id="hero-title">
              抽卡二游，
              <span>一站抵达。</span>
            </h1>
            <p className="hero-intro">
              从角色数据库、抽卡统计，到高难关卡与通关成绩。
              <br />
              精选真正有用的玩家工具，少一点搜索，多一点游戏。
            </p>
            <a className="hero-action" href="#directory">
              浏览站点
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="hero-orbit" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="orbit-core">GL</div>
            <span className="satellite satellite-one">01</span>
            <span className="satellite satellite-two">05</span>
            <span className="satellite satellite-three">08</span>
          </div>

          <dl className="hero-stats">
            <div>
              <dt>精选站点</dt>
              <dd>08</dd>
            </div>
            <div>
              <dt>覆盖游戏</dt>
              <dd>05</dd>
            </div>
            <div>
              <dt>信息标签</dt>
              <dd>{String(informationTypes.length - 1).padStart(2, "0")}</dd>
            </div>
          </dl>
        </section>

        <section className="directory-section" id="directory">
          <div className="section-heading">
            <div>
              <p className="section-kicker">DIRECTORY / 目录</p>
              <h2>找到你需要的站点</h2>
            </div>
            <p className="section-count" aria-live="polite">
              <strong>{String(filteredSites.length).padStart(2, "0")}</strong>
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

            <div className="filter-row">
              <p>游戏</p>
              <div className="filter-options">
                {games.map((game) => (
                  <button
                    className="filter-chip"
                    type="button"
                    key={game}
                    aria-pressed={activeGame === game}
                    onClick={() => setActiveGame(game)}
                  >
                    {game}
                  </button>
                ))}
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
                "全部精选站点"
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
                    <div className="site-monogram" aria-hidden="true">
                      {site.monogram}
                    </div>
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

                  {site.note && (
                    <p className="site-note">
                      <span>数据说明</span>
                      {site.note}
                    </p>
                  )}

                  <div className="info-tags" aria-label="信息类型">
                    {site.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div
                    className={`card-actions${site.links.length > 1 ? " card-actions-dual" : ""}`}
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

        <section className="about-section" id="about">
          <div>
            <p className="section-kicker">ABOUT / 关于</p>
            <h2>只收录有明确用途的站点。</h2>
          </div>
          <div className="about-copy">
            <p>
              Gacha Links 关注的是“这个站能帮你做什么”。每个站点同时按支持游戏和信息类型标注，让数据库、高难关卡数据与玩家通关成绩不再混为一谈。
            </p>
            <p>
              本站为非官方导航，不隶属于所列游戏、开发商或第三方站点。站点内容和可用性可能变化，请以目标网站实际页面为准。
            </p>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span className="brand-name">GACHA LINKS</span>
        </a>
        <p>为二游玩家整理的实用资料索引</p>
        <a href="#top">回到顶部 ↑</a>
      </footer>
    </div>
  );
}
