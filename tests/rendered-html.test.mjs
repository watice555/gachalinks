import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../dist/client/", import.meta.url);

test("exports the complete navigation directory", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");

  assert.match(html, /<html lang="zh-CN">/);
  assert.match(html, /<title>Gacha Links｜抽卡二游资料导航<\/title>/);
  assert.match(html, /二游导航站/);
  assert.match(html, /整理五款游戏的资料站、数据工具与玩家创作工具/);
  assert.match(html, /为二游玩家整理的实用站点索引/);
  assert.match(html, /game-logos\/genshin\.png/);
  assert.match(html, /game-logos\/star-rail\.png/);
  assert.match(html, /game-logos\/zenless-zone-zero\.png/);
  assert.match(html, /game-logos\/wuthering-waves\.png/);
  assert.match(html, /game-logos\/neverness-to-everness\.png/);
  assert.doesNotMatch(html, /SELECTED TOOLS FOR GACHA PLAYERS/);
  assert.doesNotMatch(html, /抽卡二游，|一站抵达。|精选站点<\/dt>/);
  assert.doesNotMatch(html, /只收录有明确用途|这个站能帮你做什么|不再混为一谈/);
  assert.match(html, /Project Amber/);
  assert.match(html, /Project Yatta/);
  assert.match(html, /https:\/\/gi\.yatta\.moe\/chs/);
  assert.match(html, /https:\/\/sr\.yatta\.moe\/cn/);
  assert.match(html, /https:\/\/hsr\.nanoka\.cc\//);
  assert.match(html, /https:\/\/gi\.nanoka\.cc\//);
  assert.match(html, /https:\/\/zzz\.nanoka\.cc\//);
  assert.match(html, /https:\/\/ww\.nanoka\.cc\//);
  assert.match(html, /https:\/\/nte\.nanoka\.cc\//);
  assert.match(html, /card-actions card-actions-multi/);
  assert.match(html, /抽卡统计来自用户主动提交/);
  assert.match(html, /https:\/\/light\.shenmedouyou\.top\//);
  assert.match(html, /https:\/\/alioth\.wiki\//);
  assert.match(html, /https:\/\/gachabase\.net\//);
  assert.match(html, /https:\/\/gensh\.honeyhunterworld\.com\//);
  assert.match(html, /https:\/\/homodgcat\.wiki\/CHS/);
  assert.match(html, /文本搜索/);
  assert.match(html, /测试内容实装前可能变化/);
  assert.match(html, /高难关卡/);
  assert.match(html, /高难成绩/);
  assert.doesNotMatch(html, /Meta统计/);
  assert.doesNotMatch(html, /site-monogram|site-note|数据说明/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);

  const expectedSiteOrder = [
    "nanoka.cc",
    "Lunaris",
    "Alioth.wiki",
    "Paimon.moe",
    "The Genius Archive",
    "梅信心",
    "Project Amber / Yatta",
    "MaaNTE 在线地图",
    "流光忆庭",
    "Gachabase",
    "Honey Impact",
    "HomoDGCat",
  ];
  const positions = expectedSiteOrder.map((name) => html.indexOf(`<h3>${name}</h3>`));

  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
});

test("exports assets required by GitHub Pages and social previews", async () => {
  await Promise.all([
    access(new URL(".nojekyll", outputRoot)),
    access(new URL("og-v2.png", outputRoot)),
  ]);

  const html = await readFile(new URL("index.html", outputRoot), "utf8");
  const stylesheetHref = html.match(
    /<link rel="stylesheet" href="([^"]+)"/,
  )?.[1];

  assert.ok(stylesheetHref, "exported HTML should reference a stylesheet");
  const stylesheetPath = stylesheetHref.replace(
    /^\/(?:gachalinks\/)?/,
    "",
  );

  const stylesheet = await readFile(new URL(stylesheetPath, outputRoot), "utf8");

  assert.match(stylesheet, /\.card-actions\{[^}]*margin-top:14px/);
  assert.doesNotMatch(
    stylesheet,
    /\.card-actions-multi a>span:last-child\{display:none/,
  );
  assert.match(
    html,
    /<meta property="og:image" content="https:\/\/watice555\.github\.io\/gachalinks\/og-v2\.png"/,
  );
});
