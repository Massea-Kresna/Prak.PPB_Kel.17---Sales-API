import { CustomerModel } from "../models/customerModel.js"; 
 
export const CustomerController = { 
  async getAll(req, res) { 
    try { 
      const { name, page = 1, limit = 10 } = req.query;
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const customers = await CustomerModel.getAll(name, pageNum, limitNum); 
      res.json(customers); 
    } catch (err) { 
      res.status(500).json({ error: err.message }); 
    } 
  }, 
 
  async getById(req, res) { 
    try { 
      const customer = await CustomerModel.getById(req.params.id); 
      res.json(customer); 
    } catch (err) { 
      res.status(404).json({ error: err.message }); 
    } 
  }, 
 
  async create(req, res) { 
    try { 
      const { email, phone } = req.body;

      if (email && !email.includes('@')){
        return res.status(400).json({ error: "Email tidak valid. Wajib mengandung karakter '@'"});
      }

      if (phone && phone.length < 10){
        return res.status(400).json({ error: "Nomor telepon tidak valid. Minimal 10 karakter"});
      }

      const customer = await CustomerModel.create(req.body); 
      res.status(201).json(customer); 
    } catch (err) { 
      res.status(400).json({ error: err.message });
          } 
  }, 
 
  async update(req, res) { 
    try { 
      const { email, phone } = req.body;

      if (email && !email.includes('@')){
        return res.status(400).json({ error: "Email tidak valid. Wajib mengandung karakter '@'"});
      }

      if (phone && phone.length < 10){
        return res.status(400).json({ error: "Nomor telepon tidak valid. Minimal 10 karakter"});
      }

      const customer = await CustomerModel.update(req.params.id, req.body); 
      res.json(customer); 
    } catch (err) { 
      res.status(400).json({ error: err.message }); 
    } 
  }, 
 
  async remove(req, res) { 
    try { 
      await CustomerModel.remove(req.params.id); 
      res.json({ message: "Customer deleted successfully" }); 
    } catch (err) { 
      res.status(400).json({ error: err.message }); 
    } 
  }, 
};