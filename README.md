### Executive Summary
In response to the current global pandemic situation, our team has developed a digital vaccine passport system. Our project focuses on fulfilling the need to show and have the vaccination proof at any place in the world without carrying a bunch of paper documents through a digital application.

This document describes the entire design and creation process of the digital vaccination proof for the TPJ655 final capstone project at Seneca College. Due to online classes, the project will be demonstrated by Video Camera and PowerPoint presentation along with this documentation.
The communication is held with various google applications such as google meet, google drive and through GitHub.

The report explains in detail all the components involved in the system and has a potential for future developments and can lead to advance projects in the future.

### Introduction
In near future as more and more people are inoculated with COVID vaccine, travel and other public activities might require digital documentation showing the individual have been vaccinated. Vaxin Pass will allow people to return to offices, stadium, airline flights, restaurants, etc. easily without having to pull different documents in different countries and regions at checkpoints to verify the proof of vaccination. The health organization will generate and provide the individual with unique QR (Quick Response) code after getting vaccinated. The person then can scan the QR code or manually add it to digital wallet/app on their phone. This QR code can then be simply pulled up on the phone and presented for scanning to verifying authorities to check the vaccine status. Thus, with Vaxin pass people can return to normal allowing people to maintain control of their privacy and share it the way that is easy, safe, secure, and verifiable.
Functional Features
In its simplest form a Vaxin passport is just an immunization record, proof that a person has been inoculated against a COVID-19.
A Mobile application that can be downloadable to any device by any smartphone user and it is able to record vaccination history and be able to generate QR code that can be used as a vaccination verification.
Vaxin Pass can accommodate several users. This user availability especially useful when kids without phones have their vaccination record managed by their parents. History of activity log which tracks the location that the user has visited, and that location information is stored as records inside the system. And for any general users, it will help them track their visited locations.


### Product Specifications
When a person visits a vaccination center for vaccination. The vaccinator will complete a form with information about the person which have a patient’s name, date of birth, and their medical record, followed by a when the first dose was administered, the manufacturer of the dose, and the healthcare professional or clinic that administered it.
The certificates will be issued at the healthcare location by registered health organization through a browser web app built in react Js (JavaScript library) for health organization and clinic.
This system provides the person with a passport-like document linked to a vaccine verification. The details are accessed through a simple QR code.
A mobile app that will allow users to upload their vaccine certificates in digital wallet.
Company, or organization that will eventually verify that someone has been vaccinated before granting them access.
Used Technology
⦁	Health organization – React Js (JavaScript Framework)
⦁	Backend Server – node Js (JavaScript Framework)
⦁	Mobile App – React Native (JavaScript Framework)
⦁	Database – Mongo Db
⦁	Health organization Hosting – Heroku
⦁	Backend Server Hosting – Heroku



### Operating Instructions
⦁	The health organization will add the vaccinated person’s detail such as name, date of birth, medical record, vaccine dose, which vaccine was provided, etc. on the web portal.
⦁	Once the person’s vaccination record is created, he/she will receive an email with the credentials and details to download app.
⦁	Person will need to follow the instructions to download the app and login with the credentials provided.
⦁	Once logged in, the person can see the verifying QR code and vaccination details.
⦁	He can present this code for scanning to any authorities who need to check the person’s vaccinated status.

### Product Design, Implementation, And System Operation


#### Software Diagram

 

#### Web portal:
We created a web portal for issue Vaccination Credential which can be used by health organizations or clinical authorities to create and manage individuals’ vaccination record. Hospital or clinic register themselves to web portal once's they are register then they can login to their health organization portal and create vaccination credentials for individuals or some who receive vaccine



#### Mobile App:
Mobile application makes it easy for individuals to verify their vaccination status and view their vaccination information
  




#### Maintenance Requirements
The Vaxin pass requires minimal maintenance for proper operation. Factors that may affect the operation include the following:
⦁	Solve applicable Software Bugs
⦁	Regular Server Backups
⦁	Regular Database Backups






### Conclusion 
The digital Vaxin passport will serve its purpose to allow people to go back to pre-pandemic situation. It will allow people to go back to schools, restaurants, travel abroad, etc who have already been vaccinated to this deadly disease if the government rules need vaxx status and pose less threat to the community by spreading the virus. Hence, ensuring the safety to travel and resume daily activities without carrying documentations and just a digital app on phone as already people and businesses have faced many challenges because of restriction imposed to prevent spread of Covid.

For further developments, a proper user friendly and interactive GUI can be developed as the one included in the project is very basic. More functionalities can be added to the app. For example, user can switch between multiple [profiles without having to log out through tabs. We can also develop a digital wallet for quick access to QR code. As this project is not a real-world implementation, their no security for data is added. However, it can be added in future to ensure all the health details are safe and secure.

### Developers
⦁	Maitrik Patel
⦁	Meshwa Patel
