import { DndContext } from "@dnd-kit/core";
import { useKanban } from "./hooks/customhook.js";
import Inprogress from "./components/Inprogress";
import Leads from "./components/Leads";
import Modal from "./components/Modal";
import Proposal from "./components/Proposal";
import CustomerInfo from "./components/CustomerInfo";
import Closed from "./components/Closed";

const App = () => {
  const {
    formInfo,
    setFormInfo,
    validation,
    addCard,
    deleteCard,
    moveCard,
    updateCard,
    array,
    editingId,
    setEditingId,
    search,
    closeModal,
    openEditModal,
    setSearch,
    filteredItems,
    isModalOpen,
    handle,
  } = useKanban();

  return (
    <DndContext onDragEnd={handle}>
      <div>
        <p>Total leads: {array.length === 0 ? 0 : array.length}</p>
        <p>
          Total pipe line:{" "}
          {array.reduce((item, cur) => item + Number(cur.dealValue), 0)}
        </p>
        <p>
          Win rate:{" "}
          {array.length === 0
            ? 0
            : Number(
                (array.filter((item) => item.column === "closed").length /
                  array.length) *
                  100,
              )}
        </p>

        <CustomerInfo
          formInfo={formInfo}
          setFormInfo={setFormInfo}
          add={addCard}
          validation={validation}
          search={search}
          setSearch={setSearch}
        />
        <Leads
          filteredItems={filteredItems}
          openEditModal={openEditModal}
          deleteCard={deleteCard}
          moveCard={moveCard}
        />
        <Inprogress
          filteredItems={filteredItems}
          openEditModal={openEditModal}
          deleteCard={deleteCard}
          deleteCard={deleteCard}
          moveCard={moveCard}
        />
        {isModalOpen && (
          <Modal
            formInfo={formInfo}
            setFormInfo={setFormInfo}
            editingId={editingId}
            closeModal={closeModal}
            setEditingId={setEditingId}
            updateCard={updateCard}
          />
        )}

        <Proposal
          filteredItems={filteredItems}
          openEditModal={openEditModal}
          deleteCard={deleteCard}
          moveCard={moveCard}
        />

        <Closed
          filteredItems={filteredItems}
          openEditModal={openEditModal}
          deleteCard={deleteCard}
        />
      </div>
    </DndContext>
  );
};

export default App;
