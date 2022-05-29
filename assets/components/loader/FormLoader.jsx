import React from "react"
import ContentLoader from "react-content-loader"

const FormLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={900}
    height={300}
    viewBox="0 0 400 150"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="3" y="19" rx="0" ry="0" width="371" height="18" /> 
    <rect x="3" y="49" rx="0" ry="0" width="371" height="16" /> 
    <rect x="6" y="79" rx="0" ry="0" width="371" height="15" /> 
    <rect x="8" y="106" rx="0" ry="0" width="84" height="20" />
  </ContentLoader>
)

export default FormLoader

