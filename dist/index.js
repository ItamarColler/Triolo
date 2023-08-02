"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const tsyringe_1 = require("tsyringe");
const authRoutes_1 = require("./routes/authRoutes");
const expenseRoutes_1 = require("./routes/expenseRoutes");
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, // Add any other connection options you need
};
mongoose_1.default.connect(process.env.MONGO_URI || '', dbOptions)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});
const db = mongoose_1.default.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
});
db.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err.message);
});
// Middleware to parse JSON body
app.use(express_1.default.json());
// Register routes
tsyringe_1.container.resolve(authRoutes_1.AuthRoutes).register(app);
tsyringe_1.container.resolve(expenseRoutes_1.ExpenseRoutes).register(app);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
