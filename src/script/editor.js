function startEditor(GL, canvas) {
    if (GL) {
        let glCanvas = new GLCanvas(GL, canvas)
        
        glCanvas.resize((event) => {
            glCanvas.viewport(new Dimension(
                window.innerWidth, window.innerHeight
            ))
        })

        squareBuffer = GL.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, squareBuffer)

        var vertices = [
            1.0,  1.0,  0.0,
            -1.0, 1.0,  0.0,
            1.0,  -1.0, 0.0,
            -1.0, -1.0, 0.0
        ]

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

        //SOME EXAMPLES
        function loadIdentity() {
            mvMatrix = Matrix.I(4);
        }
        
        function multMatrix(m) {
            mvMatrix = mvMatrix.x(m);
        }
        
        function mvTranslate(v) {
            multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
        }
        
        function setMatrixUniforms() {
            var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
            gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));
        
            var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
            gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
        }

        glCanvas.update(() => {
            glCanvas.fill(Color.BLACK)

            perspectiveMatrix = makePerspective(45, glCanvas.ratio(), 0.1, 100.0)
            
            loadIdentity();
            //mvTranslate([-0.0, 0.0, -6.0]);

            GL.bindBuffer(GL.ARRAY_BUFFER, squareBuffer);
            GL.vertexAttribPointer(vertexPositionAttribute, 3, GL.FLOAT, false, 0, 0);
            setMatrixUniforms();
            GL.drawArrays(GL.TRIANGLE_STRIP, 0, 4);
        })

        var defaultVShader = new VertexShader(GL, "src/asset/shader/vertex.vsh")
        var defaultFShader = new FragmentShader(GL, "src/asset/shader/fragment.fsh")

        var program = new Program(GL)
        program.attachShader(defaultVShader)
        program.attachShader(defaultFShader)
        
        program.apply()

        vertexPositionAttribute = GL.getAttribLocation(shaderProgram, "aVertexPosition");
        GL.enableVertexAttribArray(vertexPositionAttribute);
    } else {
        var errorElement = document.createElement('p')
        errorElement.innerText = '브라우저가 WebGL을 지원하지 않습니다'
    }
}
