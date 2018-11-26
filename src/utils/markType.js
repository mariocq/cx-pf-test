
export default function getMarkCss(type) {
  const typeList = {
    "edge-loss" : "mark-tag-red",
    "edge-crack" : "mark-tag-orange",
    "burr" : "mark-tag-green",
    "tower-type" : "mark-tag-cyan",
    "loose-roll" : "mark-tag-blue",
    "roll" : "mark-tag-purple",
  }
  return typeList[type];
}
