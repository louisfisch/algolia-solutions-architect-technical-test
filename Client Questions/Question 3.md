# Question 3

## Question

From: marc@hotmail.com\
Subject: Error on website

Hi, my website is not working and here's the error:

    Uncaught ReferenceError: searchkit is not defined
        at Object.parcelRequire.6 (index.js:1)
        at newRequire (broken-webkitRequestAnimationFrame.47b209d0.js:48
        at parcelRequire.6 (broken-webkitRequestAnimationFrame.47b209d0.js:75)
        at broken-webkitRequestAnimationFrame.47b209d0.js:101

Can you fix it please?

## Answer

Hello,

Sorry you are experiencing errors, I unfortunately cannot fix this.

Searchkit is a library for Elasticsearch Search UI Components. You can the Searchkit support (more information at https://www.searchkit.co/about#any-questions-how-to-get-help).

Regards,\
Louis

## Observation and Comments

As we know it is a JavaScript error. marc@hotmail.com probably forgot to either import the Searchkit library with `import Searchkit from "searchkit"`, or it is maybe just a typo when using the variable that stores the Searchkit client. This can be an easy fix. That said, I decided to redirect him to the relevant page. It is indeed out of the scope of Algolia. And I wouldn't want him to think that he can come to us with any bug that he experience with his app.
