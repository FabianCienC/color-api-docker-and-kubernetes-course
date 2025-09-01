const mongoose = require("mongoose");

/*
{
    key: "primary",
    value: "purple"
}
*/

const ColorSchema = new mongoose.Schema({
    key: String,
    value: String,
});

const Color = mongoose.model("Color", ColorSchema);

const saveColor = async ({ key, value }) => {
    let color = await Color.findOne({ key });

    if (color) {
        color.set({ value });
    } else {
        color = new Color({ key, value });
    }

    await color.save();
};

const getColor = async ({ key, strict = false }) => {
    let color = await Color.findOne({ key });

    if (strict && !color) {
        return undefined;
    }

    if (color) {
        return color.value;
    }

    return process.env.DEFAULT_COLOR || "blue";
}

const getColors = async () => Color.find();

const deleteColor = async () => Color.deleteOne({ key });


module.exports = {
    saveColor,
    getColor,
    getColors,
    deleteColor,
}