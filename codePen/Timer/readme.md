the pseudo code of this OOP program 
...................................

- create the function that decreases seconds from 60 to 0 => decreseTo()
- set the interval 
- at first ddecrese seconds by one (seconds--)
- if the seconds == 0 then check 

   + if minutes and hours == 0 also then => stop 

   + if minutes == 1 then check 
      . if hours == 0 => decrese minutes by one &
                         reset the seconds 
        else => decrese minutes by one &
                reset the seconds & 
                run the decreseTo function asynchronously & 
                decrese hours by one 

else => decrese minutes by one &
        reset the seconds 

......................................................
#for-The-Timer Class 


- You specify the hours, minutes, function to run when the timer expires, and the HTML elements that the timer will appear on in that order (hours element, minutes element, seconds element).
---forExample => const timer = new Timer(0,1,functionToRunAfter, hrsElem ,minsElem ,secsElem)

 - you enter the number in its simple form ( 1,2,3 etc.) not 01..., it will be automatically converted.

 - you have the run() method to run the timer and the stop() method to stop it.