import React, { useState } from "react";
import { env } from "~/env";
import { getFormattedDates } from "../utils/helper/sheetsForm";

interface FormState {
  date: string;
  transaction: string;
  amount: string;
  category: string;
  sub_category: string;
}

interface AppCategories {
  Expenses: string[];
  Bills: string[];
  Subscriptions: string[];
  Income: string[];
  "Savings & Investments": string[];
}

const SheetsForm = ({ onAfterSubmit }: { onAfterSubmit: () => void }) => {
  const APP_CATEGORIES: AppCategories = JSON.parse(
    env.NEXT_PUBLIC_APP_CATEGORIES,
  ) as AppCategories;
  const currentDate = new Date();
  const initialFormState: FormState = {
    ...getFormattedDates(currentDate),
    transaction: "",
    amount: "",
    category: "Expenses",
    sub_category: "Food",
  };

  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionError, setTransactionError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  const resetForm = () => {
    setFormData(initialFormState);
    setTransactionError(false);
    setAmountError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.transaction) {
      setTransactionError(true);
      return;
    }

    if (!formData.amount ?? isNaN(Number(formData.amount))) {
      setAmountError(true);
      return;
    }

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

    if (e.target.name === "category") {
      const selectedCategory = e.target.value;
      if (isValidCategory(selectedCategory)) {
        setFormData({
          ...formData,
          category: selectedCategory,
          sub_category: APP_CATEGORIES[selectedCategory][0] ?? "",
        });
      }
      return;
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Reset error state when user enters value in field with error
    if (e.target.name === "transaction") {
      setTransactionError(false);
    }

    if (e.target.name === "amount") {
      setAmountError(false);
    }
  };

  // Add a type guard to check if the category is a valid key in AppCategories
  function isValidCategory(category: string): category is keyof AppCategories {
    return category in APP_CATEGORIES;
  }

  return (
    <div className="relative flex flex-col justify-center overflow-hidden">
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
              className={`input input-bordered w-full ${
                transactionError ? "input-error" : ""
              }`}
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
              className={`input input-bordered w-full ${
                amountError ? "input-error" : ""
              }`}
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
              {Object.keys(APP_CATEGORIES).map((category) => (
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
              {(isValidCategory(formData.category)
                ? APP_CATEGORIES[formData.category]
                : []
              ).map((sub_category: string) => (
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
                <span className="loading loading-dots loading-md"></span>
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
