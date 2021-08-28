status = ""
objects = []
alarm = ""

function preload()
{
    alarm = loadSound("alarm.mp3")
}

function setup()
{
    canvas = createCanvas(400, 380)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(400,380)
    video.hide()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("label").innerHTML = "Status: Detecting Objects"
}

function modelLoaded()
{
  console.log("Model Loaded")
  status = true;
}

function gotResult(error, results)
{
  if (error)
  {
    console.log(error);
  }
  console.log(results);
  objects = results
}

function draw()
{
    image(video,0,0,400,380)

  if(status == "true")
  objectDetector.detect(video, gotResult);
  {
    for(i=0; i<objects.length;i++)
    {
        if(objects[0].label == "person"){
             r = random(255)
            g = random(255)
            b = random(255)
            fill(r,g,b)
            confi = floor(objects[i].confidence * 100)
            textSize(30)
            text(objects[i].label + " " + confi + "%", objects[i].x, objects[i].y)
            noFill()
            stroke("magenta")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
            document.getElementById("label").innerHTML = "Status: Objects detected"
            document.getElementById("babystat").innerHTML = "Baby Found"
            alarm.stop()
      }
      else if(objects[0].label != "person")
      {
        r = random(255)
        g = random(255)
        b = random(255)
        fill(r,g,b)
        confi = floor(objects[i].confidence * 100)
        textSize(30)
        text(objects[i].label + " " + confi + "%", objects[i].x, objects[i].y)
        noFill()
        stroke("magenta")
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        document.getElementById("label").innerHTML = "Status: Objects detected"
        document.getElementById("babystat").innerHTML = "Baby Not Found"
alarm.play()
      }
         }
  }
  
}