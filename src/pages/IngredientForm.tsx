import { useState, useEffect } from "react";
import API from "../services/api";
import type { Ingredient } from "../types";

interface Props {
    initialData?: Ingredient | null;
    onSuccess: () => void;
    onClose: () => void;
}

const IngredientForm = ({ initialData, onSuccess, onClose }: Props) => {
    const [formData, setFormData] = useState({
        name: "",
        quantity: 0,
        unit: "",
        cost: 0,
        expiration_date: "",
        low_stock_threshold: 0,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({ ...initialData });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (initialData) {
                await API.put(`inventory/ingredients/${initialData.id}/`, formData);
            } else {
                await API.post("inventory/ingredients/", formData);
            }
            onSuccess();
        } catch (err) {
            console.error("Submit failed", err);
        }
    };
    return (
        <>
            <h3>{initialData ? "Edit" : "Add New"} Ingredient</h3>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                    required
                />
                <input
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    placeholder="Unit"
                    required
                />
                <input
                    name="cost"
                    type="number"
                    step="0.01"
                    value={formData.cost}
                    onChange={handleChange}
                    placeholder="Cost"
                 />
                <input
                    name="expiration_date"
                    type="date"
                    value={formData.expiration_date}
                    onChange={handleChange}
                    placeholder="Expiration Date"
                />
                <input
                    name="low_stock_threshold"
                    type="number"
                    value={formData.low_stock_threshold}
                    onChange={handleChange}
                    placeholder="Low Stock Threshold"
                />
                <div>
                    <button type="submit">{initialData ? "Save Changes" : "Add Ingredient"}</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </>
    )
}

export default IngredientForm;