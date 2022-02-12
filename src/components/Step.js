import React from 'react';

function Step(props){
 return(
     <li onClick={() => props.onClick(props.step)}>
         {props.text}
     </li>
 )
}
export default Step;