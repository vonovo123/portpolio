export default function observeBottomOf({ target, onBottom, option }) {
  const $observe = document.createElement("div");
  target.append($observe);
  const unobserve = () => {
    //탐지 중단.
    observer.unobserve($observe);
    //빈요소 제거
    $observe.remove();
  };
  const cb = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        onBottom(unobserve);
      }
    });
  };
  let observer = new IntersectionObserver(cb, option);
  observer.observe($observe);
}
