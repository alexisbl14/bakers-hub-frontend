import { useEffect, useState } from "react";
import API from "../services/api";
import type { Ingredient } from "../types";
import IngredientList from "../components/IngredientList";
import IngredientForm from "./IngredientForm";


const InventoryPage = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);

    const fetchIngredients = async () => {
        try {
            const res = await API.get("inventory/ingredients/");
            setIngredients(res.data);
        } catch (err) {
            console.log("Failed to load ingredients", err);
        }
    };

    useEffect(() => {
        fetchIngredients();
    }, []);

    const handleEditClick = (ingredient: Ingredient) => {
        setEditingIngredient(ingredient);
        setShowForm(true);
    }

    const handleAddClick = () => {
        setEditingIngredient(null);
        setShowForm(true)
    }

    return (
        <>
            <h1>Inventory</h1>
            <button onClick={handleAddClick}>Add New Ingredient</button>
            <IngredientList ingredients={ingredients} onEdit={handleEditClick}/>
            { showForm && (
                <IngredientForm
                    initialData={editingIngredient}
                    onSuccess={() => {
                        setShowForm(false);
                        fetchIngredients();
                    }}
                    onClose={() => setShowForm(false)}/>
            )}
        </>
    )
}

export default InventoryPage;