export function getColorByPi(inputPi, min, max) {
    var pi = Number(inputPi);
    console.log(pi);
    console.log(min);
    console.log(max);

  if (pi < 0) {
    var red = (pi - min) * (255 / (max - min));
    var blue = 0;
    var green = (max - pi) * (255 / (max - min));
  } else {
    var blue = (max - pi) * (255 / (max - min));
    var red = 0;
    var green = (pi - min) * (255 / (max - min));
  }

  let rgb = `rgb(${red}, ${green}, ${blue})`;
  return rgb;
}
