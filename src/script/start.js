function initWebGL(canvas) {
    gl = null;
    try {
        // Try to grab the standard context. If it fails, fallback to experimental.
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    } catch(e) { console.error(e) }

    if (!gl) { gl = null }
    return gl
}

document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.querySelector('#editor_canvas')
    var GL = initWebGL(canvas)
    startEditor(GL, canvas)
});