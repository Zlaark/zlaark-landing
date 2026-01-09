export const fragmentShader = `
varying vec2 vUv;
varying float vDisplacement;
uniform float uTime;

void main() {
  // Base colors
  vec3 colorA = vec3(0.02, 0.02, 0.02); // Dark background
  vec3 colorB = vec3(0.0, 1.0, 0.8);    // Cyan accent
  vec3 colorC = vec3(0.2, 0.0, 0.5);    // Purple accent

  // Mix based on displacement
  float mixStrength = smoothstep(-0.5, 1.0, vDisplacement);
  
  vec3 finalColor = mix(colorA, colorB, mixStrength * 0.4);
  finalColor = mix(finalColor, colorC, sin(vDisplacement * 5.0 + uTime) * 0.2);

  // Add grain
  float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
  finalColor += noise * 0.05;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;
