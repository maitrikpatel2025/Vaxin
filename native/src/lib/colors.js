function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
function rgbToHex(c) {
    return "#" + ((1 << 24) + (c.r << 16) + (c.g << 8) + c.b).toString(16).slice(1);
}
function circleGradient(percent,colors,points = null) {
    let red;
    let green;
    let blue;
    let c1 = hexToRgb(colors[0]);
    let c2 = hexToRgb(colors[1]);
    let c3 = hexToRgb(colors[2]);
    if (points==null) {
        red = percent < 50 ? c1.r + (c2.r - c1.r) * percent / 50 : c2.r + (c3.r - c2.r) * (percent - 50) / 50;
        green = percent < 50 ? c1.g + (c2.g - c1.g) * percent / 50 : c2.g + (c3.g - c2.g) * (percent - 50) / 50;
        blue = percent < 50 ? c1.b + (c2.b - c1.b) * percent / 50 : c2.b + (c3.b - c2.b) * (percent - 50) / 50;
    }else {
        let firstRange = points[0];
        let secondRange = points[1];
        if (percent < firstRange[0]) {
            red = c1.r;
            green = c1.g;
            blue = c1.b;
        } else if (percent < firstRange[1]) {
            let dif = (percent - firstRange[0]) / (firstRange[1]-firstRange[0]);
            red = c1.r + dif * (c2.r - c1.r);
            green = c1.g + dif * (c2.g - c1.g);
            blue = c1.b + dif * (c2.b - c1.b);
        } else if (percent < secondRange[0]) {
            red = c2.r;
            green = c2.g;
            blue = c2.b;
        } else if (percent < secondRange[1]) {
            let dif = (percent - secondRange[0]) / (secondRange[1]-secondRange[0]);
            red = c2.r + dif * (c3.r - c2.r);
            green = c2.g + dif * (c3.g - c2.g);
            blue = c2.b + dif * (c3.b - c2.b);
        } else {
            red = c3.r;
            green = c3.g;
            blue = c3.b;
        }
    }
    red = Math.round(red);
    green = Math.round(green);
    blue = Math.round(blue);
    return rgbToHex({r:red, g:green, b:blue});
}
export {circleGradient};