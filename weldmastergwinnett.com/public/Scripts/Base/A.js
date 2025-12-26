const banners = [
  {
    src: "Assets/Advertisements/datBoiFalso.jpg",
    url: "https://youtube.com/@falso-tool?si=iqJHy-NreksSTacR"
  },
  {
    src: "Assets/Advertisements/sawusdomain.gif",
    url: "https://sawusdomain.com"
  },
  {
    src: "Assets/Advertisements/southfeel.jpg",
    url: "https://southfieldclassics.com"
  },
  {
    src: "Assets/Advertisements/expservice.jpg",
    url: "https://www.expservicecenter.com/"
  }
];

let bannerIndex = 0;

function rotateBanner() {
  const img  = document.getElementById("BannerImage");
  const link = document.getElementById("BannerLink");

  if (!img || !link) {
    return;
  }

  bannerIndex++;
  if (bannerIndex >= banners.length) {
    bannerIndex = 0;
  }

  img.src   = banners[bannerIndex].src;
  link.href = banners[bannerIndex].url;
}

setInterval(rotateBanner,1000);
