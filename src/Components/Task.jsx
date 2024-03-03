import axios from 'axios';
import React, { Component } from 'react';

export default class Apitask extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    title: "Lab 2",
    tasks: [],
    min: 0,
    max: 7
  };
  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/todos")
      .then(res => {
        console.log(res);
        this.setState({ tasks: res.data });
      })
      .catch(res => console.log(res));
  }
  nextPost = () => {
    const { max, tasks } = this.state;
    if (max < tasks.length) {
      this.setState({ min: this.state.min + 7 });
      this.setState({ max: this.state.max + 7 });
    } else {
      this.setState({
        min: 0,
        max: 7,
      });
    }
  };
  prevPost = () => {
    const { min } = this.state;
    let lengthOfTask = this.state.tasks.length;

    if (min > 0) {
      this.setState({ min: this.state.min - 7 });
      this.setState({ max: this.state.max - 7 });
    } else {
      this.setState({
        min: Math.max(0, lengthOfTask - 7),
        max: lengthOfTask
      });
    }
  };
  render() {
    return (
      <>
        <h1>Api Task</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tasks.map((task) => {
              if (task.id > this.state.min && task.id <= this.state.max) {
                return (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>
                      {task.completed ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="currentColor"
                          className="bi bi-check2-all text-success"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"/>
                          <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="currentColor"
                          className="bi bi-x-lg text-danger"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                      )}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        <div className="btns">
          <button className="btn btn-danger" onClick={this.prevPost} type="button">
            Previous
          </button>
          <button className="btn btn-danger ms-3" onClick={this.nextPost} type="button">
            Next
          </button>
        </div>
      </>
    );
  }
}
