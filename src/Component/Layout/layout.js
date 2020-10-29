import React from 'react';
import Auxilary from '../../hoc/auxilary'
const layout = (props) => (
    <Auxilary>
        
        <main>
            {props.children}
        </main>
</Auxilary>
)

export default layout;