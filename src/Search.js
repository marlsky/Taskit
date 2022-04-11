import { useEffect } from "react"
import gsap from 'gsap'

const Search = () =>{
    const handleFocus = () =>{
        const label = document.querySelector('.search label')
        label.classList.add("focused")
       
      }
      const handleBlur = () =>{
        const label = document.querySelector('.search label')
        label.classList.remove("focused")
      
      }

      useEffect(() => {
        gsap.set(".search", {y: -200, opacity: 0});
        gsap.to(".search", {opacity: 1, y: 0, duration: 1.5})
       
    }) 
    return(
        <div className="search">
            <label htmlFor="search">Search</label>
            <input type="text" id="search"  onClick={handleFocus} onBlur={handleBlur}/>
          </div>
    )
}
export default Search