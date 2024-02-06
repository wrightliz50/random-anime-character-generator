"use strict";

// API docs - https://docs.api.jikan.moe/#tag/characters/operation/getCharacterFullById
// Source for anime characters = https://myanimelist.net/

// select document elements (button,image)
const btn = document.querySelector(".btn--gen");
const img = document.querySelector(".img--gen");
const charNameEl = document.querySelector(".text--name");
const titleEl = document.querySelector(".text--title");
const ytDiv = document.querySelector(".yt--help");
const ytHref = document.querySelector(".a--yt");

// random number generator
const randomNumberGenerator = function (length) {
  return Math.trunc(Math.random() * length);
};

// Anime character nephew likes
const onePieceArr = [40, 62, 305, 723, 727];
const narutoArr = [17, 14, 85, 13, 2007, 2423, 1662, 1555, 306, 145];
const myHeroAcademiaArr = [
  118489, 117909, 117911, 117921, 117915, 118487, 117917, 119209,
];
const swordArtOnlineArr = [
  36765, 36828, 43892, 36831, 36830, 37681, 43906, 54777, 54099, 68885,
];
const spyFamilyArr = [
  170256, 170329, 170258, 203871, 177509, 177512, 177510, 177511,
];
const saikiArr = [90291, 90289, 90293, 106145, 130904, 141894, 140312, 140313];
const demonSlayerArr = [146156, 146158, 146157, 146159, 151143, 146736];
const promisedNeverlandArr = [144919, 144916, 144337, 150888, 144999];
const komiArr = [141790, 151722, 152632, 156197];
const bofuriArr = [
  174332, 174333, 179993, 176748, 181286, 176750, 176749, 176751, 180848,
  179059, 179994, 193248, 184449, 184448,
];
const soulEaterArr = [8455, 8456, 8439, 11919, 8464];

// all characters in one arr
const idArr = [
  ...onePieceArr,
  ...narutoArr,
  ...myHeroAcademiaArr,
  ...swordArtOnlineArr,
  ...spyFamilyArr,
  ...saikiArr,
  ...demonSlayerArr,
  ...promisedNeverlandArr,
  ...komiArr,
  ...bofuriArr,
  ...soulEaterArr,
];

const getImage = async function () {
  try {
    // pick a character from the list
    const id = idArr[randomNumberGenerator(idArr.length)];

    // use id to select anime character from API
    const apiLink = `https://api.jikan.moe/v4/characters/${id}/full`;

    // reset yt link
    let ytLink = `https://www.youtube.com/results?search_query=how+to+draw+`;
    // get character pictures from API and display image
    const results = await fetch(apiLink, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        //choose random image from character images and display image, name, and anime titleEl
        const charName = data.data.name;
        const animeTitle =
          data.data.anime[0].anime.title ===
          "Itai no wa Iya nanode Bougyoryoku ni Kyokufuri Shitai to Omoimasu."
            ? "Bofuri"
            : data.data.anime[0].anime.title;
        img.src = `${data.data.images.jpg.image_url}`;
        img.alt = `Picture of ${charName}`;
        charNameEl.textContent = charName;
        titleEl.textContent = animeTitle;
        ytDiv.classList.remove("hidden");
        ytLink += `${charName.split(" ").join("+")}+from+${animeTitle
          .split(" ")
          .join("+")}`;
        ytHref.href = ytLink;
        console.log(ytLink);
      });
    return results;
  } catch (err) {
    alert("You are clicking too fast, slow down and try again!");
  }
};

// when the button is clicked, randomly generate new image
btn.addEventListener("click", getImage);
