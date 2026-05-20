/*
COURSE INFO OBJECT
{
  id: number,
  name: "string",
}
  */
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

/*
ASSIGNMENT GROUP OBJECT (Assigment Groups for a particular course)
{
   id: number,
   name: "string",
   course_id: number,    // the ID of the course the assignment group belongs to
   group_weight: number,  // the percentage weight of the entire assignment group
   assignments: [AssignmentInfo], //array of assingment objects 
}
 */

const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [

     /*
    ASSIGMENT OBJECT (Assingment in an AssigmentGroup)
    {
            id: number,
            name: string,
            due_at: Date string,  // the due date for the assignment
            points_possible: number,  // the maximum points possible for the assignment

    } */

    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
     },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    },  
  ]
};

//An array of LearnerSubmission objects
const LearnerSubmissions = [

/*
    LEARNER SUBMISSION OBJECT (When the learner submits assigments)
    {
        learner_id: number, 
        assignment_id: number, //connects to assignment object
        submission: {
        submitted_at: Date string,
        score: number
    }    
*/

  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  },
 
];


//                                                                                !!!HELPER FUNCTIONS!!!

/*
VALIDATES PTS POSSIBLE FOR AN ARRAY OF ASSIGNMENTS AND CHECKS IF ANY ARE LESS THAN 0 (UPDATES THEM TO 100 AS DEFAULT IF NEEDED)
Paramaters: assignment group, a course info object
Status: COMPLETED
*/
function validateAssignmentPtsPossible(ag){
     //check if any of the points possible are 0
    for (let index in ag.assignments){

        //convert all pts possible to numbers to avoid future issues
        ag.assignments[index].points_possible = Number(ag.assignments[index].points_possible)
        //if pts_possible is 0, default to 100 and let them know tho check it later
        if(ag.assignments[index].points_possible<=0){
            try {  
                ag.assignments[index].points_possible = 100; //default to 100 allows calucation to carry on 
                throw (`Check the points_possible attribute of this assignment before proceeding please. Assignment at index ${index} It has been assigned 100pts as default to avoid errors. `)
            } catch (error) {
               console.log(error)     
            }
        }     
    }  
}


/*
VALIDATES AN ARRAY OF ASSIGNMENTS AND CHECKS IF IT IS INLINE WITH THE COURSE (Null)
Paramaters: assignment group, a course info object
Status: COMPLETED
*/
function validateAssignmentGroup(ag,course){
    let valid = true;
    //check if it matches assignment group
    switch(ag.course_id){
        case course.id:  //if they match
            console.log(`The Assignment Group matches the course!`)
            break
        default: //if they dont match, return false
        try {
            throw `Error! Assignment Group doesnt match Course. Double check the course_id propery of Your Assignment Group.`
        } catch (error) {
            valid = false;
            console.log(error)   
        }
        break
    }

    if(valid)
    console.log(`All Assignments seem to be good!`)

    else{
        console.log(`Double Check errors and validate again.`)
    }
    return valid; 
}


/*
VALIDATES THE SUBMISSIONS OBJECTS IN A SUBMISSIONS ARRAY, CHECKS IF THEY ARE LATE (DEDUCTS 10 PTS IF TRUE) (NULL)
Paramaters: array of submission objects (ex: LearnerSubmissions), assignmentGroup
Status: 50%, validates lateness correctly, not a submission is correlates to an existeing assingment
*/
function validateAssignmentSubmissionDate(submissionsArray, assignmentGroup){ 
    //iterate through submissionsArray 
    for(let submitted of submissionsArray ){

        //turn scores into numbers if they arent to avoid erros with calculations
        submitted.submission.score = Number( submitted.submission.score)


        //deducts 10 pts from late assignmentd 
        //find me the assignment that corresponds and grab me its due date 
        let duedate = findAssignment(submitted.assignment_id,assignmentGroup).due_at   //have to call .due_at since find returns the whole object 

        //if due date passed already, deduct 10% of max possible pts
        if(duedate<submitted.submission.submitted_at){
           submitted.submission.score -= getAssignmentPtsPossible(submitted.assignment_id,assignmentGroup)*0.1
        }     
    }
    return null;
}

/*
RETURNS AN ARRAY WITH UNIQUE LEARNER IDS (ARRAY [])
Paramaters: array of submission objects (ex: LearnerSubmissions)
Status: COMPLETED
*/
function getUniqueLearnersIDArray(submissionsArray){
    let x = []; 
    for (let submission of submissionsArray){ //where submission is each submision item in the submissionArray
        //if the array doesnt have this current learnerId, put it in this array
        if(x.indexOf(submission.learner_id) ===-1)
            x.push(submission.learner_id)
    }
    return x;
}

