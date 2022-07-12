let onebit = 1; // set this bit to zero, to keep multiple accordion items open at a time
let accordionItems = document.body.querySelectorAll(".accordion-items");
accordionItems.forEach((accordionItem) => {
  accordionItem.addEventListener("click", (event) => {
    let currentlyActive = document.querySelector(".accordion-items.active");
    if (onebit && currentlyActive && currentlyActive != accordionItem) {
      currentlyActive.firstElementChild.firstElementChild.classList.toggle(
        "hidden"
      );
      currentlyActive.nextElementSibling.style.maxHeight = 0;
      currentlyActive.classList.toggle("active");
    }
    let spansvg =
      accordionItem.firstElementChild.firstElementChild.classList.toggle(
        "hidden"
      );
    let answer = accordionItem.nextElementSibling;
    let answerContent = answer.firstElementChild;
    if (
      accordionItem.firstElementChild.firstElementChild.classList.contains(
        "hidden"
      )
    ) {
      answer.style.maxHeight = answer.scrollHeight + "px";
      console.log(answer.style.maxHeight);
      accordionItem.classList.toggle("active");
    } else {
      answer.style.maxHeight = 0;
      accordionItem.classList.toggle("active");
    }
  });
});
