# Question 2

## Question

From: carrie@coffee.com\
Subject: URGENT ISSUE WITH PRODUCTION!!!!

Since today 9:15am we have been seeing a lot of errors on our website. Multiple users have reported that they were unable to publish their feedbacks and that an alert box with "Record is too big, please contact enterprise@algolia.com".

Our website is an imdb like website where users can post reviews of coffee shops online. Along with that we enrich every record with a lot of metadata that is not for search. I am already a paying customer of your service, what else do you need to make your search work?

Please advise on how to fix this. Thanks.

## Answer

Hello,

I am sorry to hear that you are having problems in production.

The records that your app was trying to send to Algolia (a review for a coffee shop) reached the size limit. From what I can see on my end you are on the legacy Enterprise plan. Therefore the record size limit is 100 kB (see the support article [Is there a size limit for my index/records?](https://support.algolia.com/hc/en-us/articles/4406981897617)).

To avoid encountering this error you can make the record for a review smaller. You mentioned sending a lot of metadata that is not for search. If you are willing to send me a sample record, we could figure out together how we can make your record smaller to solve the problem and make your index more efficient.

Please let me know if you have any further questions or concerns.

Regards,\
Louis

## Observation and Comments

I could also point out to the client that their Algolia errors should be handled internally and properly logged, so their users don't see this message. The end-users should only see something like "Error when sending your review. Please try again later or contact support@coffee.com".
