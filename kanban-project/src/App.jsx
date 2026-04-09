import { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";

function Card({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;
  return (
    <li ref={setNodeRef} style={style}>
      <div
        {...attributes}
        {...listeners}
        style={{ cursor: "grab", touchAction: "none" }}
      >
        {" "}
        <button className="drag"></button>{" "}
      </div>
      {children}
    </li>
  );
}

function Column({ id, children }) {
  const { setNodeRef } = useDroppable({ id });
  return <ul ref={setNodeRef}>{children}</ul>;
}

const App = () => {
  const [form, setForm] = useState({
    name: "",
    title: "",
    company: "",
    dealValue: "",
    priority: "",
    dueDate: "",
    assignee: "",
  });
  const [arr, setArr] = useState([]);
  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState("");
  const filtered =
    search === ""
      ? arr
      : arr.filter((item) =>
          item.priority.toLowerCase().includes(search.toLowerCase()),
        );

  useEffect(() => {
    const save = localStorage.getItem("kanban");
    if (save) {
      const dat = JSON.parse(save);
      if (dat.form) setForm(dat.form);
      if (dat.arr) setArr(dat.arr);
    }
    setLoad(true);
  }, []);

  useEffect(() => {
    if (!load) return;
    localStorage.setItem("kanban", JSON.stringify({ form, arr }));
  }, [form, arr, load]);

  const handle = (event) => {
    const { active, over } = event;
    if (!over) return;
    setArr(
      arr.map((item) =>
        item.id === active.id ? { ...item, column: over.id } : item,
      ),
    );
  };

  const validation =
    form.name.length >= 2 &&
    form.title.length >= 2 &&
    form.dealValue !== "" &&
    form.priority !== "" &&
    form.dueDate !== Number;

  return (
    <DndContext onDragEnd={handle}>
      <div>
        <p>Total leads: {arr.length === 0 ? 0 : arr.length}</p>
        <p>
          Total pipe line:{" "}
          {arr.reduce((item, cur) => item + Number(cur.dealValue), 0)}
        </p>
        <p>
          Win rate:{" "}
          {arr.length === 0
            ? 0
            : Number(
                (arr.filter((item) => item.column === "closed").length /
                  arr.length) *
                  100,
              )}
        </p>

        {modal && (
          <div className="modal">
            <div className="inside">
              <p>name</p>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />

              <p>Title</p>
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
              />

              <p>Company</p>
              <input
                type="text"
                value={form.company}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, company: e.target.value }))
                }
              />

              <p>dealValue</p>
              <input
                type="number"
                value={form.dealValue}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, dealValue: e.target.value }))
                }
              />

              <select
                value={form.priority}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, priority: e.target.value }))
                }
              >
                <option value="">Select Priority</option>
                <option value="high">High</option>
                <option value="mid">Mid</option>
                <option value="low">Low</option>
              </select>

              <p>Due Date</p>
              <input
                type="number"
                value={form.dueDate}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, dueDate: e.target.value }))
                }
              />

              <p>Assignee</p>
              <input
                type="text"
                value={form.assignee}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, assignee: e.target.value }))
                }
              />

              <button
                onClick={() => {
                  setArr(
                    arr.map((item) =>
                      item.id === editingId ? { ...item, ...form } : item,
                    ),
                  );
                  setModal(false);
                  setEditingId(null);

                  setForm({
                    name: "",
                    title: "",
                    company: "",
                    dealValue: "",
                    priority: "",
                    dueDate: "",
                    assignee: "",
                  });
                }}
              >
                Submit
              </button>
            </div>
          </div>
        )}
        <p>name</p>
        <input
          type="text"
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
        />

        <p>Title</p>
        <input
          type="text"
          value={form.title}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, title: e.target.value }))
          }
        />

        <p>Company</p>
        <input
          type="text"
          value={form.company}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, company: e.target.value }))
          }
        />

        <p>dealValue</p>
        <input
          type="number"
          value={form.dealValue}
          placeholder="$500"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, dealValue: e.target.value }))
          }
        />

        <p>priority</p>
        <select
          value={form.priority}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, priority: e.target.value }))
          }
        >
          <option value="">Select Priority</option>
          <option value="high">High</option>
          <option value="mid">Mid</option>
          <option value="low">Low</option>
        </select>

        <p>Due Date</p>
        <input
          type="number"
          value={form.dueDate}
          placeholder="7 days"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, dueDate: e.target.value }))
          }
        />

        <p>Assignee</p>
        <input
          type="text"
          value={form.assignee}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, assignee: e.target.value }))
          }
        />

        <button
          disabled={!validation}
          onClick={() => {
            setArr([...arr, { ...form, column: "lists", id: Date.now() }]);
            setForm({
              name: "",
              company: "",
              title: "",
              dealValue: "",
              priority: "",
              dueDate: "",
              assignee: "",
            });
          }}
        >
          Add
        </button>

        <p>search by priority</p>
        <input
          type="text"
          value={search}
          placeholder="eg: high"
          onChange={(e) => setSearch(e.target.value)}
        />

        <p>Leads</p>
        <Column id="lists">
          {filtered
            .filter((item) => item.column === "lists")
            .map((items) => (
              <Card id={items.id} className="items" key={items.id}>
                title: {items.title} <br />
                <br />
                company:{items.company} <br />
                <br />
                deal value: {items.dealValue} <br /> <br /> priority:{" "}
                {items.priority} <br />
                <br /> due date:
                {items.dueDate} <br /> <br /> assignee: {items.assignee} <br />
                <br />
                <button
                  onClick={() => {
                    setArr(
                      arr.map((item) =>
                        item.id === items.id
                          ? { ...item, column: "contact" }
                          : item,
                      ),
                    );
                  }}
                >
                  Move to Contacted
                </button>
                <button
                  onClick={() => {
                    setArr(arr.filter((dlt) => dlt.id !== items.id));
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setEditingId(items.id);
                    setModal(true);
                  }}
                >
                  Edit
                </button>
              </Card>
            ))}
        </Column>

        <p>Contacted</p>
        <Column id="contact" >
          {filtered
            .filter((contacte) => contacte.column === "contact")
            .map((contactMap) => (
              <Card id={contactMap.id} key={contactMap.id}>
                title: {contactMap.title} <br />
                <br /> company:{contactMap.company}
                <br />
                <br /> deal value: {contactMap.dealValue}
                <br />
                <br /> priority: {contactMap.priority}
                <br />
                <br /> due date: {contactMap.dueDate}
                <br />
                <br /> assignee: {contactMap.assignee}
                <button
                  onClick={() =>
                    setArr(
                      arr.map((items) =>
                        items.id === contactMap.id
                          ? { ...items, column: "inprogress" }
                          : items,
                      ),
                    )
                  }
                >
                  Move to In-Progress
                </button>
                <button
                  onClick={() =>
                    setArr(arr.filter((lead) => lead.id !== contactMap.id))
                  }
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setModal(true);
                    setEditingId(contactMap.id);
                  }}
                >
                  Edit
                </button>
              </Card>
            ))}
        </Column>

        <p>In-Progress</p>
        <Column id="inprogress">
          {filtered
            .filter((inpro) => inpro.column === "inprogress")
            .map((inprog) => (
              <Card id={inprog.id} key={inprog.id}>
                title: {inprog.title}
                <br />
                <br /> company:
                {inprog.company}
                <br />
                <br /> deal value: {inprog.dealValue} <br />
                <br />
                priority: {inprog.priority}
                <br />
                <br /> due date: {inprog.dueDate} <br />
                <br />
                assignee: {inprog.assignee}
                <button
                  onClick={() =>
                    setArr(
                      arr.map((items) =>
                        items.id === inprog.id
                          ? { ...items, column: "proposed" }
                          : items,
                      ),
                    )
                  }
                >
                  Move to Proposal sent
                </button>
                <button
                  onClick={() =>
                    setArr(arr.filter((dte) => dte.id !== inprog.id))
                  }
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setModal(true);
                    setEditingId(inprog.id);
                  }}
                >
                  Edit
                </button>
              </Card>
            ))}
        </Column>

        <p>Proposal Sent</p>
        <Column id="proposed">
          {filtered
            .filter((proposeFilter) => proposeFilter.column === "proposed")
            .map((proposal) => (
              <Card id={proposal.id} key={proposal.id}>
                title: {proposal.title}
                <br />
                <br /> company:
                {proposal.company}
                <br />
                <br /> deal value: {proposal.dealValue}
                <br />
                <br /> priority:
                {proposal.priority} <br />
                <br />
                due date: {proposal.dueDate}
                <br />
                <br /> assignee:
                {proposal.assignee}
                <button
                  onClick={() =>
                    setArr(
                      arr.map((txts) =>
                        txts.id === proposal.id
                          ? { ...txts, column: "closed" }
                          : txts,
                      ),
                    )
                  }
                >
                  Move to Closed
                </button>
                <button
                  onClick={() =>
                    setArr(arr.filter((dt) => dt.id !== proposal.id))
                  }
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setModal(true);
                    setEditingId(proposal.id);
                  }}
                >
                  Edit
                </button>
              </Card>
            ))}
        </Column>

        <p>Closed Won</p>
        <Column id="closed">
          {filtered
            .filter((closedFilter) => closedFilter.column === "closed")
            .map((item) => (
              <Card id={item.id} key={item.id}>
                title: {item.title}
                <br />
                <br /> company:{item.company}
                <br />
                <br /> deal value: {item.dealValue} <br />
                <br />
                priority: {item.priority} <br />
                <br />
                due date: {item.dueDate}
                <br />
                <br /> assignee: {item.assignee}
                <button
                  onClick={() =>
                    setArr(arr.filter((dl) => dl.id !== item.id))
                  }
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setModal(true);
                    setEditingId(item.id);
                  }}
                >
                  Edit
                </button>
              </Card>
            ))}
        </Column>
      </div>
    </DndContext>
  );
};

export default App;
