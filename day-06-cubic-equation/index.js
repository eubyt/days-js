// ax³+bx²+cx+d = 0

class Complex {
  constructor(re, im) {
    this.real = Number(re);
    this.imag = Number(im);
  }

  static format(complex) {
    if (complex.real == 0 && complex.imag == 0) return "0";
    return `${complex.real} ${
      Math.sign(complex.imag) >= 0 ? "+" : "-"
    } ${Math.abs(complex.imag)}i`;
  }
}

const solve = ({ a, b, c, d }) => {
  let roots = [];

  if (a == 0) {
    throw "Not a cubic equation";
  }

  //Converter para x³+Ax³+Bx+C=0
  const A = b / a;
  const B = c / a;
  const C = d / a;

  // y³+py+q=0
  const p = B - Math.pow(A, 2) / 3;
  const q = C + (2 * Math.pow(A, 3)) / 27 - (A * B) / 3;

  const delta = Math.pow(q, 2) / 4 + Math.pow(p, 3) / 27;

  if (delta >= 0) {
    // existe apenas uma raiz
    const y1 =
      Math.cbrt(-q / 2 + Math.sqrt(delta)) +
      Math.cbrt(-q / 2 - Math.sqrt(delta));
    roots[0] = y1 - A / 3;

    const delta2 = -3 * y1 * y1 - 4 * p;

    if (delta2 >= 0) {
      roots[1] = (-y1 + Math.sqrt(delta2)) / 2 - A / 3;
      roots[2] = (-y1 - Math.sqrt(delta2)) / 2 - A / 3;
    } else {
      const re = -y1 / 2 - A / 3;
      const im = Math.sqrt(Math.abs(delta2)) / 2;
      roots[1] = Complex.format(new Complex(re, im));
      roots[2] = Complex.format(new Complex(re, -im));
    }
  } else {
    const rho = Math.sqrt((q * q) / 4 + Math.abs(delta));
    const theta = Math.acos(-q / (2 * rho));
    const resolve = (x) => 2 * Math.cbrt(rho) * Math.cos(x) - A / 3;
    roots[0] = resolve(theta / 3);
    roots[1] = resolve((theta + 2 * Math.PI) / 3);
    roots[2] = resolve((theta + 4 * Math.PI) / 3);
  }

  return roots.map((x) => {
    if (typeof x === "number")
      return x.toFixed(x < 0 ? 9 : 12).replace(/\.?0+$/, "");
    return x;
  });
};

// Testes
console.table(solve({ a: 18, b: -63, c: 81, d: -36 }));
console.table(solve({ a: 1, b: -3, c: 3, d: -1 }));
console.table(solve({ a: 1, b: -1, c: 2, d: 0 }));
