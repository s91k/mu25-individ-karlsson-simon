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

function addBookmark(){
    const title = document.querySelector("#title").value;
    const url = document.querySelector("#url").value;

    if(title.length == 0 || url.length == 0){
        window.alert("Titel och URL måste innehålla något värde");
    } else {
        bookmarks.push({
            title: title,
            url: url
        });

        saveBookmarks();
        renderBookmarks();
        hideBookmarkDialog();
    }
}

function updateBookmark(bookmarkToUpdate){
    const title = document.querySelector("#title").value;
    const url = document.querySelector("#url").value;

    if(title.length == 0 || url.length == 0){
        window.alert("Titel och URL måste innehålla något värde");
    } else {
        bookmarks[bookmarkToUpdate].title = title;
        bookmarks[bookmarkToUpdate].url = url;

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

        const upButton = document.createElement("button");
        upButton.classList.add("bookmark__button", "bookmark__button--up");
        upButton.textContent = "▲";
        upButton.addEventListener("click", () => {
            if(i > 0){
                bookmarks[i] = bookmarks.splice(i - 1, 1, bookmarks[i])[0];
                saveBookmarks();
                renderBookmarks();
            }
        });

        const downButton = document.createElement("button");
        downButton.classList.add("bookmark__button", "bookmark__button--down");
        downButton.textContent = "▼";
        downButton.addEventListener("click", (e) => {
            if(i < bookmarks.length - 1){
                bookmarks[i] = bookmarks.splice(i + 1, 1, bookmarks[i])[0];
                saveBookmarks();
                renderBookmarks();
            }
        });

        const updateButton = document.createElement("button");
        updateButton.classList.add("bookmark__button", "bookmark__button--update");
        updateButton.textContent = "✎";
        updateButton.addEventListener("click", () => showUpdateBookmarkDialog(i));

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("bookmark__button", "bookmark__button--delete");
        deleteButton.textContent = "✕";
        deleteButton.addEventListener("click", () => deleteBookmark(i));

        li.append(a, p, upButton, downButton, updateButton, deleteButton);

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