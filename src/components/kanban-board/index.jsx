import React, { useState } from "react";
import "./index.css";

export const KanbanBoard = () => {
  const stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([
    { name: '1', stage: 0 },
    { name: '2', stage: 0 },
  ]);

  let stagesTasks = [];
  for (let i = 0; i < stagesNames.length; ++i) {
    stagesTasks.push([]);
  };
  for (let task of tasks) {
    const stageId = task.stage;
    stagesTasks[stageId].push(task);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmitButton = () => {
    if (inputValue !== '') {
      setTasks([...tasks, { name: inputValue, stage: 0 }]);
      setInputValue('');
    };
  };

  const handleMoveLeftTask = (e, task) => {
    const tasksFiltered = tasks.filter(item => item.name !== task.name);
    setTasks([...tasksFiltered, { name: task.name, stage: task.stage - 1 }])
  };

  const handleMoveRightTask = (e, task) => {
    const tasksFiltered = tasks.filter(item => item.name !== task.name);
    setTasks([...tasksFiltered, { name: task.name, stage: task.stage + 1 }])
  };

  const handleDeleteTask = (e, task) => {
    const tasksFiltered = tasks.filter(item => item.name !== task.name);
    setTasks(tasksFiltered);
  }

  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <section className="mt-50 layout-row align-items-center justify-content-center">
        <input
          id="create-task-input"
          type="text"
          className="large"
          placeholder="New task name"
          data-testid="create-task-input"
          onChange={handleInputChange}
          value={inputValue}
        />
        <button type="submit" className="ml-30" data-testid="create-task-button" onClick={handleSubmitButton}>Create task</button>
      </section>

      <div className="mt-50 layout-row">
        {stagesTasks.map((tasks, i) => {
          return (
            <div className="card outlined ml-20 mt-0" key={`${i}`}>
              <div className="card-text">
                <h4>{stagesNames[i]}</h4>
                <ul className="styled mt-50" data-testid={`stage-${i}`}>
                  {tasks.map((task, index) => {
                    return <li className="slide-up-fade-in" key={`${i}${index}`}>
                      <div className="li-content layout-row justify-content-between align-items-center">
                        <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                        <div className="icons">
                          <button
                            className="icon-only x-small mx-2"
                            data-testid={`${task.name.split(' ').join('-')}-back`}
                            onClick={(e) => handleMoveLeftTask(e, task)}
                            disabled={task.stage === 0}
                            >
                            <i className="material-icons">arrow_back</i>
                          </button>
                          <button
                            className="icon-only x-small mx-2"
                            data-testid={`${task.name.split(' ').join('-')}-forward`}
                            onClick={(e) => handleMoveRightTask(e, task)}
                            disabled={task.stage === 3}
                          >
                            <i className="material-icons">arrow_forward</i>
                          </button>
                          <button
                            className="icon-only danger x-small mx-2"
                            data-testid={`${task.name.split(' ').join('-')}-delete`}
                            onClick={(e) => handleDeleteTask(e, task)}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                        </div>
                      </div>
                    </li>
                  })}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}