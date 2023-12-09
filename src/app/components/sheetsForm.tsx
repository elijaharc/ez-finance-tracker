import React, { useState } from "react";
import { env } from "~/env";
import { CATEGORIES } from "../utils/constants/sheetsForm";
import { getFormattedDates } from "../utils/helper/sheetsForm";

const SheetsForm = ({ onAfterSubmit = () => {} }) => {
  const currentDate = new Date();
  const initialFormState = {
    ...getFormattedDates(currentDate),
    transaction: "",
    amount: "",
    category: "Expenses",
    sub_category: "Food",
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

      onAfterSubmit();
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
    console.log(
      "app | e.target.name",
      e.target.name,
      "e.target.value",
      e.target.value,
    );
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative mb-28 flex flex-col justify-center overflow-hidden">
      <div className="m-auto w-full rounded-2xl bg-base-300 px-3 py-1.5 shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
        <form className="space-y-.5">
          <div>
            <label className="label">
              <span className="text-md label-text">Date</span>
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
              <span className="text-md label-text">Transaction Details</span>
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
              <span className="text-md label-text">Amount</span>
            </label>
            <input
              type="number"
              placeholder="Amount"
              className="input input-bordered w-full"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-md label-text">Category</span>
            </label>
            <select
              className="select-base-300 select w-full"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option disabled>Select category</option>
              {Object.keys(CATEGORIES).map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">
              <span className="text-md label-text">Sub Category</span>
            </label>
            <select
              className="select-base-300 select w-full"
              name="sub_category"
              value={formData.sub_category}
              onChange={handleChange}
            >
              <option disabled>Select sub category</option>
              {(
                CATEGORIES[formData.category as keyof typeof CATEGORIES] || []
              ).map((sub_category) => (
                <option key={sub_category} value={sub_category}>
                  {sub_category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-md btn-block mb-1 mt-4"
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <span className="loading loading-dots loading-md text-primary"></span>
              ) : (
                <span className="">Submit</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SheetsForm;
