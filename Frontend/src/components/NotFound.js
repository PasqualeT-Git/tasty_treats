// TODO: Create a NotFOund component for a friendly UX.

import React from "react";

export const NotFound = () => {
  return (
    <div className="container notfound">
      <img id="image_notfound" src={process.env.PUBLIC_URL + '/not_found.svg'} alt="" />
    </div>
  )
}