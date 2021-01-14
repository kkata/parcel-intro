import "./style.scss";
// myFunction.jsをインポートする
import { myFunction } from "./myFunction.js";
// 今日の天気用文字列を生成する
const todayWeather = myFunction(14);
// #weather要素のテキストとして今日の天気を設定する
document.querySelector("#weather").textContent = todayWeather;
