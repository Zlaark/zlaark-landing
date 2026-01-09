export const gridVertexShader = `
varying vec2 vUv;
varying vec3 vPos;
uniform float uTime;
uniform vec2 uMouse;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Subtle continuous breathing wave
  float wave = sin(uv.x * 2.0 + uTime * 0.5) * sin(uv.y * 2.0 + uTime * 0.3) * 0.5;
  
  // Mouse interaction
  float dist = distance(uv, uMouse);
  float mouseEffect = smoothstep(0.4, 0.0, dist);
  
  // Combine effects - significantly reduced amplitude
  pos.z += wave * 0.05; // Very gentle base wave
  pos.z += mouseEffect * 0.2 * sin(uTime * 2.0); // Reduced mouse ripple
  
  vPos = pos;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const gridFragmentShader = `
varying vec2 vUv;
varying vec3 vPos;
uniform float uTime;
uniform vec2 uMouse;
uniform float uIsDarkMode;

void main() {
  // Grid settings
  float divisions = 20.0;
  float thickness = 0.01;
  float fadeDistance = 0.5;
  
  // Coordinate calculations for grid lines
  // Use fract to get repeating 0..1 gradients
  vec2 coord = vUv * divisions;
  vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
  float line = min(grid.x, grid.y);
  
  // Color calculation
  float alpha = 1.0 - min(line, 1.0);
  
  // Mouse interaction for color intensity
  float dist = distance(vUv, uMouse);
  float mouseGlow = smoothstep(0.3, 0.0, dist);
  
  vec3 color;
  
  if (uIsDarkMode > 0.5) {
      color = vec3(1.0); // White lines for dark mode
  } else {
      color = vec3(0.15); // Dark lines for light mode
  }
  
  // Fade edges
  alpha *= smoothstep(1.0, 0.8, abs(vUv.x * 2.0 - 1.0)); // Fade x
  alpha *= smoothstep(1.0, 0.8, abs(vUv.y * 2.0 - 1.0)); // Fade y
  
  // Add blue/cyan tint near mouse (Dark Mode) or Purple (Light Mode)
  vec3 glowTint = (uIsDarkMode > 0.5) ? vec3(0.0, 1.0, 1.0) : vec3(0.5, 0.0, 0.8);
  color = mix(color, glowTint, mouseGlow * 0.8);
  
  // Only render lines
  if(alpha < 0.1) discard;
  
  gl_FragColor = vec4(color, alpha * 0.3 + mouseGlow * 0.4);
}
`;
