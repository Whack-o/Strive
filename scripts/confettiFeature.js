export function initializeConfetti({ confetti, canvas, targets, options }) {
    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true
    });
    
    targets.forEach(element => {
      element.addEventListener("click", (event) => {
        if (element.checked) {
          const { clientX, clientY } = event;
          myConfetti({
            ...options,
            origin: {
              x: clientX / window.innerWidth,
              y: clientY / window.innerHeight
            }
          });
        }
      });
    });
}