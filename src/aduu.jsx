import { useState } from "react";

export default function ChalengeCH3() {
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedNotes, setEditedNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  //menambahkan item
  const addItem = (newItem) => {
    if (newItem.name.trim() === "" || newItem.notes.trim() === "") {
      alert("mbok yo nginpute ki sing bener blog");
      return;
    } else {
      const isDuplicate = items.find(
        (item) =>
          item.name.trim().toLowerCase() === newItem.name.trim().toLowerCase()
      );
      if (isDuplicate) {
        alert("maruk amat, itu loh udah ada");
        return;
      }
    }

    setItems([...items, newItem]);
    alert("Berhasil menambahkan data");
  };

  //tambah item
  const editItem = (index, updatedItem) => {
    if (updatedItem.name.trim() === "" || updatedItem.notes.trim() === "") {
      alert("mbok yo nginpute ki sing bener blog");
      return;
    }

    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    setItems(updatedItems);
  };

  //hapus item
  const removeItem = (index) => {
    if (confirm(`beneran nih pengen ngehapus?`)) {
      setEditIndex(null);
      setItems(items.filter((_, i) => i !== index));
    }
  };

  //hapus smuanya
  const removeAll = () => {
    if (confirm("beneran nih pengen ngehapus?")) {
      setItems([]);
    }
  };
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-32 bg-black">
      <div className="flex justify-between items-center">
        <p>Daftar Target Istri</p>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search items..."
          className="mt-4 rounded-md px-3 py-2 border"
        />
      </div>
      <form
        className="flex justify-between gap-4 mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          const newItemName = e.target.itemName.value;
          const newItemNotes = e.target.itemNotes.value;
          addItem({
            id: Date.now(),
            name: newItemName,
            notes: newItemNotes,
          });
          e.target.reset();
        }}
      >
        <div className="flex gap-2">
          <input type="text" placeholder="Tulis Nama Target" name="itemName" />
          <input type="text" placeholder="Catatan" name="itemNotes" />
        </div>
        <button type="submit">Tambah</button>
      </form>

      {items.length > 0 ? (
        <div className="w-full text-center ">
          {filteredItems.map((item, index) => (
            <div className="flex justify-between mt-4 " key={item.id}>
              <div className="">
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editedName}
                    className="border-[1px] py-1 border-gray-300 outline-none ps-1  w-full"
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  <span>{item.name}</span>
                )}
              </div>

              <div className="">
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editedNotes}
                    className="border-[1px] py-1 border-gray-300 outline-none ps-1  w-full"
                    onChange={(e) => setEditedNotes(e.target.value)}
                  />
                ) : (
                  <span>{item.notes}</span>
                )}
              </div>

              <div className="">
                {editIndex === index ? (
                  <div className="flex justify-center gap-x-3 w-full px-10">
                    <button
                      onClick={() => {
                        editItem(index, {
                          ...item,
                          name: editedName,
                          notes: editedNotes,
                        });
                        setEditedName("");
                        setEditedNotes("");
                        setEditIndex(null);
                      }}
                      className="bg-gray-900 rounded-sm text-white max-w-16 p-1 w-full"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditedName("");
                        setEditedNotes("");
                      }}
                      className="bg-gray-900 rounded-sm text-white max-w-16 p-1 w-full"
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center gap-x-3">
                    <button
                      onClick={() => {
                        setEditedName(item.name);
                        setEditedNotes(item.notes);
                        setEditIndex(index);
                      }}
                      className="bg-blue-500 rounded-sm text-white p-1 max-w-16 w-full"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeItem(index)}
                      className="bg-red-500 rounded-sm max-w-16 w-full text-white p-1"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div>
            <button
              onClick={() => removeAll(items)}
              className="bg-red-500 rounded-sm w-full text-white p-1 mt-4"
            >
              Hapuus Semua Target
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center">
          Daftar calon Istrimu sepertinya masih kosoong
        </p>
      )}
    </div>
  );
}
