let renders = [];
function addToRender(color, object, name) {
    renders.push(color, object, name);
}
function addToRender(...objects) {
    let color = randomHexColor();
    for (let obj of objects) {
        renders.push(color, obj);
    }
}

Algebra(3, 1, () => {
    /* Two Null vectors n-Infinite and n-Origin */
    let ei = 1e4 + 1e3;
    let eo = 0.5e4 - 0.5e3;
    /* End of Null vectors section */
    /* Helper Functions */
    let time = () => performance.now() / 1000;
    /* End of Helper Functions section */
    /* Templates for creating GA objects */
    let create_point = (x, y) => eo + x * 1e1 + y * 1e2 + 0.5 * (x * x + y * y) * ei;
    let create_line = (a, b, c) => !(a * 1e1 + b * 1e2 + c * ei);
    let create_circle = (x, y, r) => !(create_point(x, y) - (r ** 2 / 2) * ei);
    let dist = (x, y) => (2 * (x << y).Length) ** 0.5;
    let angle = (x, y) => Math.acos(!x.Normalized << !y.Normalized);
    let translate = (v) => (1 - 0.5 * v) ^ ei;
    let rotate = (P, a) => Math.cos(a / 2) - Math.sin(a / 2) * (((1e12 - P) << 1e12) ^ ei);
    /* End of templates section */

    let p1 = create_point(1, -1);
    let p2 = create_point(-1, -1);
    let p3 = create_point(1, 1);

    addToRender(p1, "1", p2, "2");

    addToRender((rotate(p1, time()) * translate(Math.sin(time()) * 1e1)) >>> p2);

    document.body.appendChild(
        this.graph(
            () => {
                return renders;
            },
            {
                grid: true,
                lineWidth: 1,
                labels: true,
                animate: true,
                conformal: true,
                scale: 0.5,
            }
        )
    );
});

function randomHexColor() {
    // Generate random values for R, G, B, and Alpha
    const r = Math.floor(Math.random() * 256); // 0-255
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = Math.floor(Math.random() * 256); // alpha

    // Convert each to a 2-digit hex and concatenate
    const hex = ((a << 24) | (r << 16) | (g << 8) | b) >>> 0;
    return parseInt("0x" + hex.toString(16).padStart(8, "0").toUpperCase());
}
