import React from 'react'
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'
import { gsap } from 'gsap'





export default class Column extends React.Component {

  changeColor = (isDraggingOver) => {
    if (isDraggingOver && this.props.column.title === "To do"){
      return {backgroundColor: "#E8EBED", border: "1px dashed #B1BEC3"}
    }else if(isDraggingOver && this.props.column.title === "Completed"){
      return {backgroundColor: "#E9EDE8", border: "1px dashed #BFC9B9"}
    }else if (isDraggingOver && this.props.column.title === "Trash"){
      return {backgroundColor: "#EDE8E8", border: "1px dashed #D2C8C8"}
    }
  }

  componentDidMount(){
    gsap.set(".container-3", {y: 150});
    gsap.to(".container-3", {y: 0, duration: 0.7, stagger:0.1, onComplete: function () {
      gsap.set(this.targets(), { clearProps: "all" });
    }})

    gsap.set(".column-header", {scale: 0});
    gsap.to(".column-header", {scale: 1, duration: 0.4})
  }
  
  render() {
 
    return (
      <div className="container-3"  >
        <div className="column-header"><div className="column-title">{this.props.column.title}</div><span className="column-length">{this.props.column.taskIds.length}</span></div>
        <Droppable droppableId={this.props.column.id} type="TASK">
          {(provided, snapshot) => (
            <div className ="task-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
              isdraggingover={snapshot.isDraggingOver.toString()}
              style={this.changeColor(snapshot.isDraggingOver)}
              >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} column={this.props.column} deleteHandler={this.props.deleteHandler}/>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    )
  }
}