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
  assignments: [AssignmentInfo],
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
      submitted_at: "2023-01-24",
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




//HELPER FUNCTIONS

//returns an array with unique learner ids (COMPLETED)
function getUniqueLearnersIDsArray(submissionsArr){
    let x = [];
    for(submission of submissionsArr){
        if(x.indexOf(submission.learner_id)===-1)
            x.push(submission.learner_id)
    }
    return x
}


//Returns what a student scored on a particular assignment. Paramaters: student_id, assignment_id, and submissions Array
function getAssignmentScore(student, assigmentNumber, submissions){
    let score = 0;
    let ptsPossible = 0;
    //gets studentScore on a particual assigment 
    for(let submitted of submissions){
        if(submitted.learner_id===student && submitted.assignment_id===assigmentNumber){
            score=  submitted.submission.score
        }
    }

    // get pts possible from that assignment as well 
    for(let assigment of AssignmentGroup.assignments){
        if (assigmentNumber===assigment.id)
            ptsPossible =assigment.points_possible
    }

    return Number((score/ptsPossible).toFixed(3))

}

//returns an array of assignemtns a student completed. Paramaters: student ID , the submissiosn Array
function getCompletedAssignments(student,submissions){

    let x = []
    //iterte through submissions array 
    for(let submitted of submissions ){
        if((submitted.learner_id === student) ){
            x.push(submitted.assignment_id)
            }
    }
    return x

}

function validateAssignmentSubmissionDate(submissions){
    //iterate throgh all student submissions 
    for (let submitted of submissions){
        let currentAssignmentDueDate =0
        currentAssignmentDueDate =  (AssignmentGroup.assignments).find(  
            (element)=> {

                if(element.due_at === '3156-11-15')
                    return (element.due_at)
            } 
            
            );
        console.log(currentAssignmentDueDate)
        // if( (submitted.submission) > AssignmentGroup.assignments[submitted.assignment_id].due_at)
        //     submitted.score-=10
        // console.log(submitted.submission.submitted_at )

    }

}

// validateAssignmentSubmissionDate(LearnerSubmissions)
console.log(
    
    AssignmentGroup.assignments.find(
        (assignment)=> {

            if(assignment.due_at === '3156-11-15')
                return assignment.due_at
    
    
    }
    
    )



)





// here, we would process this data to achieve the desired result.
function getLearnerData(course, ag, submissions) {

    // validateAssignmentSubmissionDate(submissions);
    let results = [];
   
   let uniqueIDs = getUniqueLearnersIDsArray(submissions); //get the unique student IDs (Dictates how many objects we weill ultimatley need to return )

   console.log("Our Unique Ids:")
   console.log(uniqueIDs);

   //create a reutrn object for each student 
   for(let uniqueID of uniqueIDs){
        let obj = {}
        obj['id'] = uniqueID
        results.push(obj)
   }


   //can probably put this in above loop for time complexity or somethign like that 
   results = results.map( (student)=>
    {   
        let completedWork = getCompletedAssignments(student.id,submissions); //get me an array of the assigments that student complteted
        //add a new property where the key is the assigment number: and the value is what they scored
        for(let work of completedWork){
            student[work] = getAssignmentScore(student.id,work,submissions)
        }
        return student //return the modifed object back into the array
    }



);

   console.log(`\n Ultimate Output: `)
   console.log(results)



   
}









const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);















