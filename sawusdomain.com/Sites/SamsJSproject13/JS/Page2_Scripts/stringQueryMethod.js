function stringQueryMethod(name) {


    const urlParams = new URLSearchParams(window.location.search);

    return urlParams.get(name);

}