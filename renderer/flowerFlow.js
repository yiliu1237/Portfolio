import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';
import shaderCode from '../shaders/flowerShader.js';

let scene, camera, renderer, material, mesh;
let fadeStarted = false;
let gridVisible = null;
let visibleDuration = 0; // measured in seconds
const fadeTriggerTime = 1.0; // how many seconds user must watch
let previousTimestamp = performance.now();

init();
animate();

function init() {
  // Create scene and camera
  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  // Create renderer
  renderer = new THREE.WebGLRenderer({ alpha: true }); // alpha: true makes background transparent
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('grid-shader').appendChild(renderer.domElement);

  // Create a simple full-screen quad
  const geometry = new THREE.PlaneGeometry(2, 2);

  // Example simple shader material
  material = new THREE.ShaderMaterial({
    uniforms: {
      iTime: { value: 0.0 },
      iResolution: { value: new THREE.Vector2() },
      fadeAmount: { value: 1.0 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: shaderCode
  });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  window.addEventListener('load', () => {
    updateShaderSize();
    updateShaderPosition();
  });

  window.addEventListener('resize', updateShaderSize, false);
  window.addEventListener('scroll', updateShaderPosition, false);
}



function updateShaderSize() {
    const shaderContainer = document.getElementById('grid-shader');
    const customGrid = document.querySelector('.custom-grid');
  
    const rect = customGrid.getBoundingClientRect();
    
    shaderContainer.style.width = rect.width + 'px';
    shaderContainer.style.height = rect.height + 'px';
  
    renderer.setSize(rect.width, rect.height);

    material.uniforms.iResolution.value.set(rect.width, rect.height);
}


function updateShaderPosition() {
    const shaderContainer = document.getElementById('grid-shader');
    const customGrid = document.querySelector('.custom-grid');
  
    const rect = customGrid.getBoundingClientRect();
  
    shaderContainer.style.position = 'absolute';
    shaderContainer.style.top = rect.top + window.scrollY + 'px';
    shaderContainer.style.left = rect.left + window.scrollX + 'px';
    shaderContainer.style.zIndex = 5;
    shaderContainer.style.pointerEvents = 'none'; // allow click-through
  }
  

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gridVisible = true;
      } else {
        gridVisible = false;
        //visibleDuration = 0; // reset timer if user scrolls away
      }
    });
  }, {
    threshold: 0.5 // 50% visible
  });
  
  observer.observe(document.querySelector('.custom-grid'));



  function animate() {
    requestAnimationFrame(animate);
  
    const currentTimestamp = performance.now();
    const deltaSeconds = (currentTimestamp - previousTimestamp) / 1000.0;
    previousTimestamp = currentTimestamp;
  
    material.uniforms.iTime.value += deltaSeconds;
  
    // Count how long grid is visible
    if (gridVisible && !fadeStarted) {
      visibleDuration += deltaSeconds;
      if (visibleDuration >= fadeTriggerTime) {
        fadeStarted = true;
      }
    }
  
    // Start fade once triggered
    if (fadeStarted) {

      material.uniforms.fadeAmount.value -= 0.01;
      material.uniforms.fadeAmount.value = Math.max(material.uniforms.fadeAmount.value, 0.0);
    }
  
    renderer.render(scene, camera);
  }
  
  