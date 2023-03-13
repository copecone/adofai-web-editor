class VertexShader {
    static shaderMIME = "x-shader/x-vertex"

    constructor(gl, url) {
        this.shader = null
        this.isCompiled = false
        this._fetchShader(url).then((data) => {
            this.shader = gl.createShader(gl.VERTEX_SHADER)
            
            gl.shaderSource(this.shader, data)
            gl.compileShader(this.shader)

            if (!gl.getShaderParameter(this.shader, gl.COMPILE_STATUS)) {
                alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(this.shader));
                this.shader = null
            } else {
                this.isCompiled = true
            }
        })
    }

    async _fetchShader(url) {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',

            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': this.shaderMIME
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })

        return response.text()
    }
}