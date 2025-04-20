export default `
uniform float iTime;
uniform vec2 iResolution;

float brightness = 20.; // Controls sparkle around cube corners (optional)
float cubeSize = 0.5;    // Size of cube (edge length)

// Smoothstep alias
#define S(a, b, t) smoothstep(a, b, t)

// Distance from point to line segment
float DistLine(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
}

// Draw a line segment
float Line(vec2 p, vec2 a, vec2 b) {
    float d = DistLine(p, a, b);
    return S(0.02, 0.0, d); // Make line soft
}

// Create cube edges
float Cube(vec2 uv) {
    float m = 0.;

    // 8 vertices of a 2D projected cube
    vec2 v[8];
    
    // Front face
    v[0] = vec2(-cubeSize, -cubeSize);
    v[1] = vec2( cubeSize, -cubeSize);
    v[2] = vec2( cubeSize,  cubeSize);
    v[3] = vec2(-cubeSize,  cubeSize);

    // Back face (offset diagonally)
    vec2 offset = vec2(0.3, 0.3); // how "deep" the cube looks
    v[4] = v[0] + offset;
    v[5] = v[1] + offset;
    v[6] = v[2] + offset;
    v[7] = v[3] + offset;

    // Draw front face edges
    m += Line(uv, v[0], v[1]);
    m += Line(uv, v[1], v[2]);
    m += Line(uv, v[2], v[3]);
    m += Line(uv, v[3], v[0]);

    // Draw back face edges
    m += Line(uv, v[4], v[5]);
    m += Line(uv, v[5], v[6]);
    m += Line(uv, v[6], v[7]);
    m += Line(uv, v[7], v[4]);

    // Connect front and back faces
    m += Line(uv, v[0], v[4]);
    m += Line(uv, v[1], v[5]);
    m += Line(uv, v[2], v[6]);
    m += Line(uv, v[3], v[7]);

    // Add sparkle effect at vertices
    for (int i = 0; i < 8; i++) {
        vec2 j = (v[i] - uv) * brightness;
        float sparkle = 1. / dot(j, j);
        m += sparkle * (sin(iTime * 5.0 + float(i) * 10.0) * 0.5 + 0.5);
    }

    return m;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Normalized pixels
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;

    float gradient = uv.y;

    float m = 0.0;

    // Layer settings
    float lc = 4.;   // Layer count
    float lw = 0.5;  // Layer width
    float ld = 10.;  // Layer density
    float ls = 0.1;  // Layer speed
    float lr = 20.;  // Layer randomness

    float t = iTime * ls;
    float s = sin(t);
    float c = cos(t);
    mat2 rot = mat2(c, -s, s, c);

    uv *= rot;

    for (float i = 0.; i < 1.; i += 1. / lc) {
        //float z = fract(i + t);
        float z = 0.8;
        float size = mix(ld, lw, z);
        float fade = S(0.0, 0.5, z) * S(1.0, 0.8, z);
        m += Cube(uv * size + i * lr) * fade;
    }

    float cs = 10.0; // Color speed

    vec3 base = sin(t * cs * vec3(0.345, 0.456, 0.567)) * 0.4 + 0.6;
    vec3 col = m * base;

    col -= gradient * base;

    fragColor = vec4(col, 1.0);
}


void main() {
    vec4 color;
    mainImage(color, gl_FragCoord.xy);
    gl_FragColor = color;
}`;