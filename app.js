// Get the canvas element from the HTML file
const canvas = document.getElementById("renderCanvas");

// Create the Babylon.js engine using the canvas
const engine = new BABYLON.Engine(canvas, true);

// Create a new scene for your 3D objects
const scene = new BABYLON.Scene(engine);

// Create a camera to view the scene
const camera = new BABYLON.ArcRotateCamera(
  "camera", // Give the camera a name
  0, // Set the camera's alpha angle (horizontal rotation)
  0, // Set the camera's beta angle (vertical rotation)
  10, // Set the distance between the camera and the target
  new BABYLON.Vector3.Zero(), // Set the target position (0, 0, 0)
  scene // Attach the camera to the scene
);

// Attach the camera to the canvas so you can control it
camera.attachControl(canvas, true);

// Create a function that renders the scene
const renderLoop = () => {
  scene.render();
};

// Run the render loop using the engine
engine.runRenderLoop(renderLoop);

// Resize the canvas when the window size changes
window.addEventListener("resize", () => {
  engine.resize();
});
// Create a new asset manager for the scene
const assetsManager = new BABYLON.AssetsManager(scene);

// Load a 3D model (e.g., a character)
const characterTask = assetsManager.addMeshTask(
  "characterTask", // Give the task a name
  "", // No mesh names (load all meshes)
  "assets/character/", // The folder containing the model files
  "character.gltf" // The main file for the 3D model
);

// Load a texture (e.g., a background image)
const backgroundTextureTask = assetsManager.addTextureTask(
  "backgroundTextureTask", // Give the task a name
  "assets/background.jpg" // The file path for the texture
);

// When the character is loaded, create a material and apply the texture
characterTask.onSuccess = (task) => {
  const characterMaterial = new BABYLON.StandardMaterial("characterMaterial", scene);
  characterMaterial.diffuseTexture = backgroundTextureTask.texture;
  task.loadedMeshes.forEach((mesh) => {
    mesh.material = characterMaterial;
  });
};

// Start loading the assets
assetsManager.load();
// Function to transition between scenes
const changeScene = (sceneNumber) => {
  // Hide all scenes
  // Replace 'scene1', 'scene2' with the actual names or IDs of your scene elements
  document.getElementById('scene1').style.display = 'none';
  document.getElementById('scene2').style.display = 'none';
  // ... Add more scenes as needed

  // Show the selected scene
  document.getElementById(`scene${sceneNumber}`).style.display = 'block';
};

// Function to collect clues
const collectClue = (clueId) => {
  // Perform actions related to collecting the clue
  // E.g., unlock a weblink or update the UI
  console.log(`Clue collected: ${clueId}`);
};

// Function to handle button clicks (arrows or other buttons)
const onButtonClick = (event) => {
  const buttonId = event.target.id;

  if (buttonId.startsWith('arrow')) {
    // Change the scene if an arrow button is clicked
    const sceneNumber = parseInt(buttonId.replace('arrow', ''));
    changeScene(sceneNumber);
  } else if (buttonId.startsWith('clue')) {
    // Collect the clue if a clue button is clicked
    collectClue(buttonId);
  }
};

// Add event listeners for buttons
// Replace 'arrow1', 'arrow2', 'clue1' with the actual IDs of your buttons
document.getElementById('arrow1').addEventListener('click', onButtonClick);
document.getElementById('arrow2').addEventListener('click', onButtonClick);
document.getElementById('clue1').addEventListener('click', onButtonClick);
// ... Add more buttons as needed

// ... Existing code ...

// Add event listeners for scene arrow buttons
for (let i = 1; i <= 7; i++) {
  document.getElementById(`arrow${i}`).addEventListener('click', onButtonClick);
}

// Add event listeners for clue buttons
for (let i = 1; i <= 28; i++) {
  document.getElementById(`clue${i}`).addEventListener('click', onButtonClick);
}
// ... Existing code ...

