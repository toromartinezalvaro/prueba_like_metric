import _ from "lodash";

const high = { R: 248, G: 105, B: 107 };
const mid = { R: 254, G: 234, B: 131 };
const low = { R: 99, G: 190, B: 123 };

const getHeatColor = (min, max, avg, value, key) => {
  if (!value) {
    return null;
  }
  let bot = null;
  let top = null;
  let heat = { R: 0, G: 0, B: 0 };
  let fixedMax = max - min;
  let fixedValue = value[key] - min;
  let percentage = 0;
  if (value[key] < avg) {
    bot = low;
    top = mid;
  } else {
    bot = mid;
    top = high;
  }
  percentage = (fixedValue * 100) / fixedMax / 100;
  heat.R = componentToHex(
    Math.ceil(bot.R * (1 - percentage)) + Math.ceil(top.R * percentage)
  );
  heat.G = componentToHex(
    Math.ceil(bot.G * (1 - percentage)) + Math.ceil(top.G * percentage)
  );
  heat.B = componentToHex(
    Math.ceil(bot.B * (1 - percentage)) + Math.ceil(top.B * percentage)
  );
  return `#${heat.R}${heat.G}${heat.B}`;
};

const componentToHex = c => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

export default getHeatColor;
