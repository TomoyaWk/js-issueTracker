document.getElementById('issue-input-form').addEventListener('submit', saveIssue);


/*
 *issueの初期ステータスを設定 
 * @param e submitボタン押下時
 * 
 */
function saveIssue(e) {
    let issueDesc = document.getElementById('issue-desc-input').value;
    let issuePriority = document.getElementById('issue-priority-input').value;
    let issueAssignedTo = document.getElementById('issue-assignedTo-input').value;
    let issueId  = chance.guid(); //uniqueIDを生成
    let issueStatus = 'Open'; //進捗ステータス

    let issue = {
        id : issueId,
        description : issueDesc,
        priority : issuePriority,
        assignedTo : issueAssignedTo,
        status : issueStatus
    }
    
    //issuesの初期化
    if (localStorage.getItem('issues') === null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        let issues = JSON.parse(localStorage.getItem("issues"));

        console.log(issue);

        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issue-input-form').reset();
    fetchIssues();

    e.preventDefault();
}

/*
 *すでに投稿済みのissueを取得、表示する 
 * 
 */
function fetchIssues() {
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById('issues-list');

    issuesList.innerHTML = '';
    
    if (issues !== null){    
        for (let i = 0; i < issues.length; i++) {
            let id = issues[i].id;
            let desc =issues[i].description;
            let priority =issues[i].priority;
            let assignedTo =issues[i].assignedTo;
            let status =issues[i].status;

            issuesList.innerHTML += '<div class="card bg-light">'+
                                    '<h6 class="card-header">Issue ID:' + id +'</h6>'+
                                    '<div class="card-body">' +
                                    '<div class="card-text">' +
                                    '<p><span class="label label-info">Status:' + status + '</span></p>' + 
                                    '<h3>' + desc + '</h3>' + 
                                    '<p><span class="glyphicon glyphicon-time"></span>' + priority + '</p>' + 
                                    '<p><span class="glyphicon glyphicon-user"></span>' + assignedTo  + '</p>' +
                                    '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>' + 
                                    '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' +
                                    '</div>'
                                    '</div>' +
                                    '</div>';
        }
    }
}


