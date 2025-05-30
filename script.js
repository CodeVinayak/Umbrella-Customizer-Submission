const imageContainer = document.querySelector(".image-container");
const loaderContainer = document.getElementById("loader-container");
const blueThemeButton = document.getElementById("blue-theme");
const yellowThemeButton = document.getElementById("yellow-theme");
const pinkThemeButton = document.getElementById("pink-theme");
const umbrellaImage = document.getElementById("umbrella-image");
const logoUploadButton = document.getElementById("logo-upload-button");
const logoUploadInput = document.createElement("input");
const uploadedLogo = document.getElementById("uploaded-logo");

logoUploadInput.setAttribute("type", "file");
logoUploadInput.setAttribute("accept", ".jpg,.png");
logoUploadInput.style.display = "none";

function showLoader() {
  loaderContainer.style.opacity = "1";
  loaderContainer.style.visibility = "visible";
  umbrellaImage.style.visibility = "hidden";
  uploadedLogo.style.display = "none";
}

function hideLoader() {
  loaderContainer.style.opacity = "0";
  loaderContainer.addEventListener('transitionend', function handler() {
    loaderContainer.style.visibility = "hidden";
    umbrellaImage.style.visibility = "visible";
    if (uploadedLogo.src && uploadedLogo.src !== '') {
        uploadedLogo.style.display = "block";
    }
    loaderContainer.removeEventListener('transitionend', handler);
  });
}

function handleLogoUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    const uploadedLogo = document.getElementById("uploaded-logo");
    uploadedLogo.src = reader.result;
    uploadedLogo.style.display = "block";
    umbrellaImage.style.zIndex = "-1";
    // umbrellaImage.style.backgroundImage = `url('${reader.result}')`;
  };
}
logoUploadButton.addEventListener("click", () => {
  logoUploadInput.click();
});

logoUploadInput.addEventListener("change", handleLogoUpload);

function handleThemeChange(theme) {
  showLoader();
  const loaderStartTime = Date.now();

  umbrellaImage.src = `./assets/${theme}.png`;

  umbrellaImage.onload = () => {
    const elapsedTime = Date.now() - loaderStartTime;
    const remainingTime = 2000 - elapsedTime; 

    if (remainingTime > 0) {
      setTimeout(() => {
        hideLoader();
      }, remainingTime);
    } else {
      hideLoader();
    }
  };

  // Also update background and button color based on theme
  if (theme === 'Blue') {
    document.body.style.backgroundColor = "#C5E0DC";
    logoUploadButton.style.backgroundColor = "#0000FF";
  } else if (theme === 'Yello') { // Note: The original asset was 'Yello.png'
    document.body.style.backgroundColor = "#F7E09E";
    logoUploadButton.style.backgroundColor = "#FFA500";
  } else if (theme === 'Pink') {
    document.body.style.backgroundColor = "#F4C4C4";
    logoUploadButton.style.backgroundColor = "#FF00FF";
  }
}

blueThemeButton.addEventListener("click", () => {
  handleThemeChange('Blue');
});

yellowThemeButton.addEventListener("click", () => {
  handleThemeChange('Yello'); // Note: The original asset was 'Yello.png'
});

pinkThemeButton.addEventListener("click", () => {
  handleThemeChange('Pink');
});
