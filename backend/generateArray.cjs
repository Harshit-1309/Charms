const fs = require('fs');

const files = [
  "accesories.jpg",
  "bracelettes.jpg",
  "crochet.jpg",
  "glasses.avif",
  "hyperhidrosis.jpg",
  "kitten.jpg",
  "makhashaka.jpg",
  "monster.webp",
  "nails extension.jpg",
  "piercing.jpg",
  "shorthairs.jpg",
  "siddhartmalhotra.jpg",
  "stawberry.jpg",
  "tattoo.jpg",
  "tiramisu.jpg",
  "tops.jpg"
];

function capitalize(str) {
  return str.split('.')[0].replace(/_/g, ' ').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

let code = `export const initialPiecesOfYou: PieceOfYouItem[] = [\n`;

files.forEach((file, index) => {
  const aspect = ['portrait', 'square', 'landscape'][Math.floor(Math.random() * 3)];
  let title = capitalize(file);
  
  if(file === "hyperhidrosis.jpg") title = "Sweaty Hands (Hyperhidrosis)";
  if(file === "glasses.avif") title = "Glasses";
  if(file === "makhashaka.jpg") title = "Makhashaka";
  if(file === "tiramisu.jpg") title = "Tiramisu";
  if(file === "stawberry.jpg") title = "Strawberry";
  if(file === "monster.webp") title = "Peace Flavour Monster";
  if(file === "kitten.jpg") title = "Kittens";
  if(file === "nails extension.jpg") title = "Nail Extensions";
  if(file === "shorthairs.jpg") title = "Short Hair";
  if(file === "siddhartmalhotra.jpg") title = "Siddharth Malhotra";

  code += `  {
    id: "poy${index + 1}",
    title: "${title}",
    photoUrl: "/Aesthetics/${file}",
    aspectRatio: "${aspect}"
  }${index < files.length - 1 ? ',' : ''}\n`;
});

code += `];`;

console.log(code);
