import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';
import shaderCode from './shaders/cosmicShader.js';

import {getGlobalElapsedTime} from '../globalTimer.js';

let scene, camera, renderer, material, mesh;

let animating = false;
let animationId;

function init() {
  // Create scene and camera
  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  // Create renderer
  renderer = new THREE.WebGLRenderer({ alpha: true }); // alpha: true makes background transparent
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('padding-shader').appendChild(renderer.domElement);

  // Create a simple full-screen quad
  const geometry = new THREE.PlaneGeometry(2, 2);

  // Example simple shader material
  material = new THREE.ShaderMaterial({
    uniforms: {
      iTime: { value: 0.0 },
      iResolution: { value: new THREE.Vector2()}, 
      iMouse: { value: new THREE.Vector4(0., 0., 0., 0.) }
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


  updateShaderSize();
  
  window.addEventListener('resize', updateShaderSize, false);
}



function updateShaderSize() {
  const shaderContainer = document.getElementById('padding-shader');
  let w = window.innerWidth;
  let h = window.innerHeight;

  shaderContainer.style.width = w + 'px';
  shaderContainer.style.height = h + 'px';

  renderer.setSize(w, h);
  material.uniforms.iResolution.value.set(w, h);
}

  
function animate() {
  if(!animating) return;

  //console.log("cosmic padding shader animating"); /// for debugging

  requestAnimationFrame(animate);
  
  material.uniforms.iTime.value = getGlobalElapsedTime();
  
  renderer.render(scene, camera);
}
  
  
function startCosmicPaddingShader() {
  init();

  const cosmicPaddingObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        resumeCosmicPaddingShader();
      } else {
        pauseCosmicPaddingShader();
      }
    });
  }, { threshold: 0.0});
  
  cosmicPaddingObserver.observe(document.getElementById('padding-shader'));

  animating = true;
  animate();
}
    
    
function pauseCosmicPaddingShader() {
  animating = false;
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
}
    
  
function resumeCosmicPaddingShader() {
  if (!animating) {
    animating = true;
    animate();
  }
}
  
  
export {startCosmicPaddingShader, pauseCosmicPaddingShader, resumeCosmicPaddingShader};