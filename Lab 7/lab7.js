let heroImage = document.getElementById("hero-image");
let heroTitle = document.getElementById("hero-title");
let heroDescription = document.getElementById("hero-description");
let powerStats = {
    intelligence: document.getElementById("intelligence"),
    strength: document.getElementById("strength"),
    speed: document.getElementById("speed"),
    durability: document.getElementById("durability"),
    power: document.getElementById("power"),
    combat: document.getElementById("combat")
};
let appearance = {
    gender: document.getElementById("gender"),
    race: document.getElementById("race"),
    height: document.getElementById("height"),
    weight: document.getElementById("weight"),
    eyeColor: document.getElementById("eyeColor"),
    hairColor: document.getElementById("hairColor")
};
let biography = {
    fullName: document.getElementById("fullName"),
    aliases: document.getElementById("aliases"),
    placeOfBirth: document.getElementById("placeOfBirth"),
    publisher: document.getElementById("publisher")
};

let heroes;

async function fetchAllHeroes(){
    let url = "https://akabab.github.io/superhero-api/api/all.json";

    try{
        let response = await fetch(url);
        heroes = await response.json();
        configureRandomHero();
    }
    catch (error) {
        console.log('Getting some error', error);
    }
}

function onButtonClick(){
    configureRandomHero();
}

function configureRandomHero(){
    let randomIndex = Math.floor(Math.random() * heroes.length);
    let hero = heroes[randomIndex];

    heroTitle.innerText = hero.name;
    heroDescription.innerText = `First Appearance: ${hero.biography.firstAppearance}`;
    heroImage.setAttribute("src", hero.images.md);

    powerStats.intelligence.innerText = hero.powerstats.intelligence;
    powerStats.strength.innerText = hero.powerstats.strength;
    powerStats.speed.innerText = hero.powerstats.speed;
    powerStats.durability.innerText = hero.powerstats.durability;
    powerStats.power.innerText = hero.powerstats.power;
    powerStats.combat.innerText = hero.powerstats.combat;

    appearance.gender.innerText = hero.appearance.gender;
    appearance.race.innerText = hero.appearance.race;
    appearance.height.innerText = hero.appearance.height.join(", ");
    appearance.weight.innerText = hero.appearance.weight.join(", ");
    appearance.eyeColor.innerText = hero.appearance.eyeColor;
    appearance.hairColor.innerText = hero.appearance.hairColor;

    biography.fullName.innerText = hero.biography.fullName;
    biography.aliases.innerText = hero.biography.aliases.join(", ");
    biography.placeOfBirth.innerText = hero.biography.placeOfBirth;
    biography.publisher.innerText = hero.biography.publisher;
}

addEventListener("onload", fetchAllHeroes());
