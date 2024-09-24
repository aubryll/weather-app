"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port = process.env.SERVER_PORT;
app_1.default
    .listen(port, () => {
    console.log(`server running on port : ${port}`);
})
    .on('error', (e) => console.error(e));
//# sourceMappingURL=server.js.map