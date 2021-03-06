document.getElementById('issueInputForm').addEventListener('submit', saveIssue); // event handler to submit on form

// A reference to the form element is retrieved by using getElementById. We’re passing in the string issueInputForm which is the id of the <form> element. The addEventListener method is called to attach the submit event of the form to the saveIssue event handler function. Let's implement this function here:
function saveIssue(e) {
    var issueId = chance.guid();
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueStatus = 'Open';
    var issue = {
      id: issueId,
      description: issueDesc,
      severity: issueSeverity,
      assignedTo: issueAssignedTo,
      status: issueStatus
    }
    
    if (localStorage.getItem('issues') === null) {
      var issues = [];
      issues.push(issue);
      localStorage.setItem('issues', JSON.stringify(issues));
    } else {
      var issues = JSON.parse(localStorage.getItem('issues'));
      issues.push(issue);
      localStorage.setItem('issues', JSON.stringify(issues));
    }
    
    document.getElementById('issueInputForm').reset(); //reset() method will empty the form
   
    fetchIssues(); //calling 'fetchIssues()' again to make sure the list output is re-generated and that new issue item will be visible.
    
    e.preventDefault(); //executing this will avoid the default submission of the form taking place
  }

// Below is attaching the click event to the event handler method 'setStatusClosed'. 
function setStatusClosed (id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for(var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = "Closed";
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

// This function allows the user to delete the current issue from the list and Local Storage. Splice method is used to delete the current item from the array issues. Then it writes it back to Local Storage to execute 'fetchIssues' function again to update the list. 
function deleteIssue (id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for(var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function fetchIssues () {
    var issues = JSON.parse(localStorage.getItem('issues')); //this 1st line retrieves issues from local storage and then parsing the string result into a JSON object
    var issuesList = document.getElementById('issuesList'); // This line retrieves the reference to the <div> element with ID 'issuesList'. HTML content of the element can be accessed by property 'innerHTML'. That property is set to the content of an empty string. Next it's looping over elements in issues by using a 'for loop' and adding HTML outputs for the elements to 'issuesList.innerHTML'.
    
    issuesList.innerHTML = '';
    
    for (var i = 0; i < issues.length; i++) {
      var id = issues[i].id;
      var desc = issues[i].description;
      var severity = issues[i].severity;
      var assignedTo = issues[i].assignedTo;
      var status = issues[i].status;
      
      issuesList.innerHTML +=   '<div class="well">'+
                                '<h6>Issue ID: ' + id + '</h6>'+
                                '<p><span class="label label-info">' + status + '</span></p>'+
                                '<h3>' + desc + '</h3>'+
                                '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' '+
                                '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                                '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
                                '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                                '</div>';
    }
  }