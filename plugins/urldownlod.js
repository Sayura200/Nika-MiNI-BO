const { cmd } = require('../lib/command');
const axios = require("axios");
const fs = require("fs");
const path = require("path");

cmd({
    pattern: "download",
    alias: ["downurl"],
    use: '.download <url>',
    react: "🔰",
    desc: "Download file from direct URL with original filename.",
    category: "tools",
    filename: __filename
},

async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❗ කරුණාකර download link එකක් ලබා දෙන්න."); 

        const link = q.trim();
        const urlPattern = /^(https?:\/\/[^\s]+)/;
        if (!urlPattern.test(link)) return reply("❗ දීලා තියෙන URL එක වැරදි.");

        // 🔹 Try to extract filename
        let fileName = "downloaded_file";
        try {
            const res = await axios.head(link);
            const disposition = res.headers["content-disposition"];
            if (disposition && disposition.includes("filename=")) {
                fileName = disposition.split("filename=")[1].replace(/["']/g, "");
            } else {
                const urlPath = new URL(link).pathname;
                fileName = decodeURIComponent(path.basename(urlPath));
            }
        } catch {
            const urlPath = new URL(link).pathname;
            fileName = decodeURIComponent(path.basename(urlPath)) || "downloaded_file";
        }

        // 🔹 Guess extension if missing
        if (!path.extname(fileName)) {
            if (link.includes(".mp4")) fileName += ".mp4";
            else if (link.includes(".mkv")) fileName += ".mkv";
            else if (link.includes(".mp3")) fileName += ".mp3";
            else if (link.includes(".zip")) fileName += ".zip";
            else if (link.includes(".apk")) fileName += ".apk";
            else if (link.includes(".pdf")) fileName += ".pdf";
            else if (link.includes(".png")) fileName += ".png";
            else if (link.includes(".jpg")) fileName += ".jpg";
            else fileName += ".bin";
        }

        // 🔹 Detect MIME type by extension
        let mimeType = "application/octet-stream";
        const ext = path.extname(fileName).toLowerCase();
        if (ext === ".mp4") mimeType = "video/mp4";
        else if (ext === ".mkv") mimeType = "video/x-matroska";
        else if (ext === ".mp3") mimeType = "audio/mpeg";
        else if (ext === ".zip") mimeType = "application/zip";
        else if (ext === ".pdf") mimeType = "application/pdf";
        else if (ext === ".jpg" || ext === ".jpeg") mimeType = "image/jpeg";
        else if (ext === ".png") mimeType = "image/png";
        else if (ext === ".apk") mimeType = "application/vnd.android.package-archive";

        // 🔹 Download file
        const filePath = path.join(__dirname, fileName);
        const response = await axios.get(link, { responseType: "arraybuffer" });
        fs.writeFileSync(filePath, response.data);

        // 🔹 Send file (with filename and correct MIME type)
        await conn.sendMessage(from, {
            document: fs.readFileSync(filePath),
            mimetype: mimeType,
            fileName: fileName
        }, { quoted: mek });

        // 🔹 Delete temp file
        fs.unlinkSync(filePath);

    } catch (e) {
        console.error(e);
        reply("❌ Error: " + e.message);
    }
});
