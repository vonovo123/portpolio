export default function makeObserver({ target = [], option, inCB, outCB }) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        inCB(entry);
      } else {
        if (outCB) {
          outCB();
        }
      }
    });
  }, option);

  target.forEach((t) => {
    io.observe(t);
  });
  return io;
}
