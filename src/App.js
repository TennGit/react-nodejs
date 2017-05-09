import React, { Component } from 'react';
class App extends Component {
    constructor() {
        super();
        this.state = { lists: [] };
    }

    handleDelete(listId){
        console.log(listId);
        fetch(`/api/deleteList?listId=${listId}`, {
            method: 'delete'
        }).then(result=>result.json())
            .then(result=> {
                // console.log(result.lists);
                this.setState({lists: result.lists});
            });
    }

    componentDidMount() {
        fetch(`/api/getAllLists`)
            .then(result=>result.json())
            .then(result=> {
                // console.log(result.lists);
                this.setState({lists: result.lists});
            });
    }
    render() {
        return(
            <div>
                <div>All Lists:</div>
                <div className="TableContent">
                    <table>
                        <tbody>
                            {this.state.lists.map(list=>
                                <tr key={list.listId}>
                                    <td>
                                        <li >{list.listName}</li>
                                    </td>
                                    <td>
                                        {/*<a onClick = {this.handleDelete()} href={`http://localhost:3010/api/deleteList?listId=${list.listId}`}>Delete list </a>*/}
                                        <button onClick={() => this.handleDelete(list.listId)}>Delete</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default App;


/*
class App extends Component {
    constructor() {
        super();
        this.state = { listId: 0 };
    }

    componentDidMount() {
        fetch(`http://localhost:3020/api/1`)
            .then(result=>result.json())
            .then(items=> {
                // console.log(items);
                this.setState({listId: items.listId});
            });
    }
    render() {
        return(
            <div>
                <div>listId:</div>
                <div className="listId">
                    <ul>
                        <li>{this.state.listId}</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;
*/
