/*
  How this works:
  - Each mannequin has an outfits array (image URLs + optional scene)
  - The code swaps images every INTERVAL ms (default 5 minutes).
  - A small "spin" class is toggled to create a 3D turn illusion, and the image source is swapped at mid-turn.
  - Replace the placeholder URLs in each outfits array below with your real assets (front / 3/ side / back).
*/

const INTERVAL = 10000; // 300000ms = 5 minutes. For testing, you can set to 5000 (5s).

/* --- Replace these arrays with your real image URLs.
   For best visual: provide 4 images per outfit rotation (front, quarter-left, back, quarter-right)
   or at least 2 (front/back). Keep consistent aspect ratios.
*/
/*const womanOutfits = [
  {img: 'https://placehold.co/600x1200?text=Woman+Outfit+1', scene: 'linear-gradient(180deg,#f7efe9,#efe6dc)'},
  {img: 'https://placehold.co/600x1200?text=Woman+Outfit+2', scene: 'linear-gradient(180deg,#efe6ff,#f0e6ff)'},
  {img: 'https://placehold.co/600x1200?text=Woman+Outfit+3', scene: 'linear-gradient(180deg,#fff6e6,#ffeecf)'}
];
const manOutfits = [
  {img: 'https://placehold.co/600x1200?text=Man+Outfit+1', scene: 'linear-gradient(180deg,#f2f3f4,#e9e9e9)'},
  {img: 'https://placehold.co/600x1200?text=Man+Outfit+2', scene: 'linear-gradient(180deg,#f4f7f9,#eaeff5)'},
  {img: 'https://placehold.co/600x1200?text=Man+Outfit+3', scene: 'linear-gradient(180deg,#f0f0f0,#e6e6e6)'}
];
const kidOutfits = [
  {img: 'https://placehold.co/600x1200?text=Kid+Outfit+1', scene: 'url(https://placehold.co/1600x900?text=Street)+center/cover'},
  {img: 'https://placehold.co/600x1200?text=Kid+Outfit+2', scene: 'linear-gradient(180deg,#efe6df,#efe1d8)'},
  {img: 'https://placehold.co/600x1200?text=Kid+Outfit+3', scene: 'url(https://placehold.co/1600x900?text=Urban)+center/cover'}
];*/

const womanOutfits = [
  {img: 'THEWOMAN.png'},
  {img: 'woman1.png'},
  {img: 'woman2.png'},
  {img: 'woman3.png'},
  {img: 'woman4.png'},
  {img: 'woman5.png'},
  {img: 'woman6.png'},
  {img: 'woman7.png'},
  {img: 'woman8.png'},

];

const manOutfits = [
  {img: 'THEMAN.png'},
   {img: 'THEBOY.png'},
 {img: 'THEWOMAN.png'}
];

const kidOutfits = [
  {img: 'THEBOY.png'},
  {img: 'boy1.png'},
  {img: 'boy2.png'},
  {img: 'boy3.png'},
  {img: 'boy4.png'},
  {img: 'boy5.png'},
  {img: 'boy6.png'},
  {img: 'boy7.png'},
  {img: 'boy8.png'},
  {img: 'boy9.png'},
  {img: 'boy10.png'},
];


/* --- Core logic --- */
function setupRotator(manId, sceneId, outfits){
  const imgEl = document.getElementById(manId);
  const sceneEl = document.getElementById(sceneId);
  let idx = 0;

  // Set initial
  imgEl.src = outfits[idx].img;
  if (outfits[idx].scene) sceneEl.style.background = outfits[idx].scene;

  // spin function: apply spin, swap at halfway, then remove spin
  function doSpinSwap(nextIdx){
    // add forward spin
    imgEl.classList.add('spin');
    // at half the transition swap the image
    setTimeout(() => {
      imgEl.src = outfits[nextIdx].img;
      if (outfits[nextIdx].scene) sceneEl.style.background = outfits[nextIdx].scene;
      // return from spin
      imgEl.classList.remove('spin');
      // ensure element gets back to full
      imgEl.classList.add('spin-back');
      setTimeout(()=> imgEl.classList.remove('spin-back'), 900);
    }, 450); // half of CSS transform duration (900ms)
  }

  // Interval loop
  setInterval(() => {
    const next = (idx + 1) % outfits.length;
    doSpinSwap(next);
    idx = next;
  }, INTERVAL);
}

