const { cmd } = require('../lib/command');
const { File } = require("megajs");
const fs = require('fs');
const path = require('path');
const FileType = require('file-type'); // npm install file-type

cmd({
  pattern: "mega",
  desc: "Download Mega.nz file (streamed, safe, throttled progress)",
  react: "🎥",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q || !q.includes("mega.nz")) 
      return reply("📎 *Send a valid Mega.nz file URL*");

    const [fileUrl, decryptionKey] = q.split("#");
    if (!decryptionKey) return reply("🔑 *Missing decryption key*");

    const megaFile = File.fromURL(fileUrl + "#" + decryptionKey);
    await megaFile.loadAttributes();

    const fileName = megaFile.name || "file";
    const tempPath = path.join(__dirname, "temp_" + Date.now());
    const writeStream = fs.createWriteStream(tempPath);

    reply(`📥 *Downloading:* ${fileName} ...`);

    const stream = megaFile.download();
    let downloaded = 0;
    let lastPercent = 0;

    // 🔄 Stream download with throttled progress
    stream.on("data", chunk => {
      downloaded += chunk.length;
      const percent = Math.floor((downloaded / megaFile.size) * 100);

      if (percent !== lastPercent && percent % 1 === 0) { // only update each %
        lastPercent = percent;
        reply(`⬇️ Downloading: ${percent}% (${(downloaded/1024/1024).toFixed(2)}MB / ${(megaFile.size/1024/1024).toFixed(2)}MB)`);
      }
    });

    await new Promise((resolve, reject) => {
      stream.pipe(writeStream);
      stream.on("end", resolve);
      stream.on("error", reject);
    });

    // 🔹 Detect file type from first few KB (memory safe)
    const fileType = await FileType.fromFile(tempPath);
    let ext = path.extname(fileName).toLowerCase();
    let cleanName = fileName;

    if ((!ext || ext === ".bin") && fileType?.ext) {
      ext = "." + fileType.ext;
      cleanName = path.basename(fileName, path.extname(fileName)) + ext;
    }

    // 🔹 File size check
    const sizeInMB = fs.statSync(tempPath).size / 1024 / 1024;
    if (sizeInMB > 2000) {
      fs.unlinkSync(tempPath);
      return reply(`❌ File too large (${sizeInMB.toFixed(2)}MB). Max allowed: 2000MB.`);
    }

    // 🔹 Send file with correct type
    if ([".mp4", ".mkv", ".mov"].includes(ext)) {
      await conn.sendMessage(from, {
        video: fs.createReadStream(tempPath),
        mimetype: fileType?.mime || 'video/mp4',
        fileName: cleanName
      }, { quoted: mek });
    } else {
      await conn.sendMessage(from, {
        document: fs.createReadStream(tempPath),
        mimetype: fileType?.mime || 'application/octet-stream',
        fileName: cleanName
      }, { quoted: mek });
    }

    fs.unlinkSync(tempPath);

  } catch (e) {
    console.error(e);
    reply("❌ Failed to process Mega.nz link.\n\nReason: " + e.message);
  }
});
