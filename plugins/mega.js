const { cmd } = require('../lib/command');
const { File } = require("megajs");
const fs = require('fs');
const path = require('path');
const FileType = require('file-type'); // npm install file-type

cmd({
  pattern: "mega",
  desc: "Download real file from Mega.nz (Streamed, No BIN, No Footer)",
  react: "🎥",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q || !q.includes("mega.nz")) return reply("📎 *Send a valid Mega.nz file URL*");

    const [fileUrl, decryptionKey] = q.split("#");
    if (!decryptionKey) return reply("🔑 *Missing decryption key*");

    const megaFile = File.fromURL(fileUrl + "#" + decryptionKey);
    await megaFile.loadAttributes();

    const fileName = megaFile.name || "file";
    reply(`📥 *Downloading:* ${fileName} ...`);

    const tempPath = path.join(__dirname, "temp_" + Date.now());
    const writeStream = fs.createWriteStream(tempPath);

    // 🔄 Stream download (no freeze)
    const stream = megaFile.download();
    let downloaded = 0;

    stream.on("data", chunk => {
      downloaded += chunk.length;
      const percent = ((downloaded / megaFile.size) * 100).toFixed(1);
      reply(`⬇️ Downloading: ${percent}% (${(downloaded / 1024 / 1024).toFixed(2)}MB / ${(megaFile.size / 1024 / 1024).toFixed(2)}MB)`);
    });

    stream.pipe(writeStream);

    stream.on("end", async () => {
      const buffer = fs.readFileSync(tempPath);
      const fileType = await FileType.fromBuffer(buffer);

      let ext = path.extname(fileName).toLowerCase();
      let cleanName = fileName;
      if ((!ext || ext === ".bin") && fileType?.ext) {
        ext = "." + fileType.ext;
        cleanName = path.basename(fileName, path.extname(fileName)) + ext;
      }

      const sizeInMB = buffer.length / 1024 / 1024;
      if (sizeInMB > 2000) {
        fs.unlinkSync(tempPath);
        return reply(`❌ File too large (${sizeInMB.toFixed(2)}MB). Max allowed: 2000MB.`);
      }

      if ([".mp4", ".mkv", ".mov"].includes(ext)) {
        await conn.sendMessage(from, {
          video: buffer,
          mimetype: fileType?.mime || 'video/mp4',
          fileName: cleanName
        }, { quoted: mek });
      } else {
        await conn.sendMessage(from, {
          document: buffer,
          mimetype: fileType?.mime || 'application/octet-stream',
          fileName: cleanName
        }, { quoted: mek });
      }

      fs.unlinkSync(tempPath);
    });

    stream.on("error", err => {
      console.error(err);
      reply("❌ Error while downloading: " + err.message);
    });

  } catch (e) {
    console.error(e);
    reply("❌ Failed to process Mega.nz link.\n\nReason: " + e.message);
  }
});
