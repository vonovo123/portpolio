export default function makeObserver(option, ref, interSectionCallback) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        interSectionCallback(entry);
      }
    });
  }, option);
  Object.entries(ref).forEach(([key, refEl], idx) => {
    io.observe(refEl.current);
  });
  return io;
}
