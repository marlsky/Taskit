import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import gsap from 'gsap'

export default class Task extends React.Component {

  

 
  render() {
  
    return (
      <Draggable
        draggableId={this.props.task.id}
        index={this.props.index}
 
      >
        {(provided, snapshot) => (
          <div className="container-2" 
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isdragging={snapshot.isDragging.toString()}
          >
            <div className="task-trash-x"><div className="task-title" style={{color: this.props.column.title == "Trash" ? "#A65959" : " "}}>{this.props.task.title}</div>{this.props.column.title == "Trash" ? <span data-id={this.props.task.id} onClick={(e) => this.props.deleteHandler(this.props.task.id, e)}>x</span> : null}</div>
            <div className="task-content">{this.props.task.content}</div>
          </div>
        )}
      </Draggable>
    )
  }
}