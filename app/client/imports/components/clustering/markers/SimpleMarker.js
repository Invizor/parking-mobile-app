import React from 'react';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
// import mapPropsOnChange from 'recompose/mapPropsOnChange';
import { Motion } from 'react-motion';
import { clusterMarkerHOC } from './ClusterMarker.js';
//import simpleMarkerStyles from './SimpleMarker.sass';

export const simpleMarker = ({
  styles,
  defaultMotionStyle
}) => (
  <Motion
    defaultStyle={defaultMotionStyle}
  >
    {
      ({ scale }) => (
        <div
          className={styles.marker}
          style={{
            transform: `translate3D(0,0,0) scale(${scale}, ${scale})`,
          }}
        >
        </div>
      )
    }
  </Motion>
);

export const simpleMarkerHOC = compose(
  defaultProps({
    //styles: simpleMarkerStyles,
    initialScale: 0.3,
    defaultScale: 0.6
  }),
  // resuse HOC
  clusterMarkerHOC
);

export default simpleMarkerHOC(simpleMarker);