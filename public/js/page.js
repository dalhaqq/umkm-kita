const imgs = document.querySelectorAll('.features-image.fade');
if (imgs.length > 0) imgs[0].classList.add('active');
if (imgs.length > 1)
    setInterval(() => {
        const idx = Array.prototype.findIndex.call(imgs, (img) => {
            return img.classList.contains('active');
        })
        if (idx != -1) {
            imgs[idx].classList.remove('active');
            imgs[(idx + 1) % imgs.length].classList.add('active');
        }
        console.log('ch');
    }, 2000);