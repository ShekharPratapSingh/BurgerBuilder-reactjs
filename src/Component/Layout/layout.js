import React from 'react';
import Auxilary from '../../hoc/auxilary';
import classes from './layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
const layout = (props) => (
    <Auxilary>
        <Toolbar/>
        <main className={classes.Content}>
            {props.children}
        </main>
</Auxilary>
)

export default layout;