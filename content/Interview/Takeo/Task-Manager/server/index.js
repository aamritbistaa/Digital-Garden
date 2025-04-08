const express = require("express");
const app = express();
var cors = require("cors");
var bodyParser = require("body-parser");

const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let data = [{ id: 2123, title: "Do task no.1", priority: 3, complete: false }];
//getAllItem
app.get("/", (req, res) => {
  return res.send(data);
});

//addItem
app.post("/", (req, res) => {
  try {
    const { title } = req.body;
    let id = Math.floor(Date.now() + Math.random() * 100);
    data.push({ id: id, title: title, priority: 3, complete: false });
    res.json({ message: "Data added", data });
  } catch (error) {
    res.json({ message: "Error occured", error: error });
  }
});

//deleteItem
app.delete("/", (req, res) => {
  try {
    const { id } = req.body;
    if (data.length < 1) {
      return res.send({ message: "No Item to deete" });
    }
    data = data.filter((item) => item.id !== id);

    return res.send("Item deleted");
  } catch (error) {
    res.json({ message: "Error occured", error: error });
  }
});

//IncreasePriority
app.post("/incpriority", (req, res) => {
  try {
    const { id } = req.body;
    let Item = data.find((item) => item.id === id);
    if (Item == null) {
      return res.send({ message: "Cant Find the Item" });
    }
    if (Item.priority <= 4) {
      Item.priority += 1;
      return res.send({ message: "priority increased" });
    } else {
      return res.send({ message: "priority is already the highest" });
    }
  } catch (error) {
    res.json({ message: "Error occured", error: error });
  }
});
//DecreasePriority
app.post("/decpriority", (req, res) => {
  try {
    const { id } = req.body;
    let Item = data.find((item) => item.id === id);
    if (Item == null) {
      return res.send({ message: "Cant Find the Item" });
    }
    if (Item.priority >= 1) {
      Item.priority -= 1;
      return res.send({ message: "priority decreased " });
    } else {
      return res.send({ message: "priority is already the lowest" });
    }
  } catch (error) {
    res.json({ message: "Error occured", error: error });
  }
});
//CompleteTask
app.post("/complete", (req, res) => {
  try {
    const { id } = req.body;
    let Item = data.find((item) => item.id === id);
    if (Item == null) {
      return res.send({ message: "Cant Find the Item" });
    }
    Item.complete = true;
    return res.send({ message: "Item Completed " });
  } catch (error) {
    res.json({ message: "Error occured", error: error });
  }
});

app.listen(PORT, () => console.log(`App Running on port ${PORT}!`));
