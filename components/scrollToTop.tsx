export const scrollToTop = () => {
    let scrollToptimer = setInterval(() => {
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        var speed = top / 30;
        document.documentElement.scrollTop -= speed;
        if (top <= 0) {
            clearInterval(scrollToptimer);
        }
    }, 5);
};


export default scrollToTop;
