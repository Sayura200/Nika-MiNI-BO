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

    await megaFile.loadAttributes(); // ✅ Fetch file info

    megaFile.on("progress", (downloaded, total) => {
      const percent = ((downloaded / total) * 100).toFixed(2);
      reply(`⬇️ Downloading: ${percent}% (${(downloaded / 1024 / 1024).toFixed(2)}MB)`);
    });

    const buffer = await megaFile.downloadBuffer();
    const fileName = megaFile.name || "file.mp4";
    const ext = path.extname(fileName).toLowerCase();

    // ✅ Increased limit to 2GB
    const sizeInMB = buffer.length / 1024 / 1024;
    const maxLimitMB = 2000; // 2GB = 2000MB

    if (sizeInMB > maxLimitMB) {
      return reply(`❌ File is too large (${sizeInMB.toFixed(2)}MB). Max allowed: ${maxLimitMB}MB (≈2GB).`);
    }

    const caption = `🎞️ *${fileName}*\n\n❖ Video Quality : 720p\n\n📥 Video එක Download කරලා බලන්න\n\n🚨 වැඩ නැති එකක් උනොත් මේ number එකට message එකක් දාන්න: 0743826406\n\n> *ᴜᴘʟᴏᴀᴅ ʙʏ NIKA MINI*`;

    if (ext === ".mp4") {
      await conn.sendMessage(from, {
        video: buffer,
        mimetype: 'video/mp4',
        fileName,
        caption
      }, { quoted: mek });
    } else {
      await conn.sendMessage(from, {
        document: buffer,
        mimetype: 'application/octet-stream',
        fileName,
        caption: `📦 *Downloaded from Mega.nz*\n📁 ${fileName}`
      }, { quoted: mek });
    }

  } catch (e) {
    console.error(e);
    reply("❌ Failed to upload to WhatsApp.\n\nReason: " + e.message);
  }
});
