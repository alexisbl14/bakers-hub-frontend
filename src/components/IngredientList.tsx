import InventoryActions from "../pages/InventoryActions";
import type { Ingredient } from "../types";

interface Props {
    ingredients: Ingredient[];
    onEdit: (ingredient: Ingredient) => void;
    onSuccess: () => void
}

const IngredientList = ({ ingredients, onEdit, onSuccess }: Props) => {
    return (
        <>
            <h2>Your Ingredients</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Unit</th>
                        <th>Cost</th>
                        <th>Expires</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td
                                style={{ color: item.quantity < item.low_stock_threshold ? "red": "inherit",}}
                            >
                                {item.quantity}
                            </td>
                            <td>{item.unit}</td>
                            <td>${item.cost}</td>
                            <td>{item.expiration_date}</td>
                            <td>
                                <button onClick={() => onEdit(item)}>Edit</button>
                                <InventoryActions ingredientId={item.id} onSuccess={onSuccess} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default IngredientList;