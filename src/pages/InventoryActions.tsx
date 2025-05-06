import { useState } from "react";
import API from "../services/api";

interface Props {
    ingredientId: number;
    onSuccess: () => void;
}

const InventoryActions = ({ ingredientId, onSuccess }: Props) => {
    const [amount, setAmount] = useState("");

    const handleAction = async (type: "add" | "deduct") => {
        if (!amount || isNaN(Number(amount))) return alert("Enter a valid amount");
        try {
            await API.post(`inventory/ingredients/${ingredientId}/${type}/`, { amount: Number(amount) });
            setAmount("");
            onSuccess();
        } catch (err) {
            console.error(`${type} failed`, err);
            alert("Failed to update inventory");
        }
    };

    return (
        <div>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Qty"
            />
            <button onClick={() => handleAction("add")}>➕</button>
            <button onClick={() => handleAction("deduct")}>➖</button>
        </div>
    );
};

export default InventoryActions;