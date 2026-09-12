import { supabase } from "../config/supabaseClient.js";

export const ReportModel = {
    async getTotalCustomers() {
        const { count, error } = await supabase
            .from("customers")
            .select("*", { count: "exact", head: true });

        if (error) throw error;
        return count;
    }
};