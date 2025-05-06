import { useEffect, useState } from "react";
import API from "../services/api";
import type { Ingredient } from "../types";
import IngredientList from "../components/IngredientList";


const InventoryPage = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

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


    return (
        <>
            <h1>Inventory</h1>
            <IngredientList ingredients={ingredients}/>
        </>
    )
}

export default InventoryPage;