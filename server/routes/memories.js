const express = require("express");
const router = express.Router();

const { getMemories, postMemory, deleteMemory, editMemory } = require("../controllers/memories");

router.route("/memories").get(getMemories);
router.route("/memory").post(postMemory);
router.route("/memory/:id").delete(deleteMemory).patch(editMemory);
module.exports = router;
