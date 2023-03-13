class Color {
    static BLACK = new Color(0);
    static WHITE = new Color(1);
    
    constructor(r, g, b, a) {
        if (r != undefined && g != undefined && b != undefined && a != undefined) {
            this.r = r; this.g = g; this.b = b; this.a = a;
        } else if (r != undefined && g != undefined && b != undefined) {
            this.r = r; this.g = g; this.b = b; this.a = 1;
        } else if (r != undefined && g != undefined) {
            this.r = r; this.g = r; this.b = r; this.a = g;
        } else if (r != undefined) {
            this.r = r; this.g = r; this.b = r;
        } else {
            console.error('Wrong Class Initialization');
        }
    }
}