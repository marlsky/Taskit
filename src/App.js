
import Nav from './Nav'
import Search from './Search'
import Item from './Item'
import { useEffect } from "react"
import gsap from 'gsap'

const App = ()=> {

  useEffect(() => {
    gsap.set("h3", {y: -200, opacity: 0});
    gsap.to("h3", {opacity: 1, y: 0, duration: 0.7})
   
}, []) 
  return (
    <div className="App">
      <div className="container">
        <Nav/>
        <div className="content">
          <Search/>
          <div className="box">
            <h3>Tasks</h3>
            
          </div>
          <Item/>
        </div>
        
      </div>
    </div>
  );
}

export default App;
