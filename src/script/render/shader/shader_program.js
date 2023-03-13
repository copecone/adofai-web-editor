class Program {
    constructor(gl) {
        this.gl = gl
        this.processing = 0
        this.program = gl.createProgram()
    }
    
    attachShader(shader) {
        this.processing += 1
        this._checkShader(shader)
    }

    _checkShader(shader) {
        if (shader.isCompiled) {
            this.processing -= 1
            this._attach(shader)
        } else { setTimeout(this._checkShader, 1, shader) }
    }

    _attach(shader) {
        this.gl.attachShader(this.program, shader)
    }

    apply() {
        if (this.processing != 0) {
            setTimeout(this.apply, 1)
        } else {
            this.gl.useProgram(this._makeProgram())
        }
    }

    _makeProgram() {
        this.gl.linkProgram(this.program)
        return this.program
    }
}