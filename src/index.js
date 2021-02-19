import "./style.scss";
// myFunction.jsをインポートする
import { myFunction } from "./myFunction.js";

import "promise-polyfill/src/polyfill";
import "whatwg-fetch";

import csv from "comma-separated-values";

import xml from "fast-xml-parser";

fetch("/test.json")
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // console.log("parsed json", json);
    document.querySelector("#json").textContent = JSON.stringify(json, null, 2);
  })
  .catch((error) => {
    console.log("parsing json failed", error);
  });

fetch("/dummy.csv")
  .then((response) => {
    return response.text();
  })
  .then((text) => {
    const data = csv.parse(text, {
      cast: false,
      header: true,
    });
    const keys = Object.keys(data[0]);

    const ul = document.createElement("ul");
    document.getElementById("csv").appendChild(ul);
    data.forEach((element, index) => {
      let li = document.createElement("li");
      ul.appendChild(li);
      li.innerHTML += `${element.prefecture}, ${element.date}, ${element.zodiac}, ${element.lastName}, ${element.lastNameKana}`;
    });
  })
  .catch((error) => {
    console.log("parsing csv failed", error);
  });

fetch("/test1.xml")
  .then((response) => {
    return response.text();
  })
  .then((text) => {
    const data = xml.parse(text);
    // console.log(data.any_name.person);
    const ul = document.createElement("ul");
    document.getElementById("xml").appendChild(ul);
    data.any_name.person.forEach((element, index) => {
      let li = document.createElement("li");
      ul.appendChild(li);
      li.innerHTML += `${element.phone}, ${element.name}, ${element.age}, ${element.married}, ${element.birthday}, ${element.address[0].city}`;
    });
  })
  .catch((error) => {
    console.log("parsing xml failed", error);
  });

// 今日の天気用文字列を生成する
const todayWeather = myFunction(14);
// #weather要素のテキストとして今日の天気を設定する
document.querySelector("#weather").textContent = todayWeather;
