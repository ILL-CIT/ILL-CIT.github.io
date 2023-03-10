const submitButton = document.getElementById("submit-button");
const proxyIframe = document.getElementById("proxy-iframe");

submitButton.addEventListener("click", function() {
  const urlInput = document.getElementById("url-input").value;
  const proxyUrl = "https://penrose-production-1b0b.up.railway.app/service/~osana/" + (urlInput);
  proxyIframe.src = proxyUrl;
});
