# Software Requirements

### Vision

#### **What is the vision of this product?**

A user-friendly, accessible application designed to help new devs review common technical interview questions and topics in preparation for job interviews.

#### **What pain point does this project solve?**

Researching and studying for technical interviews often involves using multiple outside resources (books, StackOverflow, code challenge sites) to flesh out knowledge and cover a range of topics. This application aims to deliver an easy-to-navigate, centralized repository for technical interview study materials to help improve access to knowledge and reduce stress for developers in the job hunt.

#### **Why should we care about your product?**

Technical interviews are an important (and unavoidable) part of the process of entering the tech field. This application makes the preparation process as painless as possible.

### Scope (In/Out)

#### **In Scope**

- Allows any user accessing the site to view technical interview questions and their associated answers/resources.

- Allows logged in users to view and edit personal notes for individual questions

#### **Out of Scope**

- Does not allow public access of individual notes

- Does not allow users to edit or delete questions

- Does not include any direct communication between users

### Minimum Viable Product (MVP)

User-friendly application with accessible UI, providing quick and simple access to a series of technical interview questions pulled from a database via a central server. Users will be able to view selections of technical interview-related questions and topics, sorted by category, as guests or as authenticated users. Users will be able to sign up and authenticate when signing in, and when signed in will be able to write and save personal notes about a given question.

### Stretch Goals

- OAuth via GitHub or Google
- On-site embedded Code Editor
- Access Control
  - Guest users can view but not edit
  - Logged in users have ability to save problems and solutions to personal account
  - Admin/Contributor roles can add new questions to the database from the front end and manage content
- Secondary collection of Behavioral Interview Questions (separate tab/view)
- Alternative content available for breaktimes (i.e. jokes, cute animal pictures)

### Functional Requirements

- A user can access some portions of the website without logging in - specifically, questions and their associated answers/resources will be open to all users without authorization barriers.

- A user can create a custom account by choosing a unique username and a password

- A logged in user can access additional content - specifically a notes field

#### **Data Flow**

- User will arrive at a landing page that displays a login field and a series of selectable categories
  - Login field will remain available but not be required for site access
  - Login status will affect user experience to a degree
- Once a category is selected (clicked):
  - The chosen category should be visually indicated
  - All available categories should remain visible and selectable
  - Questions related to the selected category should render in the body of the app
- Once a specific question is selected (clicked):
  - A details view of that specific question should render
  - The detail review will include an answer/resource field that will initially - render with hidden content that can be toggled to visible by the user
  - If the user is logged in, the detail view will also include a notes section that - will behave in the same manner as the answer field (content hidden until toggled - to visible)
  - Notes will be unique to each user and persistent over time

### Non-Functional Requirements

#### **Security**

The application will encrypt and protect user login details both on the client side and server side to prevent unauthorized access and exposure. This encryption will be handled via bcrypt as per industry standards, and once users are signed up they will be able to securely log in using their chosen password, without the password ever being revealed. Validation will occur via the server and passwords will be masked on entry.

#### **Usability**

The application has a consistent, smooth design in which the client can operate, and the user should be able to easily and quickly use the app's features. Navigation will be constantly available via the bar at the top of the page so that users can jump between views and categories at will, regardless of where they are in the site. The site will also be optimized for accessibility and readability in order to be usable by everyone, with the proper application of accessibility aria labels and semantically-named components.
