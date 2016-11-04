const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.json())


app.get('/', function (req, res) {
    res.send('hello world, i am chatbot for botfolio');
});


var botfolioChatBot = require("botfolio-chatbot");

///Get your API_TOKEN from developers.botfol.io
var service = new botfolioChatBot("API_TOKEN");


app.post('/webhook/example_chatbot', function (req, res) {
    
    //If the request is not from botfolio server, reject it
    if (req.query['token'] != "API_TOKEN") {
        res.sendStatus(403);
        return;
    }

    var message = req.body;
    
    if (!message) {
        res.sendStatus(200);
        return;
    }
       
    switch (message.message_type) {
        //if message type is text, take actions
        case "text": {
            
            switch (message.attachment.text.toLowerCase()) {

                //Send image attachment when user type "image" to the chatbot
                case "image": {
                    service.sendImageMessage({
                        content_type: "image/png", 
                        url : "http://botfol.io/Content/images/logo.png",
                        user_id : message.user_id,
                        quick_replies: [], 
                        disable_notification: false
                    });
                    break;
                }

                //Send video attachment when user type "video" to the chatbot
                case "video": {
                    service.sendVideoMessage({
                        thumb_url: "http://s2.dmcdn.net/dsXeX.jpg",
                        content_type : "video/mp4",
                        url : "http://proxy-099.dc3.dailymotion.com/sec(b646daba73e2078a3987a9064185c3e3)/frag(4)/video/635/028/301820536_mp4_h264_aac_hq_1.ts",
                        user_id : message.user_id,
                        quick_replies: [], 
                        disable_notification: false
                    });
                    break;
                }

                //Send voice attachment when user type "voice" to the chatbot
                case "voice": {
                    service.sendVoiceMessage({
                        content_type : "audio/wav",
                        url : "http://www.wavsource.com/snds_2016-06-26_4317323406379653/people/comedians/allen_arrogh.wav",
                        user_id : message.user_id,
                        quick_replies: [], 
                        disable_notification: false
                    });
                    break;
                }

                //Send contact attachment when user type "contact" to the chatbot
                case "contact": {
                    service.sendContactMessage({
                        first_name : "Burhan",
                        last_name : "Çetinkaya",
                        phone_number : "+14158005959",
                        user_id : message.user_id,
                        quick_replies: [], 
                        disable_notification: false
                    });
                    break;
                }

                //Send location attachment when user type "location" to the chatbot
                case "location": {
                    service.sendLocationMessage({
                        latitude : 37.773972,
                        longitude : -122.431297,
                        title : "Facebook HQ",
                        address : "1 Hacker WayMenlo Park, California",
                        user_id : message.user_id,
                        quick_replies: [], 
                        disable_notification: false
                    });
                    break;
                }

                //Send document attachment when user type "document" to the chatbot
                case "document": {
                    service.sendDocumentMessage({
                        url : "http://www.pdf995.com/samples/pdf.pdf",
                        content_type : "application/pdf",
                        title : "Sample pdf",
                        user_id: message.user_id,
                        quick_replies: [], 
                        disable_notification: false
                    });
                    break;
                }

                //Send buttons template attachment when user type "buttonlist" to the chatbot
                case "buttonlist": {
                    service.sendButtonsTemplateMessage({
                        text : "Did you like botfolio?",
                        user_id: message.user_id,
                        quick_replies: [], 
                        disable_notification: false,
                        buttons: [
                            { type : "postback", title : "Yes!", payload : "I love you." },
                            { type : "postback", title : "So so", payload : "Thanks." },
                            { type : "postback", title : "Nope!!", payload : "Ok, i see..." }
                        ]
                    });
                    break;
                }

                //Send geenric template attachment when user type "generic" to the chatbot
                case "generic": {
                    service.sendGenericTemplateMessage({
                        text : "Did you like botfolio?",
                        user_id: message.user_id,
                        quick_replies: [], 
                        disable_notification: false,
                        elements: [
                            {
                                title : "Black Rivet Mens Hooded Chevron Puffy",
                                sub_title : "US $37.50",
                                image_url : "http://mc2-ii.aws.marketlive.com/fcgi-bin/iipsrv.fcgi?FIF=/images/wilsonsleather//source/BK6AN843_bk6an843c98af.tif&wid=1000&cvt=jpeg",
                                buttons: [
                                    { type : "web_url", title : "Buy", url : "http://www.ebay.com/itm/Black-Rivet-Mens-Hooded-Chevron-Puffy-/272410931908" },
                                    { type : "phone_number", title : "Call Store", payload : "+14158005959" },
                                    { type : "postback", title : "Delete", payload : "DELETE_PRODUCT" }
                                ]
                            },
                            {
                                title : "Mens Ultralight Hooded Duck Down Puffer Jacket",
                                sub_title : "US $28.49",
                                image_url : "http://i.ebayimg.com/images/g/yDMAAOSwzLlXh20m/s-l1600.jpg",
                                buttons: [
                                    { type : "web_url", title : "Buy", url : "http://www.ebay.com/itm/Mens-Ultralight-Hooded-Duck-Down-Puffer-Jacket-Coat-Warm-Outwear-Packable-Parka/302079513672" },
                                    { type : "phone_number", title : "Call Store", payload : "+14158005959" },
                                    { type : "postback", title : "Delete", payload : "DELETE_PRODUCT" }
                                ]
                            },
                            {
                                title : "Star Trek Beyond Brand New DVD",
                                sub_title : "US $16.90",
                                image_url : "http://i.ebayimg.com/images/g/~NsAAOSwXeJYEkth/s-l1600.jpg",
                                buttons: [
                                    { type : "web_url", title : "Buy", url : "hhttp://www.ebay.com/itm/Star-Trek-Beyond-Brand-New-DVD-/162222495186" },
                                    { type : "phone_number", title : "Call Store", payload : "+14158005959" },
                                    { type : "postback", title : "Delete", payload : "DELETE_PRODUCT" }
                                ]
                            },
                        ]
                    });
                    break;
                }

                //Send text message and change input type to "password" when user type "password" to the chatbot
                case "password": {
                    service.sendTextMessage({text : "Send me your password", required_input_type :"password", user_id :message.user_id, quick_replies: [], disable_notification: false});
                    break;
                }

                //Send text message and change input type to "number" when user type "number" to the chatbot
                case "number": {
                    service.sendTextMessage({ text : "Send me a number", required_input_type : "number", user_id : message.user_id , quick_replies: [], disable_notification: false});
                    break;
                }

                //Send text message and change input type to "tel" when user type "tel" to the chatbot
                case "tel": {
                    service.sendTextMessage({ text : "Send me a tel number", required_input_type : "tel", user_id : message.user_id , quick_replies: [], disable_notification: false});
                    break;
                }

                //Send text message and change input type to "email" when user type "email" to the chatbot
                case "email": {
                    service.sendTextMessage({ text : "Send me an email", required_input_type : "email", user_id : message.user_id , quick_replies: [], disable_notification: false});
                    break;
                }

                //Send text message and change input type to "decimal" when user type "decimal" to the chatbot
                case "decimal": {
                    service.sendTextMessage({ text : "Send me a decimal number", required_input_type : "decimal", user_id : message.user_id, quick_replies: [], disable_notification: false });
                    break;
                }

                //Send text message and change input type to "date" when user type "date" to the chatbot
                case "date": {
                    service.sendTextMessage({ text : "Send me date", required_input_type : "date", user_id : message.user_id, quick_replies: [], disable_notification: false });
                    break;
                }

                //Send text message and change input type to "datetime" when user type "datetime" to the chatbot
                case "datetime": {
                    service.sendTextMessage({ text : "Send me datetime", required_input_type : "datetime", user_id : message.user_id, quick_replies: [], disable_notification: false });
                    break;
                }

                //Send text message and change input type to "time" when user type "time" to the chatbot
                case "time": {
                    service.sendTextMessage({ text : "Send me time", required_input_type : "time", user_id : message.user_id , quick_replies: [], disable_notification: false});
                    break;
                }

                //Send text message and change input type to "photo" when user type "photo" to the chatbot
                case "send photo": {
                    service.sendTextMessage({ text : "Send me a photo", required_input_type : "photo", user_id : message.user_id , quick_replies: [], disable_notification: false});
                    break;
                }

                //Send text message and change input type to "video" when user type "video" to the chatbot
                case "send video": {
                    service.sendTextMessage({ text : "Send me a video", required_input_type : "video", user_id : message.user_id , quick_replies: [], disable_notification: false});
                    break;
                }

                //Send text message and change input type to "location" when user type "location" to the chatbot
                case "send location": {
                    service.sendTextMessage({
                        disable_notification: false,
                        text : "Send me a location",
                        required_input_type : "location",
                        user_id : message.user_id,
                        quick_replies: []
                    });
                    break;
                }

                //Send text message with quick replies when user type "location" to the chatbot
                case "quickreply": {
                    service.sendTextMessage({
                        required_input_type: "text",
                        disable_notification: false,
                        user_id : message.user_id,
                        text : "How may i help you?",
                        quick_replies : [{ title : "Find a product", payload: "FIND_PRODUCT" }, { title: "Buy a product", payload : "BUY_PRODUCT_1467476" }]
                    });
                    break;
                }

                default: {
                    service.sendTextMessage({
                        required_input_type: "text",
                        disable_notification: false,
                        text : message.attachment.text, 
                        user_id : message.user_id,
                        quick_replies: []
                    });
                }
            }
            
            break;
        }
        //if message type is image, echo the message
        case "image": {
            service.sendImageMessage({
                required_input_type: "text",
                disable_notification: false,
                content_type : message.attachment.content_type,
                url : message.attachment.url,
                user_id: message.user_id,
                quick_replies: []
            });
            break;
        }
        //if message type is video, echo the message
        case "video": {
            service.sendVideoMessage({
                required_input_type: "text",
                disable_notification: false,
                content_type : message.attachment.content_type,
                url : message.attachment.url,
                thumb_url: message.attachment.thumb_url,
                user_id: message.user_id,
                quick_replies: []
            });
            break;
        }
        //if message type is location, echo the message
        case "location": {
            service.sendLocationMessage({
                required_input_type: "text",
                disable_notification: false,
                latitude : message.attachment.latitude ,
                longitude : message.attachment.longitude ,
                title : "New york",
                address : "New york city, 3th street",
                user_id : message.user_id,
                quick_replies: []
            });
            break;
        }
        //if message type is voice, echo the message
        case "voice": {
            service.sendVoiceMessage({
                required_input_type: "text",
                disable_notification: false,
                content_type : message.attachment.content_type,
                url : message.attachment.url,
                user_id: message.user_id,
                quick_replies: []
            });
            break;
        }
        //if message type is postback, send payload as text message
        case "postback": {
            service.sendTextMessage({
                required_input_type: "text",
                disable_notification: false,
                text : "Your payload is " + message.attachment.payload, 
                user_id : message.user_id,
                quick_replies: []
            });
            break;
        }
        default: {
            service.sendTextMessage({
                required_input_type: "text",
                disable_notification: false,
                text : "I could not understand you.", 
                user_id : message.user_id,
                quick_replies: []
            });
            break;
        }
}


    res.sendStatus(200);
});



app.listen(app.get('port'), function () {
    console.log('running on port', app.get('port'))
})