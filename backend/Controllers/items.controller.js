import Item from "../Models/items.Model.js";

export const postadditems = async (req, res) => {
  let { category, productname, price } = req.body;
  if (!category || !productname || !price) {
    return res
      .status(400)
      .json({ msg: "Not all the fields have been entered" });
  } else {
    try {
      const newdata = new Item({
        category,
        productname,
        price,
      });
      await newdata.save();
      return res.status(201).json({ msg: "Item saved successfully" });
    } catch (error) {
      console.error("Error during saving Item", error);
      return res.status(500).json({ msg: "Error saving item" });
    }
  }
};

export const getdatabase = async (req, res) => {
  try {
    let alldata = await Item.find();
    // console.log("data is send", alldata);
    res.json(alldata);
  } catch (error) {
    console.error("Error fetching alldata", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
