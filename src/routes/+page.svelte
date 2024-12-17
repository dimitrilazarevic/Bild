<script>


    import * as THREE from 'three';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import { onMount } from 'svelte';

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
        camera.position.set(-0.1, 0, 0) ;
        updateZoom(cameraZoomIndex);

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

        const scene = new THREE.Scene();

        const geometry = new THREE.SphereGeometry( 1, 30, 30 );

        const texture = loader.load('/test_images/bedroom.jpg');

        texture.wrapS = THREE.RepeatWrapping
        texture.repeat.x = -1

        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        })

        const sphere = new THREE.Mesh(geometry,material);

        scene.add(sphere);

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

<main>
    <canvas id="canvas"></canvas>
</main>