import { TransactionModel } from "../models/transactionModel.js";
import { ProductModel } from "../models/productModel.js";

export const TransactionController = {
    async create(req, res) {
        try {
            const { customer_id, product_id, quantity } = req.body;

            // 1. Cek data produk dan ketersediaan stok
            const product = await ProductModel.getById(product_id);
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }
            if (product.stock < quantity) {
                return res.status(400).json({ error: "Insufficient stock" });
            }

            // 2. Hitung total harga transaksi
            const total_price = product.price * quantity;

            // 3. Masukkan data transaksi ke database
            const transactionData = {
                customer_id,
                product_id,
                quantity,
                total_price
            };
            const transaction = await TransactionModel.create(transactionData);

            // 4. Hitung dan perbarui (kurangi) stok produk di database
            const updatedStock = product.stock - quantity;
            await ProductModel.update(product_id, { stock: updatedStock });

            // 5. Kirim respons sukses
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