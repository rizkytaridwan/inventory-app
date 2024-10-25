import React, { useState } from "react";
import './App.css';  // Pastikan CSS sudah diimpor

function App() {
  const [items, setItems] = useState([]);
  const [bulkNames, setBulkNames] = useState("");
  const [bulkQty, setBulkQty] = useState("");
  const [orderTitle, setOrderTitle] = useState("");
  const [redOrderTitle, setRedOrderTitle] = useState("");
  const [emptyRowsInput, setEmptyRowsInput] = useState(""); // State untuk mengatur jumlah baris kosong

  const addBulkItems = () => {
    if (bulkNames === "") {
      alert("Nama barang harus diisi");
      return;
    }

    const names = bulkNames.split("\n"); // Ambil semua baris termasuk baris kosong
    const qtys = bulkQty.split("\n");

    // Buat item bahkan jika ada baris kosong
    const newItems = names.map((name, index) => {
      const qty = qtys[index] ? qtys[index].trim() : ""; // Ambil qty atau biarkan kosong jika tidak ada
      return {
        name: name.trim() === "" ? "" : name.trim().toUpperCase(), // Biarkan nama kosong jika tidak ada input
        qty: qty === "" ? "" : qty, // Biarkan qty kosong jika tidak ada input
      };
    });

    setItems([...items, ...newItems]);
    setBulkNames("");
    setBulkQty("");
  };

  const resetForm = () => {
    setOrderTitle("");
    setRedOrderTitle("");
    setBulkNames("");
    setBulkQty("");
    setItems([]);
    setEmptyRowsInput(""); // Reset jumlah baris kosong ke 2
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
          style={{ width: "30%", marginBottom: "10px", marginRight: "10%" }}
          placeholder="Nama Toko Merah"
        />
        {/* Input untuk jumlah baris kosong */}
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
        <button onClick={addBulkItems} className="add-button btn btn-success">Tambah Barang Sekaligus</button>&nbsp;
        <button onClick={printItems} className="add-button btn btn-warning">Print</button>&nbsp;
        <button onClick={resetForm} className="add-button btn btn-danger">Reset</button>
      </div>

      {/* Menampilkan judul orderan yang diinputkan */}
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
            {/* Render baris kosong sesuai input pengguna */}
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
