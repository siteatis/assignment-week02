const imagesFolder = "assets/img/";
const thumbSuffix = ".thumb.png";
const imagesData = [
  new Img("mercury-1226433_1920", "barrenness", "Mercury", 228),
  new Img("venus-7292552_1920", "beauty", "Venus", 128),
  new Img("earth-1756274_1920", "sunriseiness", "Earth", 256),
  new Img("mars-8702357_1920", "fiery glory", "Mars", 228),
  new Img("jupiter-7291995_1920", "majesty", "Jupiter", 128),
  new Img("saturn-67672_1920", "corsetry", "Saturn", 252),
  new Img("uranus-5559037_1920", "icy cold", "Uranus", 128),
  new Img("neptune-6741030_1920", "icier cold", "Neptune", 228),
  new Img("gazorpazorp-7736933_1920", "Rickness", "Gazorpazorp", 192),
  new Img("scorchio-8997939_1920", "inhabitability", "Scorchio!", 128),
]; // Credit: pixabay, and sudo apt-get install ImageMagick
// Obviously irl we wouldn't generate alt text in an automated way like this, since
// we'd want to do justice to the variety in character of these images.

const body = document.querySelector("body");
const thumbnails = document.createElement("section");
const bigdisplay = document.createElement("section");
const prev = document.createElement("button");
const next = document.createElement("button");
thumbnails.id = "thumbnails";
bigdisplay.id = "bigdisplay";
prev.id = "prev";
next.id = "next";
body.append(thumbnails, bigdisplay, prev, next);

for (imgData of imagesData) {
  let img = document.createElement("img");
  img.src = imagesFolder + imgData.srcHint + thumbSuffix;
  img.alt = `${imgData.caption} in all its ${imgData.altText}.`;
  img.classList.add("thumb"); // So we can style it later
  img.width = imgData.width;
  img.height = 128; // TODO: Isn't height/width more of a styling decision??
  img.tabIndex = "0"; // MDN recommends not setting actual tab indices, always use 0
  img.index = thumbnails.childNodes.length; // Lets us link back
  thumbnails.appendChild(img);
  // Choose an image to go fullscreen by clicking or by pressing space when selected
  img.addEventListener("click", () => moveTo(img.index));
  img.addEventListener("keydown", (ev) => {
    if (ev.key === " ") moveTo(img.index);
  });
}

// We're initialised, let's fire it up!
let currIndex = 0;

// Make left/right buttons and set left/right arrow keys, to scroll through images
prev.addEventListener("click", () => move(-1));
next.addEventListener("click", () => move(+1));
window.addEventListener("keydown", (ev) => {
  if (ev.key === "ArrowLeft") move(-1);
  else if (ev.key === "ArrowRight") move(+1);
});

// Moves to this image, going fullscreen with a giant version of it
function moveTo(index) {
  let img = thumbnails.childNodes[index];
  bigdisplay.innerHTML = ""; // TODO: Or just change contents?
  let bigImg = document.createElement("img");
  bigImg.classList.add("bigimage"); // So we can style it
  bigImg.src = img.src.slice(0, -thumbSuffix.length) + ".jpg"; // Edit src to get big image
  bigImg.alt = img.alt + " Fullscreen.";
  bigdisplay.appendChild(bigImg);
  currIndex = index;
}

// Move +/- some distance from the current image
function move(offset) {
  moveTo((currIndex + offset + imagesData.length) % imagesData.length); // Ensure it wraps
}

function Img(srcHint, altText, caption, width) {
  this.srcHint = srcHint;
  this.altText = altText;
  this.caption = caption; // Hmm, caption won't actually be displayed. // TODO: or imgName?
  this.width = width;
  // No 'height' property for the thumbnails since I know they're x128 high and
  // besides there are no cases in this assignment where they'd be displayed with
  // a height that was affected by their own characteristics. That might not be a good
  // design decision in the real world. But then I'm already pretty sure I'm not doing
  // this in the best way anyway - I just want to see what works and what doesn't.
}
