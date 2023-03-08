const form = document.querySelector('form');
const urlInput = document.getElementById('url-input');
const unblockBtn = document.getElementById('unblock-btn');
const unblockedSite = document.getElementById('unblocked-site');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  unblockSite();
});

function unblockSite() {
  const url = urlInput.value.trim();
  if (!url) return;

  const proxyUrl = `https://penrose-production-1b0b.up.railway.app/service/~osana/${url}`;
  unblockedSite.setAttribute('src', proxyUrl);
  urlInput.value = '';
}
