function deepObjCopy(originalObj) {
    var newObj = (originalObj instanceof Array) ? [] : {};
    for (i in originalObj) {
        if (i == "clone") continue;
        if (originalObj[i] && typeof (originalObj[i]) == "object") {
            newObj[i] = originalObj[i].clone();
        }
        else {
            newObj[i] = originalObj[i];
        }
    }
    return newObj;
}