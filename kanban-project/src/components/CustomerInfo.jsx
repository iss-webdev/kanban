    import React from "react";

    const CustomerInfo = ({
    formInfo,
    setFormInfo,
    add,
    validation,
    search,
    setSearch,
    }) => {
    return (
        <div>
        <p>name</p>
        <input
            type="text"
            value={formInfo.name}
            onChange={(e) =>
            setFormInfo((prev) => ({ ...prev, name: e.target.value }))
            }
        />

        <p>Title</p>
        <input
            type="text"
            value={formInfo.title}
            onChange={(e) =>
            setFormInfo((prev) => ({ ...prev, title: e.target.value }))
            }
        />

        <p>Company</p>
        <input
            type="text"
            value={formInfo.company}
            onChange={(e) =>
            setFormInfo((prev) => ({ ...prev, company: e.target.value }))
            }
        />

        <p>dealValue</p>
        <input
            type="number"
            value={formInfo.dealValue}
            placeholder="$500"
            onChange={(e) =>
            setFormInfo((prev) => ({ ...prev, dealValue: e.target.value }))
            }
        />

        <p>priority</p>
        <select
            value={formInfo.priority}
            onChange={(e) =>
            setFormInfo((prev) => ({ ...prev, priority: e.target.value }))
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
            value={formInfo.dueDate}
            placeholder="7 days"
            onChange={(e) =>
            setFormInfo((prev) => ({ ...prev, dueDate: e.target.value }))
            }
        />

        <p>Assignee</p>
        <input
            type="text"
            value={formInfo.assignee}
            onChange={(e) =>
            setFormInfo((prev) => ({ ...prev, assignee: e.target.value }))
            }
        />

        <button
            disabled={!validation}
            onClick={add}
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
        </div>
    );
    };

    export default CustomerInfo;
