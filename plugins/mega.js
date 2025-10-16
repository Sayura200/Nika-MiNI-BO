const { cmd } = require('../lib/command');
const { File } = require("megajs");
const path = require('path');
const FileType = require('file-type'); // 👉 npm install file-type

cmd({
  pattern: "mega",
  desc: "Download real files from Mega.nz (No .BIN, No Footer)",
  react: "🎥",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q || !q.includes("mega.nz")) return reply("📎 *Send a valid Mega.nz file URL*");

    const [fileUrl, decryptionKey] = q.split("#");
    if (!decryptionKey) return reply("🔑 *Missing decryption key*");

    const megaFile = File.fromURL(fileUrl + "#" + decryptionKey);
    await megaFile.loadAttributes();

    let fileName = megaFile.name || "file";
    reply(`📥 *Downloading:* ${fileName} ...`);

    const buffer = await megaFile.downloadBuffer();

    // Detect correct MIME type and fix .bin issue
    const fileType = await FileType.fromBuffer(buffer);
    let ext = path.extname(fileName).toLowerCase();

    if ((!ext || ext === ".bin") && fileType?.ext) {
      ext = "." + fileType.ext;
      fileName = path.basename(fileName, path.extname(fileName)) + ext;
    }

    // 2GB max
    const sizeInMB = buffer.length / 1024 / 1024;
    if (sizeInMB > 2000) {
      return reply(`❌ File too large (${sizeInMB.toFixed(2)}MB). Max allowed: 2000MB (≈2GB).`);
    }

    // Send the file (no footer)
    if ([".mp4", ".mkv", ".mov"].includes(ext)) {
      await conn.sendMessage(from, {
        video: buffer,
        mimetype: fileType?.mime || 'video/mp4',
        fileName
      }, { quoted: mek });
    } else {
      await conn.sendMessage(from, {
        document: buffer,
        mimetype: fileType?.mime || 'application/octet-stream',
        fileName
      }, { quoted: mek });
    }

  } catch (e) {
    console.error(e);
    reply("❌ Failed to upload to WhatsApp.\n\nReason: " + e.message);
  }
});
