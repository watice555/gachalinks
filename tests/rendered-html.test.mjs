import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../dist/client/", import.meta.url);

test("exports the complete navigation directory", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");

  assert.match(html, /<html lang="zh-CN">/);
  assert.match(html, /<title>Gacha Links｜抽卡二游资料导航<\/title>/);
  assert.match(html, /抽卡二游，/);
  assert.match(html, /一站抵达。/);
  assert.match(html, /精选站点<\/dt><dd>08<\/dd>/);
  assert.match(html, /Project Amber/);
  assert.match(html, /Project Yatta/);
  assert.match(html, /https:\/\/gi\.yatta\.moe\/chs/);
  assert.match(html, /https:\/\/sr\.yatta\.moe\/cn/);
  assert.match(html, /抽卡统计来自用户主动提交/);
  assert.match(html, /https:\/\/light\.shenmedouyou\.top\//);
  assert.match(html, /高难关卡/);
  assert.match(html, /高难成绩/);
  assert.doesNotMatch(html, /Meta统计/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});

test("exports assets required by GitHub Pages and social previews", async () => {
  await Promise.all([
    access(new URL(".nojekyll", outputRoot)),
    access(new URL("og.png", outputRoot)),
  ]);

  const html = await readFile(new URL("index.html", outputRoot), "utf8");
  assert.match(
    html,
    /<meta property="og:image" content="https:\/\/watice555\.github\.io\/gachalinks\/og\.png"/,
  );
});