// Function to create and update text in the 3D scene
function createOrUpdateText(scene, text) {
  // Create a dynamic texture if it doesn't exist
  if (!scene.dynamicTexture) {
    scene.dynamicTexture = new BABYLON.DynamicTexture(
      'dynamicTexture',
      { width: 512, height: 256 },
      scene
    );
  }

  // Clear the dynamic texture
  scene.dynamicTexture.clear();

  // Draw the text on the dynamic texture
  scene.dynamicTexture.drawText(
    text,
    50, // X position
    128, // Y position
    'bold 24px Arial', // Font style
    'white', // Text color
    'transparent', // Background color
    true // Update texture
  );

  // Create a plane mesh to display the dynamic texture if it doesn't exist
  if (!scene.textPlane) {
    scene.textPlane = BABYLON.MeshBuilder.CreatePlane(
      'textPlane',
      { width: 4, height: 2 },
      scene
    );
    scene.textPlane.position.y = 2;

    // Create material for the plane mesh
    let textMaterial = new BABYLON.StandardMaterial('textMaterial', scene);
    textMaterial.diffuseTexture = scene.dynamicTexture;
    textMaterial.opacityTexture = scene.dynamicTexture;
    scene.textPlane.material = textMaterial;
  }
}

// ... Rest of the code ...
// ... Existing code ...

// Call the function with the desired text
createOrUpdateText(scene, 'Hello, this is a sample text from the Ink script.');

// ... Rest of the code ...
// ... Existing code ...

// Set up camera animation
function setupCameraAnimation(camera) {
  const cameraAnimation = new BABYLON.Animation(
    'cameraAnimation',
    'alpha',
    60, // Frame rate
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE // Loop the animation
  );

  // Add animation keyframes
  const keyFrames = [
    { frame: 0, value: camera.alpha },
    { frame: 120, value: camera.alpha + Math.PI },
    { frame: 240, value: camera.alpha + 2 * Math.PI }
  ];
  cameraAnimation.setKeys(keyFrames);

  // Attach the animation to the camera
  camera.animations.push(cameraAnimation);

  // Start the animation
  scene.beginAnimation(camera, 0, 240, true);
}

// Set up point light
function setupPointLight(scene) {
  const pointLight = new BABYLON.PointLight(
    'pointLight',
    new BABYLON.Vector3(0, 10, 0),
    scene
  );
  pointLight.intensity = 0.6;
}

// Set up spotlight
function setupSpotlight(scene) {
  const spotlight = new BABYLON.SpotLight(
    'spotLight',
    new BABYLON.Vector3(0, 30, -10),
    new BABYLON.Vector3(0, -1, 0),
    Math.PI / 3,
    2,
    scene
  );
  spotlight.intensity = 0.8;
}

// ... Rest of the code ...

// Call the setup functions after creating the scene
const scene = createScene(engine);
setupCameraAnimation(scene.activeCamera);
setupPointLight(scene);
setupSpotlight(scene);

// ... Rest of the code ...
// ... Existing code ...

// Set up particle system
function setupParticleSystem(scene) {
  // Create a particle system
  const particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

  // Set the particle texture
  particleSystem.particleTexture = new BABYLON.Texture("textures/particle.png", scene);

  // Set the emitter position
  particleSystem.emitter = new BABYLON.Vector3(0, 2, 0);

  // Configure particle system properties
  particleSystem.minSize = 0.1;
  particleSystem.maxSize = 0.3;
  particleSystem.minLifeTime = 0.5;
  particleSystem.maxLifeTime = 2.0;
  particleSystem.minEmitPower = 1;
  particleSystem.maxEmitPower = 3;
  particleSystem.emitRate = 500;

  // Start the particle system
  particleSystem.start();
}

// Set up shadow generator
function setupShadowGenerator(scene) {
  // Create a directional light for shadows
  const light = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(-1, -2, -1), scene);

  // Set up the shadow generator
  const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

  // Add any mesh that should cast shadows to the shadow generator
  // In this example, we assume you have a mesh named "casterMesh"
  // shadowGenerator.addShadowCaster(casterMesh);
}

// Set up glow effect
function setupGlowEffect(scene) {
  // Create a glow layer
  const glowLayer = new BABYLON.GlowLayer("glow", scene);

  // Set the intensity of the glow
  glowLayer.intensity = 0.5;
}

// ... Rest of the code ...

// Call the setup functions after creating the scene
const scene = createScene(engine);
setupCameraAnimation(scene.activeCamera);
setupPointLight(scene);
setupSpotlight(scene);
setupParticleSystem(scene);
setupShadowGenerator(scene);
setupGlowEffect(scene);

// ... Rest of the code ...
// Function to handle window resizing
function handleResize() {
  // Update the engine size based on the window size
  engine.setSize(window.innerWidth, window.innerHeight);

  // Update the camera's aspect ratio
  scene.activeCamera.aspectRatio = window.innerWidth / window.innerHeight;

  // Recalculate the camera's projection matrix
  scene.activeCamera.getProjectionMatrix(true);
}

// Attach the handleResize function to the window's resize event
window.addEventListener('resize', handleResize);