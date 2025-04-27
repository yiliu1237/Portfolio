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
  document.getElementById('hero-shader').appendChild(renderer.domElement);

  // Create a simple full-screen quad
  const geometry = new THREE.PlaneGeometry(2, 2);

  // Example simple shader material
  material = new THREE.ShaderMaterial({
    uniforms: {
      iTime: { value: 0.0 },
      iResolution: { value: new THREE.Vector2()}, 
      iMouse: { value: new THREE.Vector4() }
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

  // window.addEventListener('load', () => {
  //   updateShaderSize();
  //   updateShaderPosition();
  // });
  updateShaderSize();
  updateShaderPosition();

  window.addEventListener('resize', updateShaderSize, false);
  window.addEventListener('scroll', updateShaderPosition, false);
}



function updateShaderSize() {
    const shaderContainer = document.getElementById('hero-shader');
    const heroSection = document.querySelector('.hero');
  
    const rect = heroSection.getBoundingClientRect();
    
    shaderContainer.style.width = rect.width + 'px';
    shaderContainer.style.height = rect.height + 'px';
  
    renderer.setSize(rect.width, rect.height);

    material.uniforms.iResolution.value.set(rect.width, rect.height);
}


function updateShaderPosition() {
    const shaderContainer = document.getElementById('hero-shader');
    const heroSection = document.querySelector('.hero');
  
    const rect = heroSection.getBoundingClientRect();
  
    shaderContainer.style.position = 'absolute';
    shaderContainer.style.top = rect.top + window.scrollY + 'px';
    shaderContainer.style.left = rect.left + window.scrollX + 'px';
    shaderContainer.style.pointerEvents = 'none'; // allow click-through
  }


const heroSection = document.querySelector('.hero');

heroSection.addEventListener('mousemove', (event) => {
  const rect = heroSection.getBoundingClientRect();
  material.uniforms.iMouse.value.x = event.clientX - rect.left;
  material.uniforms.iMouse.value.y = rect.bottom - event.clientY;
});
  

  
function animate() {
  if(!animating) return;

  animationId = requestAnimationFrame(animate);
  material.uniforms.iTime.value = getGlobalElapsedTime();
  
  renderer.render(scene, camera);
}
  

function startCosmicShader() {
  init();

  animating = true;
  animate();
}
  
  
function pauseCosmicShader() {
  animating = false;
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
}
  

function resumeCosmicShader() {
  if (!animating) {
    animating = true;
    animate();
  }
}


export {startCosmicShader, pauseCosmicShader, resumeCosmicShader};