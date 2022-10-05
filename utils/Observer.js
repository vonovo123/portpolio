export default function makeObserver(option, interSectionCallback) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        interSectionCallback(entry);
      }
    });
  }, option);

  return io;
}
