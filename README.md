# StackPro

Live at [stackpro.herokuapp](http://stackpro.herokuapp.com).

## History

This project was originally created as part of an application for a now-defunct engineering consulting firm. It began life in December 2013 as a Rails app w/ jQuery on the frontend. It stored data in MongoLab, a free, hosted Mongo service.

In October 2015, I replaced the backend with a much-simpler Sinatra setup.

In October 2020, I redid the site from scratch because MongoLab was closing down. It's now written using Typescript, with an Express backend and a React frontend. Data is stored in Heroku Postgres. It also saves data indefinitely (instead of deleting it after 3 days), so there may be more interesting analytics to be done soon.

The original `README` is presented below. Links and information may be out of date.

---

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

When the site is loaded, Rails calls the database for the most recent 48 entries and makes an array for each of the fields. Because the chart takes arrays, it's easier to do this iteration server side. On the front, [chart.js](http://www.chartjs.org) and [tablesorter](http://tablesorter.com/docs/) provide beautiful representations of the data. The interval buttons slice and average the data live as necessary.

The whole thing is hosted on [Heroku](http://www.heroku.com). Every 24 hours, all data older than 72 hours is erased to keep db size low (72 hours are kept just in case I expand at some point in the future).

## The Future

Software (and the mission) is never done, and there's always more to add. Here's an outline of extra features I may one day implement.

- _Flexible intervals_ (or user set). It can basically handle this now; the front-end can slice/average any interval of the data it's given. There just needs to be another database call to get older data. This would probably lead to the back-end getting a face lift and making the db call separate so the front can call it as much as it likes.

- _Historical records_. The only real limitation here is database size. Keeping hourly records for years will get out of hand. Could make a daily record every 24 hours, that could be neat. Would show trends through the week.

- _Other Stack Exchamge sites_. They all use the same API, so it would be simple enough to have the existing code call for any (user inputted) site. The issue would be setting up recurring API calls for every possible site. But, with a small waiting bar, it would be easy enough to make 24 calls to iterate over the past 24 hours of an inputted site and give a live result. However, if a lot of users do this, it'll burn into max calls very quickly.
