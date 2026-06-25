const suggestions = [
  { title: "Neon Shadows", type: "Movie", description: "A cinematic sci-fi adventure with glowing cityscapes." },
  { title: "Midnight Arcade", type: "Cartoon", description: "A high-energy animated arcade showdown." },
  { title: "Starlight Samurai", type: "Anime", description: "A stylish action story with futuristic samurai." },
  { title: "Heart of the Crew", type: "Series", description: "A seamless watch party series for friends to binge." },
  { title: "Moonbeam Discoveries", type: "Animation", description: "A warm family story with magical visuals." },
];

const form = document.getElementById("room-form");
const roomView = document.getElementById("room-view");
const suggestionsGrid = document.getElementById("suggestions");
const roomTitle = document.getElementById("room-title");
const roomMeta = document.getElementById("room-meta");
const watchHeading = document.getElementById("watch-heading");
const watchSubtitle = document.getElementById("watch-subtitle");
const watchBanner = document.getElementById("watch-banner");
const joinRoomBtn = document.getElementById("join-room-btn");
const togglePlayBtn = document.getElementById("toggle-play");
const previewVideo = document.getElementById("preview-video");
const playerStatus = document.getElementById("player-status");
const playerPlaceholder = document.getElementById("player-placeholder");

function renderSuggestions() {
  suggestionsGrid.innerHTML = "";
  suggestions.forEach(item => {
    const card = document.createElement("article");
    card.className = "suggestion-card";

    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <p class="eyebrow">${item.type}</p>
      <button type="button">Use this title</button>
    `;

    const button = card.querySelector("button");
    button.addEventListener("click", () => {
      document.getElementById("watch-title").value = item.title;
      document.getElementById("content-type").value = item.type;
      document.getElementById("creator-name").focus();
    });

    suggestionsGrid.appendChild(card);
  });
}

function updateRoomView(room) {
  roomTitle.textContent = `${room.roomName}`;
  roomMeta.textContent = `${room.contentType} · Created by ${room.creatorName || "Creator"} · ${new Date(room.createdAt).toLocaleString()}`;
  watchHeading.textContent = room.watchTitle;
  watchSubtitle.textContent = `Genre: ${room.contentType}`;
  watchBanner.textContent = `Streaming your selected ${room.contentType.toLowerCase()} to the room screen.`;
  watchBanner.style.backgroundImage = `linear-gradient(180deg, rgba(255, 61, 107, 0.18), rgba(8, 12, 24, 0.95))`;
  roomView.classList.remove("hidden");
}

function loadSavedRoom() {
  const saved = localStorage.getItem("watch-room");
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch (error) {
    return null;
  }
}

function saveRoom(room) {
  localStorage.setItem("watch-room", JSON.stringify(room));
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const room = {
    roomName: document.getElementById("room-name").value.trim(),
    watchTitle: document.getElementById("watch-title").value.trim(),
    contentType: document.getElementById("content-type").value,
    creatorName: document.getElementById("creator-name").value.trim(),
    createdAt: new Date().toISOString(),
  };

  if (!room.roomName || !room.watchTitle) {
    alert("Please enter both a room name and a watch title.");
    return;
  }

  saveRoom(room);
  updateRoomView(room);
  previewVideo.hidden = true;
  playerPlaceholder.style.display = "grid";
  playerStatus.textContent = "Room is ready. Press play to preview.";
});

joinRoomBtn.addEventListener("click", () => {
  playerStatus.textContent = "You joined the room. Invite friends with the same story name.";
});

let videoPlaying = false;
togglePlayBtn.addEventListener("click", () => {
  if (!previewVideo.hidden) {
    if (videoPlaying) {
      previewVideo.pause();
      togglePlayBtn.textContent = "Play Preview";
      playerStatus.textContent = "Paused. Press play to continue.";
    } else {
      previewVideo.play();
      togglePlayBtn.textContent = "Pause Preview";
      playerStatus.textContent = "Now playing preview in the room.";
    }
    videoPlaying = !videoPlaying;
    return;
  }

  previewVideo.hidden = false;
  playerPlaceholder.style.display = "none";
  previewVideo.play();
  videoPlaying = true;
  togglePlayBtn.textContent = "Pause Preview";
  playerStatus.textContent = "Now playing preview in the room.";
});

previewVideo.addEventListener("ended", () => {
  videoPlaying = false;
  togglePlayBtn.textContent = "Play Preview";
  playerStatus.textContent = "Preview finished. Press replay to preview again.";
});

window.addEventListener("DOMContentLoaded", () => {
  renderSuggestions();
  const room = loadSavedRoom();
  if (room) {
    updateRoomView(room);
  }
});
