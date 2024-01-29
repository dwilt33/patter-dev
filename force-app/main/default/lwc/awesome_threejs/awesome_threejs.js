import { loadScript } from 'lightning/platformResourceLoader';
import { LightningElement, api } from 'lwc';

import THREE_ZIP from '@salesforce/resourceUrl/ThreeJSZip';

export default class Awesome_threejs extends LightningElement {

    renderedCallback() {

        Promise.all([
            loadScript(this, THREE_ZIP + '/three.js'),
            loadScript(this, THREE_ZIP + '/DRACOLoader.js'),
            loadScript(this, THREE_ZIP + '/GLTFLoader.js'),
            loadScript(this ,THREE_ZIP + '/OrbitControls.js'),
            loadScript(this ,THREE_ZIP + '/RoomEnvironment.js'),
            loadScript(this ,THREE_ZIP + '/stats.module.js')
        ]).then(() => {
            let mixer;

            const clock = new THREE.Clock();
            const container = this.template.querySelector('.container');
            console.log('here...');

            const stats = new Stats();
            container.appendChild( stats.dom );
            console.log('here...');
        
            const renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            container.appendChild( renderer.domElement );
        
            const pmremGenerator = new THREE.PMREMGenerator( renderer );
        
            const scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xbfe3dd );
            scene.environment = pmremGenerator.fromScene( new RoomEnvironment( renderer ), 0.04 ).texture;
        
            const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
            camera.position.set( 5, 2, 8 );
        
            const controls = new OrbitControls( camera, renderer.domElement );
            controls.target.set( 0, 0.5, 0 );
            controls.update();
            controls.enablePan = false;
            controls.enableDamping = true;
        
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath( 'jsm/libs/draco/gltf/' );
        
            const loader = new GLTFLoader();
            loader.setDRACOLoader( dracoLoader );
            loader.load( 'models/gltf/LittlestTokyo.glb', function ( gltf ) {
        
                const model = gltf.scene;
                model.position.set( 1, 1, 0 );
                model.scale.set( 0.01, 0.01, 0.01 );
                scene.add( model );
        
                mixer = new THREE.AnimationMixer( model );
                mixer.clipAction( gltf.animations[ 0 ] ).play();
        
                animate();
        
            }, undefined, function ( e ) {
        
                console.error( e );
        
            } );
        
        
            window.onresize = function () {
        
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
        
                renderer.setSize( window.innerWidth, window.innerHeight );
        
            };
        
        
            function animate() {
        
                requestAnimationFrame( animate );
        
                const delta = clock.getDelta();
        
                mixer.update( delta );
                controls.update();
                stats.update();
        
                renderer.render( scene, camera );
        
            }
        }).catch(error => {
            console.log('errorhere', error);
        });

    }

}