export function getColorByPi(pi, min, max) {
  if (pi < 0) {
    var red = (min - value) * (255 / (max - min));
    var blue = 0;
    var green = (value - max) * (255 / (max - min));
  } else {
    var blue = (max - value) * (255 / (max - min));
    var red = 0;
    var green = (value - min) * (255 / (max - min));
  }

  let rgb = `rgb(${red}, ${green}, ${blue}})`;
  return rgb;
}
