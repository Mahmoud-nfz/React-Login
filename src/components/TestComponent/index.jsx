import React from "react";

function TestComponent () {
    const users = ["user1", "user2", "user3"];
    const final = [];
    for (let user of users) {
      final.push(<li key={user}>{user}</li>);
    }
    return (
      <div className="App">
        <ul>{final}</ul>
      </div>
    );
}

export default TestComponent;