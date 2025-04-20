export default `
// This shader is modifie based on Random1 [HurleybirdJr] by HurleybirdJr
// Link: https://www.shadertoy.com/view/3ltBDH

uniform float iTime;
uniform vec2 iResolution;
uniform vec4 iMouse;

float brightness = 20.; // Brightness is inverted
float lfl = .75; // [L]ine [f]lash [l]ength requirement

// Smoothstep function rename
#define S(a, b, t) smoothstep(a, b, t)

// Line Function
float DistLine (vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float t = clamp(dot(pa, ba)/dot(ba, ba), 0., 1.);
    return length(pa - ba * t);
}

//p = Point

// 2 :> 1
float N21(vec2 p) {
    p = fract(p*vec2(214.65, 918.36)); // Multiply by larger number
    p += dot(p, p+23.45); // Dot and add random number
    return fract(p.x*p.y); // Return coords of point
}

// 2 :> 2
vec2 N22(vec2 p) {
    float n = N21(p); // take X value
    return vec2(n, N21(p+n)); // Add X to rand X
}

// Noise for points
vec2 GetPos(vec2 id, vec2 offset) {
    vec2 n = N22(id+offset)*iTime; // Make [n]oise from id as seed
    
    float rotateAmount = 0.4; // Controls point rotation radius

    return offset+sin(n)*rotateAmount;
}

// Create line
float Line(vec2 p, vec2 a, vec2 b) {
    float d = DistLine(p, a, b); // Calculate line between points
    float m = S(.03, .01, d); // Create line variable using smoothstep
    float d2 = length(a-b); // Line Length
    // Distance rules [Min distance], [Max distance], [Line length]
    m *= S(1.2, .8, d2)*.5+S(.05, .03, abs(d2-lfl)); //Second S flashes on certain length
    return m;
}

float Layer(vec2 uv) {
    float m = 0.;

    // guv = [G]rid [UV]
    vec2 guv = fract(uv)-.5;
    vec2 id = floor(uv);

    //float d = length(guv-p); // Find [d]istance to point
    //m = S(.1, .05, d);
    
    vec2 p[9];
    
    int i = 0;
    for(float y = -1.; y <= 1.; y++) {
        for(float x=-1.; x<=1.; x++) {
            p[i++] = GetPos(id, vec2(x, y)); // Create random [p]oint with offset
        }
    }
    
    float tr = iTime*5.; // Changes [t]winkle [r]ate
    
    for(int i=0; i<9; i++) { 
        m += Line(guv, p[4], p[i]);
        
        vec2 j = (p[i]-guv)*brightness;
        float sparkle = 1./dot(j, j);
        
        m += sparkle*(sin(tr+fract(p[i].x)*10.)*.5+.5);
    }
    
    // Fix gaps on diagonal lines
    m += Line(guv, p[1], p[3]);
    m += Line(guv, p[1], p[5]);
    m += Line(guv, p[7], p[3]);
    m += Line(guv, p[7], p[5]);
    
    return m;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    //Normalised pixels to 0 <> 1 and Aspect Ratio
    vec2 uv = (fragCoord-.5*iResolution.xy)/iResolution.y;
    vec2 mouse = (iMouse.xy/iResolution.xy)-.5; // Get mouse coords and align to center

    //float d = DistLine(uv, vec2(0), vec2(1)); [REDACTED]
    
    float gs = 5.; // [G]rid [s]ize value
    
    float gradient = uv.y;
    
    float m = 0.;

    float lc = 4.; // 3D [l]ayer [c]ount
    float lw = .5; // 3D [l]ayer [w]idth
    float ld = 10.; // 3D [l]ayer [d]ensity
    float ls = .1; // 3D [l]ayer [s]peed
    float lr = 20.; // 3D [l]ayer [r]andomness
    
    float t = iTime*ls; // Time Variable

    float s = sin(t);
    float c = cos(t);
    mat2 rot = mat2(c, -s, s, c); // Create rotate matrix
    
    uv *= rot; // Alter uv with rotate
    mouse *= rot; // Alter mouse coords

    for(float i=0.; i<1.; i += 1./lc) {
        float z = fract(i+t);
        float size = mix(ld, lw, z);
        // S(lStartFade, lEndFade, depth)
        float fade = S(0., .5, z)*S(1., .8, z); // Fade in * Fade out
        m += Layer(uv*size+i*lr-mouse)*fade;
    }
    
    float cs = 10.; // Controls [c]olour [s]peed

    vec3 base = sin(t*cs*vec3(.345, .456, .567))* .4 + .6; // Create base colour
    vec3 col = m*base;

    // Music React [iChannel0] //
    //float fft = texelFetch(iChannel0, ivec2(.7,0), 0).x;
    //gradient *= fft*2.;
    
    col -= gradient*base;

    //col.rg = guv;
    
    // [[[DEBUG]]] //
    // [ID Check] //
    //float idScale = 0.2;
    //col.rg = id*idScale;
    
    // [Grid Check] //
    //float gridOS = 0.5; // Initialise gridOS
    //gridOS -= 0.01; // [Grid] [O]utline [S]ize
    
    //if(guv.x>gridOS||guv.y>gridOS) col = vec3(1,0,0); // Create Grid

    // Output to screen
    fragColor = vec4(col,1.0);
}

void main() {
    vec4 color;
    mainImage(color, gl_FragCoord.xy);
    gl_FragColor = color;
}`;