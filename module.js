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
class FabulaeGMHelper extends Application {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "fabulae-gm-helper",
            title: "Fabulae GM Helper",
            template: "modules/fabulae-gm-helper/interface.html",
            width: 400,
            height: 300
        });
    }

    activateListeners(html) {
        super.activateListeners(html);

        // Handle tab switching
        html.find(".tab-button").on("click", (event) => {
            const targetTab = event.currentTarget.dataset.tab;
            html.find(".tab-content").removeClass("active");
            html.find(`#${targetTab}`).addClass("active");
        });

        // Example: Generate encounter
        html.find("#generate-encounter").on("click", () => {
            const encounter = "A mysterious figure approaches the party.";
            html.find("#encounter-result").text(encounter);
        });
    }
}

// Add a button to open the window
Hooks.on("renderSidebarTab", (app, html) => {
    if (app.options.id === "chat") {
        const button = $(
            `<button class="fabulae-gm-helper-button">Fabulae GM Helper</button>`
        );
        button.on("click", () => {
            new FabulaeGMHelper().render(true);
        });
        html.find(".directory-footer").append(button);
    }
});

