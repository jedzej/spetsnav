export var calcSeparation = function (sourceRect, destRect) {
    var separation = {
        right: destRect.left - sourceRect.right,
        left: sourceRect.left - destRect.right,
        top: sourceRect.top - destRect.bottom,
        bottom: destRect.top - sourceRect.bottom,
        horizontal: 0,
        vertical: 0,
    };
    separation.horizontal =
        separation.right > 0
            ? separation.right
            : separation.left > 0
                ? separation.left
                : 0;
    separation.vertical =
        separation.top > 0
            ? separation.top
            : separation.bottom > 0
                ? separation.bottom
                : 0;
    return separation;
};
