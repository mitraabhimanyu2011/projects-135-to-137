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
    // if(rank != "")
    // {
    //     for(i = 0; i < objects.length; i++)
    //     {
    //         r = random(255);
    //         g = random(255);
    //         b = random(255);
    //         objectDetector.detect(video, gotResult);
    //         document.getElementById("status").innerHTML = "Status: Objects have been DETECTED!";
    //         document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: " + objects.length;
    //         fill(r, g, b);
    //         percent = floor(objects[i].confidence * 100);
    //         text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
    //         noFill();
    //         stroke(r, g, b);
    //         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    //     }
    // }
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