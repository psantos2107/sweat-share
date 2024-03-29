// Require the database connection & the other models
const db = require("./");
const bcrypt = require("bcrypt");

// USER DATA--------------------------------------------------------
const userData = [
  {
    username: "john_doe",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
    age: 30,
    profilePic:
      "https://i.pinimg.com/564x/d8/18/83/d818834e0efec1ea8f6a9c9c31fc357e.jpg",
    location: "New York City, NY",
    faveExercise: "Running",
    about: "Fitness enthusiast",
  },
  {
    username: "emily_smith",
    password: "abc123",
    firstName: "Emily",
    lastName: "Smith",
    profilePic:
      "https://i.pinimg.com/564x/ab/17/cf/ab17cfc4a4237453af647c5474dd90ad.jpg",
    age: 25,
    location: "Los Angeles, CA",
    faveExercise: "Yoga",
    about: "Loves outdoor activities",
  },
  {
    username: "alex_jones",
    password: "passw0rd",
    firstName: "Alex",
    lastName: "Jones",
    profilePic:
      "https://i.pinimg.com/564x/b9/ff/20/b9ff20687e9a79a01f680aa854318728.jpg",
    age: 35,
    location: "Chicago, IL",
    faveExercise: "Weightlifting",
    about: "Personal trainer and nutritionist",
  },
  {
    username: "sarah_brown",
    password: "sarah123",
    firstName: "Sarah",
    lastName: "Brown",
    profilePic:
      "https://i.pinimg.com/564x/de/05/3f/de053f4928c44a8c002a68535309a024.jpg",
    age: 28,
    location: "Houston, TX",
    faveExercise: "Cycling",
    about: "Passionate about living a healthy lifestyle",
  },
  {
    username: "michael_adams",
    password: "mike456",
    firstName: "Michael",
    lastName: "Adams",
    profilePic:
      "https://i.pinimg.com/564x/71/e9/26/71e926a3720c434cf4612ecb1075c35f.jpg",
    age: 40,
    location: "Philadelphia, PA",
    faveExercise: "Swimming",
    about: "Enjoys long walks and meditation",
  },
  {
    username: "laura_wilson",
    password: "laura789",
    firstName: "Laura",
    lastName: "Wilson",
    profilePic:
      "https://i.pinimg.com/564x/f1/6d/75/f16d759f39a8220f37b0d93f93a2a1b6.jpg",
    age: 33,
    location: "Phoenix, AZ",
    faveExercise: "Pilates",
    about: "Yoga instructor and wellness coach",
  },
  {
    username: "david_miller",
    password: "davidm",
    firstName: "David",
    lastName: "Miller",
    age: 27,
    location: "San Diego, CA",
    profilePic:
      "https://i.pinimg.com/564x/14/0d/19/140d19cbcb7006e6ef0f2da7177b9a5a.jpg",
    faveExercise: "Rock Climbing",
    about: "Adventure seeker",
  },
  {
    username: "jessica_clark",
    password: "jessica123",
    firstName: "Jessica",
    lastName: "Clark",
    age: 29,
    location: "Dallas, TX",
    profilePic:
      "https://i.pinimg.com/736x/e7/fc/28/e7fc28591d480537c11c543c834e2380.jpg",
    faveExercise: "Boxing",
    about: "Fitness blogger",
  },
  {
    username: "ryan_robinson",
    password: "ryanr22",
    firstName: "Ryan",
    lastName: "Robinson",
    profilePic:
      "https://i.pinimg.com/564x/5f/2c/b4/5f2cb48312fb87ad2c3c156fe9cce01e.jpg",
    age: 32,
    location: "San Francisco, CA",
    faveExercise: "CrossFit",
    about: "Former athlete turned coach",
  },
  {
    username: "katie_hernandez",
    password: "katie456",
    firstName: "Katie",
    lastName: "Hernandez",
    age: 26,
    location: "Miami, FL",
    profilePic:
      "https://i.pinimg.com/564x/29/2c/8d/292c8ddf868fce80f6b881a7a9a7631c.jpg",
    faveExercise: "Dancing",
    about: "Dance instructor and choreographer",
  },
  {
    username: "carol_ross",
    password: "carolr",
    firstName: "Carol",
    lastName: "Ross",
    age: 31,
    location: "Seattle, WA",
    faveExercise: "Hiking",
    about: "Nature lover and outdoor enthusiast",
  },
  {
    username: "mark_evans",
    password: "mark123",
    firstName: "Mark",
    lastName: "Evans",
    age: 34,
    location: "Boston, MA",
    faveExercise: "Football",
    about: "Sports fanatic",
  },
  {
    username: "lisa_taylor",
    password: "lisa789",
    firstName: "Lisa",
    lastName: "Taylor",
    age: 29,
    location: "Denver, CO",
    faveExercise: "Skiing",
    about: "Winter sports enthusiast",
  },
  {
    username: "peter_kim",
    password: "peter123",
    firstName: "Peter",
    lastName: "Kim",
    age: 27,
    location: "Austin, TX",
    faveExercise: "Basketball",
    profilePic:
      "https://i.pinimg.com/564x/4c/bb/68/4cbb680d3483f8bce3c5f481e6468f5f.jpg",
    about: "Tech enthusiast and basketball player",
  },
  {
    username: "jennifer_nguyen",
    password: "jenny456",
    firstName: "Jennifer",
    lastName: "Nguyen",
    profilePic:
      "https://i.pinimg.com/564x/ca/10/57/ca10576437ee4339f9883de03075c562.jpg",
    age: 28,
    location: "Portland, OR",
    faveExercise: "Zumba",
    about: "Dance lover",
  },
];

