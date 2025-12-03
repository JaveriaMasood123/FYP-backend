import MenuItem from '../models/MenuItem.js';

// Add Menu Item
export const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, categoryId, catererId } = req.body;

    // Build object to save
    const newItemData = { name, description, price, categoryId, catererId };

    // Add imageUrl only if file uploaded
    if (req.file) newItemData.imageUrl = req.file.path;

    const newItem = await MenuItem.create(newItemData);

    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    console.error(err); // Logs real error in terminal
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Menu Item
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, categoryId } = req.body;

    const updatedData = { name, description, price, categoryId };
    if (req.file) updatedData.imageUrl = req.file.path;

    const updatedItem = await MenuItem.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.json({ success: true, data: updatedItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Menu Item
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};





















