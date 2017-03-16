import React, {Component} from 'react';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withPropsOnChange from 'recompose/withPropsOnChange';
import GoogleMapReact from 'google-map-react';
import ClusterMarker from '../clustering/markers/ClusterMarker';
import SimpleMarker from '../clustering/markers/SimpleMarker';
import supercluster from 'points-cluster';
import { susolvkaCoords, markersData } from '../clustering/data/fakeData';



export default class GMapTest extends Component {

  render() {
    return (
    <GoogleMapReact />
    );
  }
}