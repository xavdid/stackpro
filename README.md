# Stackpro

## The Assignment
As dictated by the [Hackerati](http://www.thehackerati.com):

Build a system to collect data that is generated on an interval (once a minute/hour/day/etc. Store in a database; record time and data value. 

Build a web app that displays a graph of the collected data with a choice of intervals (per min, per hour, per day, etc.). Add a table report of the data with column headings. The table should be placed below the graph. 

## The Intel
Once an hour, a rake process runs to collect data from the [Stack Overflow API](https://api.stackexchange.com/docs/questions) to get the total number of questions asked that hour and the total number of which went unanswered. A question is considered unanswered if there are no answers with at least one upvote. This data is stored as an object in a mongo database running at [MongoLab](https://mongolab.com/welcome/) as follows:

    {
        "asked": [int] number of questions asked
        "unnswered": [int] number of questions unanswered
        "percentage": [float] unanswered/asked * 100
        "unix": [long] the unix timestamp of when the data was pulled
        "timestamp": [string] a nicely formatted string: "hh:mm mm/dd"
    }

When the site is loaded, rails calls the database for the most recent 48 entries and makes an array for each of the fields. Because the chart takes arrays, it's easier to do this iteration server side. On the front, [chart.js](http://www.chartjs.org) and [tablesorter](http://tablesorter.com/docs/) provide beautiful representations of the data. The interval buttons slice and average the data live as necessary. 

The whole thing is hosted on [Heroku](http://www.heroku.com). Every 24 hours, all data older than 72 hours is erased to keep db size low (72 hours are kept just in case I expand at some point in the future).