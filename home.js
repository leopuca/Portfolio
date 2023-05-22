document.getElementById("prj-index").onclick = function () {
  location.href = "/projects.html";
};

document.getElementById("exp-index").onclick = function () {
  location.href = "/experiments.html";
};

// Load Three.js and GLTFLoader
import * as CANNON from 'cannon-es'
import * as THREE from 'three'
import { GLTFLoader } from '/utils/GLTFLoader.js';

import CannonUtils from '/utils/cannonUtils.js';
import CannonDebugRenderer from '/utils/cannonDebugRenderer.js';





const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias:true,
  alpha: true,
});
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

window.onresize = function(){
  location.reload();
}


const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper( 5 );

var model, model2, model3;
var frustumSize;
var pos;


const aspect = window.innerWidth/window.innerHeight;  // the canvas default

if ( aspect < 1 ) { //mobile
  frustumSize = 16;
  pos = 8;
}

else if ( aspect >=1 ) { //desktop
  frustumSize = 10;
  pos = 5;
}

const camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );

camera.position.set(0, 0, 10);
camera.lookAt(scene.position);

const ambient = new THREE.AmbientLight( 0xFFFFFF, 1.1 ); // soft white light
scene.add( ambient );


// Create Cannon.js world
const world = new CANNON.World();
world.gravity.set(0, 0, 0); // Set gravity
const normalMaterial = new THREE.MeshNormalMaterial();

// Create Cannon.js body for model
const mat1 = new CANNON.Material('mat1');

//------------------------------arrow 01--------------------------------//
let arrowLoaded = false
const gltfLoader = new GLTFLoader();
gltfLoader.load('./Media/model1.glb', function (glb) {
  model = glb.scene;
  model.position.set(0,0,0);
  scene.add(model);
  arrowLoaded = true
},
(xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
    console.log('An error happened')
  }
);


const body = new CANNON.Body({ mass: 1, material: mat1, }); // Set mass to 1
body.position.set(0, -0.5, 0); // Set initial position
body.velocity.set(0, 0, 0); // Set initial velocity
body.quaternion.setFromAxisAngle(new CANNON.Vec3(1,1,0),Math.PI/2);

var s = 0.13
const shape = new CANNON.Box(new CANNON.Vec3(s, s, s)); // Create box shape for model
body.addShape(shape, new CANNON.Vec3( s*2, 0, 0));
body.addShape(shape, new CANNON.Vec3( s*4, 0, 0));
body.addShape(shape, new CANNON.Vec3( -s*2, 0, 0));
body.addShape(shape, new CANNON.Vec3( -s*4, 0, 0));

body.addShape(shape, new CANNON.Vec3( s*2, 0, s*2));
body.addShape(shape, new CANNON.Vec3( 0, 0, s*2));
body.addShape(shape, new CANNON.Vec3( -s*2, 0, s*2));
body.addShape(shape, new CANNON.Vec3( -s*4, 0, s*2));

body.addShape(shape, new CANNON.Vec3( s*2, 0, s*4));
body.addShape(shape, new CANNON.Vec3( 0, 0, s*4));
body.addShape(shape, new CANNON.Vec3( -s*4, 0, s*4));


body.addShape(shape, new CANNON.Vec3( 0, 0, -s*2));
body.addShape(shape, new CANNON.Vec3( s*2, 0, -s*2));
body.addShape(shape, new CANNON.Vec3( -s*2, 0, -s*2));
body.addShape(shape, new CANNON.Vec3( -s*4, 0, -s*2));

body.addShape(shape, new CANNON.Vec3( 0, 0, -s*4));
body.addShape(shape, new CANNON.Vec3( -s*2, 0, -s*4));
body.addShape(shape, new CANNON.Vec3( -s*4, 0, -s*4));

body.addShape(shape, new CANNON.Vec3( -s*2, 0, -s*6));
body.addShape(shape, new CANNON.Vec3( -s*4, 0, -s*6));

body.addShape(shape, new CANNON.Vec3( -s*4, 0, -s*8));

body.addShape(shape); // Add shape to body
world.addBody(body); // Add body to world


//------------------------------pointer--------------------------------//
let pointerLoaded = false
const gltfLoader2 = new GLTFLoader();
gltfLoader2.load('./Media/model2.glb', function (glb) {
  model2 = glb.scene;
  model2.position.set(0,0,0);
  scene.add(model2);
  pointerLoaded = true
},
(xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
    console.log('An error happened')
  }

);


const body2 = new CANNON.Body({ mass: 1, material: mat1, }); // Set mass to 1
body2.position.set(0.5, 0, 0); // Set initial position
body2.velocity.set(0, 0, 0); // Set initial velocity
body2.quaternion.setFromAxisAngle(new CANNON.Vec3(1,1,0),Math.PI/2);


