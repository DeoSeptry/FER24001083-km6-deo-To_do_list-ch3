import { useState } from "react";
import gambar from "./assets/kosong.jpg";

export default function ChalengeCH3() {
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedNotes, setEditedNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editedImg, setEditetedImg] = useState(null);
  const [filter, setFilter] = useState("All");

  //menambahkan item

  const addItem = (newItem) => {
    //kondisi jika inputan spasi kosong

    if (
      newItem.name.trim() === "" ||
      newItem.notes.trim() === "" ||
      !newItem.image
    ) {
      alert("calon target dan catatamu kosong wir jawir");
      return;
    } else {
      //kondisi jika data duplikat
      const isDuplicate = items.find(
        (item) =>
          item.name.trim().toLowerCase() === newItem.name.trim().toLowerCase()
      );
      if (isDuplicate) {
        alert("maruk amat, itu loh udah ada");
        return;
      }
    }

    //kondisi jika inputan benar
    setItems([...items, newItem]);
    alert("anjay target baru nih");
  };

  //tambah item
  const editItem = (index, updatedItem) => {
    console.log("qwe ", updatedItem);
    //kondisi jika inputan spasi kosong
    if (updatedItem.name.trim() === "" || updatedItem.notes.trim() === "") {
      alert("mbok yo nginpute ki sing bener blog");
      return;
    }

    // kondisi jika inputan beanr
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
    return;
  };

  //hapus smuanya
  const removeAll = () => {
    if (items.length === 0) {
      alert("daftar calon pacarlu masih kosong blog");
      return;
    } else if (confirm("beneran nih pengen ngehapus?")) {
      setItems([]);
    }
    return;
  };

  //hapus item terceklis
  const removeCek = () => {
    const cekItem = items.filter((item) => item.isChecked);
    if (cekItem.length === 0) {
      alert("dapat pacar aja blm mau ngapus apa lu");
      return;
    } else if (confirm("beneran nih pengen ngehapus?")) {
      setItems(items.filter((item) => !item.isChecked));
    }
    return;
  };

  // filter button all, todo dan done
  const filteredItems = items
    ?.map((item) => ({ ...item }))
    .filter((e) => {
      if (filter === "Done") {
        return e?.isChecked === true;
      } else if (filter === "Todo") {
        return e?.isChecked === false;
      } else {
        return true;
      }
    })
    // filter seacrh tolowercase
    .filter((item) => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  //checkbox
  const cekBox = (index) => {
    const updatedItems = [...items];
    updatedItems[index].isChecked = !updatedItems[index].isChecked;
    setItems(updatedItems);

    if (updatedItems[index].isChecked) {
      alert("mantap bgt bro saah");
      return;
    }
    alert("yah kok dilepas? putus kah nih?");
  };

  const CekJmlSelesai = items.filter((item) => item.isChecked).length;
  console.log(items);
  return (
    <div className="w-max mx">
      <div className="flex justify-center  ">
        <div className="flex justify-center items-center gap-3 border-2 rounded-full py-6 w-[60%] border-gray-700">
          <div className="flex flex-col items-start ">
            <p className="text-2xl font-bold">Capaian Target</p>
            <p>Pepet trs brow</p>
          </div>
          <div className="flex items-center font-bold rounded-full bg-gray-700 w-20 h-20">
            <div className="text-2xl px-2">
              {CekJmlSelesai} / {items.length}{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[700px] mt-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start">
            <p className="text-white text-xl font-bold">
              Daftar Target Calon Pacar
            </p>
            <p>Buat daftar target orang yang ingin kamu jadikan pacar barumu</p>
          </div>

          {/* inputan pencarian */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama target"
            className=" rounded-md px-3 py-2 dark:bg-gray-700 "
          />
        </div>

        {/* input data */}
        <form
          className="flex flex-row items-center mt-4 gap-4 bg"
          onSubmit={(e) => {
            console.log("asas", e.target.itemImage.files);
            e.preventDefault();
            const newItemName = e.target.itemName.value;
            const newItemNotes = e.target.itemNotes.value;
            const newItemImage = e.target.itemImage.files[0];

            if (!newItemImage) {
              alert("minimal tambahin foto laah wir jawir");
              return;
            }

            addItem({
              id: Date.now(),
              image: URL.createObjectURL(newItemImage),
              name: newItemName,
              notes: newItemNotes,
              isChecked: false,
            });

            e.target.reset();
          }}
        >
          <div className="flex  gap-2">
            {" "}
            {/* <input type="file" name="itemImage" className="" /> */}
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-auto border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center px-2">
                  <p className=" text-sm text-gray-500 dark:text-gray-400">
                    Pilih Foto
                  </p>
                </div>
                <input
                  type="file"
                  id="dropzone-file"
                  name="itemImage"
                  className="hidden"
                />
              </label>
            </div>
            {/* input nama */}
            <input
              type="text"
              placeholder="Tulis Nama Target"
              name="itemName"
              className=" rounded-md px-3 py-2 dark:bg-gray-700"
            />
            {/* input alasan */}
            <input
              type="text"
              placeholder="Catatan"
              name="itemNotes"
              className=" rounded-md px-3 py-2 dark:bg-gray-700"
            />
          </div>
          <button
            className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5   w-full dark:bg-blue-500 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="submit"
          >
            Tambah
          </button>
        </form>

        <div className="mt-4 flex flex-col gap-4">
          <div className="text-white font-semibold">
            <p>ToDo List</p>
          </div>
          <div className="flex justify-between gap-4">
            <button
              onClick={() => setFilter("All")}
              type=""
              className="w-full text-blue-500 hover:text-white border border-blue-700 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:bg-blue-500 dark:focus:text-white"
            >
              All
            </button>
            <button
              onClick={() => setFilter("Todo")}
              className="w-full text-blue-500 hover:text-white border border-blue-700 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:bg-blue-500 dark:focus:text-white"
            >
              ToDo
            </button>
            <button
              onClick={() => setFilter("Done")}
              className=" w-full text-blue-500 hover:text-white border border-blue-700 hover:bg-blue-800  focus:outline-none f font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:bg-blue-500 dark:focus:text-white"
            >
              Done
            </button>
          </div>
        </div>

        <div className=" ">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center"></div>
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-white w-[200px]">
                    Nama Target Calon
                  </th>
                  <th scope="col" className="px-6 py-3 text-white w-[200px]">
                    Catatan
                  </th>
                  <th
                    scope="col"
                    className="text-center px-6 py-3 text-white w-[50px]"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              {items.length > 0 ? (
                <tbody>
                  {filteredItems.map((item, index) => (
                    <tr
                      key={item.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id={`checkbox-table-search-${index}`}
                            checked={item.isChecked}
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={() => cekBox(index)}
                          />
                          <label
                            htmlFor={`checkbox-table-search-${index}`}
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>

                      <td className="flex flex-row items-center gap-2 px-6 py-3 w-[200px]">
                        {editIndex === index ? (
                          <div className="flex items-center justify-center w-full">
                            {/* <form>
                              <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-auto border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                              >
                                <div className="flex flex-col items-center justify-center px-2">
                                  <p className=" text-sm text-gray-500 dark:text-gray-400">
                                    Pilih Foto
                                  </p>
                                </div>
                                <input
                                  type="file"
                                  id="dropzone-file"
                                  name="itemImage"
                                  className="hidden"
                                  onChange={(e) => {
                                    setEditetedImg(
                                      URL.createObjectURL(e.target.files[0])
                                    );
                                  }}
                                />
                              </label>
                            </form> */}
                            <input
                              type="file"
                              id="dropzone-file"
                              name="itemImage"
                              //   value={editedImg}
                              //   className="hidden"
                              onChange={(e) => {
                                setEditetedImg(
                                  URL.createObjectURL(e.target.files[0])
                                );
                              }}
                            />
                          </div>
                        ) : (
                          //   <input
                          //     type="file"
                          //     value={editedImg}
                          //     className="rounded-md px-3 py-2 max-w-28 bg-transparent"
                          //     onChange={(e) => setEditetedImg(e.target.value)}
                          //   />
                          <img
                            className="w-10 h-10 rounded-full"
                            src={item.image}
                            alt=""
                          />
                        )}
                        {editIndex === index ? (
                          <input
                            type="text"
                            value={editedName}
                            className="rounded-md px-3 py-2 max-w-28 bg-transparent"
                            onChange={(e) => setEditedName(e.target.value)}
                          />
                        ) : (
                          <span
                            className={
                              item.isChecked
                                ? "line-through text-red-500"
                                : "text-white"
                            }
                          >
                            {item.name}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3">
                        {editIndex === index ? (
                          <input
                            type="text"
                            value={editedNotes}
                            className=" rounded-md px-3 py-2 max-w-64 bg-transparent"
                            onChange={(e) => setEditedNotes(e.target.value)}
                          />
                        ) : (
                          <span className="text-white">{item.notes}</span>
                        )}
                      </td>
                      <td className="px-6 py-3">
                        {editIndex === index ? (
                          <div className="flex justify-center gap-x-3 w-full px-10">
                            <button
                              onClick={() => {
                                editItem(index, {
                                  ...item,
                                  name: editedName,
                                  notes: editedNotes,
                                  image: editedImg,
                                });
                                setEditedName("");
                                setEditedNotes("");
                                setEditetedImg(null);
                                setEditIndex(null);
                              }}
                              className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full dark:bg-blue-500 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                              Simpan
                            </button>
                            <button
                              onClick={() => {
                                setEditedName("");
                                setEditedNotes("");
                                setEditetedImg(null);

                                setEditIndex(null);
                              }}
                              className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-900"
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
                                setEditetedImg(item.image);
                                setEditIndex(index);
                              }}
                              className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full dark:bg-blue-500 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => removeItem(index)}
                              className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >
                              Hapus
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <div>Target masih kosong brot</div>
              )}
            </table>
          </div>
          <div className="flex justify-between gap-5 mt-4">
            <button
              onClick={() => removeCek(items)}
              className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 w-full dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Hapus Semua Target Yang Berhasil
            </button>
            <button
              onClick={() => removeAll(items)}
              className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 w-full dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Hapus Semua Target
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
