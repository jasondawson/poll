
<img src="http://jasondawson.com/img/polls.png" data-canonical-src="http://jasondawson.com/img/polls.png" width="600" height="350" />

## Question & Answer
-------

This app poses the question: What does everyone think about (insert your question here)? Submit your questions, answer questions, and see how everyone compares.
It uses angular for the front-end, node & express for the server and a mongo database.

See it live [here](poll.jasondawson.com).

While developing this idea, I knew I wanted to bring in some 3rd-party modules. So I found [angular-formly](http://angular-formly.com/) (thanks @kentcdodds), [chart.js](http://www.chartjs.org/), [animate.css](https://daneden.github.io/animate.css/) and [passport-google-oauth](https://github.com/jaredhanson/passport-google-oauth). I also practiced css pseudo-selectors and using bootstrap and custom classes for styling.

One tricky part was getting the chartjs legend how I wanted it. I used some custom classes for styling, and had to put these in the options legendTemplate key as well as extracting the values/labels:

```javascript
    var options = {
        legendTemplate : "<div class=\" legend\"><% for (var i=0; i<segments.length; i++){%><div class=\"legend-flex\"><div class=\"custom-bullet custom-bullet<%=i%>\" style=\"background-color:<%=segments[i].fillColor%>\"></div><%if(segments[i].label){%><p class=\"legend-text\"><%=segments[i].label%></p></div><%}%><%}%><p class=\"center-text\"><strong><%=total%></strong> responses!</p></div>"
  }
```

I had a particular visual style in mind when hovering over buttons, a very non-subtle 3D effect. I wanted to explore css and see if I could do what I had envisioned. This ended up looking like:

```css
.btn {
  z-index: 1;
  transition: all .05s ease-in-out;
}

.btn:hover {
  border: 2px solid black;
  z-index: 5;
  transform: scale(1.1, 1);
  box-shadow: 15px 15px 10px black, -15px -15px 100px rgba(255, 255, 255, .4);
}
```


