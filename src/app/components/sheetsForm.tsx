import React, { useState } from "react";
import { env } from "~/env";

const SheetsForm = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    transaction: "",
    amount: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      await fetch(env.NEXT_PUBLIC_GOOGLE_SHEET_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("An error occurred while sending form data", error);
    } finally {
      resetForm();
      setIsSubmitting(false);
    }
  };

  const resetForm = () =>
    setFormData({
      date: new Date().toISOString().split("T")[0],
      transaction: "",
      amount: "",
      category: "",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative mb-28 flex flex-col justify-center overflow-hidden">
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
              {isSubmitting ? (
                <span className="loading loading-dots loading-lg"></span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SheetsForm;
