import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");

  async function getAllItem() {
    const res = await fetch("http://localhost:5000/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setList(data);
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (title.trim() !== "") {
      await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title }),
      });
      setTitle("");
      getAllItem();
    }
  }

  async function handleDelete(id) {
    await fetch("http://localhost:5000/", {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    getAllItem();
  }
  async function incPriority(id) {
    await fetch("http://localhost:5000/incpriority/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    getAllItem();
  }
  async function decPriority(id) {
    await fetch("http://localhost:5000/decpriority/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    getAllItem();
  }
  async function handleComplete(id) {
    await fetch("http://localhost:5000/complete/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    getAllItem();
  }
  useEffect(() => {
    getAllItem();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <form
          onSubmit={handleAdd}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <h3>Add record</h3>
          <div
            style={{
              border: "3px solid black",
              borderRadius: "25px",
              width: "300px",
              justifyContent: "space-between",
              display: "flex",
              overflow: "hidden",
            }}>
            <input
              placeholder="Add an item"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              name="title"
              style={{
                padding: "10px 20px",
                border: "none",
                width: "100%",
              }}
            />
            <button
              type="submit"
              style={{
                border: "none",
                backgroundColor: "blue",
                color: "white",
                fontSize: 32,
                cursor: "pointer",
                padding: 5,
              }}>
              +
            </button>
          </div>
        </form>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 30,
          }}>
          <h3>Display data</h3>
          <div style={{ minWidth: "600px" }}>
            {list &&
              list
                .sort((first, second) => {
                  return second.priority - first.priority;
                })
                .map((val) => (
                  <div
                    key={val.id}
                    style={{
                      display: "flex",
                      border: "2px solid gray",
                      margin: 30,
                      padding: 10,
                      borderRadius: 15,
                      alignItems: "center",
                      justifyContent: "space-around",
                      backgroundColor: val.complete ? "blue" : "#ffffff",
                      color: val.complete ? "white" : "black",
                    }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 5,
                      }}>
                      <button
                        onClick={() => incPriority(val.id)}
                        disabled={val.priority == 5}
                        style={{ cursor: "pointer" }}>
                        IncreasePriority
                      </button>
                      <span>{val.priority}</span>
                      <button
                        onClick={() => decPriority(val.id)}
                        disabled={val.priority == 0}
                        style={{ cursor: "pointer" }}>
                        DecreasePriority
                      </button>
                    </div>

                    <h4>{val.title}</h4>
                    <div style={{ display: "flex", gap: 10 }}>
                      {val.complete ? (
                        <span>Completed</span>
                      ) : (
                        <button
                          onClick={() => handleComplete(val.id)}
                          style={{ cursor: "pointer" }}>
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(val.id)}
                        style={{ cursor: "pointer" }}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
