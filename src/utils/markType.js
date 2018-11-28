
export default function getMarkColor(type) {
  const typeList = {
    "edge-loss" : "#f5222d",
    "edge-crack" : "#fa8c16",
    "burr" : "#52c41a",
    "tower-type" : "#13c2c2",
    "loose-roll" : "#1890ff",
    "roll" : "#722ed1",
  }
  return typeList[type];
}
