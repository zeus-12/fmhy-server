import fetch from "node-fetch";

let result;
fetch(
	"https://raw.githubusercontent.com/nbats/FMHYedit/main/AudioPiracyGuide.md"
)
	.then((response) => response.text())
	.then((data) => console.log(data));
// .then((data) => data.split("# ►"))
// .then((array) => console.log(array));