const shape2 = new CANNON.Box(new CANNON.Vec3(s, s, s)); // Create box shape for model
body2.addShape(shape2, new CANNON.Vec3( s*2, 0, 0));
body2.addShape(shape2, new CANNON.Vec3( s*4, 0, 0));
body2.addShape(shape2, new CANNON.Vec3( s*6, 0, 0));
body2.addShape(shape2, new CANNON.Vec3( -s*2, 0, 0));
body2.addShape(shape2, new CANNON.Vec3( -s*4, 0, 0));
body2.addShape(shape2, new CANNON.Vec3( -s*6, 0, 0));

body2.addShape(shape2, new CANNON.Vec3( 0, 0, -s*2));
body2.addShape(shape2, new CANNON.Vec3( s*2, 0, -s*2));
body2.addShape(shape2, new CANNON.Vec3( s*4, 0, -s*2));
body2.addShape(shape2, new CANNON.Vec3( s*6, 0, -s*2));
body2.addShape(shape2, new CANNON.Vec3( -s*2, 0, -s*2));
body2.addShape(shape2, new CANNON.Vec3( -s*4, 0, -s*2));
body2.addShape(shape2, new CANNON.Vec3( -s*6, 0, -s*2));

body2.addShape(shape2, new CANNON.Vec3( 0, 0, -s*4));
body2.addShape(shape2, new CANNON.Vec3( s*2, 0, -s*4));
body2.addShape(shape2, new CANNON.Vec3( s*4, 0, -s*4));
body2.addShape(shape2, new CANNON.Vec3( -s*2, 0, -s*4));


body2.addShape(shape2, new CANNON.Vec3( -s*2, 0, -s*6));
body2.addShape(shape2, new CANNON.Vec3( -s*2, 0, -s*8));

body2.addShape(shape2, new CANNON.Vec3( 0, 0, s*2));
body2.addShape(shape2, new CANNON.Vec3( s*2, 0, s*2));
body2.addShape(shape2, new CANNON.Vec3( s*4, 0, s*2));
body2.addShape(shape2, new CANNON.Vec3( s*6, 0, s*2));
body2.addShape(shape2, new CANNON.Vec3( -s*2, 0, s*2));
body2.addShape(shape2, new CANNON.Vec3( -s*4, 0, s*2));

body2.addShape(shape2, new CANNON.Vec3( 0, 0, s*4));
body2.addShape(shape2, new CANNON.Vec3( s*2, 0, s*4));
body2.addShape(shape2, new CANNON.Vec3( s*4, 0, s*4));
body2.addShape(shape2, new CANNON.Vec3( s*6, 0, s*4));
body2.addShape(shape2, new CANNON.Vec3( -s*2, 0, s*4));
body2.addShape(shape2, new CANNON.Vec3( -s*4, 0, s*4));

body2.addShape(shape2, new CANNON.Vec3( 0, 0, s*6));
body2.addShape(shape2, new CANNON.Vec3( s*2, 0, s*6));
body2.addShape(shape2, new CANNON.Vec3( s*4, 0, s*6));
body2.addShape(shape2, new CANNON.Vec3( -s*2, 0, s*6));

body2.addShape(shape2); // Add shape to body
world.addBody(body2); // Add body to world

//------------------------------arrow 02--------------------------------//
let arrow2Loaded = false
const gltfLoader3 = new GLTFLoader();
gltfLoader3.load('./Media/model1.glb', function (glb) {
  model3 = glb.scene;
  model3.position.set(0,0,0);
  scene.add(model3);
  arrow2Loaded = true
},
(xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
    console.log('An error happened')
  }
);


const body3 = new CANNON.Body({ mass: 1, material: mat1, }); // Set mass to 1
body3.position.set(-0.5, 0, 0); // Set initial position
body3.velocity.set(0, 0, 0); // Set initial velocity
body3.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),Math.PI/2);

const shape3 = new CANNON.Box(new CANNON.Vec3(s, s, s)); // Create box shape for model
body3.addShape(shape3, new CANNON.Vec3( s*2, 0, 0));
body3.addShape(shape3, new CANNON.Vec3( s*4, 0, 0));
body3.addShape(shape3, new CANNON.Vec3( -s*2, 0, 0));
body3.addShape(shape3, new CANNON.Vec3( -s*4, 0, 0));

body3.addShape(shape3, new CANNON.Vec3( s*2, 0, s*2));
body3.addShape(shape3, new CANNON.Vec3( 0, 0, s*2));
body3.addShape(shape3, new CANNON.Vec3( -s*2, 0, s*2));
body3.addShape(shape3, new CANNON.Vec3( -s*4, 0, s*2));

body3.addShape(shape3, new CANNON.Vec3( s*2, 0, s*4));
body3.addShape(shape3, new CANNON.Vec3( 0, 0, s*4));
body3.addShape(shape3, new CANNON.Vec3( -s*4, 0, s*4));


body3.addShape(shape3, new CANNON.Vec3( 0, 0, -s*2));
body3.addShape(shape3, new CANNON.Vec3( s*2, 0, -s*2));
body3.addShape(shape3, new CANNON.Vec3( -s*2, 0, -s*2));
body3.addShape(shape3, new CANNON.Vec3( -s*4, 0, -s*2));

