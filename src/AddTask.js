import React from 'react'

class AddTask extends React.Component {
    state= {
        title: "",
        content: ""
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.props.addTask(this.state)
        document.querySelector('form').reset()
        this.props.hideModal()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    deleteTask = (id) =>{
        let ninjas = this.state.ninjas.filter(ninja =>{
          return ninja.id !== id
        })
        this.setState({
          ninjas: ninjas
        })
      }
    render(){
        
    return(
        <div className="modal-background">
            <div id="background"></div>
            <div className="modal-container">
                <div className="header-title">Add new task</div>
                <button className="close" onClick={() => this.props.hideModal()}>x</button>
                <div className="body">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="title" onChange={this.handleChange} placeholder="Title" required autoComplete='none'></input>
                    <input type="text" id="content" onChange={this.handleChange} placeholder="Task" required autoComplete='none'></input>
                    <button className="submit">Add Task</button>
                </form>
                </div>
                
            </div>
            
        </div>
    )
}
}
export default AddTask