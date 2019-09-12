<template>
	<div style="height: 350px;">
		<input id="pac-input" class="controls form-control" type="text" placeholder="Search Box" ref="searchbox">
		<div class="map-container"></div>
	</div>
</template>

<style>
	.controls {
		margin-top: 13px;
		max-width: 400px;
	}
</style>

<script>
  export default {
    props: {
      lnglat: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        lat: null,
        lng: null,
      }
    },
    mounted() {
      let data = [];
      if (this.lnglat)
        data = this.lnglat.split(',');

      if (data.length > 0) {
        this.lng = Number(data[1]);
        this.lat = Number(data[0]);
      } else {
        this.lat = 27.686884587085057;
        this.lng = 85.34427752591353;
      }

      // Set coordinates
      let myLatlng = new google.maps.LatLng(this.lng, this.lat);
      // Options
      let mapOptions = {
        zoom: 16,
        center: myLatlng
      };
      // Apply options
      let map = new google.maps.Map(this.$el, mapOptions);
      // Add marker
      let marker = new google.maps.Marker({
        position: myLatlng,
        map: map
      });
      marker.setMap(map);
      let self = this;
      google.maps.event.addListener(map, "center_changed", function () {
        let lat = map.getCenter().lat();
        let lon = map.getCenter().lng();
        let newLatLng = {lat: lat, lng: lon};
        marker.setPosition(newLatLng);
        self.$emit('locationupdated', newLatLng)
      });

      // Create the search box and link it to the UI element.
      let input = this.$refs.searchbox;
      let searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
      });

      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    }
  }
</script>
