/**
 * Created by Gabry on 29-12-2016.
 */
const cronJob = require('cron').CronJob;
const process = require('child_process');


try {
    new cronJob('* * * * * *', function () {
        console.log('You will see this message every second');
        try {
            //../../price_tracking/Price_tracking_framework/phantom_scrapers/start_scraping.js
            let child = process.spawn('node', ['../../price_tracking/Price_tracking_framework/phantom_scrapers/start_scraping.js']);
            if (child)
                listenToChildProcess(child);
            else
                console.log('child process could not be started');
        }
        catch(e){
            console.log('childprocess execution exception', e);
        }

    }, null, true, 'Europe/Amsterdam');
} catch (ex){
    console.log('cron pattern not valid', ex);
}

function listenToChildProcess(child){
    child.stdout.on('data', function (data){
        let buff = new Buffer(data);
        console.log('child stdout', buff.toString('utf8'));
    });

    child.stderr.on('data', function (err){
        console.log('child stderr', err);
    });

    child.on('exit', function (code){
        console.log('child exited with code', code);
    });

    child.on('close', function (code){
        console.log('child closed with code', code);
    });

    child.on('message', function (data){
        console.log('child message:', data);
    });
}