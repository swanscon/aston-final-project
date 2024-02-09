export default function DummyData() {
    const gameTypes = [
        {
            id: "1",
            name: "Board",
        },
        {
            id: "2",
            name: "Strategy",
        },
        {
            id: "3",
            name: "Role-playing",
        },
        {
            id: "4",
            name: "Card",
        },
        {
            id: "5",
            name: "Dice",
        },
    ];

    const games = [
        {
            id: "1",
            name: "Island Settlers",
            image: "island-settlers.jpg",
            description:
                "Build settlements and roads to become the lord of the island.",
            gameTypeRequest: { id: "1", name: "Board" },
        },
        {
            id: "2",
            name: "Galaxy Conquerors",
            image: "galaxy-conquerors.jpg",
            description:
                "Strategize and dominate the universe in epic space battles.",
            gameTypeRequest: { id: "2", name: "Strategy" },
        },
        {
            id: "3",
            name: "Dungeon Quest",
            image: "dungeon-quest.jpg",
            description: "Embark on a perilous journey through dark dungeons.",
            gameTypeRequest: { id: "3", name: "Role-playing" },
        },
        {
            id: "4",
            name: "Epic Card Battle",
            image: "epic-card-battle.jpg",
            description: "Duel opponents in this strategic card game.",
            gameTypeRequest: { id: "4", name: "Card" },
        },
        {
            id: "5",
            name: "Dice of Destiny",
            image: "dice-of-destiny.jpg",
            description:
                "Roll your way to fortune in this dice-based adventure.",
            gameTypeRequest: { id: "5", name: "Dice" },
        },
        {
            id: "6",
            name: "Ocean Explorers",
            image: "ocean-explorers.jpg",
            description:
                "Discover and claim territories across the vast ocean.",
            gameTypeRequest: { id: "1", name: "Board" },
        },
        {
            id: "7",
            name: "Age of Empires",
            image: "age-of-empires.jpg",
            description: "Build your empire and crush your foes.",
            gameTypeRequest: { id: "2", name: "Strategy" },
        },
        {
            id: "8",
            name: "Mystical Legends",
            image: "mystical-legends.jpg",
            description: "Forge your legend in a land of magic and mystery.",
            gameTypeRequest: { id: "3", name: "Role-playing" },
        },
        {
            id: "9",
            name: "Kingdoms at War",
            image: "kingdoms-at-war.jpg",
            description: "A tactical card game of kingdom conquest.",
            gameTypeRequest: { id: "4", name: "Card" },
        },
        {
            id: "10",
            name: "Lucky Roll",
            image: "lucky-roll.jpg",
            description:
                "Test your luck and strategy in this dynamic dice game.",
            gameTypeRequest: { id: "5", name: "Dice" },
        },
        {
            id: "11",
            name: "Castle Siege",
            image: "castle-siege.jpg",
            description:
                "Strategically lay siege to castles and claim territories.",
            gameTypeRequest: { id: "1", name: "Board" },
        },
        {
            id: "12",
            name: "Star Commanders",
            image: "star-commanders.jpg",
            description: "Command your fleet in interstellar wars.",
            gameTypeRequest: { id: "2", name: "Strategy" },
        },
        {
            id: "13",
            name: "Wizards and Warriors",
            image: "wizards-and-warriors.jpg",
            description: "Battle mythical creatures in a fantasy world.",
            gameTypeRequest: { id: "3", name: "Role-playing" },
        },
        {
            id: "14",
            name: "Cybernetic Revolt",
            image: "cybernetic-revolt.jpg",
            description: "Lead a rebellion in a dystopian cyber world.",
            gameTypeRequest: { id: "2", name: "Strategy" },
        },
        {
            id: "15",
            name: "Pirates' Treasure",
            image: "pirates-treasure.jpg",
            description: "Set sail in search of treasure and adventure.",
            gameTypeRequest: { id: "1", name: "Board" },
        },
        {
            id: "16",
            name: "Arcane Duelists",
            image: "arcane-duelists.jpg",
            description: "Wield magic in duels of arcane prowess.",
            gameTypeRequest: { id: "4", name: "Card" },
        },
        {
            id: "17",
            name: "Rolling Empires",
            image: "rolling-empires.jpg",
            description: "Expand your empire through strategic dice rolls.",
            gameTypeRequest: { id: "5", name: "Dice" },
        },
        {
            id: "18",
            name: "Goblin Heist",
            image: "goblin-heist.jpg",
            description: "Outwit opponents to steal the goblin's treasure.",
            gameTypeRequest: { id: "1", name: "Board" },
        },
        {
            id: "19",
            name: "Quantum Conflict",
            image: "quantum-conflict.jpg",
            description: "Engage in warfare at the quantum level.",
            gameTypeRequest: { id: "2", name: "Strategy" },
        },
        {
            id: "20",
            name: "Chronicles of the Realm",
            image: "chronicles-of-the-realm.jpg",
            description: "Embark on epic quests in a sprawling fantasy world.",
            gameTypeRequest: { id: "3", name: "Role-playing" },
        },
        {
            id: "21",
            name: "Mechs vs. Mutants",
            image: "mechs-vs-mutants.jpg",
            description:
                "Battle mutants in a post-apocalyptic world with your mech.",
            gameTypeRequest: { id: "2", name: "Strategy" },
        },
        {
            id: "22",
            name: "Dragon's Lair",
            image: "dragons-lair.jpg",
            description: "Seek out the dragon's lair and claim its hoard.",
            gameTypeRequest: { id: "3", name: "Role-playing" },
        },
        {
            id: "23",
            name: "Elemental Showdown",
            image: "elemental-showdown.jpg",
            description: "Master the elements to become the supreme mage.",
            gameTypeRequest: { id: "4", name: "Card" },
        },
        {
            id: "24",
            name: "Catacombs Quest",
            image: "catacombs-quest.jpg",
            description: "Navigate the catacombs to uncover ancient secrets.",
            gameTypeRequest: { id: "3", name: "Role-playing" },
        },
        {
            id: "25",
            name: "Frost Giants' Fury",
            image: "frost-giants-fury.jpg",
            description: "Face the frost giants in a battle for survival.",
            gameTypeRequest: { id: "5", name: "Dice" },
        },
    ];

    const events = [
        {
            id: "1",
            gameId: "3",
            name: "Dungeon Crawl Extravaganza",
            eventDate: "2024-06-20T17:00:00Z",
            duration: "2 hours",
            description:
                "Join us for a legendary adventure through uncharted dungeons.",
        },
        {
            id: "2",
            gameId: "7",
            name: "Empire Builders Meet",
            eventDate: "2024-07-15T15:00:00Z",
            duration: "3 hours",
            description:
                "Strategize and expand your territories in this epic game of conquest.",
        },
        {
            id: "3",
            gameId: "10",
            name: "Lucky Roll Championship",
            eventDate: "2024-08-05T18:00:00Z",
            duration: "1 hour 30 minutes",
            description: "Test your luck in the ultimate dice-rolling contest.",
        },
        {
            id: "4",
            gameId: "16",
            name: "Arcane Duelists Gathering",
            eventDate: "2024-09-10T20:00:00Z",
            duration: "2 hours 30 minutes",
            description:
                "Duelists unite! Showcase your magical prowess in this enchanted card game.",
        },
        {
            id: "5",
            gameId: "22",
            name: "Dragon's Lair Quest",
            eventDate: "2024-10-12T16:00:00Z",
            duration: "3 hours",
            description:
                "Embark on a daring quest to find the dragon's lair in this role-playing adventure.",
        },
        {
            id: "6",
            gameId: "25",
            name: "Frost Giants' Fury Battle",
            eventDate: "2024-11-20T19:00:00Z",
            duration: "2 hours",
            description:
                "Survive the wrath of the frost giants in a chilling dice game battle.",
        },
    ];

    const attendees = [
        { id: "1", eventId: "1", firstName: "Charlotte", lastName: "Davis" },
        { id: "2", eventId: "1", firstName: "Elijah", lastName: "Garcia" },
        { id: "3", eventId: "1", firstName: "Sophia", lastName: "Martinez" },
        { id: "4", eventId: "2", firstName: "Olivia", lastName: "Johnson" },
        { id: "5", eventId: "2", firstName: "Ava", lastName: "Jones" },
        { id: "6", eventId: "2", firstName: "Liam", lastName: "Rodriguez" },
        { id: "7", eventId: "2", firstName: "Liam", lastName: "Jones" },
        { id: "8", eventId: "3", firstName: "Olivia", lastName: "Jones" },
        { id: "9", eventId: "3", firstName: "Isabella", lastName: "Jones" },
        { id: "10", eventId: "3", firstName: "Elijah", lastName: "Martinez" },
        { id: "11", eventId: "4", firstName: "Liam", lastName: "Davis" },
        { id: "12", eventId: "4", firstName: "Sophia", lastName: "Brown" },
        { id: "13", eventId: "4", firstName: "Liam", lastName: "Garcia" },
        { id: "14", eventId: "4", firstName: "Liam", lastName: "Smith" },
        { id: "15", eventId: "4", firstName: "Charlotte", lastName: "Jones" },
        { id: "16", eventId: "5", firstName: "Liam", lastName: "Miller" },
        { id: "17", eventId: "5", firstName: "Amelia", lastName: "Martinez" },
        { id: "18", eventId: "5", firstName: "Emma", lastName: "Rodriguez" },
        { id: "19", eventId: "6", firstName: "Emma", lastName: "Davis" },
        { id: "20", eventId: "6", firstName: "Isabella", lastName: "Garcia" },
        { id: "21", eventId: "6", firstName: "Amelia", lastName: "Williams" },
        { id: "22", eventId: "6", firstName: "Elijah", lastName: "Smith" },
    ];

    const data = {
        gameTypes: gameTypes,
        games: games,
        events: events,
        attendees: attendees,
    };

    return data;
}
