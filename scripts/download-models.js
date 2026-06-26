const fs = require('fs');
const path = require('path');
const https = require('https');

const modelsDir = path.join(__dirname, '../frontend/public/models');
if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

// Download list (original files on GitHub)
const filesToDownload = [
  'tiny_face_detector_model-weights_manifest.json',
  'tiny_face_detector_model-shard1',
  'face_landmark_68_model-weights_manifest.json',
  'face_landmark_68_model-shard1',
  'face_recognition_model-weights_manifest.json',
  'face_recognition_model-shard1',
  'face_recognition_model-shard2' // Added second shard for Face Recognition
];

const baseUrl = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/';

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Server responded with status ${response.statusCode} for URL: ${url}`));
        return;
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function downloadAll() {
  console.log('[Face API Models] Checking / downloading required models to:', modelsDir);
  
  for (const file of filesToDownload) {
    const isShard = file.includes('-shard');
    const finalName = isShard ? `${file}.bin` : file;
    const destPath = path.join(modelsDir, finalName);
    
    // Check if the final file (.bin for shards, .json for manifests) already exists
    if (fs.existsSync(destPath)) {
      console.log(`[Face API Models] Already cached: ${finalName}`);
      continue;
    }
    
    const url = baseUrl + file;
    console.log(`[Face API Models] Downloading: ${file}...`);
    try {
      await downloadFile(url, destPath);
      console.log(`[Face API Models] Completed download: ${finalName}`);
      
      // If it's a manifest JSON file, dynamically replace all matching shards in the paths array to append .bin
      if (!isShard && file.endsWith('.json')) {
        let content = fs.readFileSync(destPath, 'utf8');
        // Match model-shard1, model-shard2, etc., and append .bin
        content = content.replace(/_model-shard(\d+)/g, '_model-shard$1.bin');
        fs.writeFileSync(destPath, content, 'utf8');
        console.log(`[Face API Models] Updated manifest: ${file} to point to all .bin shards`);
      }
    } catch (err) {
      console.error(`[Face API Models] Error downloading ${file}:`, err.message);
      process.exit(1);
    }
  }
  
  // Clean up any old extensionless files if they exist to keep the public folder clean
  for (const file of filesToDownload) {
    if (file.includes('-shard')) {
      const oldPath = path.join(modelsDir, file);
      if (fs.existsSync(oldPath)) {
        try {
          fs.unlinkSync(oldPath);
          console.log(`[Face API Models] Cleaned up deprecated extensionless file: ${file}`);
        } catch (e) {}
      }
    }
  }
  
  console.log('[Face API Models] All models verified and ready!');
}

downloadAll();
