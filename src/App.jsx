import React, { Component } from "react";
import Card from "./Card";

class App extends Component {
    render() {
        return (
            <div style={{ width: "400px", margin: "30px auto" }}>
                <h3 style={{ textAlign: "center" }}>Definitions (Card V2)</h3>

                {/* 1️⃣ тільки title */}
                <Card title="Coffee" />

                {/* 2️⃣ тільки text */}
                <Card text="Black hot drink" />

                {/* 3️⃣ обидва пропси */}
                <Card title="Milk" text="White cold drink" />
            </div>
        );
    }
}

export default App;