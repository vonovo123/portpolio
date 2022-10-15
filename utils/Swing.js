export function on(swing, ref) {
  let flag = true;
  swing.current = setInterval(() => {
    if (flag) {
      ref.current.style.transform = `translate3d(0, ${10}px, 0)`;
    } else {
      ref.current.style.transform = `translate3d(0, 0, 0)`;
    }
    flag = !flag;
  }, 1000);
}

export function off(swing, ref) {
  ref.current.style.transform = `translate3d(${0}px, 0, 0)`;
  clearInterval(swing.current);
  swing.current = null;
}

export function clear(swing) {
  clearInterval(swing.current);
}
