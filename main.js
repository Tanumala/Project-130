function setup(){
    canvas = createCanvas(470,470);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on("pose",gotPoses);
}

function modelLoaded()
{
    console.log("Model is initialized");
}

song_1  = "";
song_2 = "";
leftWrist_x = 0;
leftWrist_y = 0;
rightWrist_x = 0;
rightWrist_y = 0;
score_leftWrist = 0;
status_of_song = "";
score_rightWrist = 0;

function preload()
{
    song_1 = loadSound("music2.mp3");
    song_2 = loadSound("music.mp3");
}

function draw()
{
    image(video,0,0,470,470);
    fill("#11f554");
    stroke("#11f554");
    status_of_song = song_1.isPlaying();
    console.log(status_of_song);
    if(score_leftWrist > 0.2)
    {
        circle(leftWrist_x,leftWrist_y,30);
        song_2.stop();
        
        if(status_of_song == false)
    {
        song_1.play();
    }
    else
    {
        console.log("Song Name: Peter Pan Song");
        document.getElementById("song_id").innerHTML = "Song Name :- Peter Pan Song" ;
    }

    }

    if(score_rightWrist > 0.2) 
    {
        circle(rightWrist_x,rightWrist_y,30);
        song_1.stop();
        
        if(song_2 == false) 
        {
            song_2.play();
        }
        else{
            console.log("Song Name: Harry Potter Theme Song");
            document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Theme Song";
        }
    }
}


function gotPoses(result)
{
    if(result.length > 0)
    {
        console.log (result);

        leftWrist_x = result[0].pose.leftWrist.x;
        leftWrist_y = result[0].pose.leftWrist.y;
        score_leftWrist = result[0].pose.keypoints[9].score;

        rightWrist_x = result[0].pose.rightWrist.x;
        rightWrist_y = result[0].pose.rightWrist.y;

        console.log("Left Wrist x = " + leftWrist_x + " Left Wrist Y = " + leftWrist_y );
        console.log("Right Wrist x = " + rightWrist_x + " Right Wrist Y = " + rightWrist_y);
        console.log(score_leftWrist);

        score_rightWrist = result[0].pose.keypoints[10].score;
        console.log(score_rightWrist);
    }
}