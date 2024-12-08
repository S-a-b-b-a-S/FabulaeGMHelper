// Fabulae GM Helper - Main Module File
// This module assists Game Masters with encounter ideas, challenges, and NPC generation.

console.log("Fabulae GM Helper | Initializing module...");

Hooks.once("init", () => {
    console.log("Fabulae GM Helper | Module initialized.");
});

Hooks.once("ready", () => {
    console.log("Fabulae GM Helper | Module ready to use.");
});

Hooks.on("chatMessage", (chatLog, messageText, chatData) => {
    if (messageText.startsWith("/test")) {
        console.log("Fabulae GM Helper | Test command detected.");
        ChatMessage.create({
            content: "Fabulae GM Helper is working!"
        });
        return false; // Empêche le message original de s'afficher
    }
});

