# Notes Management System - NotesLite
My FYP project featuring React-Native Framework along with Firebase integration.
[Summary of what is learnt from the project](https://github.com/Mars-Aaron/-FYP-March2020/blob/master/README.md#learning-outcome)

# Purpose of Project
The purpose of this project is to create a digital note-taking solution that is specifically targeted at students to allow them to take notes in a very effective manner, as well as provide a platform for active learning.

# Objectives
  * To encourage students to make their own notes instead of copy and pasting which can lead to ineffective learning.
  * To encourage note sharing between students and lecturers.
  * To allow students and lecturers to collaborate in groups for the purpose of active learning which will promote consistency in notes.
  * To ensure that the solution contains no distrations for the student by only providing tools that are useful for learning.
  * To implement methods of note-taking that mimic a pen-paper approach.

# Technologies Used
<details>
  <summary>React-Native Framework</summary>
  
  ##### What?
  React-Native is a mobile application framework that is meant to unify the development process of user interfaces for both iOS, Android using solely JavaScript. It provides an engine that is capable of converting the components created in React-Native to the corresponding component in the native platform, for example a button created in React Native will render differently when installed on iOS and Android.
  
  ##### Why?
  1. Interest (Cross-Compatibility): React-Native is a framework that introduced me to the concept of cross-compatible mobile application development. Hence, I was quick to try to understand more about it.
  2. Component-based: React-Native is a component-based UI development framework, which means that components that I create are highly reusable.
  3. Interest (JavaScript): The first encounter with JavaScript was during internship, which was very interesting to use and had the potential of creating full stack applications with the least amount of effort.
  4. Metro: Metro is react-native package bundler which uses nodejs (a serverside javascript runtime environment). This automatically means that React-Native supports NodeJs and hence, have access to the huge list of repositories available on NPM. A lot of the third party plugins required can be installed from NPM which simplifies the development process by a huge margin.

</details>

<details>
  <summary>Node Package Manager (NPM)</summary>
  
  ##### What?
  It is a package manager for NodeJS which has access to over 350,000 third party packages. It can be access via the operating system's terminal (Terminal for MacOS and CMD for Windows) with the 'npm' command.
  
  ##### Why?
  NPM provides a huge list of open-sourced JavaScript libraries. A lot of the third party plugins required in the project such as Firebase integration module can be installed from NPM which simplifies the development process by a huge margin.
  
</details>

<details>
  <summary>Firebase</summary>
  
  ##### What?
  Firebase is Google's take on a Cloud platform for developers which also acts as a Backend-as-a-Service Provider that provides a platform for both Mobile and Web development projects.
  
  ##### Why?
  Developing a Mobile Application complete with a hosted backend can be a complex and potentially expensive process. As a Student, it is important to find a cost effective solution. Fortunately enough, is able to provide an entire backend service for the mobile application with no cost at all granted though it is limited in terms of vertical scalability.
  
  ##### What I needed from Firebase
  1. Firebase Authentication: Security and Privacy is a feature that is enabled in NotesLite. Implementing an authentication service that is secure can be quite difficult. Firebase is used here to simplify the process of both user registration and user authentication using email and password. On top of that, if there is a need to expand to social network integration with the application, Firebase also allows for social network authentication with minimal effort.
  2. Firebase Cloud Firestore: Firebase also provides two very good options for storing application data which is the Firebase Realtime Database and the Cloud Firestore, both of which satisfies the requirements of the project's data structure. Compared to using SQL Server which was initially an option, Cloud Firestore is a more effort efficient option as it is able to handle concurrent reads and writes which is prevalent in the application as it has collaborative features. In SQL Server, solutions will need to be developed to handle concurrent transactions. By using Cloud Firestore, developer will only need to worry about the data structure.
  3. Firebase Cloud Storage: User generated content such as profile pictures and document uploads needs to be stored somewhere as Cloud Firestore does not support blob data types. Firebase provides a service for that in the form of Cloud Storage which stores user generated content which will return a uri to be stored in firestore in place of the profile pictures and documents.

</details>

# Learning Outcome
1. Increased Proficiency in JavaScript language and also the paradigm (Functional Programming).
2. Established a moderate experience in the use of Firebase as a backend service.
3. Further increase experience in the use of Object-Oriented concepts through the development of React-Native reusable components.
4. Enhance UI/UX skills with many custom styled components as well as layouts.
5. Understand the role of NodeJS in developing full stack applications.
6. Gained experience in NoSQL databases.
7. Improved time management skills.

# Screenshots

![login.png](https://firebasestorage.googleapis.com/v0/b/noteslite-40854.appspot.com/o/Login.png?alt=media&token=246626f0-0bb4-4985-a287-cf76ed1fcd92 "Login View")

![register.png](https://firebasestorage.googleapis.com/v0/b/noteslite-40854.appspot.com/o/Register.png?alt=media&token=c6e46908-1edd-412a-ad4f-348cb1bc9cca "Register View")

![topics.png](https://firebasestorage.googleapis.com/v0/b/noteslite-40854.appspot.com/o/Topics.png?alt=media&token=6aa0b24c-ab19-4410-b92c-24d30a4ac223 "Topics List View")

![add_topics.png](https://firebasestorage.googleapis.com/v0/b/noteslite-40854.appspot.com/o/Add%20Topics.png?alt=media&token=3a5d0391-fc80-468a-a825-76c9b719252b "Add Topic View")
