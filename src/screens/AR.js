
import React, {Component} from 'react';
import ExpoTHREE, {THREE} from 'expo-three';
import *  as ThreeAR  from 'expo-three-ar';
import {View as GraphicsView } from 'expo-graphics';

export default class AR_view extends Component {
  render() {
    return (
        <GraphicsView
            style={{flex:1}}
            onContextCreate={this._onContextCreate }
            onRender = {this.onRender}
            isArEnabled={true}
            isArCameraStateEnabled={true}
            arTrackingConfiguration={'ARWorldTrackingConfiguration'}
        />
    );
  }

  _onContextCreate = async ({gl, scale: pixelRatio, width, height}) => {
    this.renderer = new ExpoTHREE.Renderer({
      gl,pixelRatio,width,height,
    });
    this.renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    this.scene = new THREE.Scene();
    this.scene.background = new ThreeAR.ARBackgroundTexture(this.renderer);
    this.camera = new ThreeAR.Camera(width,height,0.01,1000);
    // Make a cube - notice that each unit is 1 meter in real life, we will make our box 0.1 meters
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    // Simple color material
    const material = new THREE.MeshPhongMaterial({
      color: 0xff00ff,
    });

    // Combine our geometry and material
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.z = -1;
    // Add the cube to the scene
    this.scene.add(this.cube);

    // Setup a light so we can see the cube color
    // AmbientLight colors all things in the scene equally.
    this.scene.add(new THREE.AmbientLight(0xffffff));

  };

  // When the phone rotates, or the view changes size, this method will be called.
  onResize = ({ x, y, scale, width, height }) => {
    // Let's stop the function if we haven't setup our scene yet
    if (!this.renderer) {
      return;
    }
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
  };

  // Called every frame.
  onRender = () => {
    // Animate the cube
    this.cube.rotation.x +=0.07;
    this.cube.rotation.y += 0.04;
    // Finally render the scene with the AR Camera
    this.renderer.render(this.scene, this.camera);
  };

}



