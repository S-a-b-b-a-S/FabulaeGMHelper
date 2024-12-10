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
Hooks.once("ready", () => {
    console.log("Fabulae GM Helper | Waiting for chat controls...");

    // Fonction pour vérifier si l'élément chat-controls est disponible
    const waitForChatControls = () => {
        const chatControls = document.querySelector("#chat-controls");
        if (chatControls) {
            console.log("Fabulae GM Helper | Chat controls found!");

            // Créer un nouveau bouton
            const button = document.createElement("button");
            button.classList.add("fabulae-gm-helper-button");
            button.title = "Open Fabulae GM Helper"; // Tooltip au survol

            // Ajouter une image dans le bouton
            const img = document.createElement("img");
            img.src = "modules/FabulaeGMHelper/assets/icon.png"; // Modifie ce chemin pour l'image
            img.alt = "Fabulae GM Helper";
            img.style.width = "24px"; // Taille de l'image
            img.style.height = "24px";

            button.appendChild(img);

            // Action au clic
            button.onclick = () => {
                new FabulaeGMHelper().render(true);
            };

            // Insérer le bouton avant le bouton du dé
            const diceButton = chatControls.querySelector(".fa-dice-d20").parentElement;
            chatControls.insertBefore(button, diceButton);

            console.log("Fabulae GM Helper | Button added next to dice icon.");
        } else {
            // Réessayer après 100ms si l'élément n'est pas encore disponible
            setTimeout(waitForChatControls, 100);
        }
    };

    // Lancer la vérification
    waitForChatControls();
});

