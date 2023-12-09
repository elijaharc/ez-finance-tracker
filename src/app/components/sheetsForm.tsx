import React, { useState } from "react";

const SheetsForm = () => {
  const [formData, setFormData] = useState({
    month: "",
    date: new Date().toISOString().split("T")[0],
    transaction: "",
    amount: "",
    category: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Access form data
    console.log(formData);
    // reset form
    setFormData({
      month: "",
      date: new Date().toISOString().split("T")[0],
      transaction: "",
      amount: "",
      category: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative mb-10 flex flex-col justify-center overflow-hidden">
      <div className="m-auto w-full rounded-2xl bg-base-300 p-4 shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
        <form className="space-y-1">
          <div>
            <label className="label">
              <span className="label-text text-base">Date</span>
            </label>
            <input
              type="date"
              placeholder="Date"
              className="input input-bordered w-full"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text text-base">Transaction Details</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Starbucks"
              className="input input-bordered w-full"
              name="transaction"
              value={formData.transaction}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text text-base">Amount</span>
            </label>
            <input
              type="text"
              placeholder="Amount"
              className="input input-bordered w-full"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text text-base">Category</span>
            </label>
            <select
              className="select-base-300 select w-full"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option disabled selected>
                Select category
              </option>
              <option>Expenses</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-block mt-4"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SheetsForm;
