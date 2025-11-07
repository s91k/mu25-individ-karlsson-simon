function showNewBookmarkDialog(){
    const dialog = document.querySelector(".bookmark-dialog");
    dialog.classList.remove("bookmark-dialog--update");

    document.querySelector("#title").value = "";
    document.querySelector("#url").value = "";

    document.querySelector(".bookmark-dialog").showModal();
}

function showUpdateBookmarkDialog(bookmarkToUpdate){
    const dialog = document.querySelector(".bookmark-dialog");
    dialog.classList.add("bookmark-dialog--update");

    document.querySelector("#title").value = bookmarks[bookmarkToUpdate].title;
    document.querySelector("#url").value = bookmarks[bookmarkToUpdate].url;

    document.querySelector(".button--dialog-update").onclick = () => updateBookmark(bookmarkToUpdate);

    document.querySelector(".bookmark-dialog").showModal();
}

const hideBookmarkDialog = () => document.querySelector(".bookmark-dialog").close();

const removeErrorHighlight = (e) => e.classList.remove("bookmark-dialog__input--invalid");

function isValidUrl(url){
    try {
        const u = new URL(url);
        return u.protocol === "http:" || u.protocol === "https:";
    } catch(error) {
        return false;
    }
}

function validateDialogInput(newBookmark) {
    const titleInputElement = document.querySelector("#title");
    const urlInputElement = document.querySelector("#url");

    const titleErrorElement = document.querySelector("#title-error");
    const urlErrorElement = document.querySelector("#url-error");

    let titleError = "";
    let urlError = "";

    titleInputElement.value = titleInputElement.value.trim();
    urlInputElement.value = urlInputElement.value.trim();

    if(titleInputElement.value.length == 0){
        titleError = "Måste innehålla något värde.";
    }

    if(urlInputElement.value.length == 0){
        urlError = "Måste innehålla något värde.";
    } else if(newBookmark && bookmarks.some(b => b.url == urlInputElement.value)) {
        urlError = "Ett bokmärke med denna URL finns redan.";
    } else if(!isValidUrl(urlInputElement.value)) {
        urlError = "Inte giltigt URL (ex: https://www.exempel.com)";
    }

    titleErrorElement.textContent = titleError;
    urlErrorElement.textContent = urlError;

    if(titleError.length > 0){
        titleInputElement.classList.add("bookmark-dialog__input--invalid");
    }

    if(urlError.length > 0){
        urlInputElement.classList.add("bookmark-dialog__input--invalid");
    }

    return titleError.length == 0 && urlError.length == 0;
}

function addBookmark(){
    if(validateDialogInput(true)) {
        bookmarks.push({
            title: document.querySelector("#title").value,
            url: document.querySelector("#url").value
        });

        saveBookmarks();
        renderBookmarks();
        hideBookmarkDialog();
    }
}

function updateBookmark(bookmarkToUpdate){
    if(validateDialogInput(false)) {
        bookmarks[bookmarkToUpdate].title = document.querySelector("#title").value;
        bookmarks[bookmarkToUpdate].url = document.querySelector("#url").value;

        saveBookmarks();
        renderBookmarks();
        hideBookmarkDialog();
    }
}

function deleteBookmark(i){
    if(window.confirm("Vill du ta bort det här bokmärket?")){
        bookmarks.splice(i, 1);

        saveBookmarks();
        renderBookmarks();
    }
}

function renderBookmarks(){
    const list = document.querySelector(".bookmarks");
    list.innerHTML = "";

    bookmarks.forEach((b, i) => {
        const li = document.createElement("li");
        li.classList.add("bookmark");

        const a = document.createElement("a");
        a.classList.add("bookmark__title");
        a.textContent = b.title;
        a.href = b.url;
        a.target = "_blank";

        const p = document.createElement("p");
        p.classList.add("bookmark__url");
        p.textContent = b.url;

        const updateButton = document.createElement("button");
        updateButton.classList.add("bookmark__update-button");
        updateButton.textContent = "✎";
        updateButton.addEventListener("click", () => showUpdateBookmarkDialog(i));

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("bookmark__delete-button");
        deleteButton.textContent = "✕";
        deleteButton.addEventListener("click", () => deleteBookmark(i));

        li.appendChild(a);
        li.appendChild(p);
        li.appendChild(updateButton);
        li.appendChild(deleteButton);

        list.appendChild(li);
    });

    const error = document.querySelector(".no-bookmarks-error");
    error.hidden = bookmarks.length > 0;
}

function saveBookmarks(){
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) ?? [];
renderBookmarks();