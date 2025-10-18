const { cmd } = require('../lib/command');
const { File } = require("megajs");
const fs = require('fs');
const path = require('path');

cmd({
  pattern: "mega",
  desc: "Download from Mega.nz",
  react: "🎥",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q || !q.includes("mega.nz")) return reply("📎 *Send a valid Mega.nz link!*");

    reply("📥 *Downloading from Mega.nz...*");

    const file = File.fromURL(q);
    await file.loadAttributes();

    const fileName = file.name || "file.mp4";
    const tempPath = path.join(__dirname, "../temp", fileName);

    // Create temp folder if not exists
    if (!fs.existsSync(path.dirname(tempPath))) {
      fs.mkdirSync(path.dirname(tempPath), { recursive: true });
    }

    const writeStream = fs.createWriteStream(tempPath);
    file.download().pipe(writeStream);

    writeStream.on("finish", async () => {
      const stats = fs.statSync(tempPath);
      const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

      if (sizeMB > 2000) {
        fs.unlinkSync(tempPath);
        return reply(`❌ File too large (${sizeMB}MB). Max 2000MB allowed.`);
      }

      await conn.sendMessage(from, {
        document: fs.readFileSync(tempPath),
        fileName,
        mimetype: "application/octet-stream"
      }, { quoted: mek });

      fs.unlinkSync(tempPath);
    });

    writeStream.on("error", (err) => {
      console.error(err);
      reply("❌ Download failed: " + err.message);
    });

  } catch (e) {
    console.error(e);
    reply("❌ Error: " + e.message);
  }
});
