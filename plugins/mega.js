const { cmd } = require('../lib/command');
const { File } = require("megajs");
const path = require('path');
const FileType = require('file-type'); // <-- ADD THIS at the top (npm install file-type)

cmd({
  pattern: "mega",
  desc: "Download real file from Mega.nz (No .BIN)",
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

    // Download buffer
    const buffer = await megaFile.downloadBuffer();

    // Detect actual MIME type and extension from file content
    const fileType = await FileType.fromBuffer(buffer);
    let ext = path.extname(fileName).toLowerCase();

    if ((!ext || ext === ".bin") && fileType?.ext) {
      ext = "." + fileType.ext;
      fileName = path.basename(fileName, path.extname(fileName)) + ext;
    }

    // File size check (max 2GB)
    const sizeInMB = buffer.length / 1024 / 1024;
    const maxLimitMB = 2000;
    if (sizeInMB > maxLimitMB) {
      return reply(`❌ File too large (${sizeInMB.toFixed(2)}MB). Max allowed: ${maxLimitMB}MB (≈2GB).`);
    }

    const caption = `📦 *Downloaded from Mega.nz*\n📁 ${fileName}\n\n> *Uploaded by NIKA MINI*`;

    if ([".mp4", ".mkv", ".mov"].includes(ext)) {
      await conn.sendMessage(from, {
        video: buffer,
        mimetype: fileType?.mime || 'video/mp4',
        fileName,
        caption
      }, { quoted: mek });
    } else {
      await conn.sendMessage(from, {
        document: buffer,
        mimetype: fileType?.mime || 'application/octet-stream',
        fileName,
        caption
      }, { quoted: mek });
    }

  } catch (e) {
    console.error(e);
    reply("❌ Failed to upload to WhatsApp.\n\nReason: " + e.message);
  }
});
