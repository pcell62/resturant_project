"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [viewMode, setViewMode] = useState("reservations");
  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  useEffect(() => {
    const secretKey = localStorage.getItem("adminSecretKey"); // Get secret key from local storage
    if (secretKey !== "hello123") {
      // If secret key is not present or doesn't match, redirect to homepage
      window.location.href = "/";
      return;
    }
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          "https://resturant-project.onrender.com/reservation"
        );
        setReservations(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setLoading(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://resturant-project.onrender.com/order"
        );
        setOrders(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    const fetchQueries = async () => {
      try {
        const response = await axios.get(
          "https://resturant-project.onrender.com/query"
        );
        setQueries(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching queries:", error);
        setLoading(false);
      }
    };

    if (viewMode === "reservations") {
      fetchReservations();
    } else if (viewMode === "orders") {
      fetchOrders();
    } else if (viewMode === "queries") {
      fetchQueries();
    }
  }, [viewMode]);

  const handleLogout = () => {
    localStorage.removeItem("adminSecretKey"); // Remove secret key from local storage
    window.location.href = "/"; // Redirect to homepage
  };

  const handleDone = async (id) => {
    try {
      await axios.put(`https://resturant-project.onrender.com/order/${id}`);

      setOrders(
        orders.map((order) =>
          order._id === id ? { ...order, status: "Completed" } : order
        )
      );
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleResolve = async (id) => {
    try {
      await axios.put(`https://resturant-project.onrender.com/query/${id}`);

      setQueries(
        queries.map((query) =>
          query._id === id ? { ...query, status: "Resolved" } : query
        )
      );
    } catch (error) {
      console.error("Error updating query:", error);
    }
  };

  const handleQueryDelete = async (id) => {
    try {
      await axios.delete(`https://resturant-project.onrender.com/query/${id}`);
      setQueries(queries.filter((query) => query._id !== id));
    } catch (error) {
      console.error("Error deleting query:", error);
    }
  };

  const handleResDelete = async (id) => {
    try {
      await axios.delete(
        `https://resturant-project.onrender.com/reservation/${id}`
      );
      setReservations(
        reservations.filter((reservation) => reservation._id !== id)
      );
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const handleOrderDelete = async (id) => {
    try {
      await axios.delete(`https://resturant-project.onrender.com/order/${id}`);
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleDoneRes = async (id) => {
    try {
      await axios.put(
        `https://resturant-project.onrender.com/reservation/${id}`
      );

      setReservations(
        reservations.map((reservation) =>
          reservation._id === id
            ? { ...reservation, status: "Completed" }
            : reservation
        )
      );
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const pendingOrders = orders.filter((order) => order.status !== "Completed");
  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  );

  const pendingReservations = reservations.filter(
    (reservation) => reservation.status !== "Completed"
  );
  const completedReservations = reservations.filter(
    (reservation) => reservation.status === "Completed"
  );

  const pendingQueries = queries.filter((query) => query.status !== "Resolved");
  const resolvedQueries = queries.filter(
    (query) => query.status === "Resolved"
  );

  return (
    <div className="p-4 mt-24">
      <div className="flex items-center gap-7 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            viewMode === "reservations"
              ? "flex justify-center items-center gap-2  h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-[#a86a44]  hover:shadow-xl p-2 tracking-wider"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => setViewMode("reservations")}
        >
          Reservations
        </button>
        <button
          className={`px-4 py-2 rounded ${
            viewMode === "orders"
              ? "flex justify-center items-center gap-2  h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-[#a86a44]  hover:shadow-xl p-2 tracking-wider"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => setViewMode("orders")}
        >
          Orders
        </button>
        <button
          className={`px-4 py-2 rounded ${
            viewMode === "queries"
              ? "flex justify-center items-center gap-2  h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-[#a86a44]  hover:shadow-xl p-2 tracking-wider"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => setViewMode("queries")}
        >
          Queries
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={handleLogout}
        >
          Logout as Admin
        </button>
      </div>

      <div className="mt-4">
        <h1 className="text-4xl font-Raleway font-bold my-10">
          {viewMode === "reservations"
            ? "Reservations"
            : viewMode === "orders"
            ? "Orders"
            : "Queries"}
        </h1>
        {/* Display loading state */}
        {loading && <p className="text-gray-600">Loading...</p>}
        {/* Display reservations or orders */}
        {!loading && viewMode === "reservations" && (
          <div>
            <h2 className="text-2xl font-semibold">Pending Reservations</h2>
            {pendingReservations.map((reservation) => (
              <div
                key={reservation._id}
                className="mb-4 py-6 px-3 backdrop-blur-sm rounded-lg shadow-lg"
              >
                <h2 className="text-lg font-bold mb-1">{reservation.name}</h2>
                <p className="text-gray-600">
                  Reservation ID: {reservation._id}
                </p>
                <p className="text-gray-600">{reservation.mobileNumber}</p>
                <p className="text-gray-600">
                  Number Of People : {reservation.numberOfPeople}
                </p>
                <p className="text-gray-600">
                  {reservation.date} - {reservation.session}
                </p>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded mt-2"
                  onClick={() => handleDoneRes(reservation._id)}
                >
                  Mark as Completed
                </button>
              </div>
            ))}
            {pendingReservations.length === 0 && (
              <p className="text-gray-600 p-6 text-xl backdrop-blur-sm shadow-lg">
                No pending reservations found.
              </p>
            )}

            <h2 className="text-2xl font-semibold my-4">
              Completed Reservations
            </h2>
            {completedReservations.map((reservation) => (
              <div
                key={reservation._id}
                className="mb-4 py-6 px-3 backdrop-blur-sm rounded-lg shadow-lg"
              >
                <h2 className="text-lg font-bold mb-1">{reservation.name}</h2>
                <p className="text-gray-600">
                  Reservation ID: {reservation._id}
                </p>
                <p className="text-gray-600">{reservation.mobileNumber}</p>
                <p className="text-gray-600">
                  Number Of People : {reservation.numberOfPeople}
                </p>
                <p className="text-gray-600">
                  {reservation.date} - {reservation.session}
                </p>
                <p className="text-gray-600">Status : {reservation.status}</p>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded mt-2 ml-2"
                  onClick={() => handleResDelete(reservation._id)}
                >
                  Delete
                </button>
              </div>
            ))}
            {completedReservations.length === 0 && (
              <p className="text-gray-600 p-6 text-xl backdrop-blur-sm shadow-lg">
                No completed reservations yet.
              </p>
            )}
          </div>
        )}
        {!loading && viewMode === "orders" && (
          <div>
            <h2 className="text-2xl font-semibold">Pending Orders</h2>
            {pendingOrders.map((order) => (
              <div
                key={order._id}
                className="mb-4 py-6 px-3 backdrop-blur-sm rounded-lg shadow-lg"
              >
                <h2 className="text-lg font-bold mb-1">{order.userName}</h2>
                <p className="text-gray-600">Order ID: {order._id}</p>
                <p className="text-gray-600">Email: {order.email}</p>
                <p className="text-gray-600">Address: {order.address}</p>
                <p className="text-gray-600">
                  Total Price: {order.totalPrice} rs
                </p>
                <p className="text-gray-600">
                  Ordered At: {formatDate(order.createdAt)}
                </p>
                <p className="text-gray-600">Status : {order.status}</p>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded mt-2"
                  onClick={() => handleDone(order._id)}
                >
                  Mark as Done
                </button>
                <h3 className="text-lg font-semibold mt-4 mb-2">Items:</h3>
                <ul className="list-disc pl-6">
                  {order.items.map((item) => (
                    <li key={item._id} className="text-gray-600">
                      {item.name} - Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {pendingOrders.length === 0 && (
              <p className="text-gray-600 p-6 text-xl backdrop-blur-sm shadow-lg">
                No pending orders found.
              </p>
            )}

            <h2 className="text-2xl font-semibold my-4">Completed Orders</h2>
            {completedOrders.map((order) => (
              <div
                key={order._id}
                className="mb-4 py-6 px-3 backdrop-blur-sm rounded-lg shadow-lg"
              >
                <h2 className="text-lg font-bold mb-1">{order.userName}</h2>
                <p className="text-gray-600">Order ID: {order._id}</p>
                <p className="text-gray-600">Email: {order.email}</p>
                <p className="text-gray-600">Address: {order.address}</p>
                <p className="text-gray-600">
                  Total Price: {order.totalPrice} rs
                </p>
                <p className="text-gray-600">
                  Ordered At: {formatDate(order.createdAt)}
                </p>
                <p className="text-gray-600">Status : {order.status}</p>
                <h3 className="text-lg font-semibold mt-4 mb-2">Items:</h3>
                <ul className="list-disc pl-6">
                  {order.items.map((item) => (
                    <li key={item._id} className="text-gray-600">
                      {item.name} - Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
                {/* Render delete button only for completed orders */}
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                  onClick={() => handleOrderDelete(order._id)}
                >
                  Delete
                </button>
              </div>
            ))}
            {completedOrders.length === 0 && (
              <p className="text-gray-600 p-6 text-xl backdrop-blur-sm shadow-lg">
                No order completed yet
              </p>
            )}
          </div>
        )}
        {!loading && viewMode === "queries" && (
          <div>
            <h2 className="text-2xl font-semibold">Pending Queries</h2>
            {pendingQueries.map((query) => (
              <div
                key={query._id}
                className="mb-4 py-6 px-3 backdrop-blur-sm rounded-lg shadow-lg"
              >
                <h2 className="text-lg font-bold mb-1">{query.name}</h2>
                <p className="text-gray-600">Query ID: {query._id}</p>
                <p className="text-gray-600">Email: {query.email}</p>
                <p className="text-gray-600">Mobile Number: {query.mobile}</p>
                <p className="text-gray-600">Query: {query.query}</p>
                <p className="text-gray-600">Status : {query.status}</p>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded mt-2"
                  onClick={() => handleResolve(query._id)}
                >
                  Resolve
                </button>
              </div>
            ))}
            {pendingQueries.length === 0 && (
              <p className="text-gray-600 p-6 text-xl backdrop-blur-sm shadow-lg">
                No pending queries found.
              </p>
            )}

            <h2 className="text-2xl font-semibold my-4">Resolved Queries</h2>
            {resolvedQueries.map((query) => (
              <div
                key={query._id}
                className="mb-4 py-6 px-3 backdrop-blur-sm rounded-lg shadow-lg"
              >
                <p className="text-gray-600">Query ID: {query._id}</p>
                <p className="text-gray-600">Email: {query.email}</p>
                <p className="text-gray-600">Mobile Number: {query.mobile}</p>
                <p className="text-gray-600">Query: {query.query}</p>
                <p className="text-gray-600">Status : {query.status}</p>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                  onClick={() => handleQueryDelete(query._id)}
                >
                  Delete
                </button>
              </div>
            ))}
            {resolvedQueries.length === 0 && (
              <p className="text-gray-600 p-6 text-xl backdrop-blur-sm shadow-lg">
                No resolved queries yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
