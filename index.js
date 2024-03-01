const express = require('express');
const app = express();
const port = process.env.PORT || 8789; // Ensure the port matches Qoddi's deployment settings

// Initialize instrument list and header string
let inst_list = ["Updated Time, Instrument Name, User Name, Available IPs\n\n"];
let decryptorVersion;

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Endpoint to get the current decryptor version
app.get("/SpringDecryptor", (req, res) => {
  res.send(decryptorVersion || "No version set");
});

// Endpoint to set the decryptor version
app.get("/SpringDecryptorSet", (req, res) => {
  decryptorVersion = req.query.version;
  console.log("Current version is:", decryptorVersion);
  res.send(`Version set to ${decryptorVersion}`);
});

// Main logging endpoint
app.get('/', (req, res) => {
    const dateTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }).replace(",","").replace(" ","");
    const { inst, name, ipaddr, empty } = req.query;

    console.log("Received data:", req.query);

    if (parseInt(empty) === 0) {
        inst_list = ["Updated Time, Instrument Name, User Name, Available IPs\n\n"];
    } else if (inst) {
        const cmd = `${dateTime}, ${inst}, ${name}, ${ipaddr}\n\n`;
        const index = inst_list.findIndex(entry => entry.includes(inst));
        
        if (index >= 0) {
            inst_list[index] = cmd; // Update existing entry
        } else {
            inst_list.push(cmd); // Add new entry
        }
    } else {
        console.log("Undefined or invalid request");
    }

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write('<< Current UXM5G users >> \n\n\n' + inst_list.join(""));
    res.end("\n\n<< END >>");
});

// Additional endpoints for specific functionalities (e.g., /uxm5g)
app.get("/uxm5g", (req, res) => {
    res.send("UXM5G service is running...");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
