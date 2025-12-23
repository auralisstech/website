// Three.js Background Animation - Neural Network / Constellation Effect

const initThreeJS = () => {
    const container = document.getElementById('canvas-container');

    // Scene setup
    const scene = new THREE.Scene();
    // Light blue fog for depth fading
    scene.fog = new THREE.FogExp2(0xffffff, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Particle system parameters
    const particleCount = 80; // Reduced slighty per color group
    const connectionDistance = 15;
    const mouseConnectionDistance = 20;

    // --- BLUE PARTICLE SYSTEM ---
    const particlesBlue = new THREE.BufferGeometry();
    const posBlue = new Float32Array(particleCount * 3);
    const velBlue = [];

    // --- ORANGE PARTICLE SYSTEM ---
    const particlesOrange = new THREE.BufferGeometry();
    const posOrange = new Float32Array(particleCount * 3);
    const velOrange = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        // Shared random logic for distribution
        const createParticle = (posArray, velArray, index) => {
            const x = (Math.random() - 0.5) * 150;
            const y = (Math.random() - 0.5) * 100;
            const z = (Math.random() - 0.5) * 50;
            posArray[index * 3] = x;
            posArray[index * 3 + 1] = y;
            posArray[index * 3 + 2] = z;

            velArray.push({
                x: (Math.random() - 0.5) * 0.05,
                y: (Math.random() - 0.5) * 0.05,
                z: (Math.random() - 0.5) * 0.05
            });
        };

        createParticle(posBlue, velBlue, i);
        createParticle(posOrange, velOrange, i);
    }

    particlesBlue.setAttribute('position', new THREE.BufferAttribute(posBlue, 3));
    particlesOrange.setAttribute('position', new THREE.BufferAttribute(posOrange, 3));

    // Material for Blue particles
    const matBlue = new THREE.PointsMaterial({
        color: 0x0091D4, // Primary Blue
        size: 0.5,
        transparent: true,
        opacity: 0.8
    });

    // Material for Orange particles
    const matOrange = new THREE.PointsMaterial({
        color: 0xFF7F32, // Accent Orange
        size: 0.6, // Slightly larger for emphasis
        transparent: true,
        opacity: 0.8
    });

    const sysBlue = new THREE.Points(particlesBlue, matBlue);
    const sysOrange = new THREE.Points(particlesOrange, matOrange);

    scene.add(sysBlue);
    scene.add(sysOrange);

    // Material for connection lines (Blue-ish generic)
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00B8D9, // Turquoise connections
        transparent: true,
        opacity: 0.15
    });

    // Mouse interaction
    const mouse = new THREE.Vector3(0, 0, 0);
    let mouseX = 0;
    let mouseY = 0;

    // Handle mouse movement
    document.addEventListener('mousemove', (event) => {
        // Convert mouse position to normalized device coordinates (-1 to +1)
        // Then project to approximate 3D world space at z=0
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        // Simple projection for the "mouse particle" logic
        // The camera is at z=50, looking at 0,0,0
        // We approximate the mouse position in the world
        const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
        vector.unproject(camera);

        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));

        mouse.x = pos.x;
        mouse.y = pos.y;
        mouse.z = pos.z; // Roughly 0 plane
    });

    // Touch support
    document.addEventListener('touchmove', (event) => {
        if (event.touches.length > 0) {
            const touch = event.touches[0];
            mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(touch.clientY / window.innerHeight) * 2 + 1;

            const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
            vector.unproject(camera);
            const dir = vector.sub(camera.position).normalize();
            const distance = -camera.position.z / dir.z;
            const pos = camera.position.clone().add(dir.multiplyScalar(distance));

            mouse.x = pos.x;
            mouse.y = pos.y;
            mouse.z = pos.z;
        }
    }, { passive: true });

    // Lines geometry (will be updated every frame)
    const linesGeometry = new THREE.BufferGeometry();
    const lines = new THREE.LineSegments(linesGeometry, lineMaterial);
    scene.add(lines);

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);

        const posBlueArr = sysBlue.geometry.attributes.position.array;
        const posOrangeArr = sysOrange.geometry.attributes.position.array;

        // Arrays to store line segments vertices
        const linePositions = [];

        // Helper to update particle positions
        const updateParticles = (posArr, velArr) => {
            for (let i = 0; i < particleCount; i++) {
                posArr[i * 3] += velArr[i].x;
                posArr[i * 3 + 1] += velArr[i].y;
                posArr[i * 3 + 2] += velArr[i].z;

                // Boundary bounce
                if (Math.abs(posArr[i * 3]) > 80) velArr[i].x *= -1;
                if (Math.abs(posArr[i * 3 + 1]) > 50) velArr[i].y *= -1;
                if (Math.abs(posArr[i * 3 + 2]) > 30) velArr[i].z *= -1;
            }
        };

        updateParticles(posBlueArr, velBlue);
        updateParticles(posOrangeArr, velOrange);

        // Combine all positions for connection logic
        // We want blue and orange to connect to each other too!
        // Structure: style {x,y,z, type} - type 0=blue, 1=orange
        const allParticles = [];

        const addPart = (arr) => {
            for (let i = 0; i < particleCount; i++) {
                allParticles.push({
                    x: arr[i * 3],
                    y: arr[i * 3 + 1],
                    z: arr[i * 3 + 2]
                });
            }
        }
        addPart(posBlueArr);
        addPart(posOrangeArr);

        const totalP = allParticles.length;

        // Check connections
        for (let i = 0; i < totalP; i++) {
            const p1 = allParticles[i];

            for (let j = i + 1; j < totalP; j++) {
                const p2 = allParticles[j];

                const distSq = (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z - p2.z) ** 2;

                if (distSq < connectionDistance * connectionDistance) {
                    linePositions.push(p1.x, p1.y, p1.z);
                    linePositions.push(p2.x, p2.y, p2.z);
                }
            }

            // Mouse connection
            const mDistSq = (p1.x - mouse.x) ** 2 + (p1.y - mouse.y) ** 2 + (p1.z - mouse.z) ** 2;
            if (mDistSq < mouseConnectionDistance * mouseConnectionDistance) {
                linePositions.push(p1.x, p1.y, p1.z);
                linePositions.push(mouse.x, mouse.y, mouse.z);
            }
        }

        // Update geometries
        sysBlue.geometry.attributes.position.needsUpdate = true;
        sysOrange.geometry.attributes.position.needsUpdate = true;

        lines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        lines.geometry.computeBoundingSphere();

        // Gentle rotation
        sysBlue.rotation.y += 0.0005;
        sysOrange.rotation.y += 0.0005;
        lines.rotation.y += 0.0005;

        renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', initThreeJS);
