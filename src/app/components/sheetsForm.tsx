import React, { useState } from "react";
import { env } from "~/env";

const SheetsForm = () => {
  const getFormattedDates = (dateToFormat: Date) => {
    const date = dateToFormat.toISOString().split("T")[0];
    const month = dateToFormat.toLocaleString("default", { month: "long" });
    const day = dateToFormat.getDate().toString();

    return { month, day, date };
  };

  const currentDate = new Date();
  const initialFormState = {
    ...getFormattedDates(currentDate),
    transaction: "",
    amount: "",
    category: "Expenses",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => setFormData(initialFormState);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (e.target.name === "date") {
      setFormData({
        ...formData,
        ...getFormattedDates(new Date(e.target.value)),
      });
      return;
    }

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
              <option disabled>Select category</option>
              <option selected>Expenses</option>
              <option>Bills</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-block mt-4"
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <span className="loading loading-dots loading-md"></span>
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
