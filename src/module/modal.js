const modal = () => {
  const modal = document.querySelector(".popup");
  const buttons = document.querySelectorAll(".popup-btn");
  const closeBtn = modal.querySelector(".popup-close");

  console.log(buttons);
  console.log(modal);

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'block';
    })
  })

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  })
}


export default modal;