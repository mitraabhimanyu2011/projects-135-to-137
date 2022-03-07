rank = "";
objects = [];
words = "";

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(rank != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: " + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == words)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = "The " + words + " has been found!";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance("The " + words + "has been found!");
                synth.speak(utterThis);
            }
            else
            {
              document.getElementById("status").innerHTML = words + "The " + words + " hasn't been found yet. Please wait...";
            }
        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    words = document.getElementById("text-input").value;
    
}

function modelLoaded()
{
    console.log("Model Loaded!");
    rank = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}