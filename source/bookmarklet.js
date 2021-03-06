var socket = new WebSocket("ws://localhost:8000");

var hovertarget;

window.addEventListener("mousemove", function (event) {
    if (hovertarget) return;
    if (event.target.tagName === "CANVAS") {
        hovertarget = event.target;
        doCanvasThingy(hovertarget);
    }
});

function doCanvasThingy(canvas) {
    var ctx             = canvas.getContext("2d");
    var renderTarget    = document.createElement("canvas");
    var renderTargetCtx = renderTarget.getContext("2d");

    renderTarget.width  = 26;
    renderTarget.height = 6;

    document.body.appendChild(renderTarget);
    renderTarget.setAttribute("style", "position: fixed; top: 0; left: 0; z-index: 9999;");

    window.setInterval(function () {
        renderTargetCtx.drawImage(canvas, 0, 0, 26, 6);

        var data = renderTargetCtx.getImageData(0, 0, 26, 6);

        socket.send(JSON.stringify(Array.prototype.slice.call(data.data)));
    }, 1000/24);
}