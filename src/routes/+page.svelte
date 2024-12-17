<script>


    import * as THREE from 'three';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import { onMount } from 'svelte';
    import { sphericalToXyz, xyzToSpherical } from '$lib/functions';

    onMount(() => {

        const canvas = document.querySelector("#canvas");
        const loader = new THREE.TextureLoader();

        if (!canvas) {
            console.error("Canvas element not found!");
            return;
        }

        const renderer = new THREE.WebGLRenderer({antialias:true,canvas});
        renderer.setSize(window.innerWidth,window.innerHeight);

        const availableFovs = [8,15,40,80];
        const availableRotateSpeeds = [-0.3,-0.2,-0.1,-0.05];
        let cameraZoomIndex = 1 ;
        const camera = new THREE.PerspectiveCamera(availableFovs[cameraZoomIndex],window.innerWidth / window.innerHeight, 0.1, 5);

        const controls = new OrbitControls(camera,canvas);

        controls.enableZoom = false ;
        controls.enablePan = false ;
        camera.position.set(0.0001, 0, 0) ;
        updateZoom(cameraZoomIndex);

        const scene = new THREE.Scene();

        const geometry = new THREE.SphereGeometry( 1.05, 30, 30 );

        const texture = loader.load('/test_images/bedroom.jpg');

        texture.wrapS = THREE.RepeatWrapping
        texture.repeat.x = -1

        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        })

        const sphere = new THREE.Mesh(geometry,material);

        scene.add(sphere);

        canvas.addEventListener('wheel',(e)=>{

            let wheelDirection = e.wheelDelta > 0 ? "zoom-in":"zoom-out";

            switch (wheelDirection) {

                case "zoom-in" :
                    if(cameraZoomIndex < availableFovs.length-1){
                        cameraZoomIndex++
                    }
                break;
                case "zoom-out" :
                    if(cameraZoomIndex >= 1){
                        cameraZoomIndex--
                    }
                break;
            }
            
            updateZoom(cameraZoomIndex);

        })

        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();

        canvas.addEventListener('dblclick',(e)=>{
            
            pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            raycaster.setFromCamera( pointer, camera );
            let ray = raycaster.ray.direction;

            const spriteMap = new THREE.TextureLoader().load( '/test_images/circle.png' );
            const material = new THREE.SpriteMaterial( { map: spriteMap } );
            const sprite = new THREE.Sprite( material );
            scene.add( sprite );

            sprite.position.set(ray.x,ray.y,ray.z);
            sprite.scale.set(0.1,0.1,0.1);

            console.log(ray);
            
        })



        function animate() {

            requestAnimationFrame( animate );

            // required if controls.enableDamping or controls.autoRotate are set to true
            controls.update();
            renderer.render( scene, camera );

        }

        function updateZoom(i){
            camera.setFocalLength(availableFovs[i]);
            controls.rotateSpeed = availableRotateSpeeds[i] ;
        }

        animate();

    });
    
</script>

<canvas id="canvas"></canvas>

<style>

    body,html,main{
        margin: 0;
    }
    canvas {
        width: 100vw;
        height: 100vh;
        display: block;
     }

</style>
