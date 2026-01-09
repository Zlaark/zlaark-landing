export const fogVertexShader = `
varying vec2 vUv;
varying vec3 vPos;

void main() {
  vUv = uv;
  vPos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fogFragmentShader = `
varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uIsDarkMode;

// Noise function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 5; ++i) {
        v += a * noise(st);
        st = rot * st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 st = gl_FragCoord.xy/uResolution.xy;
    st.x *= uResolution.x/uResolution.y;
    
    vec2 mouse = uMouse;
    mouse.x *= uResolution.x/uResolution.y;
    
    // Dist from light source (mouse)
    float dist = distance(st, mouse);
    
    // Create volumetric fog using FBM
    vec2 q = vec2(0.);
    q.x = fbm( st + 0.00 * uTime);
    q.y = fbm( st + vec2(1.0));
    
    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*uTime );
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*uTime);
    
    float f = fbm(st+r);
    
    // Spotlight falloff
    float spot = 1.0 - smoothstep(0.0, 0.8, dist);
    
    // Fog intensity from FBM
    float fogIntensity = clamp((f*f)*4.0, 0.0, 1.0);
    
    vec3 color;
    
    if (uIsDarkMode > 0.5) {
        // DARK MODE: Black background, gold glow emerges from darkness
        // overlay blend: text visible where underlying is LIGHTER (gold glow)
        vec3 glowColor = vec3(0.5, 0.4, 0.2);
        
        // Gold fog emerges based on noise
        color = glowColor * fogIntensity;
        
        // Apply spotlight - glow is visible where spotlight hits
        color = color * spot * 1.5;
        
        // Tiny ambient to prevent pure black
        color += vec3(0.02, 0.02, 0.03);
    } else {
        // LIGHT MODE: Premium Ivory with Golden Fog
        // Text visibility is now handled by CSS Mask, so we focus purely on aesthetics
        
        vec3 bgColor = vec3(0.98, 0.97, 0.95);  // Warm Ivory
        vec3 goldFog = vec3(0.85, 0.70, 0.40);  // Rich Gold
        
        // Start with ivory background
        color = bgColor;
        
        // Add golden fog based on noise and spotlight
        // Fog is stronger in the center (spot) and decreases outward
        float fogAmount = fogIntensity * spot * 0.8; 
        
        // Mix gold into ivory
        color = mix(bgColor, goldFog, fogAmount);
        
        // Add subtle depth/vignette at edges (slightly darker ivory)
        float vignette = (1.0 - spot) * 0.1;
        color = color * (1.0 - vignette * 0.5);
    }

    gl_FragColor = vec4(color, 1.0);
}
`;

