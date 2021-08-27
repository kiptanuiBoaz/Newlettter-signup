const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const app = express();

app.use(express.static("public"));



app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email; 

    const  data={
        members:[{
            email_address:email,
            status: "subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }

        }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us5.api.mailchimp.com/3.0/lists/a33d03d152";

    // https.request(url, options, function(response){

    // })
    var options =  {
        // url: "https://us18.api.mailchimp.com/3.0/lists/7680f67abc",
        method: "POST",
        auth: "boaz:7606bbeabfd1f2f0597def10d3e65b25-us5",
        // headers: {
        //            " Autho  rization": "boaz 1a051dfce57f83575e07001d3aa335bf-us5"
        // },
        // body:jsonData
    };
     
    const request = https.request(url, options, function(response){
        if(response.statusCode===200){
           
                res.sendFile(__dirname + "/success.html");
           
        }
        else{
           
                res.sendFile(__dirname + "/failure.html");
          
        }
        

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    
    })

    request.write(jsonData);
    request.end();

});
//     request(options, function(error,response,body){
        
        
//         if (errror){
//             app.get("/",function(req,res){
//                 res.sendFile(__dirname + "/failure.html");
//             });
            
//         }
//         else{
//             if(response.statusCode===200){
//                 app.get("/",function(req,res){
//                     res.sendFile(__dirname + "/success.html");
//                 });
                
//             }
//             else{
//                 app.get("/",function(req,res){
//                     res.sendFile(__dirname + "/failure.html");
//                 });
//             }
//             console.log(response.statusCode);    
//         }
//     });
// });

// app.post("/failure",function(req,res){
//     res.redirect("/");
// });

// api key
// 7606bbeabfd1f2f0597def10d3e65b25-us5
// list id
// a33d03d152

app.listen(process.env.PORT||3000 ,function(){
    console.log("server is running on port 3000.");
})