//transfers all the passwords above into encrypted passwords
userData.forEach(async (user) => {
  user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
});

//---------EXERCISE PROGRAM DATA---------------------------------------------
const exerciseProgramData1 = [
  {
    title: "Glute Gains",
    description:
      "This program focuses on strengthening and toning the glute muscles.",
    programType: "strength",
    difficulty: "intermediate",
    exercises: [
      {
        name: "Barbell Hip Thrust",
        description: "A great exercise for targeting the glutes.",
        sets: 3,
        repetitions: 12,
        restTime: "60 seconds",
        imagePath:
          "https://cdn.shopify.com/s/files/1/2350/9323/files/Barbell_Hip_Thrust_480x480.jpg?v=1676877503",
        equipmentNeeded: "Barbell, Bench",
        muscleWorked: "Glutes",
      },
      {
        name: "Romanian Deadlift",
        description: "Targets the hamstrings and glutes effectively.",
        sets: 4,
        repetitions: 10,
        restTime: "45 seconds",
        imagePath:
          "https://hips.hearstapps.com/hmg-prod/images/romanian-deadlift-1595930760.jpg",
        equipmentNeeded: "Barbell, Weight Plates",
        muscleWorked: "Hamstrings, Glutes",
      },
      {
        name: "Lunges",
        description: "A classic exercise for working the glutes and legs.",
        sets: 3,
        repetitions: "10 each leg",
        restTime: "30 seconds",
        imagePath:
          "https://www.spotebi.com/wp-content/uploads/2016/12/walking-lunges-exercise-illustration-spotebi.jpg",
        equipmentNeeded: "None",
        muscleWorked: "Quadriceps, Glutes",
      },
      {
        name: "Glute Bridge",
        description: "Activates and strengthens the glutes.",
        sets: 3,
        repetitions: 15,
        imagePath:
          "https://static.spacecrafted.com/f647b6d7284b479f86ed68094f858ff8/i/f80b466778d14846aeb4af9863055902/1/4SoifmQp45JMgBnHp7ed2/Glute-Bridge-STACK.jpg",
        restTime: "45 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Glutes",
      },
    ],
  },
  {
    title: "Strength Builder",
    description: "Focuses on building strength and muscle mass.",
    programType: "strength",
    difficulty: "intermediate",
    exercises: [
      {
        name: "Barbell Squats",
        sets: 4,
        repetitions: 8,
        restTime: "90 seconds",
        equipmentNeeded: "Barbell, Squat Rack",
        muscleWorked: "Quadriceps, Hamstrings, Glutes",
      },
      {
        name: "Deadlifts",
        sets: 4,
        repetitions: 8,
        restTime: "90 seconds",
        equipmentNeeded: "Barbell, Weight Plates",
        muscleWorked: "Lower Back, Glutes, Hamstrings",
      },
      {
        name: "Bench Press",
        sets: 4,
        repetitions: 8,
        restTime: "90 seconds",
        equipmentNeeded: "Barbell, Bench",
        muscleWorked: "Chest, Shoulders, Triceps",
      },
    ],
  },
  {
    title: "Explosive Power",
    description: "Improves explosive power and athleticism.",
    programType: "plyometrics",
    difficulty: "advanced",
    exercises: [
      {
        name: "Box Jumps",
        description:
          "Jump onto a box with both feet, then step back down and repeat.",
        sets: 3,
        repetitions: 10,
        restTime: "60 seconds",
        equipmentNeeded: "Box",
        muscleWorked: "Legs, Glutes, Calves",
      },
      {
        name: "Medicine Ball Slams",
        description:
          "Hold a medicine ball overhead, then forcefully slam it to the ground.",
        sets: 3,
        repetitions: 12,
        restTime: "45 seconds",
        equipmentNeeded: "Medicine Ball",
        muscleWorked: "Core, Shoulders, Arms",
      },
      {
        name: "Jumping Lunges",
        description:
          "Perform alternating lunges while jumping in between each repetition.",
        sets: 3,
        repetitions: 10,
        restTime: "60 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Legs, Glutes",
      },
    ],
  },
  {
    title: "Cardio Blast",
    description: "Enhances cardiovascular endurance and stamina.",
    programType: "cardio",
    difficulty: "intermediate",
    exercises: [
      {
        name: "Running (Interval Sprints)",
        description:
          "Sprint for a specified distance or time, then rest and repeat.",
        sets: 6,
        repetitions: "200 meters",
        restTime: "90 seconds",
        equipmentNeeded: "Running Shoes",
        muscleWorked: "Legs, Cardiovascular System",
      },
      {
        name: "Cycling",
        description:
          "Cycle at a moderate to high intensity for a specified distance or time.",
        sets: 4,
        repetitions: "5 miles",
        restTime: "2 minutes",
        equipmentNeeded: "Bicycle, Helmet",
        muscleWorked: "Legs, Cardiovascular System",
      },
      {
        name: "Jump Rope",
        description: "Jump rope continuously for a specified duration.",
        sets: 4,
        repetitions: "2 minutes",
        restTime: "60 seconds",
        equipmentNeeded: "Jump Rope",
        muscleWorked: "Legs, Shoulders, Cardiovascular System",
      },
    ],
  },
  {
    title: "Core Crusher",
    description: "Targets and strengthens the core muscles.",
    programType: "strength",
    difficulty: "beginner",
    programDuration: 6,
    exercises: [
      {
        name: "Plank",
        description:
          "Hold a plank position with a straight body and engaged core.",
        sets: 3,
        repetitions: "Hold for 30 seconds",
        restTime: "45 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Core",
      },
      {
        name: "Russian Twists",
        description:
          "Sit on the floor, lean back slightly, and twist your torso from side to side.",
        sets: 3,
        repetitions: 20,
        restTime: "30 seconds",
        equipmentNeeded: "Medicine Ball",
        muscleWorked: "Core, Obliques",
      },
      {
        name: "Bicycle Crunches",
        description:
          "Lie on your back, perform a bicycle motion with your legs while crunching towards the opposite knee.",
        sets: 3,
        repetitions: 15,
        restTime: "45 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Core, Abdominals",
      },
    ],
  },
  {
    title: "Supple Body",
    description: "Improves flexibility and mobility.",
    programType: "flexibility",
    difficulty: "beginner",
    programDuration: 4,
    exercises: [
      {
        name: "Yoga Sun Salutations",
        description:
          "Flow through a series of yoga poses that stretch and strengthen the entire body.",
        sets: 2,
        repetitions: 5,
        restTime: "60 seconds",
        equipmentNeeded: "Yoga Mat",
        muscleWorked: "Full Body",
      },
      {
        name: "Hip Flexor Stretches",
        description:
          "Stretch the hip flexor muscles by kneeling on one knee and leaning forward.",
        sets: 3,
        repetitions: 15,
        restTime: "30 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Hip Flexors",
      },
      {
        name: "Shoulder Dislocations",
        description:
          "Hold a resistance band and perform a circular motion to stretch the shoulder joint.",
        sets: 3,
        repetitions: 10,
        restTime: "45 seconds",
        equipmentNeeded: "Resistance Band",
        muscleWorked: "Shoulders",
      },
    ],
  },
  {
    title: "HIIT Inferno",
    description:
      "Burns fat and improves cardiovascular health with high-intensity intervals.",
    programType: "plyometrics",
    difficulty: "intermediate",
    programDuration: 5,
    exercises: [
      {
        name: "Burpees",
        description:
          "Perform a squat thrust followed by a jump and overhead clap.",
        sets: 4,
        repetitions: 20,
        restTime: "30 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Full Body",
      },
      {
        name: "Mountain Climbers",
        description:
          "Assume a push-up position and alternate bringing each knee towards the chest.",
        sets: 4,
        repetitions: 30,
        restTime: "30 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Core, Cardiovascular System",
      },
      {
        name: "Squat Jumps",
        description: "Perform a deep squat followed by an explosive jump.",
        sets: 4,
        repetitions: 15,
        restTime: "45 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Legs, Glutes",
      },
    ],
  },
  {
    title: "Endurance Booster",
    description: "Improves overall endurance and stamina.",
    programType: "cardio",
    difficulty: "advanced",
    exercises: [
      {
        name: "Long-Distance Running",
        description: "Run at a steady pace for an extended distance.",
        sets: 3,
        repetitions: "5 miles",
        restTime: "2 minutes",
        equipmentNeeded: "Running Shoes",
        muscleWorked: "Legs, Cardiovascular System",
      },
      {
        name: "Swimming",
        description: "Swim laps continuously in a pool.",
        sets: 5,
        repetitions: "200 meters",
        restTime: "1 minute",
        equipmentNeeded: "Swimsuit, Goggles",
        muscleWorked: "Full Body, Cardiovascular System",
      },
      {
        name: "Rowing",
        description: "Row at a moderate intensity on a rowing machine.",
        sets: 4,
        repetitions: "1000 meters",
        restTime: "90 seconds",
        equipmentNeeded: "Rowing Machine",
        muscleWorked: "Upper Body, Cardiovascular System",
      },
    ],
  },
  {
    title: "Muscle Definition",
    description: "Targets specific muscle groups for definition and toning.",
    programType: "strength",
    difficulty: "intermediate",
    exercises: [
      {
        name: "Pull-Ups",
        description: "Pull your body weight up using a pull-up bar.",
        sets: 4,
        repetitions: 10,
        restTime: "60 seconds",
        equipmentNeeded: "Pull-Up Bar",
        muscleWorked: "Back, Arms",
      },
      {
        name: "Tricep Dips",
        description:
          "Lower your body by bending your elbows, then push back up.",
        sets: 3,
        repetitions: 15,
        restTime: "45 seconds",
        equipmentNeeded: "Parallel Bars",
        muscleWorked: "Triceps, Chest",
      },
      {
        name: "Leg Press",
        description:
          "Push a weighted sled away from your body using your legs.",
        sets: 4,
        repetitions: 12,
        restTime: "90 seconds",
        equipmentNeeded: "Leg Press Machine",
        muscleWorked: "Quadriceps, Hamstrings, Glutes",
      },
    ],
  },
  {
    title: "Agility Training",
    description: "Improves agility, speed, and coordination.",
    programType: "plyometrics",
    difficulty: "intermediate",
    exercises: [
      {
        name: "Ladder Drills",
        description: "Perform various footwork patterns through a ladder.",
        sets: 3,
        repetitions: "1 minute",
        restTime: "45 seconds",
        equipmentNeeded: "Speed Ladder",
        muscleWorked: "Legs, Agility",
      },
      {
        name: "Cone Shuttles",
        description:
          "Run back and forth between cones set at different distances.",
        sets: 4,
        repetitions: "5 rounds",
        restTime: "60 seconds",
        equipmentNeeded: "Cones",
        muscleWorked: "Legs, Agility",
      },
      {
        name: "Boxing Drills",
        description: "Perform punching combinations and footwork drills.",
        sets: 5,
        repetitions: "3 minutes",
        restTime: "30 seconds",
        equipmentNeeded: "Boxing Gloves, Punching Bag",
        muscleWorked: "Upper Body, Core",
      },
    ],
  },
  {
    title: "Yoga for Strength",
    description: "Combines yoga poses with strength-building exercises.",
    programType: "flexibility",
    difficulty: "beginner",
    exercises: [
      {
        name: "Warrior Poses",
        description:
          "Hold various warrior poses to build strength and stability.",
        sets: 3,
        repetitions: "30 seconds",
        restTime: "45 seconds",
        equipmentNeeded: "Yoga Mat",
        muscleWorked: "Legs, Core",
      },
      {
        name: "Chaturanga Push-Ups",
        description: "Lower down halfway while maintaining a straight body.",
        sets: 3,
        repetitions: 12,
        restTime: "30 seconds",
        equipmentNeeded: "Yoga Mat",
        muscleWorked: "Arms, Chest, Core",
      },
      {
        name: "Chair Pose Squats",
        description: "Hold a squat position with arms extended overhead.",
        sets: 3,
        repetitions: 15,
        restTime: "45 seconds",
        equipmentNeeded: "Yoga Mat",
        muscleWorked: "Legs, Glutes",
      },
    ],
  },
  {
    title: "Full Body Circuit",
    description: "Targets all major muscle groups for a complete workout.",
    programType: "strength",
    difficulty: "intermediate",
    exercises: [
      {
        name: "Squats",
        description:
          "Lower your body into a seated position, then return to standing.",
        sets: 3,
        repetitions: 12,
        restTime: "60 seconds",
        equipmentNeeded: "Barbell, Squat Rack",
        muscleWorked: "Legs, Glutes",
      },
      {
        name: "Push-Ups",
        description:
          "Lower your body by bending your elbows, then push back up.",
        sets: 3,
        repetitions: 15,
        restTime: "45 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Chest, Shoulders, Triceps",
      },
      {
        name: "Rows",
        description:
          "Pull a weight towards your body while keeping your back straight.",
        sets: 3,
        repetitions: 12,
        restTime: "60 seconds",
        equipmentNeeded: "Dumbbells, Bench",
        muscleWorked: "Back, Biceps",
      },
    ],
  },
  {
    title: "Flexibility Flow",
    description: "Improves flexibility and mobility through flowing movements.",
    programType: "flexibility",
    difficulty: "beginner",
    exercises: [
      {
        name: "Cat-Cow Stretch",
        description:
          "Arch and round your back while moving between cat and cow poses.",
        sets: 2,
        repetitions: "10 reps",
        restTime: "30 seconds",
        equipmentNeeded: "Yoga Mat",
        muscleWorked: "Spine, Core",
      },
      {
        name: "Downward Facing Dog",
        description:
          "Lift your hips towards the ceiling while pressing your heels towards the ground.",
        sets: 2,
        repetitions: "Hold for 30 seconds",
        restTime: "30 seconds",
        equipmentNeeded: "Yoga Mat",
        muscleWorked: "Hamstrings, Calves, Shoulders",
      },
      {
        name: "Pigeon Pose",
        description:
          "Bring one leg forward, bending the knee and extending the other leg behind you.",
        sets: 2,
        repetitions: "Hold for 30 seconds each side",
        restTime: "30 seconds",
        equipmentNeeded: "Yoga Mat",
        muscleWorked: "Hips, Glutes",
      },
    ],
  },
  {
    title: "High-Intensity Burn",
    description:
      "Burns calories and boosts metabolism with high-intensity exercises.",
    programType: "cardio",
    difficulty: "intermediate",
    exercises: [
      {
        name: "Jumping Jacks",
        description:
          "Jump while spreading your legs and arms out to the sides.",
        sets: 4,
        repetitions: 30,
        restTime: "30 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Full Body",
      },
      {
        name: "Mountain Climbers",
        description:
          "Assume a push-up position and alternate bringing each knee towards the chest.",
        sets: 4,
        repetitions: 20,
        restTime: "30 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Core, Shoulders",
      },
      {
        name: "High Knees",
        description:
          "Run in place while bringing your knees up towards your chest.",
        sets: 4,
        repetitions: 40,
        restTime: "30 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Legs, Cardiovascular System",
      },
    ],
  },
  {
    title: "Balance and Stability",
    description: "Enhances balance and stability through targeted exercises.",
    programType: "balance",
    difficulty: "beginner",
    exercises: [
      {
        name: "Single-Leg Stance",
        description: "Stand on one leg while maintaining balance.",
        sets: 3,
        repetitions: "Hold for 30 seconds each leg",
        restTime: "30 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Legs, Core",
      },
      {
        name: "Balance Board Squats",
        description: "Perform squats while balancing on a balance board.",
        sets: 3,
        repetitions: 12,
        restTime: "45 seconds",
        equipmentNeeded: "Balance Board",
        muscleWorked: "Legs, Core",
      },
      {
        name: "Single-Leg Deadlifts",
        description:
          "Hinge at the hips and lower a weight towards the ground while balancing on one leg.",
        sets: 3,
        repetitions: 10,
        restTime: "45 seconds",
        equipmentNeeded: "Dumbbells",
        muscleWorked: "Legs, Glutes, Core",
      },
    ],
  },
];

