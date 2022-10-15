export default function makeObserver(option, inCallBack, outCallback) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        inCallBack(entry);
      } else {
        if (outCallback) {
          outCallback();
        }
      }
    });
  }, option);

  return io;
}
