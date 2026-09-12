import { ReportModel } from "../models/reportModel.js";

export const ReportController = {
    async getTotalCustomers(req, res) {
        try {
            const total = await ReportModel.getTotalCustomers();
            
            // Mengembalikan respons dalam format JSON
            res.json({ 
                total_customers: total 
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};