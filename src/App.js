import React, { useState } from "react";
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [bulkNames, setBulkNames] = useState("");
  const [bulkQty, setBulkQty] = useState("");
  const [orderTitle, setOrderTitle] = useState("");
  const [redOrderTitle, setRedOrderTitle] = useState("");
  const [emptyRowsInput, setEmptyRowsInput] = useState("");

  const addBulkItems = () => {
    if (bulkNames === "") {
      alert("Nama barang harus diisi");
      return;
    }

    const names = bulkNames.split("\n");
    const qtys = bulkQty.split("\n");

    const newItems = names.map((name, index) => ({
      name: name.trim() === "" ? "" : name.trim().toUpperCase(),
      qty: qtys[index] ? qtys[index].trim() : "",
    }));

    setItems([...items, ...newItems]);
    setBulkNames("");
    setBulkQty("");
  };

  const sortItems = () => {
    const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));
    setItems(sortedItems);
  };

  const resetForm = () => {
    setOrderTitle("");
    setRedOrderTitle("");
    setBulkNames("");
    setBulkQty("");
    setItems([]);
    setEmptyRowsInput("");
  };

  const printItems = () => {
    window.print();
  };

  return (
    <div>
      <div className="form-section" style={{marginLeft: "10px", marginRight: "10px", marginTop: "10px", marginBottom: "10px"}}>
        <h1 style={{fontSize: "20px", marginTop: "10px"}}>Untuk Nama Toko Isi 1 Saja</h1>
        <input
          type="text"
          value={orderTitle}
          onChange={(e) => setOrderTitle(e.target.value)}
          style={{ width: "30%", marginBottom: "10px", marginRight: "50%" , marginTop: "10px"}}
          placeholder="Nama Toko Hitam"
        />
        <input
          type="text"
          value={redOrderTitle}
          onChange={(e) => setRedOrderTitle(e.target.value)}
          className="red-input"
          style={{ width: "30%", marginBottom: "10px", marginRight: "10%"}}
          placeholder="Nama Toko Merah"
        />
        <input
          type="number"
          value={emptyRowsInput}
          onChange={(e) => setEmptyRowsInput(parseInt(e.target.value) || 0)}
          style={{ width: "13%", marginBottom: "10px" }}
          placeholder="Jumlah Baris Kosong"
          min="0"
        />
        <textarea
          value={bulkNames}
          onChange={(e) => setBulkNames(e.target.value)}
          placeholder="Masukkan Nama Barang"
          rows="8"
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <textarea
          value={bulkQty}
          onChange={(e) => setBulkQty(e.target.value)}
          placeholder="Masukkan Qty"
          rows="8"
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <button onClick={addBulkItems} className="btn btn-success">Tambah Barang Sekaligus</button>&nbsp;
        <button onClick={printItems} className="btn btn-warning">Print</button>&nbsp;
        <button onClick={resetForm} className="btn btn-danger">Reset</button>&nbsp;
        <button onClick={sortItems} className="btn btn-info">Sortir Nama Barang A-Z</button>
      </div>

      {orderTitle && <h1 className="order-title" style={{ color: 'black' }}>NAMA TOKO : {orderTitle.toUpperCase()}</h1>}
      {redOrderTitle && <h1 className="order-title red-print" style={{ color: 'red' }}>NAMA TOKO : {redOrderTitle.toUpperCase()}</h1>}

      <div id="table-to-print">
        <table border="1" cellPadding="10" className="custom-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Barang</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} style={{ height: "15px" }}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.qty}</td>
              </tr>
            ))}
            {Array.from({ length: emptyRowsInput }).map((_, index) => (
              <tr key={`empty-${index}`} style={{ height: "15px" }}>
                <td>{items.length + index + 1}</td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
