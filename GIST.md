## Overview

> The goal for today was to get a better understanding of Docker and initial set up

## Log

## 10:00 am - Reseed Database locally

#### Challenge/Motivation

> After closer evaluation, some data did not carry over fully from the filestream function

### Actions Taken

> Ran through the established ETL process

## 11: 00 pm - Reconfiguring Docker 

## 12:00 pm - Added static assets in S3 buckets

## 2:00 pm - Deploy an EC2 Instance

### Challenges/Motivation

> The initial attempt in launching an EC2 instance was done on Ubuntu but it would be move difficult to save the static assets this way. 

### Actions Taken

> The instance was turned off and instaead, a seperate EC2 instance was created using Amazon's Linus shell. This offered a way to easily pass in the csv files from one service to another. 

> Some reconfiguration on the docker-compose file had to be done in order to reference the new directory located on the instance.

> Eventually, after some additional configuration/reconfiguration, the database began seeding.

> The instance when defined would only accomodate TODO: FIX 8MB so a seperate instance needed to be created which had a larger allotted storage size.

## 6:00 pm - Reseeding Database

### Challenges/Motivation

> The postgres and node image created within docker could be pulled into the instance and ran that way. There was an initial issue saying that the database was running when trying to execute the build script so that threw an error into our process.

### 7:00 pm - Seeded the Postgres Database on the EC2 Instance

> The initial lines in the schema file that dropped an existing database and then create it were removed. The database creation step was handled through the docker-compose file.

> 



Test Results
get /qa/:productId
http://bit.ly/2Tm0IZA



Andrew Kan
You are the energy vampire of the cohort and we all admire your work ethic. You are one of the reasons the code output of this cohort has been at insane levels. But you care deeply about the success of our cohort and the juniors and everyone always appreciates your willingness to help. Even though you are the objectively the sassiest person in the cohort.

Brian Nelson
Our configuration king. The only person I met who thinks that spending an entire day working with YAML is easier than filling out this form <3. You have these bursts of true joy and it brings the energy of the room up much more than you realize.

Hongwei Qin
You are always a great person to have as part of a team. You always put others before yourself and you do your part in bringing everyone closer to the goal. HRNYC23 would not have survived had you not so couragously saved us from the cockroach.


Kevin Park
Our closet artist and cohort's most improved. You constantly rise to the occassion and we all love how we know you're serious when the shirt goes over your face. You are resilient more than you give yourself credit for and I hope you can always appreciate that about yourself. 

Lance Rutkin
You're always willing to lend a hand to those around you and our cohort is so much better because of that.

Nicholas Pence
Quietly the funniest person in the cohort. Your timing is impeccable and you never fail to make us laugh.   

Rob Battaglia
ROB-E Angelo Gregory. The man with the most controversial opinions. Like trying to convince us that first, ramen is more of a pasta than a soup and then its more of a salad than a pasta. You are one of the few people I know that will see a good habit from someone and then implement it yourself and I hope you never lose that. You also have surprised the cohort with how caring and kind you are .

Soumith Inturi
Our front end star! Every cohort needs a jack of all trades and we have found that in you. Apprantly someone can spit out code, get on So You Think You Can Dance, be nationaly ranked in Spiderman trivia and HRNYC23's record holder of most naps. So multi-talented! You're so driven and charasmatic and continue to chase your passsions relentlessly. 

Tom Cernera
You always roll in with the most positive attitude and energy and constantly help bring things into perspective. These kiddos and I always appreciate your great life advise.

Xiao Xie
You are so intellegent! It seems there is no challenge to great for you and you always rise to the occassion. Thank you for always rising the bar and motivating those around you.