/* Initialize three rotators */
setupRotator('mannequin-woman','scene-woman',womanOutfits);
setupRotator('mannequin-man','scene-man',manOutfits);
setupRotator('mannequin-kid','scene-kid',kidOutfits);

/* page utilities */
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('toTop').addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

/* Accessibility: pause animations if prefers-reduced-motion */
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mediaQuery.matches){
  // stop rotating: simply clear the interval by not setting it - in this implementation,
  // simpler fallback: we set INTERVAL to very large (handled by reloading the page).
  // For now: remove spin classes and disable transitions.
  document.querySelectorAll('.mannequin').forEach(el=>{
    el.style.transition = 'none';
  });
}


const slider = document.getElementById('categorySlider');
let scrollAmount = 0;

setInterval(() => {
  scrollAmount += 180;
  if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
    scrollAmount = 0;
  }
  slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
}, 3000);


const categoryImages = {
  women: ["d1.webp","d2.jpeg","d3.jpeg","d4.jpeg","d5.jpeg","d6.jpeg","d7.jpeg","d8.webp",],
  men:   ["MAN1.jpg","M2.jpg","M3.jpg","M2.jpg","M6.jpg",
    "M7.jpg","M8.jpg","M9.jpg","M10.jpg","j1.jpg","j2.jpg","j3.jpg","j4.jpg",
    "jm1.jpg","jm2.jpeg","jm3.webp","jm4.webp","s1.jpg","s2.jpg","s3.jpg",
    "s4.jpg","s22.jpg","mt1.jpg","mt2.jpg","mt3.jpg","mt5.jpg","mt6.jpg",],
  kids:  ["k1.jpeg","k2.jpeg","k3.jpeg","k4.jpeg","k5.jpeg","k6.jpeg","k7.jpeg","k8.jpeg","k9.jpeg","k10.jpeg","k11.jpeg","k12.jpeg","k15.webp",],
  access:["A2.jpg","A4.jpg","A6.jpg","A7.jpg","A8.jpg","A9.jpg","A10.jpg","a1.jpeg","a2.jpeg","a3.jpeg","a4.webp","a5.webp","a6.jpeg",
    "a7.jpeg","a8.jpeg","a9.jpeg","a10.jpeg","a11.webp","a12.jpeg","a13.jpeg",
    "a14.jpeg","a15.jpeg","a16.jpeg","a17.jpeg","a18.jpeg","a19.jpeg","a20.jpeg",
    "a21.jpeg","a22.jpeg","a23.jpeg","a24.jpeg","a25.jpeg","a26.jpeg","c1.jpg","c2.jpg","c3.jpg",]
};

document.querySelectorAll(".cat-img").forEach(img=>{
  let index = 0;
  const group = img.dataset.category;

  setInterval(()=>{
    index = (index + 1) % categoryImages[group].length;
    img.classList.add("zoom");
    setTimeout(()=>{
      img.src = categoryImages[group][index];
      img.classList.remove("zoom");
    },350);
  }, 2500);
});

// testimonial script
/* --- Testimonial Rotator --- */
(function(){
  const container = document.getElementById('testimonialContainer');
  if(!container) return;

  const testimonials = container.querySelectorAll('.testimonial');
  let index = 0;

  setInterval(() => {
    testimonials[index].style.display = 'none';
    index = (index + 1) % testimonials.length;
    testimonials[index].style.display = 'flex';
  }, 4000);
})();

// whatsapp card
document.getElementById("sendWhatsApp").addEventListener("click", function(){
  const message = encodeURIComponent(document.getElementById("whatsappMessage").value);
  const phoneNumber = "+2547XXXXXXXX"; // Replace with your WhatsApp number (international format, no +)
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, "_blank");
});


