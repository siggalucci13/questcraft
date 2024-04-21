import json

stat_names = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"]

class_stats = {
    "Warrior": [15, 13, 14, 8, 12, 10],
    "Rogue": [12, 15, 14, 8, 13, 10],
    "Wizard": [8, 13, 14, 15, 12, 10],
    "Bard": [8, 13, 14, 10, 12, 15]}

race_bonus = {
    "Human": [1, 1, 1, 1, 1, 1],
    "Elf": [0, 2, 0, 1, 0, 0],
    "Dragonborn": [2, 0, 0, 0, 0, 1],
    "Orc": [2, 0, 1, 0, 0, 0]}

spell_list = {
    "Warrior": {},
    "Rogue": {},
    "Wizard": {"Mage Hand": ["Cantrip", "tba"], "Fire Bolt": ["Cantrip", "tba"], "Magic Missle": [2, "[tba]"]},
    "Bard": {"Prestidigitation": ["Cantrip", "tba"], "Vicious Mockery": ["Cantrip", "tba"],  "Healing Word": [2, "tba"]}}

skill_list = {
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

armor_class = {
    "Warrior": 19,
    "Rogue": 14,
    "Wizard": 12,
    "Bard": 13
}

def create_sheet(character_name: str, class_name: str, race: str, background: str):
    with open('character-template.json', 'r') as file:
        sheet = json.load(file)
    sheet["character_name"] = character_name
    sheet["class"] = class_name
    sheet["background"] = background
    sheet["race"] = race
    sheet["spell_list"] = spell_list[class_name]
    sheet["skill_list"] = skill_list[class_name]
    sheet["equipment"] = equipment[class_name]
    sheet["armor_class"] = armor_class[class_name]
    character_stats = [(x + y - 10) // 2 for x, y in zip(class_stats[class_name], race_bonus[race])]
    for i in range(6):
        stat_name = stat_names[i]
        sheet[stat_name] = character_stats[i]
    return sheet