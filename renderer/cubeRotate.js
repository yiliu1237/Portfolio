import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';
import shaderCode from './shaders/cubeShader.js';

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
  document.getElementById('cube-shader').appendChild(renderer.domElement);

  // Create a simple full-screen quad
  const geometry = new THREE.PlaneGeometry(2, 2);

  // Example simple shader material
  material = new THREE.ShaderMaterial({
    uniforms: {
      iTime: { value: 0.0 },
      iResolution: { value: new THREE.Vector2()}
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

  // window.addEventListener('DOMContentLoaded', () => {
  //   requestAnimationFrame(() => {
  //     updateCubeShaderSize(); // after full layout
  //   });
  // });
  requestAnimationFrame(() => { //makes sure page is painted and sized.
    updateShaderSize(); //after one frame
  });
  
  window.addEventListener('resize', updateShaderSize);

}



function updateShaderSize() {
    const shaderContainer = document.getElementById('cube-shader');
    const cubeSection = document.querySelector('.item.cube');
  
    const rect = cubeSection.getBoundingClientRect();
    
    shaderContainer.style.width = rect.width + 'px';
    shaderContainer.style.height = rect.height + 'px';
  
    renderer.setSize(rect.width, rect.height);

    material.uniforms.iResolution.value.set(rect.width, rect.height);
}


function animate() {
  if (!animating) return; 

  //console.log("cube shader animating"); /// for debugging 

  animationId = requestAnimationFrame(animate);

  material.uniforms.iTime.value = getGlobalElapsedTime(); 

  renderer.render(scene, camera);
}

function startCubeShader() {
  init();

  const cubeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        resumeCubeShader();
      } else {
        pauseCubeShader();
      }
    });
  }, { threshold: 0.0 });
  
  cubeObserver.observe(document.querySelector('.item.cube'));
  

  animating = true;
  animate();
}


function pauseCubeShader() {
  animating = false;
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
}

function resumeCubeShader() {
  if (!animating) {
    animating = true;
    animate();
  }
}


  
export { startCubeShader, pauseCubeShader, resumeCubeShader, renderer, material, updateShaderSize};