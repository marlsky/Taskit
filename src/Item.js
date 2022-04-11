import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './Column'
import AddTask from './AddTask'
import gsap from 'gsap'



class Item extends React.Component {
  state = {
    count: 4,
    newTask: '',
    tasks: {
      'task-1': { id: 'task-1', title: 'Take out', content: 'Take out the garbage' },
      'task-2': { id: 'task-2',title: 'Watch', content: 'Watch my favorite show' },
      'task-3': { id: 'task-3',title: 'Charge', content: 'Charge my phone' },
      'task-4': { id: 'task-4',title: 'Cook', content: 'Cook dinner' }
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To do',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
      },
      'column-2': {
        id: 'column-2',
        title: 'Completed',
        taskIds: []
      },
      'column-3': {
        id: 'column-3',
        title: 'Trash',
        taskIds: []
      }
    },
    open: false ,
    
  
    columnOrder: ['column-1', 'column-2', 'column-3']
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      }

      this.setState(newState)
      return
    }

   
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }
    this.setState(newState)
  }

  hideModal = () => {
    this.setState({ open: false });
  }
  showModal = () => {
    this.setState({ open: true });
  }

  addTask = (task) =>{
    this.setState(prevState => {
      const newCount = prevState.count + 1;
      const newId = `task-${newCount}`;
      return {
        count: newCount,
        newTask: '',
        tasks: {
          ...prevState.tasks,
          [newId]: { id: newId,title: task.title, content: task.content },
        },
   
        columns: {
          ...prevState.columns,
          'column-1': {
          ...prevState.columns['column-1'],
          taskIds: [...prevState.columns['column-1'].taskIds, newId],
          },
        },
      }
    })
  }

  deleteHandler = (taskId, e) => {
        
    const id = e.target.closest(".container-2")
    id.classList.add("anime")
    const columnId = 'column-3';
    const column = this.state.columns[columnId];
    const columnTaskIds = Array.from(column.taskIds);

    columnTaskIds.splice(columnTaskIds.indexOf(taskId), 1);
    const newcolumn = {
      ...column,
      taskIds: columnTaskIds,
    };
    let newState = null;
    newState = {
        ...this.state,
      columns: {
      ...this.state.columns,
        [newcolumn.id]: newcolumn
      }
    };
    setTimeout( () => {
      this.setState(newState);
    }, 580)
  }

  componentDidMount(){
    gsap.set(".open-modal", {x: 150});
   gsap.to(".open-modal", {x: 0, duration: 0.7})

  }
  render() {
    
    return (
      <div className="container-button">
      <button className="open-modal" onClick={() => this.showModal()}>+</button>
      { this.state.open && <AddTask  hideModal={this.hideModal} addTask={this.addTask}/>}
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="tasks" >
          {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId]
            const tasks = column.taskIds.map(
              taskId => this.state.tasks[taskId]
            )
            return (
              <Column key={column.id} column={column} tasks={tasks} deleteHandler={this.deleteHandler}/>
            )
          })}
        </div>
      </DragDropContext>
      </div>
    )
  }
}
export default Item