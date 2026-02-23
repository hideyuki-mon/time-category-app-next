/**
 * Tap4 4カテゴリ定義
 * colorLight: ライトモード用の淡い背景色
 * colorLightDark: ダークモード用の色付き背景（押す前から色が見える）
 */

export const CATEGORIES = [
  {
    id: 0,
    name: "ただの消費",
    color: "#E74C3C",
    colorLight: "rgba(231,76,60,0.15)",
    colorLightDark: "rgba(231,76,60,0.25)",
  },
  {
    id: 1,
    name: "生産につながる消費",
    color: "#F39C12",
    colorLight: "rgba(243,156,18,0.15)",
    colorLightDark: "rgba(243,156,18,0.25)",
  },
  {
    id: 2,
    name: "生産",
    color: "#27AE60",
    colorLight: "rgba(39,174,96,0.15)",
    colorLightDark: "rgba(39,174,96,0.25)",
  },
  {
    id: 3,
    name: "思考停止ルーティーン",
    color: "#3498DB",
    colorLight: "rgba(52,152,219,0.15)",
    colorLightDark: "rgba(52,152,219,0.25)",
  },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];
