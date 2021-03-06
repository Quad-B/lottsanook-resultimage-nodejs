const Pageres = require('pageres');
var http = require('http');
var fs = require('fs');
const request = require('request');
const url = require('url');

require('dotenv').config();

function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

function convertmonthtotext(month) {
    switch (month) {
        case '01': return "มกราคม"; break;
        case '02': return "กุมภาพันธ์"; break;
        case '03': return "มีนาคม"; break;
        case '04': return "เมษายน"; break;
        case '05': return "พฤษภาคม"; break;
        case '06': return "มิถุนายน"; break;
        case '07': return "กรกฎาคม"; break;
        case '08': return "สิงหาคม"; break;
        case '09': return "กันยายน"; break;
        case '10': return "ตุลาคม"; break;
        case '11': return "พฤศจิกายน"; break;
        case '12': return "ธันวาคม"; break;
    }
}

http.createServer(function (req, res) {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let byear = new Date().getFullYear() + 543;

    date = padLeadingZeros(date, 2);
    month = padLeadingZeros(month, 2);

    if (req.url == '/fbbg') {
        res.writeHead(200, { 'content-type': 'image/jpg' });
        fs.createReadStream('fbbg.jpg').pipe(res);
    } else if (req.url == '/fbrmbg') {
        res.writeHead(200, { 'content-type': 'image/png' });
        fs.createReadStream('fb_rmbg_sb.png').pipe(res);
    } else {
        (async () => {

            let test = {}
            let datecheck

            if (url.parse(req.url, true).query.date) {
                datecheck = url.parse(req.url, true).query.date;
            } else {
                datecheck = date + month + byear;
            }

            var options = {
                'method': 'GET',
                'url': 'https://main-lottsan-xmutu31582svy3ko-gtw.qovery.io/?date=' + datecheck,
                'json': true,
                'headers': {
                }
            };

            request(options, async function (error, response) {
                if (error) throw new Error(error);
                console.log(response.body[0][1]);
                test = response.body

                if (url.parse(req.url, true).query.bgimg) {
                    await new Pageres({ delay: 2, filename: "<%= date %>", launchOptions: { args: ['--no-sandbox', '--disable-setuid-sandbox', '--no-first-run', '--disable-extensions'] } })
                        //.src('data:text/html,<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/css/bootstrap.min.css" integrity="sha384-DhY6onE6f3zzKbjUPRc2hOzGAdEf4/Dz+WJwBvEYL/lkkIsI3ihufq9hk9K4lVoK" crossorigin="anonymous"><link href="https://fonts.googleapis.com/css2?family=Mitr&display=swap" rel="stylesheet"><style>body{font-family: \'Mitr\', Kinnari;background-image: url(\'http://localhost:'+process.env.PORT+'/fbbg\');color: white;}</style></head><h1 style="margin-top: 150px;margin-left: 180px;font-size: 80px;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="margin-top: 15px;margin-left: 0px;font-size: 50px;margin-right: 590px;text-align: right;">เมื่อประจำวันที่ '+parseInt(datecheck.substring(0, 2))+' '+monthtext+' '+datecheck.substring(4, 8)+'</h2><h2 style="margin-top: 50px;font-size: 80px;margin-left: 450px;">รางวัลที่ 1</h2><h2 style="font-size: 12.25vw;margin-left: 190px;margin-top: -40px;margin-right: 650px;text-align: center;">'+test[0][1]+'</h2><h2 style="margin-left: 1095px;margin-top: -255px;font-size: 50px;">เลขท้าย สองตัว</h2><h2 style="margin-left: 1120px;font-size: 150px;margin-top: -10px;">'+test[3][1]+'</h2><h2 style="margin-top: 25px;margin-left: 325px;font-size: 60px;">เลขหน้า สามตัว</h2><h2 style="font-size: 100px;margin-left: 260px;">'+test[1][1]+' | '+test[1][2]+'</h2><h2 style="margin-left: 875px;margin-top: -207px;font-size: 60px;">เลขท้าย สามตัว</h2><h2 style="font-size: 5.96vw;margin-left: 805px;max-width: 475px;">'+test[1][1]+' | '+test[1][2]+'</h2>', ['1600x1066'])
                        //.src('data:text/html,<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/css/bootstrap.min.css" integrity="sha384-DhY6onE6f3zzKbjUPRc2hOzGAdEf4/Dz+WJwBvEYL/lkkIsI3ihufq9hk9K4lVoK" crossorigin="anonymous"><style>body{font-weight: 700;font-family: \'Mitr Light\';background-image: url(\'http://localhost:'+process.env.PORT+'/fbbg\');color: white;}</style></head><h1 style="margin-top: 150px;margin-left: 180px;font-size: 80px;font-weight: 700;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="margin-top: 15px;margin-left: 0px;font-size: 50px;margin-right: 590px;text-align: right;font-weight: 700;">เมื่อประจำวันที่ '+parseInt(datecheck.substring(0, 2))+' '+monthtext+' '+datecheck.substring(4, 8)+'</h2><h2 style="margin-top: 50px;font-size: 80px;margin-left: 450px;">รางวัลที่ 1</h2><h2 style="font-size: 12.25vw;margin-left: 190px;margin-top: -40px;margin-right: 650px;text-align: center;font-weight: 700;">'+test[0][1]+'</h2><h2 style="margin-left: 1095px;margin-top: -255px;font-size: 50px;font-weight: 700;">เลขท้าย สองตัว</h2><h2 style="margin-left: 1120px;font-size: 150px;margin-top: -10px;font-weight: 700;">'+test[3][1]+'</h2><h2 style="margin-top: 25px;margin-left: 325px;font-size: 60px;font-weight: 700;">เลขหน้า สามตัว</h2><h2 style="font-size: 100px;margin-left: 260px;font-weight: 700;">'+test[1][1]+' | '+test[1][2]+'</h2><h2 style="margin-left: 875px;margin-top: -207px;font-size: 60px;font-weight: 700;">เลขท้าย สามตัว</h2><h2 style="font-size: 5.96vw;margin-left: 805px;max-width: 475px;font-weight: 700;">'+test[2][1]+' | '+test[2][2]+'</h2>', ['1600x1066'])
                        .src('data:text/html,<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{font-weight: 700;font-family: \'Mitr Light\';background-image: url(\'http://localhost:' + process.env.PORT + '/fbrmbg\'), url(\'' + url.parse(req.url, true).query.bgimg + '\');background-position: center, center;background-repeat: no-repeat,no-repeat;background-size: cover,cover;color: white;}</style></head><h1 style="margin-top: 135px;margin-left: 180px;font-size: 80px;margin-bottom: 0px;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="font-size: 50px;margin-right: 590px;text-align: right;margin-top: -10px;margin-bottom: 0px;">เมื่อประจำวันที่ ' + parseInt(datecheck.substring(0, 2)) + ' ' + convertmonthtotext(datecheck.substring(2, 4)) + ' ' + datecheck.substring(4, 8) + '</h2><h2 style="font-size: 80px;margin-left: 450px;margin-top: 25px;margin-bottom: 0px;">รางวัลที่ 1</h2><h2 style="font-size: 11.25vw;margin-left: 190px;margin-top: -65px;margin-right: 650px;text-align: center;margin-bottom: 0px;">' + test[0][1] + '</h2><h2 style="margin-left: 1095px;margin-top: -285px;font-size: 50px;margin-bottom: 15px;">เลขท้าย สองตัว</h2><h2 style="margin-left: 1120px;font-size: 150px;margin-top: -45px;margin-bottom: 0px;">' + test[3][1] + '</h2><h2 style="margin-top: -20px;margin-left: 325px;font-size: 60px;margin-bottom: 0px;">เลขหน้า สามตัว</h2><h2 style="font-size: 5.7vw;margin-left: 260px;margin-top: -15px;">' + test[1][1] + ' | ' + test[1][2] + '</h2><h2 style="margin-left: 875px;margin-top: -300px;font-size: 60px;margin-bottom: 0px;">เลขท้าย สามตัว</h2><h2 style="font-size: 5.7vw;margin-left: 805px;max-width: 475px;margin-top: -15px;">' + test[2][1] + ' | ' + test[2][2] + '</h2>', ['1600x1066'])
                        .dest(__dirname)
                        .run();
                } else {
                    await new Pageres({filename: "<%= date %>", launchOptions: { args: ['--no-sandbox', '--disable-setuid-sandbox', '--no-first-run', '--disable-extensions'] } })
                        //.src('data:text/html,<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/css/bootstrap.min.css" integrity="sha384-DhY6onE6f3zzKbjUPRc2hOzGAdEf4/Dz+WJwBvEYL/lkkIsI3ihufq9hk9K4lVoK" crossorigin="anonymous"><link href="https://fonts.googleapis.com/css2?family=Mitr&display=swap" rel="stylesheet"><style>body{font-family: \'Mitr\', Kinnari;background-image: url(\'http://localhost:'+process.env.PORT+'/fbbg\');color: white;}</style></head><h1 style="margin-top: 150px;margin-left: 180px;font-size: 80px;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="margin-top: 15px;margin-left: 0px;font-size: 50px;margin-right: 590px;text-align: right;">เมื่อประจำวันที่ '+parseInt(datecheck.substring(0, 2))+' '+monthtext+' '+datecheck.substring(4, 8)+'</h2><h2 style="margin-top: 50px;font-size: 80px;margin-left: 450px;">รางวัลที่ 1</h2><h2 style="font-size: 12.25vw;margin-left: 190px;margin-top: -40px;margin-right: 650px;text-align: center;">'+test[0][1]+'</h2><h2 style="margin-left: 1095px;margin-top: -255px;font-size: 50px;">เลขท้าย สองตัว</h2><h2 style="margin-left: 1120px;font-size: 150px;margin-top: -10px;">'+test[3][1]+'</h2><h2 style="margin-top: 25px;margin-left: 325px;font-size: 60px;">เลขหน้า สามตัว</h2><h2 style="font-size: 100px;margin-left: 260px;">'+test[1][1]+' | '+test[1][2]+'</h2><h2 style="margin-left: 875px;margin-top: -207px;font-size: 60px;">เลขท้าย สามตัว</h2><h2 style="font-size: 5.96vw;margin-left: 805px;max-width: 475px;">'+test[1][1]+' | '+test[1][2]+'</h2>', ['1600x1066'])
                        //.src('data:text/html,<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/css/bootstrap.min.css" integrity="sha384-DhY6onE6f3zzKbjUPRc2hOzGAdEf4/Dz+WJwBvEYL/lkkIsI3ihufq9hk9K4lVoK" crossorigin="anonymous"><style>body{font-weight: 700;font-family: \'Mitr Light\';background-image: url(\'http://localhost:'+process.env.PORT+'/fbbg\');color: white;}</style></head><h1 style="margin-top: 150px;margin-left: 180px;font-size: 80px;font-weight: 700;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="margin-top: 15px;margin-left: 0px;font-size: 50px;margin-right: 590px;text-align: right;font-weight: 700;">เมื่อประจำวันที่ '+parseInt(datecheck.substring(0, 2))+' '+monthtext+' '+datecheck.substring(4, 8)+'</h2><h2 style="margin-top: 50px;font-size: 80px;margin-left: 450px;">รางวัลที่ 1</h2><h2 style="font-size: 12.25vw;margin-left: 190px;margin-top: -40px;margin-right: 650px;text-align: center;font-weight: 700;">'+test[0][1]+'</h2><h2 style="margin-left: 1095px;margin-top: -255px;font-size: 50px;font-weight: 700;">เลขท้าย สองตัว</h2><h2 style="margin-left: 1120px;font-size: 150px;margin-top: -10px;font-weight: 700;">'+test[3][1]+'</h2><h2 style="margin-top: 25px;margin-left: 325px;font-size: 60px;font-weight: 700;">เลขหน้า สามตัว</h2><h2 style="font-size: 100px;margin-left: 260px;font-weight: 700;">'+test[1][1]+' | '+test[1][2]+'</h2><h2 style="margin-left: 875px;margin-top: -207px;font-size: 60px;font-weight: 700;">เลขท้าย สามตัว</h2><h2 style="font-size: 5.96vw;margin-left: 805px;max-width: 475px;font-weight: 700;">'+test[2][1]+' | '+test[2][2]+'</h2>', ['1600x1066'])
                        .src('data:text/html,<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{font-weight: 700;font-family: \'Mitr Light\';background-image: url(\'http://localhost:' + process.env.PORT + '/fbbg\');color: white;}</style></head><h1 style="margin-top: 135px;margin-left: 180px;font-size: 80px;margin-bottom: 0px;">ผลรางวัลสลากกินแบ่งรัฐบาล</h1><h2 style="font-size: 50px;margin-right: 590px;text-align: right;margin-top: -10px;margin-bottom: 0px;">เมื่อประจำวันที่ ' + parseInt(datecheck.substring(0, 2)) + ' ' + convertmonthtotext(datecheck.substring(2, 4)) + ' ' + datecheck.substring(4, 8) + '</h2><h2 style="font-size: 80px;margin-left: 450px;margin-top: 25px;margin-bottom: 0px;">รางวัลที่ 1</h2><h2 style="font-size: 11.25vw;margin-left: 190px;margin-top: -65px;margin-right: 650px;text-align: center;margin-bottom: 0px;">' + test[0][1] + '</h2><h2 style="margin-left: 1095px;margin-top: -285px;font-size: 50px;margin-bottom: 15px;">เลขท้าย สองตัว</h2><h2 style="margin-left: 1120px;font-size: 150px;margin-top: -45px;margin-bottom: 0px;">' + test[3][1] + '</h2><h2 style="margin-top: -20px;margin-left: 325px;font-size: 60px;margin-bottom: 0px;">เลขหน้า สามตัว</h2><h2 style="font-size: 5.7vw;margin-left: 260px;margin-top: -15px;">' + test[1][1] + ' | ' + test[1][2] + '</h2><h2 style="margin-left: 875px;margin-top: -300px;font-size: 60px;margin-bottom: 0px;">เลขท้าย สามตัว</h2><h2 style="font-size: 5.7vw;margin-left: 805px;max-width: 475px;margin-top: -15px;">' + test[2][1] + ' | ' + test[2][2] + '</h2>', ['1600x1066'])
                        .dest(__dirname)
                        .run();
                }

                res.writeHead(200, { 'content-type': 'image/png' });
                fs.createReadStream(year + '-' + month + '-' + date + '.png').pipe(res);
                console.log('Finished generating screenshots!');
            });

        })();
    }
}).listen(process.env.PORT || 3000);
