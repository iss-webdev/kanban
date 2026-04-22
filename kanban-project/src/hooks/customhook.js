import { useState, useEffect, useMemo, useCallback } from "react";

export const useKanban = () => {
  const [formInfo, setFormInfo] = useState({
    name: "",
    title: "",
    company: "",
    dealValue: "",
    priority: "",
    dueDate: "",
    assignee: "",
  });
  const [array, setArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState("");
  const filteredItems = useMemo(
    () =>
      search === ""
        ? array
        : array.filter((item) =>
            item.priority.toLowerCase().includes(search.toLowerCase()),
          ),
    [array, search],
  );

  useEffect(() => {
    const save = localStorage.getItem("kanban");
    if (save) {
      const data = JSON.parse(save);
      if (data.formInfo) setFormInfo(data.formInfo);
      if (data.array) setArray(data.array);
    }
    setLoad(true);
  }, []);

  useEffect(() => {
    if (!load) return;
    localStorage.setItem("kanban", JSON.stringify({ formInfo, array }));
  }, [formInfo, array, load]);

  const handle = useCallback(
    (event) => {
      const { active, over } = event;
      if (!over) return;
      setArray(
        array.map((item) =>
          item.id === active.id ? { ...item, column: over.id } : item,
        ),
      );
    },
    [array],
  );

  const addCard = useCallback(() => {
    setArray([...array, { ...formInfo, column: "lists", id: Date.now() }]);
    setFormInfo({
      name: "",
      title: "",
      company: "",
      dealValue: "",
      priority: "",
      dueDate: "",
      assignee: "",
    });
  }, [array, formInfo]);

  const deleteCard = useCallback(
    (id) => {
      setArray(array.filter((item) => item.id !== id));
    },
    [array],
  );

  const moveCard = useCallback(
    (id, column) => {
      setArray(
        array.map((item) =>
          item.id === id ? { ...item, column: column } : item,
        ),
      );
    },
    [array],
  );

  const updateCard = useCallback(
    (id) => {
      setArray(
        array.map((item) => (item.id === id ? { ...item, ...formInfo } : item)),
      );
      setIsModalOpen(false);
      setEditingId(null);

      setFormInfo({
        name: "",
        title: "",
        company: "",
        dealValue: "",
        priority: "",
        dueDate: "",
        assignee: "",
      });
    },
    [array, formInfo],
  );

  const validation = useMemo(
    () =>
      formInfo.name.length >= 2 &&
      formInfo.title.length >= 2 &&
      formInfo.dealValue !== "" &&
      formInfo.priority !== "" &&
      formInfo.dueDate !== "",
    [formInfo],
  );

  return {
    formInfo,
    setFormInfo,
    addCard,
    deleteCard,
    moveCard,
    updateCard,
    validation,
    array,
    editingId,
    setEditingId,
    isModalOpen,
    search,
    setSearch,
    filteredItems,
    openEditModal: useCallback(
      (id) => {
        setEditingId(id);
        setIsModalOpen(true);
      },
      [setEditingId, setIsModalOpen],
    ),
    closeModal: useCallback(() => {
      setIsModalOpen(false);
    }, []),
    load,
    setLoad,
    handle,
  };
};
