import React from "react";
import Card from "./Card";

function App() {
    return (
        <div>
            {/* 1. Only title */}
            <Card title="hi" />
            {/* 2. Only text */}
            <Card text="how are you?" />
            {/* 3. Both title and text */}
            <Card title="hi" text="how are you?" />
        </div>
    );
}

export default App;