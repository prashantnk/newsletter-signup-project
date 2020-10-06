const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.listen(process.env.PORT , ()=>{
    console.log("server started at port:3000");
})
app.get("/" , (req , res) =>{
    res.sendFile(__dirname + "/index.html");
});
app.post("/" , (req , res)=>{
    // console.log(req.body.email);
    let first = req.body.fname;
    let last = req.body.lname;
    let data ={
        members :[
            {
                email_address : req.body.email,
                status : "subscribed" ,
                merge_fields : {
                    FNAME : first ,
                    LNAME :last
                }
            }
        ]
    };
    data = JSON.stringify(data);
    const url = "https://us2.api.mailchimp.com/3.0/lists/f3d4af3452";
    const options ={
        method : "POST" , 
        auth : `prashant:b1f03eea4fde4e807cae68a2a3a75bf8-us2`
    }
    const request = https.request(url , options , (response)=>{
        if(response.statusCode === 200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else 
        {
            res.sendFile(__dirname + "/fail.html");
        }
        response.on("data" , (data)=>{
            console.log(JSON.parse(data));
        })
    });
    request.write(data);
    request.end();
});
app.post("/fail" , (req , res)=>{
    res.redirect("/");
});


//b1f03eea4fde4e807cae68a2a3a75bf8-us2
//f3d4af3452