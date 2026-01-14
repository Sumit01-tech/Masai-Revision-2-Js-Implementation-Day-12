const container = document.getElementById("container");
const loader = document.getElementById("loader");

function loadItems() {
    if (isLoading) return;

    isLoading = true;
    loader.style.display = "block";

    setTimeout(() => {
        const nextItems = allItems.slice(
            currentIndex,
            currentIndex + ITEMS_PER_LOAD
        );
        nextItems.forEach(item => {
            const div = document.createElement("div");
            div.className = "item";
            div.innerHTML = `
        <h4>${item.title}</h4>
        <p>${item.description}</p>
      `;
            container.appendChild(div);
        });
        currentIndex += ITEMS_PER_LOAD;
        isLoading = false;
        loader.style.display = "none";

        if (currentIndex >= allItems.length) {
            window.removeEventListener("scroll", handleScroll);
            loader.innerText = "No more items";
            loader.style.display = "block";
        }
    }, 1000);
}
function handleScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    if (fullHeight - (scrollTop + windowHeight) < 100) {
        loadItems();
    }
}
loadItems();

window.addEventListener("scroll", handleScroll);
