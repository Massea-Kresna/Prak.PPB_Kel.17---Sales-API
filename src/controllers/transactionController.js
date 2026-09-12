import { TransactionModel } from "../models/transactionModel.js";
import { ProductModel } from "../models/productModel.js";

export const TransactionController = {
    async create(req, res) {
        try {
            const { customer_id, product_id, quantity } = req.body;

            const product = await ProductModel.getById(product_id);
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }
            if (product.stock < quantity) {
                return res.status(400).json({ error: "Insufficient stock" });
            }

            const total_price = product.price * quantity;

            const transactionData = {
                customer_id,
                product_id,
                quantity,
                total_price
            };
            const transaction = await TransactionModel.create(transactionData);

            const updatedStock = product.stock - quantity;
            await ProductModel.update(product_id, { stock: updatedStock });

            res.status(201).json({
                message: "Transaction successful",
                transaction,
                remaining_stock: updatedStock
            });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async getAll(req, res) {
        try {
            const transactions = await TransactionModel.getAll();
            res.json(transactions);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};