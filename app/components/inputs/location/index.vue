<template lang="pug">
  //-v-select(
    :items="['Enseirb-Matmeca', 'Kedge', 'Chez papa']"
    :value="value"
    @input="$emit('input', $event)"
    box
    :label="label"
    hint="Prochainement : carte intéractive"
    persistent-hint)
  v-flex
    div#mapid(style="height: 500px; z-index: 1")
</template>

<script>
import 'leaflet/dist/leaflet.css'
import Leaflet from 'leaflet/dist/leaflet.js'

export default {
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  mounted () {
    var map = Leaflet.map('mapid', {
      attributionControl: false
    }).setView([51.505, -0.09], 13)

    Leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoidmtsaG8iLCJhIjoiY2p0aXp5bDVoMml3MTN6dGZxbmh3bzBpdSJ9.6jvnkcoOrRDj1zPFYAaaFA'
    }).addTo(map)
    map.locate({setView: true, maxZoom: 16})
    map.on('locationfound', e => {
      var radius = e.accuracy * .4
      Leaflet.marker(e.latlng).addTo(map)
          .bindPopup(`You're here. ${radius} meters approximatively.`).openPopup()
      Leaflet.circle(e.latlng, radius).addTo(map)
    })
    map.on('locationerror', ({ message }) => alert(message))

    var littleton = Leaflet.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
    denver    = Leaflet.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
    aurora    = Leaflet.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
    golden    = Leaflet.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');
    var cities = L.layerGroup([littleton, denver, aurora, golden]);

  }
}
</script>

