import { Ajax } from "./ajax.js"

const api = new Ajax( {
   baseURL: "https://jsonplaceholder.typicode.com",
   timeout: 5000
})

const btnLoad = document.getElementById("btnLoad")
const btnError = document.getElementById("btnError")
const btnReset = document.getElementById("btnReset")
const list = document.getElementById("list")
const loader = document.getElementById("loader")
const errorBox = document.getElementById("error")

function showLoader() { loader.style.display = "block" }
function hideLoader() { loader.style.display = "none" }

function showError(msg) {
   errorBox.textContent = msg
}

function clearError() {
   errorBox.textContent = ''
}

function renderList(items) {
   list.innerHTML = ''

   items.forEach(item => {
      const li = document.createElement("li")
      li.textContent = `${item.id}: ${item.title}`
      list.appendChild(li)
   })
}


btnLoad.addEventListener("click", async () => {
   showLoader(),
   showError(),
   list.innerHTML = ""

   try {
      const data = await api.get("/posts?_limit=10")
      renderList(data)
   }
   catch(err) {
      showError(err.message)
   }
   finally {
      hideLoader()
   }
})

btnError.addEventListener("click", async () => {
   showLoader();
   showError();
   list.innerHTML = ""

   try {
        await api.get("/wrong-endpoint");
    } catch (err) {
        showError("Błąd: " + err.message);
    } finally {
        hideLoader();
    }
})

btnReset.addEventListener("click", () => {
    list.innerHTML = "";
    clearError();
});
