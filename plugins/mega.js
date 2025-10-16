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
    await megaFile.loadAttributes();

    megaFile.on("progress", (downloaded, total) => {
      const percent = ((downloaded / total) * 100).toFixed(2);
      reply(`⬇️ Downloading: ${percent}% (${(downloaded / 1024 / 1024).toFixed(2)}MB)`);
    });

    const buffer = await megaFile.downloadBuffer();
    let fileName = megaFile.name || "video.mp4";

    // 🧩 Fix .bin extension issue
    if (path.extname(fileName).toLowerCase() === ".bin") {
      fileName = fileName.replace(/\.bin$/i, ".mp4");
    }

    const sizeInMB = buffer.length / 1024 / 1024;
    if (sizeInMB > 2048) { // 🔼 Max size = 2GB
      return reply(`❌ File is too large (${sizeInMB.toFixed(2)}MB). Max allowed: 2GB.`);
    }

    const caption = `🎞️ *${fileName}*\n\n❖ Video Quality : 720p\n\n📥 Video එක Download කරලා බලන්න\n\n> *ᴜᴘʟᴏᴀᴅ ʙʏ NIKA MINI*`;

    await conn.sendMessage(from, {
      video: buffer,
      mimetype: 'video/mp4',
      fileName,
      caption
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply("❌ Failed to upload to WhatsApp.\n\nReason: " + e.message);
  }
});
