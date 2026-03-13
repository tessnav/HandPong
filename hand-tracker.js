const video = document.getElementById('webcam');

async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
}

startCamera();

let handLandmarker;

async function loadMediaPipe() {
    const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );

    handLandmarker = await HandLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task"
        },
        runningMode: "VIDEO",
        numHands: 1
    });
}

loadMediaPipe();

function detectHands() {
    if (!handLandmarker) {
        requestAnimationFrame(detectHands);
        return;
    }

    const results = handLandmarker.detectForVideo(video, performance.now());

    if (results.landmarks && results.landmarks.length > 0) {
        const hand = results.landmarks[0];
        const wrist = hand[0];
        window.paddleY = wrist.y * canvas.height;
    }

    requestAnimationFrame(detectHands);
}

video.addEventListener('loadeddata', detectHands);