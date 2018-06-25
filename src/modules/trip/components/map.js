import React from 'react'
import styled from 'styled-components'
import mapboxgl from 'mapbox-gl'


const Section = styled.div`
    height: 285px;
    background: #f8f9fa;
    outline: 0;
    overflow: hidden;  
`

const geojson = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.032, 38.913]
      },
      properties: {
        title: 'Mapbox',
        description: 'Washington, D.C.'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: 'Mapbox',
        description: 'San Francisco, California'
      }
    }]
  }

class Map extends React.Component {
    constructor (props) {
        super(props)
        this.mapContainer = React.createRef()
    }

    componentDidMount() {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
        // create map
        const map = new mapboxgl.Map({
            container: 'mapbox.map',
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [-70.976,42.384],
            zoom: 11,
        })
        // add markers to map
        geojson.features.map(feature => {
            const marker = document.createElement('div')
            marker.style.background = 'red'
            marker.style.width = '11px'
            marker.style.height = '11px'
            new mapboxgl.Marker(marker)
                .setLngLat(feature.geometry.coordinates)
                .addTo(map)
        })
    }

    render () {
        return <Section id='mapbox.map' />
    }
}

export default Map
