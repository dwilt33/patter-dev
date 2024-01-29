import THREE_LIB from '@salesforce/resourceUrl/ThreeJSZip';
import { loadScript } from 'lightning/platformResourceLoader';
import { LightningElement, api } from 'lwc';


export default class Test_threejs extends LightningElement {
    
    renderedCallback() {

        loadScript(this, THREE_LIB + '/three.js')
        .then(() => {
            console.log('Rendering...');

            const scene = new THREE.Scene();
            // const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
            console.log('scene : ' + JSON.stringify(scene));

            const geometry = new THREE.SphereGeometry(3, 64, 64);
            const material = new THREE.MeshStandardMaterial({
              color: "#00ff83"
            });
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
            
            const sizes = {
              width: window.innerWidth,
              height: window.innerHeight
            };
            
            const light = new THREE.PointLight(0xffffff, 51, 100);
            light.position.set(0, 5, 10);
            scene.add(light);
            
            const camera = new THREE.PerspectiveCamera(
              45,
              sizes.width / sizes.height,
              0.1,
              100
            );
            camera.position.z = 20;
            scene.add(camera);
            console.log('scene : ' + JSON.stringify(scene));

            
            const canvas = this.template.querySelector("canvas");
            console.log('canvas : ' + JSON.stringify(canvas));

            const renderer = new THREE.WebGLRenderer({ canvas });
            renderer.setSize(sizes.width, sizes.height);
            renderer.render(scene, camera);
            // update
            
            // const controls = new OrbitControls(camera, renderer.domElement);
            // controls.enableDamping = true;
            // controls.enablePan = false;
            // controls.enableZoom = false;
            // controls.autoRotate = true;
            // controls.autoRotateSpeed = 5;
            
            // window.addEventListener("resize", () => {
            //   sizes.width = window.innerWidth;
            //   sizes.height = window.innerHeight;
            //   camera.updateProjectionMatrix();
            //   camera.aspect = sizes.width / sizes.height;
            //   renderer.setSize(sizes.width, sizes.height);
            // });
            
            // const loop = () => {
            //   controls.update();
            //   renderer.render(scene, camera);
            //   window.requestAnimationFrame(loop);
            // };
            // loop();

        })
        .catch(error => {
            console.log('errorhere', error)
        })
    }
    
}