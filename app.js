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
thumbnails.id = "thumbnails";
bigdisplay.id = "bigdisplay";
body.append(thumbnails, bigdisplay);

for (imgData of imagesData) {
  let img = document.createElement("img");
  img.src = imagesFolder + imgData.srcHint + thumbSuffix;
  img.alt = `${imgData.caption} in all its ${imgData.altText}.`;
  img.classList.add("thumb"); // So we can style it later
  img.width = imgData.width;
  img.height = 128; // TODO: Isn't height/width more of a styling decision??
  thumbnails.appendChild(img);
  img.addEventListener("click", (ev) => goFullScreenWith(img));
  // TODO: Will the click event miss people using keyboard navigation?
}

// Event handler for click on thumbnail - goes fullscreen with a giant version of it
function goFullScreenWith(img) {
  bigdisplay.innerHTML = ""; // TODO: Or just change contents?
  let bigImg = document.createElement("img");
  bigImg.classList.add("bigimage"); // So we can style it later
  bigImg.src = img.src.slice(0, -thumbSuffix.length) + ".jpg"; // Edit src to get big image
  bigImg.alt = img.alt + " Fullscreen.";
  bigdisplay.appendChild(bigImg);
}

function Img(srcHint, altText, caption, width) {
  this.srcHint = srcHint;
  this.altText = altText;
  this.caption = caption; // Hmm, caption won't actually be displayed
  this.width = width;
  // No 'height' property for the thumbnails since I know they're x128 high and
  // besides there are no cases in this assignment where they'd be displayed with
  // a height that was affected by their own characteristics. That might not be a good
  // design decision in the real world. But then I'm already pretty sure I'm not doing
  // this in the best way anyway - I just want to see what works and what doesn't.
}
