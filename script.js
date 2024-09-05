const paragraphContainers = document.querySelectorAll('.paragraph-container');
/* The code below is for the extendable containers*/
paragraphContainers.forEach(container => {
  container.addEventListener('click', () => {
    // reclicking on a expaned box shrinks it.
    if (container.classList.contains('expanded')) {
      container.classList.remove('expanded');
    } else {
      // expands the clicked box.
      container.classList.add('expanded');

      // it shrinks all other boxs.
      paragraphContainers.forEach(otherContainer => {
        if (otherContainer !== container && otherContainer.classList.contains('expanded')) {
          otherContainer.classList.remove('expanded');
        }
      });
    }
  });
});
