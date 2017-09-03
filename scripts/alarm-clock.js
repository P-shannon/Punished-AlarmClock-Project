var now = new Date();
var alarm = new Date(0,0,0,0,0,0,0);
var runningClock = null; //a variable that allows us to stop the clock if need be.
var alarmSet = 0;
var aHour = 0;
var aMinute = 0;
var aSecond = 0;
var alarming = 0;
//offset variables for changing time
var hOffset = 0;
var mOffset = 0;
var sOffset = 0;
var display = document.getElementById("digital");
//toggle variables
var controls = 0;
var timeFormat = 0;
var alarmPM = 0;

function toggleControls(){
	var panel = document.getElementById("controlContainer");
	var button = document.getElementById("controlToggle");
	if (controls == 0){
		panel.style.display = "inline-block";
		button.style.background = "rgba(100%,100%,100%,0.4)";
		controls = 1;
	}
	else{
		panel.style.display = "none";
		button.style.background = "black";
		controls = 0;
	}
}

function toggleFormat(){
	var me = document.getElementById("toggleFormat");
	var button = document.getElementById("alarmPMAM");
	if (timeFormat == 0){
		timeFormat = 1;
		button.style.display = "inline-block";
		me.style.background = "orange";
	}
	else{
		timeFormat = 0;
		button.style.display = "none";
		me.style.background = "black";
	}
}

function updateTime(){
	now = new Date();
}

function fixTimeDisplay(i){
	if (i < 10){
		i = "0" + i;//put a zero in front of single digit numbers.
		//console.log("Working");
	}
	return i;
}

function runClock(){
	updateTime();
	now.setHours(now.getHours()+hOffset,now.getMinutes()+mOffset,now.getSeconds()+sOffset);
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	hour = fixTimeDisplay(hour);
	minute = fixTimeDisplay(minute);
	second = fixTimeDisplay(second);
	if (timeFormat == 0){
		display.innerHTML = (hour)+":"+(minute)+":"+(second);
	}
	else {
		if (hour >= 12){
			if (hour == 12){
				display.innerHTML = "12:"+(minute)+":"+(second)+" PM";
			}
			else{
				display.innerHTML = (hour-12)+":"+(minute)+":"+(second)+" PM";
			}
		}
		else{
			if (hour == 0){
				display.innerHTML ="12:"+(minute)+":"+(second)+" AM";
			}
			else {
				display.innerHTML = (hour)+":"+(minute)+":"+(second)+" AM";
			}
		}
	}
	if (alarmSet == 1){
		checkAlarm();
	}
	runningClock=setTimeout(runClock, 500);
}

function upTime(time){
	time++;
	return time;
}

function downTime(time){
	time--;
	return time;
}

function toggleAlarmFormat(){
	var button = document.getElementById("alarmPMAM");
	if (alarmPM == 0){
		alarmPM = 1;
		button.innerHTML = "PM";
	}
	else{
		alarmPM = 0;
		button.innerHTML = "AM";
	}
}

function reject(){
	//do nothing, your input is trash.
	return 0;
}

function setAlarm(){
	if (alarmSet == 0) {
		var alarmIn = document.getElementsByClassName("alarmInput");
		aHour = alarmIn[0].value;
		aMinute = alarmIn[1].value;
		aSecond = alarmIn[2].value;
		if (aHour > 24 || aMinute > 59 || aSecond > 59){
			reject();
		}
		else{
			if (timeFormat == 1){
				if (aHour > 12 || aMinute > 59 || aSecond > 59){
						reject();
					}
				else{
					if (alarmPM == 0){
						if (aHour == 12){
							alarmSet = 1;
							alarm.setHours(0,aMinute,aSecond);
							document.getElementById('alarmToggle').style.background="green";
							console.log("Alarm set to: "+alarm.getHours()+":"+alarm.getMinutes()+":"+alarm.getSeconds());
						}
						else{
							alarmSet = 1;
							alarm.setHours(aHour,aMinute,aSecond);
							document.getElementById('alarmToggle').style.background="green";
							console.log("Alarm set to: "+alarm.getHours()+":"+alarm.getMinutes()+":"+alarm.getSeconds());
						}
					}
					else{
						if (aHour == 12){
							alarmSet = 1;
							alarm.setHours(12,aMinute,aSecond);
							document.getElementById('alarmToggle').style.background="green";
							console.log("Alarm set to: "+alarm.getHours()+":"+alarm.getMinutes()+":"+alarm.getSeconds());
						}
						else{
							aHour = Number(aHour) + 12;
							alarmSet = 1;
							alarm.setHours(aHour,aMinute,aSecond);
							document.getElementById('alarmToggle').style.background="green";
							console.log("Alarm set to: "+alarm.getHours()+":"+alarm.getMinutes()+":"+alarm.getSeconds());
						}
					}
				}
			}
			else{
			alarm.setHours(aHour,aMinute,aSecond);
			alarmSet = 1;
			console.log("Alarm set to: "+alarm.getHours()+":"+alarm.getMinutes()+":"+alarm.getSeconds());
			document.getElementById('alarmToggle').style.background="green";
			}
		}
	}
	else {
		alarmSet = 0;
		console.log("alarm disabled");
		document.getElementById('alarmToggle').style.background="black";
	}
}

function checkAlarm(){
	if (now.getHours()===alarm.getHours()&&now.getMinutes()===alarm.getMinutes()&&now.getSeconds()===alarm.getSeconds()){
		alarming = 1;
		console.log("true");
	}
	if (alarming == 1){
		display.innerHTML+="<br>ALARM";
		display.style.color = "red";
		display.style.textShadow = "0px 0px 150px rgb(255, 0, 0)";
		beep();
	}
}

function beep(){
	var sound = document.getElementById('sound');
	sound.play();
}

function stopBeep(){
	var sound = document.getElementById('sound');
	sound.pause();
	sound.currentTime = 0;
}

function dismiss(){
	alarming,alarmSet = 0;
	display.style.color = "blue";
	display.style.textShadow = "0px 0px 150px rgb(0, 0, 255)";
	stopBeep();
	document.getElementById('alarmToggle').style.background="black";
}