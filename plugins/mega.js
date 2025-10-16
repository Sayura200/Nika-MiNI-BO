const { cmd } = require('../lib/command');
const { File } = require("megajs");
const path = require('path');

cmd({
  pattern: "mega",
  desc: "Download real mp4 from Mega.nz",
  react: "🎥",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q || !q.includes("mega.nz")) return reply("📎 *Send a valid Mega.nz file URL*");

    const [fileUrl, decryptionKey] = q.split("#");
    if (!decryptionKey) return reply("🔑 *Missing decryption key*");

    const megaFile = File.fromURL(fileUrl + "#" + decryptionKey);

    await megaFile.loadAttributes(); // ✅ Ensure file name is fetched

    megaFile.on("progress", (downloaded, total) => {
      const percent = ((downloaded / total) * 100).toFixed(2);
      reply(`⬇️ Downloading: ${percent}% (${(downloaded / 1024 / 1024).toFixed(2)}MB)`);
    });

    const buffer = await megaFile.downloadBuffer();
    const fileName = megaFile.name || "file.mp4"; // ✅ Now real name should work
    const ext = path.extname(fileName).toLowerCase();

    const sizeInMB = buffer.length / 1024 / 1024;
    if (sizeInMB > 2000) {
      return reply(`❌ File is too large (${sizeInMB.toFixed(2)}MB). WhatsApp max: 2000MB.`);
    }

    // ❌ Caption removed completely
    if (ext === ".mp4") {
      await conn.sendMessage(from, {
        video: buffer,
        mimetype: 'video/mp4',
        fileName
      }, { quoted: mek });
    } else {
      await conn.sendMessage(from, {
        document: buffer,
        mimetype: 'application/octet-stream',
        fileName
      }, { quoted: mek });
    }

  } catch (e) {
    console.error(e);
    reply("❌ Failed to upload to WhatsApp.\n\nReason: " + e.message);
  }
});
