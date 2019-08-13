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
Lance Rutkin
Nicholas Pence
Rob Battaglia
The man with the most controversial opinions. Like trying to convince us that Ramen is a pasta.
Soumith Inturi
Tom Cernera
Xiao Xie