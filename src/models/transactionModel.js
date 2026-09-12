import { supabase } from "../config/supabaseClient.js";

export const TransactionModel = {
    async create(payload) {
        const { data, error } = await supabase
            .from("transactions")
            .insert([payload])
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },
    
    async getAll() {
        const { data, error } = await supabase
            .from("transactions")
            .select(`
                id,
                quantity,
                total_price,
                transaction_date,
                customers ( id, name ),
                products ( id, name, price )
            `);
            
        if (error) throw error;
        return data;
    }
};
