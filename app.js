const bookmarks = [];

const showNewBookmark = () => document.querySelector(".bookmark-dialog").showModal();

const hideNewBookmark = () => document.querySelector(".bookmark-dialog").close();

function addBookmark(){
    const title = document.querySelector("#title");
    const url = document.querySelector("#url");

    if(title.value.length == 0 || url.value.length == 0){
        window.alert("Titel och URL måste innehålla något värde");
    } else {
        bookmarks.push({
            title: title.value,
            url: url.value
        });

        title.value = "";
        url.value = "";

        renderBookmarks();
        hideNewBookmark();
    }
}

function renderBookmarks(){
    const list = document.querySelector(".bookmarks");
    list.innerHTML = "";

    bookmarks.forEach(b => {
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

        li.appendChild(a);
        li.appendChild(p);

        list.appendChild(li);
    });

    const error = document.querySelector(".no-bookmarks-error");
    error.hidden = bookmarks.length > 0;
}