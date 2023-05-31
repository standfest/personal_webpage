var renderer = new THREE.WebGLRenderer({ canvas : document.getElementById('canvas'), antialias:true, alpha:true});
// default bg canvas color //
renderer.setClearColor(0xffffff,0);
//  use device aspect ratio //
renderer.setPixelRatio(window.devicePixelRatio);
// set size of canvas within window //
//renderer.setSize(window.innerWidth*0.6, window.innerHeight*0.6);
renderer.setSize(500, 500);


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 35, 1, 0.1, 1000 );
camera.position.z = 5;


//var sphere_geometry = new THREE.IcosahedronGeometry( 10, 2 );
var sphere_geometry =new THREE.SphereGeometry(1, 100, 50); //50,35 //128,128
//var material = new THREE.MeshNormalMaterial({ opacity:0.3, transparent:true});
var material = new THREE.MeshBasicMaterial( { color: 0xffffff, opacity:1, transparent:false } );
var sphere = new THREE.Mesh(sphere_geometry, material);
scene.add(sphere);

var wireframeGeometry = new THREE.WireframeGeometry( sphere.geometry );
var wireframeMaterial = new THREE.LineBasicMaterial( { color: 0x000000, opacity:0.5, transparent:true } );
var wireframe = new THREE.LineSegments( wireframeGeometry, wireframeMaterial );
scene.add( wireframe );
wireframe.scale.multiplyScalar(1.0010);//1.02

var outlineMaterial2 = new THREE.MeshBasicMaterial( { color: 0x777777, opacity:0.2, transparent:true } );
var shadow = new THREE.Mesh( sphere_geometry, outlineMaterial2 );
shadow.position = sphere.position;
shadow.position.x=shadow.position.x+0.2;
shadow.position.y=shadow.position.y-0.2;
shadow.position.z=shadow.position.z-10;
shadow.scale.multiplyScalar(1.20);//1.02
//scene.add( shadow );


var update = function() {

  // change '0.003' for more aggressive animation
  var time = performance.now() * 0.0002;
  //console.log(time)

  //go through vertices here and reposition them
  
  // change 'k' value for more spikes
  var k = 2;
  for (var i = 0; i < sphere.geometry.vertices.length; i++) {
      var p = sphere.geometry.vertices[i];
      p.normalize().multiplyScalar(1 + 0.25 * noise.perlin3(p.x * k + time, p.y * k, p.z * k));
  }
  sphere.geometry.computeVertexNormals();
  sphere.geometry.normalsNeedUpdate = true;
  sphere.geometry.verticesNeedUpdate = true;
  wireframe.geometry = sphere.geometry;
}

var speedx = 0.00;//0.0003
var speedy = 0.001;//0.0003
function animate() {
	sphere.rotation.x += speedx;
	sphere.rotation.y += speedy;
	shadow.rotation.x += speedx;
	shadow.rotation.y += speedy;
	wireframe.rotation.x += speedx;
	wireframe.rotation.y += speedy;

	update();
	/* render scene and camera */
	renderer.render(scene,camera);
	requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

window.onscroll = (e) => {
    scene.rotation.x = -this.scrollY/700;
  };

function openNav() {
  document.getElementById("sidepanel").style.width = "50vw";
}

function closeNav() {
  document.getElementById("sidepanel").style.width = "0";
}