body3.addShape(shape3, new CANNON.Vec3( 0, 0, -s*4));
body3.addShape(shape3, new CANNON.Vec3( -s*2, 0, -s*4));
body3.addShape(shape3, new CANNON.Vec3( -s*4, 0, -s*4));

body3.addShape(shape3, new CANNON.Vec3( -s*2, 0, -s*6));
body3.addShape(shape3, new CANNON.Vec3( -s*4, 0, -s*6));

body3.addShape(shape3, new CANNON.Vec3( -s*4, 0, -s*8));

body3.addShape(shape3); // Add shape to body
world.addBody(body3); // Add body to world


const floor = new CANNON.Material('floor');

//bottom plane
const planeShape = new CANNON.Plane()
const planeBody = new CANNON.Body({ mass: 0, material: floor })
planeBody.addShape(planeShape)
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
planeBody.position.set(0, -pos, 0)
world.addBody(planeBody)

//top plane
const planeShape2 = new CANNON.Plane()
const planeBody2 = new CANNON.Body({ mass: 0, material: floor })
planeBody2.addShape(planeShape2)
planeBody2.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2)
planeBody2.position.set(0, pos, 0)
world.addBody(planeBody2)

//right plane
const planeShape3 = new CANNON.Plane()
const planeBody3 = new CANNON.Body({ mass: 0, material: floor })
planeBody3.addShape(planeShape3)
planeBody3.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
planeBody3.position.set(pos*aspect, 0, 0)
world.addBody(planeBody3)

//left plane
const planeShape4 = new CANNON.Plane()
const planeBody4 = new CANNON.Body({ mass: 0, material: floor })
planeBody4.addShape(planeShape4)
planeBody4.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2)
planeBody4.position.set(-pos*aspect, 0, 0)
world.addBody(planeBody4)

//back plane
const planeShape5 = new CANNON.Plane()
const planeBody5 = new CANNON.Body({ mass: 0, material: floor })
planeBody5.addShape(planeShape5)
planeBody5.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI)
planeBody5.position.set(0, 0, pos)
world.addBody(planeBody5)

//front plane
const planeShape6 = new CANNON.Plane()
const planeBody6 = new CANNON.Body({ mass: 0, material: floor })
planeBody6.addShape(planeShape6)
planeBody6.position.set(0, 0, -pos)
world.addBody(planeBody6)

// Create contact material behaviour
const bounce = new CANNON.ContactMaterial(floor, mat1, {
  friction: 0,
  restitution: 1,
  contactEquationStiffness: 1e2,
  contactEquationRelaxation: 1,
  frictionEquationStiffness: 1e2,
  frictionEquationRelaxation: 1
});
world.addContactMaterial(bounce);

const bounce2 = new CANNON.ContactMaterial(mat1, mat1, {
  friction: 0,
  restitution: 1,
  contactEquationStiffness: 1e7,
  contactEquationRelaxation: 1,
  frictionEquationStiffness: 1e7,
  frictionEquationRelaxation: 1
});
world.addContactMaterial(bounce2);


//------------------------------scroll functions-----------------------------//

  function addEvent(el, eventType, handler) {
    if (el.addEventListener) { // DOM Level 2 browsers
      el.addEventListener(eventType, handler, false);
    } else if (el.attachEvent) { // IE <= 8
      el.attachEvent('on' + eventType, handler);
    } else { // ancient browsers
      el['on' + eventType] = handler;
    }
  };
  (function() {

    var lethargy = new Lethargy();

    // Define the function to run on mousewheel
    var checkScroll = function (e) {
      // e.preventDefault();
      e.stopPropagation();

      var result = lethargy.check(e);

      // false means it's not a scroll intent, 1 or -1 means it is
      console.log(result);
      if (result !== false) {

      }
      if (result == -1) {
        body.velocity.y +=2;
        body2.velocity.y +=2;
        body3.velocity.y +=2;
      }

      if (result == 1) {
        body.velocity.y -=2;
        body2.velocity.y -=2;
        body3.velocity.y -=2;
      }
    };

    // Cross-browser way to bind to mouse events
    addEvent(window, 'mousewheel', checkScroll);
    addEvent(window, 'DOMMouseScroll', checkScroll);
    addEvent(window, 'wheel', checkScroll);
    addEvent(window, 'MozMousePixelScroll', checkScroll);
  })();




const cannonDebugRenderer = new CannonDebugRenderer(scene, world)



function animate() {
  // cannonDebugRenderer.update()

  requestAnimationFrame(animate);

if (arrowLoaded) {
  model.position.copy(body.position);
  model.quaternion.copy(body.quaternion);
}

if (arrow2Loaded) {
  model3.position.copy(body3.position);
  model3.quaternion.copy(body3.quaternion);
}

if (pointerLoaded) {
  model2.position.copy(body2.position);
  model2.quaternion.copy(body2.quaternion);
}

  world.step(1 / 60); // Step the simulation
  renderer.render(scene, camera);
}

animate();
