import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';
import shaderCode from './shaders/glitteryShader.js';

import {getGlobalElapsedTime} from '../globalTimer.js';

let scene, camera, renderer, material, mesh;

let animating = false;
let animationId;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  document.getElementById('grid-bg-shader').appendChild(renderer.domElement);

  const geometry = new THREE.PlaneGeometry(2, 2);

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

  // window.addEventListener('resize', () => {
  //   updateShaderSize();
  //   updateShaderPosition();
  // });
  updateShaderSize();
  updateShaderPosition();

  window.addEventListener('scroll', updateShaderPosition, false);
}


function updateShaderSize() {
  const customGrid = document.querySelector('.custom-grid');
  const rect = customGrid.getBoundingClientRect();

  const gridBgShader = document.getElementById('grid-bg-shader');

  // Width = whole screen
  let w = window.innerWidth;
  // Height = based on .custom-grid's height
  let h = rect.height * 1.2;

  gridBgShader.style.width = w + 'px';    
  gridBgShader.style.height = h + 'px';    

  renderer.setSize(w, h);
  material.uniforms.iResolution.value.set(w, h);
}

function updateShaderPosition() {
  const customGrid = document.querySelector('.custom-grid');
  const gridBgShader = document.getElementById('grid-bg-shader');
  const rect = customGrid.getBoundingClientRect();

  const shiftUp = rect.height * 0.15;

  gridBgShader.style.position = 'absolute';
  // Align top of shader to top of custom-grid
  gridBgShader.style.top = rect.top + (window.scrollY - shiftUp) + 'px';
  // Align left of shader to the screen (0)
  gridBgShader.style.left = '0px';

  gridBgShader.style.pointerEvents = 'none';
  gridBgShader.style.zIndex = 0;
}


function changeHeadingColor(color) {
  const heading = document.querySelector('.portfolio h2');
  if (heading) {
    heading.style.color = color;
  }
}


function fadeInShader() {
  const gridBgShader = document.getElementById('grid-bg-shader');
  if (gridBgShader) {
    gridBgShader.style.opacity = 1;
  }
}


function fadeOutShader() {
  const gridBgShader = document.getElementById('grid-bg-shader');
  if (gridBgShader) {
    gridBgShader.style.opacity = 0;
  }
}



function changeItemBoxShadow(shadowValue) {
  const items = document.querySelectorAll('.item');
  items.forEach(item => {
    item.style.boxShadow = shadowValue;
  });
}




function animate() {
  if(!animating) return;
  animationId = requestAnimationFrame(animate);

  material.uniforms.iTime.value = getGlobalElapsedTime();
  renderer.render(scene, camera);
}



function startGlitteryBGShader() {
  init();

  animating = true;
  animate();
}
  
  
function pauseGlitteryBGShader() {
  animating = false;
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
}
  

function resumeGlitteryBGShader() {
  if (!animating) {
    animating = true;
    animate();
  }
}



export {startGlitteryBGShader, pauseGlitteryBGShader, resumeGlitteryBGShader, fadeInShader, fadeOutShader, changeHeadingColor, changeItemBoxShadow};