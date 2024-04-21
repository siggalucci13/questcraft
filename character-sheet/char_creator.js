template = {
    "character_name": "[TBA]",
    "class": "[TBA]",
    "level": 1,
    "background": "[TBA]",
    "race": "[TBA]",
    "strength": "[TBA]",
    "dexterity": "[TBA]",
    "constitution": "[TBA]",
    "intelligence": "[TBA]",
    "wisdom": "[TBA]",
    "charisma": "[TBA]",
    "armor_class": 0,
    "movement_speed": 30,
    "skill_list": {},
    "spell_list": {},
    "equipment": []
}

statNames = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"]

classStats = {
    "Warrior": [15, 13, 14, 8, 12, 10],
    "Rogue": [12, 15, 14, 8, 13, 10],
    "Wizard": [8, 13, 14, 15, 12, 10],
    "Bard": [8, 13, 14, 10, 12, 15]}

raceBonus = {
    "Human": [1, 1, 1, 1, 1, 1],
    "Elf": [0, 2, 0, 1, 0, 0],
    "Dragonborn": [2, 0, 0, 0, 0, 1],
    "Orc": [2, 0, 1, 0, 0, 0]}

spellList = {
    "Warrior": {},
    "Rogue": {},
    "Wizard": {"Mage Hand": ["Cantrip", "tba"], "Fire Bolt": ["Cantrip", "tba"], "Magic Missle": [2, "[tba]"]},
    "Bard": {"Prestidigitation": ["Cantrip", "tba"], "Vicious Mockery": ["Cantrip", "tba"],  "Healing Word": [2, "tba"]}}

skillList = {
    "Warrior": {"Defense": "Add 1 to your Armor Class (AC)"},
    "Rogue": {"Sneak Attack": "Deal an extra 1d6 damage if an ally is next to the target."},
    "Wizard": {"Arcane Recovery": "Regain your spells after a short rest."},
    "Bard": {"Bardic Inspiration": "Inspire an ally and give them a 1d6 to use on a roll."}
}

equipment = {
    "Warrior": ["Chain Mail", "Battle Axe", "Shield"],
    "Rogue": ["Leather Armor", "Shortsword", "Daggers"],
    "Wizard": ["Staff", "Crystal Orb", "Spellbook"],
    "Bard": ["Rapier", "Harp", "Leather Armor"]
}

armorClass = {
    "Warrior": 19,
    "Rogue": 14,
    "Wizard": 12,
    "Bard": 13
}

function createSheet(characterName, className, race, background) {
    let sheet = { ...template };
    sheet["character_name"] = characterName;
    sheet["class"] = className;
    sheet["background"] = background;
    sheet["race"] = race;
    sheet["spell_list"] = spellList[className];
    sheet["skill_list"] = skillList[className];
    sheet["equipment"] = equipment[className];
    sheet["armor_class"] = armorClass[className];
    for (let i = 0; i < 6; i++) {
        let statName = statNames[i];
        sheet[statName] = Math.floor((classStats[className][i]+raceBonus[race][i]-10)/2);
    }
    return sheet;
}