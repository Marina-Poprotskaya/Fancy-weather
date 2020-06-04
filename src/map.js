import { mapToken } from './constants';


function showMap(longitude, latitude) {
    mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 11,
        pitch: 45,
        bearing: 17.6,
    });

    new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);

    const nav = new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: true,
    });

    map.addControl(
        nav, 'bottom-right',
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true,
            },
            trackUserLocation: true,
        }),
    );
}


export { showMap };