const exerciseProgramData2 = [
  {
    title: "Strength Training 101",
    description: "A beginner-friendly program to build strength and muscle.",
    programType: "strength",
    difficulty: "beginner",
    exercises: [
      {
        name: "Dumbbell Bench Press",
        description:
          "Lie on a bench and press dumbbells upwards, focusing on chest muscles.",
        sets: 3,
        repetitions: 10,
        restTime: "60 seconds",
        equipmentNeeded: "Dumbbells, Bench",
        muscleWorked: "Chest, Arms",
      },
      {
        name: "Bodyweight Squats",
        description:
          "Perform squats using only bodyweight, focusing on lower body strength.",
        sets: 3,
        repetitions: 12,
        restTime: "45 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Legs, Glutes",
      },
      {
        name: "Lat Pulldowns",
        description:
          "Pull a bar down to chest level while seated, targeting back muscles.",
        sets: 3,
        repetitions: 10,
        restTime: "60 seconds",
        equipmentNeeded: "Lat Pulldown Machine",
        muscleWorked: "Back, Arms",
      },
    ],
  },
  {
    title: "HIIT Cardio Blast",
    description:
      "An intense cardio program to burn fat and improve cardiovascular fitness.",
    programType: "cardio",
    difficulty: "intermediate",
    exercises: [
      {
        name: "Jumping Jacks",
        description:
          "Jump while spreading arms and legs apart, then return to starting position.",
        sets: 4,
        repetitions: 30,
        restTime: "30 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Full Body",
      },
      {
        name: "High Knees",
        description: "Run in place while bringing knees up towards chest.",
        sets: 4,
        repetitions: 40,
        restTime: "30 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Legs, Cardiovascular System",
      },
      {
        name: "Burpees",
        description:
          "Perform a squat thrust followed by a jump and overhead clap.",
        sets: 4,
        repetitions: 20,
        restTime: "30 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Full Body",
      },
    ],
  },
  {
    title: "Core Strength",
    description: "Focuses on strengthening and toning the core muscles.",
    programType: "strength",
    difficulty: "beginner",
    exercises: [
      {
        name: "Plank",
        description:
          "Hold a plank position with a straight body and engaged core.",
        sets: 3,
        repetitions: "Hold for 30 seconds",
        restTime: "45 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Core",
      },
      {
        name: "Russian Twists",
        description:
          "Sit on the floor, lean back slightly, and twist torso from side to side.",
        sets: 3,
        repetitions: 20,
        restTime: "30 seconds",
        equipmentNeeded: "Medicine Ball",
        muscleWorked: "Core, Obliques",
      },
      {
        name: "Leg Raises",
        description:
          "Lie on back and raise legs towards ceiling, engaging lower abs.",
        sets: 3,
        repetitions: 15,
        restTime: "45 seconds",
        equipmentNeeded: "Mat",
        muscleWorked: "Lower Abs, Hip Flexors",
      },
    ],
  },
  {
    title: "Leg Day Challenge",
    description:
      "Intense lower body workout to build strength and endurance in legs.",
    programType: "strength",
    difficulty: "advanced",
    exercises: [
      {
        name: "Barbell Squats",
        description:
          "Place a barbell on shoulders and squat down, keeping back straight.",
        sets: 4,
        repetitions: 8,
        restTime: "60 seconds",
        equipmentNeeded: "Barbell, Squat Rack",
        muscleWorked: "Quadriceps, Glutes, Hamstrings",
      },
      {
        name: "Deadlifts",
        description:
          "Lift a barbell off the ground using a hip hinge motion, targeting posterior chain.",
        sets: 4,
        repetitions: 8,
        restTime: "60 seconds",
        equipmentNeeded: "Barbell, Weight Plates",
        muscleWorked: "Hamstrings, Glutes, Lower Back",
      },
      {
        name: "Lunges",
        description:
          "Step forward with one leg and lower body until thigh is parallel to ground.",
        sets: 4,
        repetitions: 10,
        restTime: "60 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Quadriceps, Glutes, Hamstrings",
      },
    ],
  },
  {
    title: "Upper Body Sculpt",
    description:
      "Targets chest, back, shoulders, and arms for a defined upper body.",
    programType: "strength",
    difficulty: "intermediate",
    exercises: [
      {
        name: "Bench Press",
        description:
          "Lie on a bench and press a barbell upwards, focusing on chest muscles.",
        sets: 4,
        repetitions: 10,
        restTime: "60 seconds",
        equipmentNeeded: "Barbell, Bench",
        muscleWorked: "Chest, Arms",
      },
      {
        name: "Pull-Ups",
        description:
          "Hang from a bar and pull body up until chin is above bar.",
        sets: 4,
        repetitions: 8,
        restTime: "60 seconds",
        equipmentNeeded: "Pull-Up Bar",
        muscleWorked: "Back, Arms",
      },
      {
        name: "Military Press",
        description:
          "Press a barbell overhead while standing, focusing on shoulder muscles.",
        sets: 4,
        repetitions: 10,
        restTime: "60 seconds",
        equipmentNeeded: "Barbell, Rack",
        muscleWorked: "Shoulders, Arms",
      },
    ],
  },
  {
    title: "Cardio Core Fusion",
    description:
      "Combines cardio exercises with core-strengthening moves for a complete workout.",
    programType: "cardio",
    difficulty: "intermediate",
    exercises: [
      {
        name: "Mountain Climbers",
        description:
          "Assume a push-up position and alternate bringing knees towards chest.",
        sets: 4,
        repetitions: 20,
        restTime: "30 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Core, Shoulders",
      },
      {
        name: "Plank Jacks",
        description:
          "From plank position, jump feet out and in like a jumping jack.",
        sets: 4,
        repetitions: 15,
        restTime: "30 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Core, Cardiovascular System",
      },
      {
        name: "Russian Twists with Medicine Ball",
        description:
          "Sit on the floor, lean back slightly, and twist torso from side to side holding a medicine ball.",
        sets: 4,
        repetitions: 20,
        restTime: "30 seconds",
        equipmentNeeded: "Medicine Ball",
        muscleWorked: "Core, Obliques",
      },
    ],
  },
  {
    title: "Interval Training Madness",
    description:
      "Alternates between high-intensity intervals and active recovery.",
    programType: "cardio",
    difficulty: "advanced",
    exercises: [
      {
        name: "Sprint Intervals",
        description:
          "Run at maximum effort for a specified distance or time, followed by a recovery jog or walk.",
        sets: 5,
        repetitions: "200 meters",
        restTime: "60 seconds",
        equipmentNeeded: "Running Shoes",
        muscleWorked: "Legs, Cardiovascular System",
      },
      {
        name: "Bicycle Crunches",
        description:
          "Lie on back, lift legs off ground, and perform twisting motion with upper body like pedaling a bicycle.",
        sets: 5,
        repetitions: 20,
        restTime: "30 seconds",
        equipmentNeeded: "Mat",
        muscleWorked: "Core, Obliques",
      },
      {
        name: "Jump Squats",
        description: "Perform a squat followed by an explosive jump.",
        sets: 5,
        repetitions: 15,
        restTime: "30 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Legs, Glutes",
      },
    ],
  },
  {
    title: "Total Body Burn",
    description:
      "Targets all major muscle groups for a calorie-burning workout.",
    programType: "strength",
    difficulty: "intermediate",
    exercises: [
      {
        name: "Kettlebell Swings",
        description:
          "Swing a kettlebell between legs then upwards, engaging hips and glutes.",
        sets: 3,
        repetitions: 15,
        restTime: "45 seconds",
        equipmentNeeded: "Kettlebell",
        muscleWorked: "Legs, Glutes, Core",
      },
      {
        name: "Push-Up to Renegade Row",
        description:
          "Perform a push-up, then row one dumbbell upwards while in plank position.",
        sets: 3,
        repetitions: 12,
        restTime: "45 seconds",
        equipmentNeeded: "Dumbbells",
        muscleWorked: "Chest, Back, Arms",
      },
      {
        name: "Reverse Lunges with Dumbbells",
        description:
          "Step backwards into a lunge while holding dumbbells at sides.",
        sets: 3,
        repetitions: 10,
        restTime: "45 seconds",
        equipmentNeeded: "Dumbbells",
        muscleWorked: "Legs, Glutes",
      },
    ],
  },
  {
    title: "Functional Fitness Fusion",
    description:
      "Incorporates functional movements to improve everyday activities.",
    programType: "functional",
    difficulty: "intermediate",
    exercises: [
      {
        name: "Squat to Overhead Press",
        description: "Perform a squat, then press weights overhead.",
        sets: 4,
        repetitions: 12,
        restTime: "60 seconds",
        equipmentNeeded: "Dumbbells",
        muscleWorked: "Legs, Shoulders",
      },
      {
        name: "Farmers Walk",
        description:
          "Hold heavy weights at sides and walk for distance or time.",
        sets: 4,
        repetitions: "30 seconds",
        restTime: "60 seconds",
        equipmentNeeded: "Dumbbells, Kettlebells",
        muscleWorked: "Forearms, Grip, Legs",
      },
      {
        name: "Medicine Ball Slams",
        description:
          "Lift medicine ball overhead, then forcefully slam it to ground.",
        sets: 4,
        repetitions: 15,
        restTime: "45 seconds",
        equipmentNeeded: "Medicine Ball",
        muscleWorked: "Full Body",
      },
    ],
  },
  {
    title: "Dynamic Stretching Routine",
    description:
      "Focuses on dynamic stretches to improve flexibility and mobility.",
    programType: "flexibility",
    difficulty: "beginner",
    exercises: [
      {
        name: "Leg Swings",
        description:
          "Stand and swing one leg forward and backward in a controlled motion.",
        sets: 3,
        repetitions: 10,
        restTime: "30 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Legs, Hips",
      },
      {
        name: "Arm Circles",
        description:
          "Extend arms to the sides and make circular motions, gradually increasing range of motion.",
        sets: 3,
        repetitions: 15,
        restTime: "30 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Shoulders, Arms",
      },
      {
        name: "Torso Twists",
        description:
          "Stand with feet shoulder-width apart and twist torso from side to side.",
        sets: 3,
        repetitions: 20,
        restTime: "30 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Core, Obliques",
      },
    ],
  },
  {
    title: "Endurance Challenge",
    description: "Focuses on improving muscular and cardiovascular endurance.",
    programType: "endurance",
    difficulty: "intermediate",
    exercises: [
      {
        name: "Stair Climbing",
        description:
          "Climb stairs continuously for a specified duration or number of floors.",
        sets: 5,
        repetitions: "5 minutes",
        restTime: "60 seconds",
        equipmentNeeded: "Stairs",
        muscleWorked: "Legs, Cardiovascular System",
      },
      {
        name: "Circuit Training",
        description:
          "Perform a series of exercises with minimal rest between sets.",
        sets: 5,
        repetitions: "1 circuit",
        restTime: "60 seconds",
        equipmentNeeded: "Various (e.g., Dumbbells, Resistance Bands)",
        muscleWorked: "Full Body",
      },
      {
        name: "Rowing Machine",
        description: "Row continuously for a specified duration or distance.",
        sets: 5,
        repetitions: "1000 meters",
        restTime: "60 seconds",
        equipmentNeeded: "Rowing Machine",
        muscleWorked: "Back, Arms, Legs",
      },
    ],
  },
  {
    title: "Plyometric Power",
    description:
      "Focuses on explosive movements to improve power and athleticism.",
    programType: "plyometrics",
    difficulty: "advanced",
    exercises: [
      {
        name: "Depth Jumps",
        description:
          "Step off a box and immediately jump upwards upon landing.",
        sets: 4,
        repetitions: 8,
        restTime: "60 seconds",
        equipmentNeeded: "Plyo Box",
        muscleWorked: "Legs, Explosiveness",
      },
      {
        name: "Box Jumps",
        description: "Jump onto a box or platform, then step down and repeat.",
        sets: 4,
        repetitions: 10,
        restTime: "60 seconds",
        equipmentNeeded: "Plyo Box",
        muscleWorked: "Legs, Explosiveness",
      },
      {
        name: "Tuck Jumps",
        description: "Jump upwards while bringing knees towards chest.",
        sets: 4,
        repetitions: 12,
        restTime: "60 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Legs, Explosiveness",
      },
    ],
  },
  {
    title: "Yoga Flow",
    description:
      "A series of yoga poses to improve flexibility, balance, and relaxation.",
    programType: "flexibility",
    difficulty: "beginner",
    exercises: [
      {
        name: "Downward Facing Dog",
        description:
          "Start in a plank position, then push hips up and back into an inverted V-shape.",
        sets: 3,
        repetitions: "Hold for 30 seconds",
        restTime: "30 seconds",
        equipmentNeeded: "Yoga Mat",
        muscleWorked: "Hamstrings, Shoulders, Calves",
      },
      {
        name: "Warrior II",
        description:
          "Step feet wide apart, turn one foot out, and bend the knee, while extending arms parallel to the floor.",
        sets: 3,
        repetitions: "Hold for 30 seconds each side",
        restTime: "30 seconds",
        equipmentNeeded: "Yoga Mat",
        muscleWorked: "Legs, Arms, Core",
      },
      {
        name: "Corpse Pose",
        description:
          "Lie on your back with legs extended and arms by sides, palms facing up.",
        sets: 3,
        repetitions: "Hold for 2 minutes",
        restTime: "30 seconds",
        equipmentNeeded: "Yoga Mat",
        muscleWorked: "Relaxation",
      },
    ],
  },
  {
    title: "Full Body Burnout",
    description:
      "A high-intensity workout targeting all major muscle groups for maximum calorie burn.",
    programType: "cardio",
    difficulty: "advanced",
    exercises: [
      {
        name: "Burpees",
        description:
          "Perform a squat thrust followed by a jump and overhead clap.",
        sets: 5,
        repetitions: 20,
        restTime: "30 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Full Body",
      },
      {
        name: "Dumbbell Thrusters",
        description:
          "Hold dumbbells at shoulder height, squat down, then press weights overhead.",
        sets: 5,
        repetitions: 15,
        restTime: "30 seconds",
        equipmentNeeded: "Dumbbells",
        muscleWorked: "Legs, Shoulders, Arms",
      },
      {
        name: "Jumping Lunges",
        description:
          "Jump and switch legs mid-air, landing in a lunge position.",
        sets: 5,
        repetitions: 20,
        restTime: "30 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Legs, Glutes",
      },
    ],
  },
  {
    title: "Core & Cardio Blitz",
    description:
      "An intense workout combining core exercises with high-intensity cardio intervals.",
    programType: "cardio",
    difficulty: "intermediate",
    exercises: [
      {
        name: "Mountain Climbers",
        imagePath:
          "https://media1.popsugar-assets.com/files/thumbor/NldlMM9Ci6MPNt0_6ZOvEaKxhuo=/fit-in/1584x1088/top/filters:format_auto():upscale()/2022/12/09/752/n/1922729/tmp_9yEJUq_c0df08feaf677836_PS21_Fitness_Workout_09_Move_01_Mountain_Climber.jpg",
        description:
          "Assume a push-up position and alternate bringing knees towards chest.",
        sets: 4,
        repetitions: 20,
        restTime: "30 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Core, Shoulders",
      },
      {
        name: "Plank Jacks",
        description:
          "From plank position, jump feet out and in like a jumping jack.",
        sets: 4,
        repetitions: 15,
        imagePath:
          "https://hips.hearstapps.com/hmg-prod/images/full-body-burn-20-minutes-no-equipment-composites-plank-jack-knee-tuck-1462383894.jpg?resize=1200:*",
        restTime: "30 seconds",
        equipmentNeeded: "None",
        muscleWorked: "Core, Cardiovascular System",
      },
      {
        name: "Sprint Intervals",
        description:
          "Run at maximum effort for 30 seconds, followed by 30 seconds of walking or jogging.",
        sets: 4,
        repetitions: "30 seconds",
        imagePath:
          "https://simplifaster.com/wp-content/uploads/2020/03/5-Point-Guide.jpg",
        restTime: "30 seconds",
        equipmentNeeded: "Running Shoes",
        muscleWorked: "Legs, Cardiovascular System",
      },
    ],
  },
];

