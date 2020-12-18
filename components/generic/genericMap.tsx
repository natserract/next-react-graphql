import React from 'react'
import { ComponentTypes } from './genericMap.model';

const GenericMap: ComponentTypes = ({ items, render }) => (
    <React.Fragment>{ items.map(render)}</React.Fragment>
);

export default GenericMap;