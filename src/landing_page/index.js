const options__li = document.querySelectorAll(".options li");
options__li.forEach(li => { li.addEventListener("click", changeTab); })
function changeTab() {
  for (let i = 0; i < options__li.length; i++) {
    options__li[i].classList.remove('active');
  }
  this.classList.add('active')
}
