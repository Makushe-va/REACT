import React, { useState, useEffect } from "react";
import uniqueId from "lodash/uniqueId";
import Item from "./Item.jsx";

const STORAGE_KEY = "todos";

const TodoBox = () => {
    const [value, setValue] = useState("");

    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmed = value.trim();
        if (!trimmed) return;

        const newTask = {
            id: uniqueId("task_"),
            text: trimmed,
        };

        setTasks((prev) => [newTask, ...prev]);
        setValue("");
    };

    const handleRemove = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    return (
        <div>
            <div className="mb-3">
                <form className="d-flex" onSubmit={handleSubmit}>
                    <div className="me-3">
                        <input
                            type="text"
                            required
                            className="form-control"
                            placeholder="I am going..."
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        add
                    </button>
                </form>
            </div>

            {tasks.map((task) => (
                <Item
                    key={task.id}
                    task={task}
                    onRemove={() => handleRemove(task.id)}
                />
            ))}
        </div>
    );
};

export default TodoBox;
