if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };
        document.getElementById("latitude").value = pos.lat;
        document.getElementById("longitude").value = pos.lng;
    });
}
