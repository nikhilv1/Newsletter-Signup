const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {
    //const dataShortcut = req.body;
    const fName = req.body.fName;
    const sName = req.body.sName;
    const email = req.body.email;

    const userData = {
        members: [
        {
                email_address: email,
                status: "subscribed",
                merge_feilds: {
                    FNAME: fName,
                    LNAME: sName
                }
            }
         ]
       };

    const jsonData = JSON.stringify(userData);

    const url = "https://us7.api.mailchimp.com/3.0/lists/c82b648280";

    const options = {
        method: "POST",
        auth: "vinay123:23908b6b32215b7d3e424ca817ec92c9-us7"
    }

    const request = https.request(url, options, (response) => {
        console.log(response.statusCode);
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }


        response.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", (req,res) => {
    res.redirect("/");
});


app.listen(process.env.PORT ||  3000, () => {
    console.log("Server is running");
});

// f007cceda3aae0c781f67fa2f14f6713-us4
// 9660118054

//my API Key
//23908b6b32215b7d3e424ca817ec92c9-us7

//list id
// c82b648280