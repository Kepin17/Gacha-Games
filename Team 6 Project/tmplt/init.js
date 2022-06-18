// declaring element
const username = document.getElementById("username");
const registerForm = document.getElementById("registerForm");
const logoutForm = document.getElementById("logoutForm");
const startSection = document.getElementById("start");
const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");
const rewardImage = document.getElementById("imgReward");
const hidden = document.getElementsByClassName("contentwrapper");
const welcome = document.getElementById("title");
const alertRegister = document.getElementById("alertRegister");
const rollSound = document.getElementById("rollSound");
const winnerSound = document.getElementById("winnerSound");
const loseSound = document.getElementById("loseSound");
const player = new Player();
const tokenText = document.getElementById("tokenText");
const popUp = document.getElementById("popUp");
const Closeicon = document.getElementById("Closeicon");
const motivedText = document.getElementById("motived");

let default_option = ["🍒", "🍎", "🍇"];
box1.textContent = default_option[0];
box2.textContent = default_option[1];
box3.textContent = default_option[2];

function dice() {
  let gacha = [];
  for (let i = 0; i < default_option.length; i++) {
    const roll = default_option[~~(Math.random() * default_option.length)];
    gacha.push(roll);
  }
  return gacha;
}

function Randommotived() {
  let motivation = [
    "“Kerjakan dengan Lebih dan Sepenuh Hati“",
    "“Jangan Pernah Menyerah Apapun yang Terjadi“",
    "“Keraguan adalah Musuh Terbesar dalam Meraih Mimpi“",
    "“Kesulitan adalah hujan terbaik untuk menunjukkan kualitas diri yang sebenarnya.”",
    "“Kualitas bukanlah sebuah aksi. Melainkan sebuah kebiasaan.” - Aristoteles",
    "“Edison gagal 10.000 kali sebelum dia membuat lampu listrik. Jangan berkecil hati jika kamu gagal beberapa kali.” - Napoleon Hill",
    "“Sukses itu berawal dari setiap tantangan, bukan dari zona nyaman.”",
  ];
  let rand = [Math.floor(Math.random() * motivation.length)];
  motivedText.innerHTML = motivation[rand];
}

function showPopUp() {
  popUp.style.opacity = 1;
  Randommotived();
}
function reward() {
  fetch("https://zoo-animal-api.herokuapp.com/animals/rand")
    .then((x) => x.json())
    .then((result) => {
      console.log("reward buat anda: ", result);

      //set nama hadiah reward
      let text = document.createElement("h2");
      text.textContent = result.name;

      //set gambar hadiah
      let img = new Image(200, 200);
      img.src = result.image_link;

      //set element
      rewardImage.appendChild(img);
      rewardImage.appendChild(text);
    });
}

function winner() {
  if (box1.textContent == box2.textContent && box1.textContent == box3.textContent) {
    location.href = "#reward";
    rollSound.pause();
    winnerSound.play();
    reward();
  } else {
    rollSound.pause();
    loseSound.play();
    showPopUp();
  }
}

function start() {
  //selama
  const rolling = setInterval(function () {
    const result = dice();
    box1.textContent = result[0];
    box2.textContent = result[1];
    box3.textContent = result[2];
    rollSound.play();
  }, 100);

  //ketika
  setTimeout(function () {
    clearInterval(rolling);
    winner();
  }, 3000);
}

onload = function () {
  const token = sessionStorage.getItem("token");

  if (token && token != null) {
    registerForm.style.display = "none";
    logoutForm.style.color = "rgb(201, 255, 201)";
    tokenText.innerHTML = `Welcome ${token}`;
  } else {
    registerForm.style.display = "block";
    logoutForm.style.color = "red";
  }
};

function register() {
  if (username.value != "") {
    player.username = username.value;
    player.register;
  } else {
    alertRegister.style.top = "10px";
  }
}

function logout() {
  player.logout;
}

function closePopUp() {
  popUp.style.opacity = 0;
}
