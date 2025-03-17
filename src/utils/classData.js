
// This file provides a central place to manage class data used across components

export const teacherClasses = [
  { 
    id: "cls-101", 
    name: "Math 101",
    grade: "10th Grade",
    room: "Room 203",
    students: 25,
    time: "9:00 AM - 10:30 AM",
    days: ["Monday", "Wednesday", "Friday"]
  },
  { 
    id: "cls-102", 
    name: "Advanced Math",
    grade: "11th Grade",
    room: "Room 205",
    students: 18,
    time: "11:00 AM - 12:30 PM",
    days: ["Monday", "Wednesday"]
  },
  { 
    id: "cls-103", 
    name: "Calculus I",
    grade: "12th Grade",
    room: "Room 207",
    students: 15,
    time: "2:00 PM - 3:30 PM",
    days: ["Tuesday", "Thursday"]
  },
  { 
    id: "cls-104", 
    name: "Geometry",
    grade: "9th Grade",
    room: "Room 201",
    students: 30,
    time: "10:45 AM - 12:15 PM",
    days: ["Tuesday", "Thursday"]
  }
];

export const subjects = [
  { id: "subj-1", name: "Mathematics" },
  { id: "subj-2", name: "Science" },
  { id: "subj-3", name: "English" },
  { id: "subj-4", name: "History" },
  { id: "subj-5", name: "Computer Science" },
  { id: "subj-6", name: "Art" },
  { id: "subj-7", name: "Physical Education" },
  { id: "subj-8", name: "Music" }
];

export const gradeOptions = [
  "A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"
];

export const classSchedule = {
  "Monday": [
    { 
      id: "cls-101", 
      name: "Math 101",
      time: "9:00 AM - 10:30 AM",
      room: "Room 203",
      grade: "10th Grade" 
    },
    { 
      id: "cls-102", 
      name: "Advanced Math",
      time: "11:00 AM - 12:30 PM",
      room: "Room 205",
      grade: "11th Grade" 
    }
  ],
  "Tuesday": [
    { 
      id: "cls-104", 
      name: "Geometry",
      time: "10:45 AM - 12:15 PM",
      room: "Room 201",
      grade: "9th Grade" 
    },
    { 
      id: "cls-103", 
      name: "Calculus I",
      time: "2:00 PM - 3:30 PM",
      room: "Room 207",
      grade: "12th Grade" 
    }
  ],
  "Wednesday": [
    { 
      id: "cls-101", 
      name: "Math 101",
      time: "9:00 AM - 10:30 AM",
      room: "Room 203",
      grade: "10th Grade" 
    },
    { 
      id: "cls-102", 
      name: "Advanced Math",
      time: "11:00 AM - 12:30 PM",
      room: "Room 205",
      grade: "11th Grade" 
    }
  ],
  "Thursday": [
    { 
      id: "cls-104", 
      name: "Geometry",
      time: "10:45 AM - 12:15 PM",
      room: "Room 201",
      grade: "9th Grade" 
    },
    { 
      id: "cls-103", 
      name: "Calculus I",
      time: "2:00 PM - 3:30 PM",
      room: "Room 207",
      grade: "12th Grade" 
    }
  ],
  "Friday": [
    { 
      id: "cls-101", 
      name: "Math 101",
      time: "9:00 AM - 10:30 AM",
      room: "Room 203",
      grade: "10th Grade" 
    }
  ],
  "Saturday": [],
  "Sunday": []
};

// Function to get current day schedule
export const getCurrentDaySchedule = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()];
  return classSchedule[today] || [];
};

// Function to get schedule for a specific day
export const getScheduleForDay = (day) => {
  return classSchedule[day] || [];
};

// Mock student data for teacher's classes
export const studentsData = [
  // Math 101 students
  { id: 1, name: "Alice Johnson", class: "Math 101", grade: "B+", attendance: 85, email: "alice@school.edu" },
  { id: 2, name: "Bob Smith", class: "Math 101", grade: "A-", attendance: 92, email: "bob@school.edu" },
  { id: 3, name: "Charlie Brown", class: "Math 101", grade: "C", attendance: 78, email: "charlie@school.edu" },
  // Advanced Math students
  { id: 4, name: "Diana Prince", class: "Advanced Math", grade: "A", attendance: 95, email: "diana@school.edu" },
  { id: 5, name: "Edward Norton", class: "Advanced Math", grade: "B", attendance: 88, email: "edward@school.edu" },
  // Calculus I students
  { id: 6, name: "Fiona Apple", class: "Calculus I", grade: "A+", attendance: 98, email: "fiona@school.edu" },
  { id: 7, name: "George Lucas", class: "Calculus I", grade: "B-", attendance: 85, email: "george@school.edu" },
  // Geometry students
  { id: 8, name: "Hannah Montana", class: "Geometry", grade: "C+", attendance: 80, email: "hannah@school.edu" },
  { id: 9, name: "Ian McKellen", class: "Geometry", grade: "B+", attendance: 90, email: "ian@school.edu" },
];

// Get students for a specific class
export const getStudentsForClass = (className) => {
  return studentsData.filter(student => student.class === className);
};
