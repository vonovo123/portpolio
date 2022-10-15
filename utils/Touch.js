export default (function Touch() {
  let startTime = null;
  let touchPosition = { clientX: 0, clientY: 0 };
  return {
    touchStart: (e) => {
      const { clientX, clientY } = e.touches[0];
      startTime = e.timeStamp;
      touchPosition = { clientX, clientY };
    },
    touchEnd: (e, move) => {
      const { clientX, clientY } = e.changedTouches[0];
      console.log(JSON.stringify(touchPosition));
      const dx = clientX - touchPosition.clientX;
      const dy = clientY - touchPosition.clientY;
      console.log(Math.abs(dy));
      console.log(Math.abs(dx));
      if (Math.abs(dy) >= 5) {
        return;
      }

      // if (Math.abs(dx) <= 1) {
      //   return;
      // }
      dx > 0 ? move("prev") : move("next");
    },
  };
})();
