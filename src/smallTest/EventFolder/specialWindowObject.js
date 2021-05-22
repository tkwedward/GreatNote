export function initalizeWindowObject() {
    let _window = window;
    _window.selectedObjectArray = [];
    _window.clearSelectedObjectArray = function () {
        _window.selectedObjectArray = [];
    };
    _window.addSelectedObjectToWindow = function (item) {
        _window.selectedObjectArray.push(item);
    };
    _window.trackCurrentObjectTheMouseIsInside = function () {
        let _window = window;
        _window.previousMouseInObject = null;
        _window.addEventListener("mousemove", function (e) {
            _window.currentMouseInObject = e.target;
            if (_window.previousMouseInObject && _window.previousMouseInObject != _window.currentMouseInObject) {
                var mouseuptEvent = new CustomEvent("mouseup2");
                _window.previousMouseInObject.dispatchEvent(mouseuptEvent);
            }
            _window.previousMouseInObject = e.target;
        });
    };
}
