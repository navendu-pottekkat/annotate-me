let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/kodZnFi0b/';

let video;
let flippedVideo;

let label = '';

let yes;
let yesFade = 0;

let no;
let noFade = 0;

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  yes = loadImage('yes.png');
  no = loadImage('no.png');
}


function setup() {
  createCanvas(1280, 720);
  video = createCapture(VIDEO);
  video.size(160, 120);

  flippedVideo = ml5.flipImage(video);
  classifyVideo();
}

function draw() {
  background(0, 255, 0);
  imageMode(CORNER);

  if (label == 'yes') {
    yesFade = 255;
  } else if (label == 'no') {
    noFade = 255;
  }

  if (yesFade > 0) {
    tint(255, yesFade);
    image(yes, 0, 0);
    yesFade -= 10;
  }

  if (noFade > 0) {
    tint(255, noFade);
    image(no, 0, 0);
    noFade -= 10;
  }

}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  label = results[0].label;
  classifyVideo();
}
