let html = "";

$.each({name: "John", lang: "JS"}, function (i, n) {
    html += "<p>" + "Name: " + i + ", Value: " + n + "</p>";
});

document.getElementById("main").innerHTML = html;