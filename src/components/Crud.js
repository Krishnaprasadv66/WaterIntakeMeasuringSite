// src/components/Crud.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, updateItem, clearError } from '../store/crudSlice';
import Navbar from './Navbar';
import checkAuth from './auth/checkAuth';
import './Crud.css';

function Crud() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.crud.items);
  const error = useSelector((state) => state.crud.error);
  const [itemName, setItemName] = useState("");
  const [itemWater, setItemWater] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedItemName, setEditedItemName] = useState("");
  const [editedItemWater, setEditedItemWater] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleInputChange = (event) => {
    setItemName(event.target.value);
  };

  const handleWaterChange = (event) => {
    setItemWater(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newItem = {
      id: items.length + 1,
      name: itemName,
      water: itemWater,
      date: new Date().toLocaleDateString() // Add the current date
    };
    dispatch(addItem(newItem));
    setItemName("");
    setItemWater("");
  };

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  const calculateWaterIntake = () => {
    if (!startDate || !endDate) return 0;
    const filteredItems = items.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });
    if (filteredItems.length < 2) return 0;
    const initialWater = filteredItems[0].water;
    const finalWater = filteredItems[filteredItems.length - 1].water;
    return parseFloat(initialWater) - parseFloat(finalWater);
  };

  const handleEditItem = (item) => {
    setEditingItemId(item.id);
    setEditedItemName(item.name);
    setEditedItemWater(item.water);
  };

  const handleSaveItem = () => {
    if (editedItemName.trim() !== "" && editedItemWater.trim() !== "") {
      dispatch(updateItem({ id: editingItemId, name: editedItemName, water: editedItemWater }));
      setEditingItemId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditedItemName("");
    setEditedItemWater("");
  };

  const filterItems = () => {
    let filteredItems = items;
    if (searchTerm) {
      filteredItems = filteredItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (startDate && endDate) {
      filteredItems = filteredItems.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      });
    }
    return filteredItems;
  };

  return (  
    <div className='crud'>
        <Navbar />
      <div className='search'>
      <label>SEARCH</label>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onClick={filterItems} />
      </div>
     <div className="container">
        <div className="row"> 
          <div className="col-md-12 mx-auto add-data">
            <form onSubmit={handleSubmit}>
              <label>Enter Name:</label>
              <input type="text" value={itemName} onChange={handleInputChange} />
              <label>Enter Water in litre:</label>
              <input type="number" value={itemWater} onChange={handleWaterChange} />&nbsp;&nbsp;
              <button className="btn btn-small btn-success" type="submit">Add </button>
             
            </form>
           
            {error && <p className="text-danger">{error}</p>}
          </div>
        </div>
      </div><br />
      <div className="container">
        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>WATER AMOUNT (L)</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterItems().map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  {editingItemId === item.id ? (
                    <input
                      type="text"
                      value={editedItemName}
                      onChange={(e) => setEditedItemName(e.target.value)}
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td>
                  {editingItemId === item.id ? (
                    <input
                      type="number"
                      value={editedItemWater}
                      onChange={(e) => setEditedItemWater(e.target.value)}
                    />
                  ) : (
                    item.water
                  )}
                </td>
                <td>{item.date}</td>
                <td>
                  {editingItemId === item.id ? (
                    <>
                      <button className="btn btn-primary" onClick={handleSaveItem}>Save</button>&nbsp;&nbsp;
                      <button className="btn btn-warning" onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-success" onClick={() => handleEditItem(item)}>Edit</button>&nbsp;&nbsp;
                      <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table><br>
       
        </br>
        <br></br>
      </div> 
      <div className="container">
        <div className="row">
          <div className="col-md-8 compare" >
            <form onSubmit={(e) => e.preventDefault()}>
             <label>Start Date:</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <label>End Date:</label> 
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />&nbsp;&nbsp;&nbsp;&nbsp;
              <button className="btn btn-small btn-warning" type="button" onClick={() => { setSearchTerm(''); setStartDate(''); setEndDate(''); }}>Reset</button>
            </form>
          </div>
        </div>
      </div>
      <p  className='result'>Total Water Intaked: <span style={{color:'magenta'}}>{calculateWaterIntake()} L</span></p>
    </div>
  );
}

export default checkAuth(Crud);