//seeds the database with USERS
async function seedUserData() {
  await db.User.deleteMany({});
  console.log("Removed all user entries");
  await db.User.insertMany(userData);
  console.log(`Added ${userData.length} users to the database`);
  // await db.Comment.deleteMany({});
  // console.log("Removed all log entries");
  // await db.Comment.insertMany(commentData);
  // console.log(`Added ${commentData.length} comments to the database`);
}

async function seedExProgramData() {
  const users = await db.User.find({});
  users.forEach((user, i) => {
    //allows for users to own TWO EXERCISE PROGRAMS EACH
    exerciseProgramData1[i].createdBy = user._id; //contains 15 ex. Programs
    exerciseProgramData2[i].createdBy = user._id; //contains 15 ex. programs
  });
  await db.ExerciseProgram.deleteMany({});
  await db.Comment.deleteMany({});
  console.log("Removed all exercise programs and associated comments");
  await db.ExerciseProgram.insertMany(exerciseProgramData1);
  await db.ExerciseProgram.insertMany(exerciseProgramData2);
  console.log(
    `Added ${
      exerciseProgramData1.length + exerciseProgramData2.length
    } exercise programs to the database`
  );
  process.exit();
}

// Invoke the function defined above
//seed the users
seedUserData()
  .then(() => {
    //then seed the program data per user
    return seedExProgramData();
  })
  .catch((err) => {
    console.log("Could not seed database:\n" + err);
    process.exit();
  });
