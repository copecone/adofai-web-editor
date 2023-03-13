class GLCanvas {
    constructor(GL, canvas) {
        this.gl = GL
        this.canvas = canvas
        this._callbacks = {
            resize: null, update: null
        }
        
        this._init()
    }
    
    _init() {
        this.viewport(Dimension.fromElement(window))
        
        window.addEventListener('resize', (event) => { this._callbacks.resize?.call(this, event) })
        this._updateEvent()
    }
    
    viewport(size) {
        gl.viewport(0, 0, size.width, size.height)
    }

    ratio() {
        const size = this._size()
        return size.width / size.height
    }
    
    _size() {
        return new Dimension(this.canvas.width, this.canvas.height)
    }

    _updateEvent() {
        this._callbacks.update?.call(this)
        window.requestAnimationFrame(this._updateEvent.bind(this))
    }
    
    fill(color) {
        gl.clearColor(color.r, color.g, color.b, color.a)
        
        gl.enable(gl.DEPTH_TEST)
        gl.depthFunc(gl.LEQUAL)
        
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    }
    
    resize(callback) { this._callbacks.resize = callback }
    update(callback) { this._callbacks.update = callback }
}