import React, { useState } from 'react'

import { FadeLoader } from 'react-spinners'

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
export default function Loadding() {
 
  return <>
     <div className="sweet-loading py-10">
      
      <FadeLoader
        color={'#0aad0a'}
        
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  
  </>
}