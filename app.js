const { Component, mount, xml, useState } = owl;

class Root extends Component {
    constructor() {
        super(...arguments);
        this.state = useState({
            text: '',
            tasks: [],
            taskChecked: {}
        });
    }

    addTask = (ev) => {
        this.state.text = ev.target.value;
        if (ev.key === 'Enter') {
            if (this.state.text.trim()) {
                this.state.tasks.push(this.state.text);
                this.state.text = '';
            }
        }
    }

    deleteTask = (index) => {
        this.state.tasks.splice(index, 1);
    }

    updateTask = (index) => {
        const newTask = prompt("Update your task:", this.state.tasks[index]);
        if (newTask !== null && newTask.trim()) {
            this.state.tasks[index] = newTask.trim();
        }
    }
    toggleTask = (index) => {
        const isChecked = this.state.taskChecked[index] || false;
        console.log(this.state.taskChecked[index])
        console.log(isChecked)
        this.state.taskChecked[index] = !isChecked;
    }



    static template = xml`
    <div class="card shadow-sm">
        <div class="card-header bg-primary text-white text-center">
            <h4>Todo List</h4>
        </div>
        <div class="card-body">
            <input 
                placeholder="Enter a new task" 
                t-att-value="state.text"
                t-on-keyup="addTask"
                class="form-control mb-3"
            />
            <ul class="list-group">
                <li t-foreach="state.tasks" t-as="task" t-key="task_index" class="list-group-item d-flex justify-content-between align-items-center">
                    <div class="form-check">
                            <input 
                                type="checkbox" 
                                class="form-check-input"
                                t-att-id="'checkbox_' + task_index"
                                t-att-checked="state.taskChecked[task_index]"
                                t-on-change="() => toggleTask(task_index)"
                            />
                            <label class="form-check-label" t-att-for="'checkbox_' + task_index">
                               <span t-attf-class="{{ state.taskChecked[task_index] ? 'text-muted text-decoration-line-through' : '' }}">
                                    <t t-esc="task"/>
                                </span>
                            </label>
                        </div>
                            
                    <div>
                        <button 
                            t-on-click="() => updateTask(task_index)"
                            class="btn btn-warning btn-sm me-2"
                        >
                            <i class="bi bi-pencil"></i> Edit
                        </button>
                        <button 
                            t-on-click="() => deleteTask(task_index)"
                            class="btn btn-danger btn-sm"
                        >
                            <i class="bi bi-trash"></i> Delete
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
`;
}

mount(Root, document.getElementById("root"))
