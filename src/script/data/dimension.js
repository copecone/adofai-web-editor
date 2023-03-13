class Dimension {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    
    static fromElement(element) {
        return new Dimension(element.innerWidth, element.innerHeight)
    }
}