/*
RETURNS AN ARRAY OF ASSIGNMENT_IDS A FOR ALL THE ASSIGNMENTS A LEARNER SUBMITTED (ARRAY [])
Paramaters: learner_id, array of submission objects (ex: LearnerSubmissions)
Status: COMPLETED
*/
function getCompletedAssignmentsIDArray(learner_id,submissionArray){
    let x = []
    let today = new Date().toISOString() //rjust get the date part
    today = today.split("T")[0] //split it into an array around the T, get just the first index of the array which contains the date i need
   
    //iterate through submissiosn array 
    for(let submitted of submissionArray ){
         let duedate = findAssignment(submitted.assignment_id,AssignmentGroup).due_at //submission date of corresponding assignment
        if(submitted.learner_id === learner_id && duedate<=today) //if the learner id mathes, and the due date is beofre current date grab the assignment id
            x.push(submitted.assignment_id);
    }
    return x;
}


/*
RETURNS THE A PARTICULAR LEARNER SUBMISSION OBJECT GIVEN THE LEARNER ID AND ASSIGNMENT ID (OBJECT)
Paramaters: learner_id, assignment_id, array of submission objects (ex: LearnerSubmissions)
Status: Completed
*/
function findLearnerSubmission(learner_id ,assignment_id, submissionArray){
    let student = submissionArray.find(
       (element)=> element.learner_id === learner_id && element.assignment_id ===assignment_id
    );
    return student
}

/*
RETURNS THE A PARTICULAR ASSINGMENT GIVEN TTHE ASSIGNMENT ID AND THE ASSIGNMENT GROUP(OBJECT)
Paramaters:  assignment_id, assignmentGroup
Status: Completed
*/
function findAssignment(assignment_id, assignmentGroup){
    let assignment = assignmentGroup.assignments.find(
       (element)=> element.id === assignment_id 
    );
    return assignment
}

/*
RETURNS WHAT A LEARNER SCORED ON AN ASSIGNMENT (NUMBER)
Paramaters: learner_id, assignment_id, array of submission objects (ex: LearnerSubmissions)
Status: Completed
*/
function getAssignmentScore(learner_id,assignment_id,submissionArray){
    return findLearnerSubmission(learner_id,assignment_id,submissionArray).submission.score  
}

/*
RETURNS THE POINTS POSSIBLE FOR AN ASSIGMENTS (NUMBER)
Paramaters: learner_id, assignment_id, array of submission objects (ex: LearnerSubmissions)
Status: Completed
*/
function getAssignmentPtsPossible(assignment_id,assignmentGroup){
    return findAssignment(assignment_id,assignmentGroup).points_possible   
}

/*
RETURNS THE WEIGHTED AVG FOR A LEARNER FOR SUBMITTED ASSIGNMENTS (NUMBER)
Paramaters: learner_id, assignment_id, array of submission objects (ex: LearnerSubmissions)
Status: Completed
*/
function getLearnerWeightedAverage(learner_id,submissionArray,assignmentGroup){
    let weightedScore= 0;
    let weightedTotal = 0;
     
    //get all the asgingments the learner completed and calcuate how many total points they score
    let x = getCompletedAssignmentsIDArray(learner_id,submissionArray)
    console.log(x)
    weightedScore = x.reduce(
        (accumulator, currentID) => 
            accumulator+ getAssignmentScore(learner_id,currentID,submissionArray),
        0
    );

    //get me the total pts possible for all the assignments the learner completed
    weightedTotal = x.reduce(

        (accumulator,currentID) =>
            accumulator+getAssignmentPtsPossible(currentID,assignmentGroup),0
    )
    return Number((weightedScore/weightedTotal).toFixed(3))

}


// here, we would process this data to achieve the desired result.
function getLearnerData(course, ag, submissionsArray) {

    //only proceed if course ids match
    let valid = validateAssignmentGroup(ag,course)
    if (valid) {
      //validate the submissions (check for lateness)
      validateAssignmentSubmissionDate(LearnerSubmissions, AssignmentGroup);
      //validate the pts possible and adjust if neceassry
      validateAssignmentPtsPossible(ag);
      const result = [];

      //get me a list of the unique learner ids, dictates how many objects in our return array.
      let learners = getUniqueLearnersIDArray(submissionsArray);
      console.log(`\nHere are all out learners:`);
      console.log(learners);

      for (let learner of learners) {
        let obj = {};
        //setting the ID property 
        obj.id = learner;
        console.log(`\nLearner: ${learner} completed: `);
        //give me an array of the work they completed
        let completedWork = getCompletedAssignmentsIDArray(
          learner,
          submissionsArray,
        );

        //iterate throguh that array and get me the score for each assignment/the possible pts
        for (let index in completedWork) {
          obj[completedWork[index]] = Number((getAssignmentScore(learner, completedWork[index],submissionsArray) /(getAssignmentPtsPossible(completedWork[index], ag))).toFixed(3));
        }

        //getting the avarge
        obj["avg"] = getLearnerWeightedAverage(learner, submissionsArray, ag);
        result.push(obj);
      }

      console.log(`\nResults`);
      return result;
    } 
    
    else{
      console.log(
        "Unable to process data. Refer to the information above on how to proceed. Then run querey again.",
      );
    }

   
}

console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));




