import { useEffect } from "react"
import gsap from 'gsap'


const Nav = () =>{

    useEffect(() => {
        gsap.set(".logo", {y: -200, opacity: 0});
        gsap.to(".logo", {opacity: 1, y: 0, duration: 0.9})
        gsap.set(".navigation a", {x: -200, opacity: 0});
        gsap.to(".navigation a", {opacity: 1, x: 0, duration: 0.7})
        gsap.set("h5", {x: -200, opacity: 0});
        gsap.to("h5", {opacity: 1, x: 0, duration: 0.9, stagger: 0.1})
    }) 
    
    

  const moveMarker = (e) => {
        const marker = document.querySelector(".marker")
        marker.style.top = e.target.offsetTop + "px"
        marker.style.height = e.target.offsetHeight + "px"
    }

    return(
        <div className="sidebar">
            <a href=""><div className="logo">.Taskit</div></a>
            <div className="navigation">
                <div className="marker"></div>
                <a href="" onMouseEnter={moveMarker} className="active1"><span className="tasks-nav active2"></span><span className="text active">Tasks</span></a>
                <h5 onMouseEnter={moveMarker}><span className="todo"></span><span className="text" title="Todo">Todo</span></h5>
                <h5 onMouseEnter={moveMarker}><span className="completed"></span><span className="text" title="Completed">Completed</span></h5>
                <h5 onMouseEnter={moveMarker}><span className="trash"></span><span className="text" title="Trash">Trash</span></h5>
            </div>
        </div>
    )
}

export default Nav